(function (exports, Laya) {
    'use strict';

    class BatchManager {
        static registerProvider(renderType, cls) {
            if (BatchManager.registry[renderType])
                throw new Error("Overlapping batch optimization");
            BatchManager.registry[renderType] = cls;
        }
        static createProvider(renderType) {
            return new (BatchManager.registry[renderType] || NullBatchProvider)();
        }
    }
    BatchManager.registry = {};
    class NullBatchProvider {
        batch(list, start, end, allowReorder) {
            for (let i = start; i <= end; i++)
                list.add(list.elements[i]);
        }
        reset() { }
        destroy() { }
    }

    class SequenceFrame2DInstanceBatch {
        constructor() {
            this._recoverList = new Laya.FastSinglelist();
        }
        static __init__() {
            if (BatchManager.registry[Laya.BaseRender2DType.sequenceFrame2D]) {
                return;
            }
            BatchManager.registerProvider(Laya.BaseRender2DType.sequenceFrame2D, SequenceFrame2DInstanceBatch);
        }
        batch(list, start, end, allowReorder) {
            if (start > end) {
                return;
            }
            const elementArray = list.elements;
            let batchStart = -1;
            let headElement = null;
            let instanceCount = 0;
            for (let i = start; i <= end; i++) {
                const element = elementArray[i];
                const renderer = element._sequenceFrame2DRender;
                const count = renderer ? renderer.activeInstanceCount : 0;
                if (count <= 0) {
                    continue;
                }
                if (batchStart < 0) {
                    batchStart = i;
                    headElement = element;
                    instanceCount = count;
                    continue;
                }
                if (!this.check(headElement, element) || instanceCount + count > SequenceFrame2DInstanceBatchTool.MaxInstanceCount) {
                    this._batchInternal(list, batchStart, i - 1);
                    batchStart = i;
                    headElement = element;
                    instanceCount = count;
                }
                else {
                    instanceCount += count;
                }
            }
            if (batchStart >= 0) {
                this._batchInternal(list, batchStart, end);
            }
        }
        reset() {
            this.recover();
        }
        destroy() {
            this.recover();
            this._recoverList.length = 0;
        }
        check(left, right) {
            const leftRenderer = left._sequenceFrame2DRender;
            const rightRenderer = right._sequenceFrame2DRender;
            if (!leftRenderer || !rightRenderer) {
                return false;
            }
            if (!leftRenderer._canBatchWith(rightRenderer)) {
                return false;
            }
            if (left.materialShaderData !== right.materialShaderData || left.subShader !== right.subShader) {
                return false;
            }
            const leftOwner = left.owner;
            const rightOwner = right.owner;
            if (leftOwner.globalRenderData !== rightOwner.globalRenderData) {
                return false;
            }
            if (leftOwner.getClipInfo && rightOwner.getClipInfo && leftOwner.getClipInfo() !== rightOwner.getClipInfo()) {
                return false;
            }
            return true;
        }
        recover() {
            const recoverArray = this._recoverList.elements;
            for (let i = 0, n = this._recoverList.length; i < n; i++) {
                SequenceFrame2DInstanceBatchTool.recover(recoverArray[i]);
            }
            this._recoverList.length = 0;
        }
        _batchInternal(list, start, end) {
            const elementArray = list.elements;
            const activeElements = [];
            let totalInstanceCount = 0;
            for (let i = start; i <= end; i++) {
                const element = elementArray[i];
                const renderer = element._sequenceFrame2DRender;
                const count = renderer ? renderer.activeInstanceCount : 0;
                if (count > 0) {
                    activeElements.push(element);
                    totalInstanceCount += count;
                }
            }
            if (totalInstanceCount <= 0) {
                return;
            }
            if (activeElements.length === 1) {
                list.add(activeElements[0]);
                return;
            }
            const info = SequenceFrame2DInstanceBatchTool.getBatchInfo();
            this._recoverList.add(info);
            const configHash = this._getConfigHash(activeElements, totalInstanceCount);
            const uploadConfig = !info.configValid || info.configHash !== configHash;
            const firstRenderer = activeElements[0]._sequenceFrame2DRender;
            if (this._isContiguousInstanceIDRange(activeElements)) {
                const firstID = firstRenderer.instanceID;
                firstRenderer._uploadRuntimeDataRange(info.runtimeVB, firstID, totalInstanceCount);
                if (uploadConfig) {
                    firstRenderer._uploadConfigDataRange(info.configVB, firstID, totalInstanceCount);
                    info.configHash = configHash;
                    info.configValid = true;
                }
            }
            else {
                const runtimeStride = Laya.SequenceFrame2DShader.RUNTIME_FLOAT_STRIDE;
                const configStride = Laya.SequenceFrame2DShader.CONFIG_FLOAT_STRIDE;
                const runtimeData = SequenceFrame2DInstanceBatchTool._instanceBufferCreate(runtimeStride * SequenceFrame2DInstanceBatchTool.MaxInstanceCount);
                this._copyRuntimeData(activeElements, runtimeData);
                info.runtimeVB.setData(runtimeData.buffer, 0, 0, totalInstanceCount * runtimeStride * 4);
                SequenceFrame2DInstanceBatchTool._instanceBufferRecover(runtimeData);
                if (uploadConfig) {
                    const configData = SequenceFrame2DInstanceBatchTool._instanceBufferCreate(configStride * SequenceFrame2DInstanceBatchTool.MaxInstanceCount);
                    this._copyConfigData(activeElements, configData);
                    info.configVB.setData(configData.buffer, 0, 0, totalInstanceCount * configStride * 4);
                    SequenceFrame2DInstanceBatchTool._instanceBufferRecover(configData);
                    info.configHash = configHash;
                    info.configValid = true;
                }
            }
            const first = activeElements[0];
            const geometry = info.geometry;
            geometry.instanceCount = totalInstanceCount;
            geometry.indexFormat = first.geometry.indexFormat;
            const batchElement = info.element;
            batchElement.materialShaderData = first.materialShaderData;
            batchElement.value2DShaderData = first.value2DShaderData;
            batchElement.globalShaderData = first.globalShaderData;
            batchElement.subShader = first.subShader;
            batchElement.renderStateIsBySprite = first.renderStateIsBySprite;
            batchElement.nodeCommonMap = first.nodeCommonMap;
            batchElement.owner = first.owner;
            list.add(batchElement);
        }
        _isContiguousInstanceIDRange(activeElements) {
            let expectedID = -1;
            for (let i = 0, n = activeElements.length; i < n; i++) {
                const renderer = activeElements[i]._sequenceFrame2DRender;
                const id = renderer.instanceID;
                const count = renderer.activeInstanceCount;
                if (id < 0 || count <= 0)
                    return false;
                if (expectedID >= 0 && id !== expectedID)
                    return false;
                expectedID = id + count;
            }
            return true;
        }
        _copyRuntimeData(activeElements, target) {
            const stride = Laya.SequenceFrame2DShader.RUNTIME_FLOAT_STRIDE;
            this._copySharedDataRuns(activeElements, target, stride, (sourceRenderer, targetOffset, startID, count) => {
                sourceRenderer._copyRuntimeDataRange(target, targetOffset, startID, count);
            });
        }
        _copyConfigData(activeElements, target) {
            const stride = Laya.SequenceFrame2DShader.CONFIG_FLOAT_STRIDE;
            this._copySharedDataRuns(activeElements, target, stride, (sourceRenderer, targetOffset, startID, count) => {
                sourceRenderer._copyConfigDataRange(target, targetOffset, startID, count);
            });
        }
        _copySharedDataRuns(activeElements, target, stride, copyRun) {
            const sourceRenderer = activeElements[0]._sequenceFrame2DRender;
            let targetOffset = 0;
            let runStartID = -1;
            let runCount = 0;
            let expectedID = -1;
            const flush = () => {
                if (runCount <= 0)
                    return;
                copyRun(sourceRenderer, targetOffset, runStartID, runCount);
                targetOffset += runCount * stride;
                runCount = 0;
            };
            for (let i = 0, n = activeElements.length; i < n; i++) {
                const renderer = activeElements[i]._sequenceFrame2DRender;
                const id = renderer.instanceID;
                const count = renderer.activeInstanceCount;
                if (id < 0 || count <= 0)
                    continue;
                if (runCount > 0 && id === expectedID) {
                    runCount += count;
                    expectedID = id + count;
                    continue;
                }
                flush();
                runStartID = id;
                runCount = count;
                expectedID = id + count;
            }
            flush();
        }
        _getConfigHash(activeElements, totalInstanceCount) {
            let hash = totalInstanceCount | 0;
            for (let i = 0, n = activeElements.length; i < n; i++) {
                const renderer = activeElements[i]._sequenceFrame2DRender;
                hash = Math.imul(hash ^ renderer.instanceID, 16777619);
                hash = Math.imul(hash ^ renderer.getRenderID(), 16777619);
                hash = Math.imul(hash ^ renderer.configVersion, 16777619);
                hash = Math.imul(hash ^ renderer.activeInstanceCount, 16777619);
            }
            return hash;
        }
    }
    class SequenceFrame2DInstanceBatchTool {
        static getBatchInfo() {
            return SequenceFrame2DInstanceBatchTool._batchInfoPool.pop() || SequenceFrame2DInstanceBatchTool.createBatchInfo();
        }
        static createBatchInfo() {
            const element = Laya.LayaGL.render2DRenderPassFactory.createRenderElement2D();
            const geometry = Laya.LayaGL.renderDeviceFactory.createRenderGeometryElement(Laya.MeshTopology.Triangles, Laya.DrawType.DrawElementInstance);
            const state = Laya.LayaGL.renderDeviceFactory.createBufferState();
            const runtimeVB = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(Laya.BufferUsage.Dynamic);
            const configVB = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(Laya.BufferUsage.Dynamic);
            runtimeVB.vertexDeclaration = Laya.SequenceFrame2DShader.runtimeDeclaration;
            runtimeVB.instanceBuffer = true;
            runtimeVB.setDataLength(SequenceFrame2DInstanceBatchTool.MaxInstanceCount * Laya.SequenceFrame2DShader.RUNTIME_FLOAT_STRIDE * 4);
            configVB.vertexDeclaration = Laya.SequenceFrame2DShader.configDeclaration;
            configVB.instanceBuffer = true;
            configVB.setDataLength(SequenceFrame2DInstanceBatchTool.MaxInstanceCount * Laya.SequenceFrame2DShader.CONFIG_FLOAT_STRIDE * 4);
            geometry.bufferState = state;
            geometry.indexFormat = Laya.IndexFormat.UInt16;
            geometry.setDrawElemenParams(6, 0);
            geometry.instanceCount = 0;
            state.applyState([Laya.SequenceFrame2DShader._vbs, runtimeVB, configVB], Laya.SequenceFrame2DShader._ibs);
            element.geometry = geometry;
            element.renderStateIsBySprite = false;
            element.nodeCommonMap = ["BaseRender2D"];
            return {
                element,
                geometry,
                state,
                runtimeVB,
                configVB,
                configHash: -1,
                configValid: false,
            };
        }
        static recover(info) {
            const element = info.element;
            element.materialShaderData = null;
            element.value2DShaderData = null;
            element.globalShaderData = null;
            element.subShader = null;
            element.owner = null;
            element.nodeCommonMap = ["BaseRender2D"];
            info.geometry.clearRenderParams();
            info.geometry.setDrawElemenParams(6, 0);
            info.geometry.instanceCount = 0;
            SequenceFrame2DInstanceBatchTool._batchInfoPool.push(info);
        }
        static _instanceBufferCreate(length) {
            let array = SequenceFrame2DInstanceBatchTool._bufferPool[length];
            if (!array) {
                array = SequenceFrame2DInstanceBatchTool._bufferPool[length] = [];
            }
            return array.pop() || new Float32Array(length);
        }
        static _instanceBufferRecover(float32) {
            const length = float32.length;
            let array = SequenceFrame2DInstanceBatchTool._bufferPool[length];
            if (!array) {
                array = SequenceFrame2DInstanceBatchTool._bufferPool[length] = [];
            }
            array.push(float32);
        }
    }
    SequenceFrame2DInstanceBatchTool.MaxInstanceCount = 4096;
    SequenceFrame2DInstanceBatchTool._batchInfoPool = [];
    SequenceFrame2DInstanceBatchTool._bufferPool = [];
    SequenceFrame2DInstanceBatch.__init__();

    class Web2DGraphicWholeBuffer {
        constructor() {
            this._num = 0;
            this._updateRange = new Laya.Vector2(100000000, -100000000);
        }
        _modifyOneView(view) {
            this._updateRange.y = Math.max(view.start + view.length, this._updateRange.y);
            this._updateRange.x = Math.min(view.start, this._updateRange.x);
        }
        addDataView(view) {
            view._next = null;
            view._prev = null;
            if (!this._first) {
                this._first = view;
            }
            if (this._last) {
                this._last._next = view;
                view._prev = this._last;
            }
            view.owner = this;
            this._last = view;
            this._num++;
        }
        removeDataView(view) {
            view.owner = null;
            if (view._prev) {
                view._prev._next = view._next;
            }
            if (view._next) {
                view._next._prev = view._prev;
            }
            if (view == this._first) {
                this._first = view._next;
            }
            if (view == this._last) {
                this._last = view._prev;
            }
            view._next = null;
            view._prev = null;
            this._updateRange.x = Math.min(view.start, this._updateRange.x);
            this._updateRange.y = Math.max(view.start + view.length, this._updateRange.y);
            this._num--;
        }
        destroy() {
            this._first = null;
            this._last = null;
            this._dataView = null;
            this.arrayBuffer = null;
        }
    }
    class Web2DGraphicsVertexBuffer extends Web2DGraphicWholeBuffer {
        resetData(byteLength) {
            this.arrayBuffer = new ArrayBuffer(byteLength);
            let newData = new Float32Array(this.arrayBuffer);
            if (this._dataView) {
                newData.set(this._dataView);
            }
            this._dataView = newData;
            this._needResetData = true;
        }
        _upload() {
            if (this._needResetData) {
                let view = this._first;
                while (view) {
                    view._updateView(this._dataView);
                    view = view._next;
                }
                this.buffer.setData(this.arrayBuffer, 0, 0, this.arrayBuffer.byteLength);
                this._needResetData = false;
            }
            else {
                if (this._updateRange.y <= this._updateRange.x)
                    return;
                this.buffer.setData(this.arrayBuffer, this._updateRange.x * 4, this._updateRange.x * 4, (this._updateRange.y - this._updateRange.x) * 4);
            }
            this._updateRange.setValue(100000000, -100000000);
        }
    }
    class Web2DGraphicsIndexBuffer extends Web2DGraphicWholeBuffer {
        resetData(byteLength) {
            this.arrayBuffer = new ArrayBuffer(byteLength);
            let newData = new Uint16Array(this.arrayBuffer);
            if (this._dataView) {
                newData.set(this._dataView);
            }
            this._dataView = newData;
            this._needResetData = true;
        }
        _upload() {
            if (!this._num)
                return;
            let view = this._first;
            let start = 0;
            let length = 0;
            let geometry = view._geometry;
            let needUpdate = false;
            let uploadStart = this._needResetData ? 0 : this._updateRange.x;
            while (view) {
                if (geometry != view._geometry) {
                    if (needUpdate) {
                        geometry.clearRenderParams();
                        geometry.setDrawElemenParams(length, start * 2);
                    }
                    geometry = view._geometry;
                    start = start + length;
                    length = 0;
                }
                start = start + length;
                needUpdate = this._needResetData || start >= uploadStart;
                if (needUpdate) {
                    view.start = start;
                    view._updateView(this._dataView);
                }
                length += view.length;
                view = view._next;
            }
            if (needUpdate) {
                geometry.clearRenderParams();
                geometry.setDrawElemenParams(length, start * 2);
            }
            let len = this._last.start + this._last.length - uploadStart;
            let offset = uploadStart * 2;
            offset = Math.floor(offset / 4) * 4;
            this.buffer.setData(this.arrayBuffer, offset, offset, len * 2 + (uploadStart * 2 - offset));
            this._needResetData = false;
        }
        _modifyOneView(view) {
            if (view._prev) {
                view.start = view._prev.start + view._prev.length;
            }
            else {
                view.start = 0;
            }
            super._modifyOneView(view);
        }
    }
    class Web2DGraphicsIndexBatchBuffer extends Web2DGraphicsIndexBuffer {
        _upload() {
            let view = this._first;
            let uploadStart = this._needResetData ? 0 : this._updateRange.x;
            while (view) {
                if (this._needResetData || view.start >= uploadStart) {
                    view._updateView(this._dataView);
                }
                view = view._next;
            }
            let len = this._last.start + this._last.length - uploadStart;
            if (len == 0)
                return;
            let offset = uploadStart * 2;
            offset = Math.floor(offset / 4) * 4;
            let dataLength = len * 2 + (uploadStart * 2 - offset);
            if (dataLength + offset > this.arrayBuffer.byteLength) {
                offset -= (dataLength + offset - this.arrayBuffer.byteLength);
            }
            this.buffer.setData(this.arrayBuffer, offset, offset, dataLength);
            this._needResetData = false;
        }
        _modifyOneView(view) {
            this.addDataView(view);
            super._modifyOneView(view);
            if (view._geometry) {
                view._geometry.clearRenderParams();
                view._geometry.setDrawElemenParams(view.length, view.start * 2);
            }
        }
        clearBufferViews() {
            this._first = null;
            this._last = null;
            this._num = 0;
            this._updateRange.setValue(100000000, -100000000);
        }
        _resetData(byteLength) {
            super.resetData(byteLength);
        }
    }

    class BatchBuffer {
        constructor() {
            this.indexCount = 0;
            this.maxIndexCount = 0;
            this.bufferStates = new Map();
            this.indexBuffer = Laya.LayaGL.renderDeviceFactory.createIndexBuffer(Laya.BufferUsage.Dynamic);
            this.indexBuffer.indexType = Laya.IndexFormat.UInt16;
            this.wholeBuffer = new Web2DGraphicsIndexBatchBuffer();
            this.wholeBuffer.buffer = this.indexBuffer;
            if (!!Laya.LayaGL.renderEngine.gl) {
                this.add = this._addWebgl;
            }
            else {
                this.add = this._addWebgpu;
            }
        }
        _addWebgl(element) {
            let handle = element.owner.renderDataHandler;
            let blocks = handle._getBlocks();
            if (!blocks)
                return null;
            let cview = handle.getCloneViews()[element._index];
            let block = blocks[element._index];
            let vertexBuffer = block.vertexBuffer;
            let bufferState = this.bindBuffer(vertexBuffer);
            this.indexCount += cview.length;
            this.wholeBuffer._modifyOneView(cview);
            if (cview._geometry.bufferState !== bufferState) {
                cview._geometry.bufferState = bufferState;
            }
            WebRender2DPass.setBuffer(this.wholeBuffer);
            this.updateBufLength();
            return cview._geometry;
        }
        _addWebgpu(element) {
            let handle = element.owner.renderDataHandler;
            let blocks = handle._getBlocks();
            if (!blocks)
                return null;
            let cview = handle.getCloneViews()[element._index];
            let block = blocks[element._index];
            let vertexBuffer = block.vertexBuffer;
            let bufferState = this.bindBuffer(vertexBuffer);
            this.indexCount += cview.length;
            this.wholeBuffer._modifyOneView(cview);
            if (cview._geometry._bufferState !== bufferState) {
                cview._geometry.bufferState = bufferState;
            }
            WebRender2DPass.setBuffer(this.wholeBuffer);
            this.updateBufLength();
            return cview._geometry;
        }
        add(element) {
            return null;
        }
        updateBufLength() {
            if (this.maxIndexCount <= this.indexCount) {
                let nLength = Math.ceil(this.indexCount / _STEP_) * _STEP_;
                let byteLength = nLength * 2;
                this.indexBuffer._setIndexDataLength(byteLength);
                this.wholeBuffer._resetData(byteLength);
                this.maxIndexCount = nLength;
            }
        }
        bindBuffer(buffer) {
            let bufferState = this.bufferStates.get(buffer);
            if (!bufferState) {
                bufferState = Laya.LayaGL.renderDeviceFactory.createBufferState();
                bufferState.applyState([buffer], this.indexBuffer);
                this.bufferStates.set(buffer, bufferState);
            }
            return bufferState;
        }
        clear() {
            this.indexCount = 0;
            this.wholeBuffer.clearBufferViews();
        }
        destroy() {
            this.clear();
            this.bufferStates.forEach((bufferState) => {
                bufferState.destroy();
            });
            this.bufferStates.clear();
            this.indexBuffer.destroy();
            this.indexBuffer = null;
            this.wholeBuffer.destroy();
            this.wholeBuffer = null;
        }
    }
    class BaseBatchContext {
        constructor() {
            this.textureId = 0;
            this.globalAlpha = 1;
            this.clipInfo = null;
            this.subShader = null;
            this.bufferState = null;
            this.primitiveShaderData = null;
            this.materialShaderData = null;
            this.typeKey = 0;
            this.textureKey = 0;
            this.globalRenderData = null;
            this.fillTexture = false;
        }
    }
    class WebGLBatchContext extends BaseBatchContext {
        setHead(element) {
            this.primitiveShaderData = element.primitiveShaderData;
            this.materialShaderData = element.materialShaderData;
            this.subShader = element.subShader;
            this.bufferState = element.geometry.bufferState;
            this.typeKey = element.typeKey;
            this.textureKey = element.textureKey;
            this.textureId = element.textureKey & (~((1 << Laya.ShaderDefines2D.SHADER_DEFINE_BITS) - 1));
            this.globalAlpha = element.owner.globalAlpha;
            this.clipInfo = element.owner.getClipInfo();
            this.globalRenderData = element.owner.globalRenderData;
            this.fillTexture = !!(element.typeKey & 64);
            this.texRange = this.primitiveShaderData.getVector(Laya.ShaderDefines2D.UNIFORM_TEXRANGE);
        }
        isCompatible(element) {
            if (this.typeKey & 32)
                return false;
            if (element.typeKey & 32) {
                return false;
            }
            if (this.typeKey !== element.typeKey) {
                return false;
            }
            let defineMask = (1 << Laya.ShaderDefines2D.SHADER_DEFINE_BITS) - 1;
            if ((this.textureKey & defineMask) !== (element.textureKey & defineMask)) {
                return false;
            }
            let elementTexId = element.textureKey & (~defineMask);
            if (elementTexId !== 0 && elementTexId !== this.textureId && this.textureId !== 0)
                return false;
            if (this.subShader !== element.subShader ||
                this.bufferState !== element.geometry.bufferState ||
                this.clipInfo !== element.owner.getClipInfo() ||
                element.owner.globalRenderData !== this.globalRenderData) {
                return false;
            }
            if ((this.typeKey & 16) !== 0 && element.materialShaderData !== this.materialShaderData) {
                return false;
            }
            if (this.fillTexture) {
                if (!element.primitiveShaderData.getVector(Laya.ShaderDefines2D.UNIFORM_TEXRANGE).equal(this.texRange))
                    return false;
            }
            if (this.textureId === 0 && elementTexId !== 0) {
                this.textureId = elementTexId;
                this.primitiveShaderData = element.primitiveShaderData;
                this.textureKey = element.textureKey;
            }
            return true;
        }
    }
    class WebGPUBatchContext extends BaseBatchContext {
        setHead(element) {
            this.primitiveShaderData = element._primitiveShaderData;
            this.materialShaderData = element._materialShaderData;
            this.subShader = element._subShader;
            this.bufferState = element.geometry._bufferState;
            this.typeKey = element.typeKey;
            this.textureKey = element.textureKey;
            this.textureId = element.textureKey & (~((1 << Laya.ShaderDefines2D.SHADER_DEFINE_BITS) - 1));
            this.globalAlpha = element.owner.globalAlpha;
            this.clipInfo = element.owner.getClipInfo();
            this.globalRenderData = element.owner.globalRenderData;
            this.fillTexture = !!(element.typeKey & 64);
            this.texRange = this.primitiveShaderData.getVector(Laya.ShaderDefines2D.UNIFORM_TEXRANGE);
        }
        isCompatible(element) {
            if (this.typeKey & 32)
                return false;
            if (element.typeKey & 32) {
                return false;
            }
            if (this.typeKey !== element.typeKey) {
                return false;
            }
            let defineMask = (1 << Laya.ShaderDefines2D.SHADER_DEFINE_BITS) - 1;
            if ((this.textureKey & defineMask) !== (element.textureKey & defineMask)) {
                return false;
            }
            let elementTexId = element.textureKey & (~defineMask);
            if (elementTexId !== 0 && elementTexId !== this.textureId && this.textureId !== 0)
                return false;
            if (this.subShader !== element.subShader ||
                this.bufferState !== element.geometry.bufferState ||
                this.clipInfo !== element.owner.getClipInfo() ||
                element.owner.globalRenderData !== this.globalRenderData) {
                return false;
            }
            if ((this.typeKey & 16) !== 0 && element._materialShaderData !== this.materialShaderData) {
                return false;
            }
            if (this.fillTexture) {
                let primitiveShaderData = element._primitiveShaderData;
                if (!primitiveShaderData.getVector(Laya.ShaderDefines2D.UNIFORM_TEXRANGE).equal(this.texRange))
                    return false;
            }
            if (this.textureId === 0 && elementTexId !== 0) {
                this.textureId = elementTexId;
                this.primitiveShaderData = element._primitiveShaderData;
                this.textureKey = element.textureKey;
            }
            return true;
        }
    }
    class WebGraphicsBatch {
        constructor() {
            this._buffer = new BatchBuffer();
            this._merged = [];
            let isWebgl = !!Laya.LayaGL.renderEngine.gl;
            if (isWebgl) {
                this._context = new WebGLBatchContext();
            }
            else {
                this._context = new WebGPUBatchContext();
            }
        }
        reset() {
            this._buffer.clear();
            WebGraphicsBatch._pool.recover(this._merged);
        }
        destroy() {
            this._buffer.destroy();
            WebGraphicsBatch._pool.recover(this._merged);
        }
        batch(list, start, end, allowReorder) {
            let elementArray = list.elements;
            let ctx = this._context;
            ctx.setHead(elementArray[start]);
            let cnt = end - start + 1;
            if (cnt > 1000)
                allowReorder = false;
            if (allowReorder) {
                if (elementFlags == null)
                    initCache(1000);
                let headGroup = 0;
                let maxGroup = 1;
                let indiceLen = 1;
                elementIndice[0] = start;
                elementFlags[0] = 0;
                for (let i = 1; i < cnt; i++) {
                    let element = elementArray[start + i];
                    elementFlags[i] = -1;
                    let rect = element.owner.rect;
                    rectLeftCache[i] = rect.x;
                    rectTopCache[i] = rect.y;
                    rectRightCache[i] = rect.x + rect.width;
                    rectBottomCache[i] = rect.y + rect.height;
                }
                for (let i = 1; i < cnt; i++) {
                    let element = elementArray[start + i];
                    let group = elementFlags[i];
                    if (group === -2) {
                        continue;
                    }
                    if (group !== -1) {
                        if (group === headGroup) {
                            elementIndice[indiceLen++] = start + i;
                            continue;
                        }
                    }
                    else {
                        if (ctx.isCompatible(element)) {
                            elementIndice[indiceLen++] = start + i;
                            continue;
                        }
                        elementFlags[i] = group = maxGroup++;
                    }
                    for (let j = i + 1; j < cnt; j++) {
                        let element2 = elementArray[start + j];
                        if (elementFlags[j] !== -1) {
                            if (elementFlags[j] !== headGroup)
                                continue;
                        }
                        else {
                            if (!ctx.isCompatible(element2))
                                continue;
                        }
                        for (let k = j - 1; k >= i; k--) {
                            if (elementFlags[k] !== -2
                                && rectLeftCache[j] < rectRightCache[k] && rectRightCache[j] > rectLeftCache[k]
                                && rectTopCache[j] < rectBottomCache[k] && rectBottomCache[j] > rectTopCache[k]) {
                                element2 = null;
                                break;
                            }
                        }
                        if (element2 != null) {
                            elementIndice[indiceLen++] = start + j;
                            elementFlags[j] = -2;
                        }
                        else if (ctx.textureId !== 0)
                            elementFlags[j] = headGroup;
                    }
                    list.add(this.merge(elementArray, 0, indiceLen - 1, ctx, elementIndice));
                    indiceLen = 1;
                    elementIndice[0] = start + i;
                    headGroup = group;
                    ctx.setHead(element);
                }
                list.add(this.merge(elementArray, 0, indiceLen - 1, ctx, elementIndice));
            }
            else {
                let batchStart = start;
                for (let i = start + 1; i <= end; i++) {
                    let element = elementArray[i];
                    if (!ctx.isCompatible(element)) {
                        list.add(this.merge(elementArray, batchStart, i - 1, ctx));
                        batchStart = i;
                        ctx.setHead(element);
                    }
                }
                list.add(this.merge(elementArray, batchStart, end, ctx));
            }
        }
        merge(elementArray, start, end, batchContext, indice) {
            if (start === end) {
                let element = elementArray[indice !== undefined ? indice[start] : start];
                this._buffer.add(element);
                return element;
            }
            let staticBatchRenderElement = WebGraphicsBatch._pool.take();
            this._merged.push(staticBatchRenderElement);
            let batchedGeometry = staticBatchRenderElement.geometry;
            let currentOffset = 0;
            let currentCount = 0;
            let isFirst = true;
            for (let i = start; i <= end; i++) {
                let element = elementArray[indice !== undefined ? indice[i] : i];
                let geometry = this._buffer.add(element) || element.geometry;
                if (i === start) {
                    batchedGeometry.bufferState = geometry.bufferState;
                    staticBatchRenderElement.materialShaderData = element.materialShaderData;
                    staticBatchRenderElement.value2DShaderData = element.value2DShaderData;
                    staticBatchRenderElement.subShader = element.subShader;
                    staticBatchRenderElement.renderStateIsBySprite = element.renderStateIsBySprite;
                    staticBatchRenderElement.primitiveShaderData = batchContext.primitiveShaderData;
                    staticBatchRenderElement.owner = element.owner;
                    staticBatchRenderElement.typeKey = batchContext.typeKey;
                    staticBatchRenderElement.textureKey = batchContext.textureKey;
                }
                let drawParam = geometry.drawParams.elements;
                let drawLength = geometry.drawParams.length;
                for (let j = 0; j < drawLength; j += 2) {
                    let offset = drawParam[j];
                    let count = drawParam[j + 1];
                    if (isFirst) {
                        currentOffset = offset;
                        currentCount = count;
                        isFirst = false;
                        continue;
                    }
                    if (currentOffset + currentCount * 2 === offset) {
                        currentCount += count;
                    }
                    else {
                        batchedGeometry.setDrawElemenParams(currentCount, currentOffset);
                        currentOffset = offset;
                        currentCount = count;
                    }
                }
            }
            if (!isFirst) {
                batchedGeometry.setDrawElemenParams(currentCount, currentOffset);
            }
            return staticBatchRenderElement;
        }
    }
    WebGraphicsBatch._pool = Laya.Pool.createPool2(() => {
        let element = Laya.LayaGL.render2DRenderPassFactory.createPrimitiveRenderElement2D();
        element.geometry = Laya.LayaGL.renderDeviceFactory.createRenderGeometryElement(Laya.MeshTopology.Triangles, Laya.DrawType.DrawElement);
        element.geometry.indexFormat = Laya.IndexFormat.UInt16;
        element.nodeCommonMap = ["Sprite2D"];
        element.renderStateIsBySprite = false;
        return element;
    }, null, element => {
        element.geometry.clearRenderParams();
        element.geometry.bufferState = null;
        element.materialShaderData = null;
        element.value2DShaderData = null;
        element.primitiveShaderData = null;
        element.subShader = null;
        element.owner = null;
        element.renderStateIsBySprite = false;
        element.globalShaderData = null;
        element.typeKey = 0;
        element.textureKey = 0;
    });
    const _STEP_ = 1024;
    var elementFlags;
    var elementIndice;
    var rectLeftCache;
    var rectTopCache;
    var rectRightCache;
    var rectBottomCache;
    function initCache(maxElements) {
        elementFlags = new Int16Array(maxElements);
        elementIndice = new Int16Array(maxElements);
        rectLeftCache = new Float32Array(maxElements);
        rectTopCache = new Float32Array(maxElements);
        rectRightCache = new Float32Array(maxElements);
        rectBottomCache = new Float32Array(maxElements);
    }

    BatchManager.registerProvider(Laya.BaseRender2DType.graphics, WebGraphicsBatch);
    class SortedStructs {
        constructor() {
            this.lists = new Map();
            this._indice = new Set;
            this._sortedIndice = [];
        }
        add(struct, zIndex) {
            let list = this.lists.get(zIndex);
            if (!list)
                this.lists.set(zIndex, list = new Laya.FastSinglelist());
            list.add(struct);
            if (list.length === 1)
                this._indice.add(zIndex);
            return list;
        }
        reset() {
            this._indice.forEach(i => this.lists.get(i).length = 0);
            this._indice.clear();
            this._sortedIndice.length = 0;
        }
        get indice() {
            let arr = this._sortedIndice;
            if (arr.length === 0) {
                for (let zIndex of this._indice) {
                    arr.push(zIndex);
                }
                arr.sort((a, b) => a - b);
            }
            return arr;
        }
        appendTo(out) {
            this.indice.forEach(zIndex => out.addList(this.lists.get(zIndex)));
        }
    }
    class WebRender2DPass {
        get priority() {
            return this._priority;
        }
        set priority(value) {
            this._priority = value;
            if (this._mask)
                this._mask.setMaskParentPass(this);
        }
        get mask() {
            return this._mask;
        }
        set mask(value) {
            if (this._mask)
                this._mask.setMaskParentPass(null);
            this._mask = value;
            if (value)
                value.setMaskParentPass(this);
        }
        get enableBatch() {
            return this._enableBatch;
        }
        set enableBatch(value) {
            this.repaint = true;
            this._enableBatch = value;
        }
        setClearColor(r, g, b, a) {
            this._clearColor.setValue(r, g, b, a);
        }
        constructor() {
            this._renderElements = new Laya.FastSinglelist();
            this._elementGroups = new Laya.FastSinglelist();
            this._structs = new SortedStructs();
            this._structsPool = Laya.Pool.createPool(SortedStructs, null, obj => obj.reset());
            this._batchProviders = [];
            this._priority = 0;
            this.enable = true;
            this.isSupport = false;
            this.postProcess = null;
            this.repaint = true;
            this._clearColor = new Laya.Color;
            this.doClearColor = true;
            this.finalize = null;
            this._enableBatch = true;
            this._rtsize = new Laya.Vector2;
            this.root = null;
            this.offsetMatrix = new Laya.Matrix();
            this._invertMat_0 = new Laya.Vector3(1, 1);
            this._invertMat_1 = new Laya.Vector3(0, 0);
            this.shaderData = null;
            this.destroyed = false;
            this.shaderData = Laya.LayaGL.renderDeviceFactory.createShaderData(null);
        }
        needRender() {
            return this.enable
                && !this.isSupport
                && (this.repaint || !this.renderTexture);
        }
        cullAndSort(context2D, struct) {
            if (!struct.enabled
                || struct.globalAlpha < 0.01
                || this._mask === struct)
                return;
            let renderStruct = (struct.subStruct && struct !== this.root) ? struct.subStruct : struct;
            renderStruct._handleInterData();
            let globalRenderData = struct.globalRenderData;
            if (globalRenderData) {
                if (struct._currentData.globalRenderData
                    && (struct.renderLayer & globalRenderData.renderLayerMask) === 0) {
                    return;
                }
                let cullRect = globalRenderData.cullRect;
                if (struct.inheritedEnableCulling && cullRect && !this._isRectIntersect(struct.rect, cullRect)) {
                    return;
                }
            }
            renderStruct.renderUpdate(context2D);
            let list = this._pStructs.add(renderStruct, struct._effectZ);
            if (struct.stackingRoot) {
                var oldCol = this._pStructs;
                this._pStructs = this._structsPool.take();
            }
            for (let i = 0, n = renderStruct.children.length; i < n; i++) {
                const child = renderStruct.children[i];
                child._effectZ = child.zIndex + struct._effectZ;
                this.cullAndSort(context2D, child);
            }
            if (oldCol) {
                this._pStructs.appendTo(list);
                this._structsPool.recover(this._pStructs);
                this._pStructs = oldCol;
            }
            if (struct.dcOptimize) {
                let last = list.length - 1;
                struct.dcOptimizeEnd = list.elements[last];
            }
        }
        _isRectIntersect(rect, cullRect) {
            let rect_minx = rect.x;
            let rect_maxx = rect.x + rect.width;
            let rect_miny = rect.y;
            let rect_maxy = rect.y + rect.height;
            return !(rect_maxx < cullRect.x || rect_minx > cullRect.y || rect_maxy < cullRect.z || rect_miny > cullRect.w);
        }
        fowardRender(context, renderTime) {
            var _a, _b;
            let success = this._initRenderProcess(context, renderTime);
            if (!success)
                return;
            if (this.repaint) {
                this._structs.reset();
                this._renderElements.length = 0;
                for (let i = 0, n = this._batchProviders.length; i < n; i++) {
                    (_a = this._batchProviders[i]) === null || _a === void 0 ? void 0 : _a.reset();
                }
                if (this.root) {
                    this._pStructs = this._structs;
                    this.cullAndSort(context, this.root);
                    this.fillRenderElements();
                    this._enableBatch && Laya.LayaEnv.isPlaying && this.batch();
                }
                WebRender2DPass.uploadBuffer();
                context.drawRenderElementList(this._renderElements);
                if (this._mask) {
                    let renderMask = this._mask.subStruct;
                    renderMask._handleInterData();
                    renderMask.renderUpdate(context);
                    context.drawRenderElementOne(renderMask.renderElements[0]);
                }
                if ((_b = this.postProcess) === null || _b === void 0 ? void 0 : _b.enabled) {
                    this.postProcess.apply();
                }
            }
            else {
                this._structs.indice.forEach(index => {
                    let list = this._structs.lists.get(index);
                    for (let i = 0, cnt = list.length; i < cnt; i++) {
                        let struct = list.elements[i];
                        struct._handleInterData();
                        struct.renderUpdate(context);
                    }
                });
                WebRender2DPass.uploadBuffer();
                context.drawRenderElementList(this._renderElements);
            }
            this.repaint = false;
        }
        fillRenderElements() {
            this._elementGroups.length = 0;
            let groupStart = 0;
            let reorderRoot;
            let renderElements = this._renderElements;
            this._structs.indice.forEach(index => {
                let list = this._structs.lists.get(index);
                for (let i = 0, cnt = list.length; i < cnt; i++) {
                    let struct = list.elements[i];
                    let n = struct.renderElements ? struct.renderElements.length : 0;
                    if (struct.owner._getBit(Laya.NodeFlags.HIDE_BY_EDITOR))
                        n = 0;
                    if (struct.dcOptimize && !reorderRoot && struct.dcOptimizeEnd !== struct) {
                        reorderRoot = struct;
                        if (groupStart !== renderElements.length) {
                            this._elementGroups.add(groupStart);
                            this._elementGroups.add(renderElements.length - 1);
                            this._elementGroups.add(false);
                            groupStart = renderElements.length;
                        }
                    }
                    if (n > 0) {
                        for (let i = 0; i < n; i++) {
                            let element = struct.renderElements[i];
                            element._index = i;
                            element.geometry && renderElements.add(element);
                        }
                    }
                    if ((reorderRoot === null || reorderRoot === void 0 ? void 0 : reorderRoot.dcOptimizeEnd) === struct) {
                        reorderRoot = null;
                        if (groupStart !== renderElements.length) {
                            this._elementGroups.add(groupStart);
                            this._elementGroups.add(renderElements.length - 1);
                            this._elementGroups.add(true);
                            groupStart = renderElements.length;
                        }
                    }
                }
            });
            if (groupStart !== renderElements.length) {
                this._elementGroups.add(groupStart);
                this._elementGroups.add(renderElements.length - 1);
                this._elementGroups.add(false);
            }
        }
        batch() {
            let list = this._renderElements;
            let elementArray = list.elements;
            let groups = this._elementGroups;
            let groupsArray = groups.elements;
            list.length = 0;
            for (let gi = 0, gl = groups.length; gi < gl; gi += 3) {
                let groupStart = groupsArray[gi];
                let groupEnd = groupsArray[gi + 1];
                let allowReorder = groupsArray[gi + 2];
                let lastRenderType = elementArray[groupStart].owner.renderType;
                let batchStart = groupStart;
                for (let i = groupStart + 1; i <= groupEnd; i++) {
                    let element = elementArray[i];
                    let struct = element.owner;
                    if (lastRenderType === struct.renderType)
                        continue;
                    if (i - batchStart > 1)
                        this.getBatchProvider(lastRenderType).batch(list, batchStart, i - 1, allowReorder);
                    else
                        list.add(elementArray[batchStart]);
                    batchStart = i;
                    lastRenderType = struct.renderType;
                }
                if (groupEnd - batchStart > 0)
                    this.getBatchProvider(lastRenderType).batch(list, batchStart, groupEnd, allowReorder);
                else
                    list.add(elementArray[batchStart]);
            }
        }
        getBatchProvider(renderType) {
            return this._batchProviders[renderType] || (this._batchProviders[renderType] = BatchManager.createProvider(renderType));
        }
        _initRenderProcess(context, renderTime) {
            if (!this.root || this.root.globalAlpha < 0.01) {
                return false;
            }
            let sizeX, sizeY;
            let rt = this.renderTexture;
            if (rt) {
                if (rt.width == 0 || rt.height == 0)
                    return false;
                context.invertY = rt._invertY;
                context.setRenderTarget(rt._renderTarget, this.doClearColor, this._clearColor);
                sizeX = rt.width;
                sizeY = rt.height;
                let result = this._updateInvertMatrix();
                if (!result) {
                    return false;
                }
                this.shaderData.addDefine(Laya.ShaderDefines2D.RENDERTEXTURE);
            }
            else {
                sizeX = Laya.RenderState2D.width;
                sizeY = Laya.RenderState2D.height;
                if (sizeX === 0 || sizeY === 0)
                    return false;
                context.invertY = false;
                context.setOffscreenView(sizeX, sizeY, 0, 0);
                context.setRenderTarget(null, this.doClearColor, this._clearColor);
                this._setInvertMatrix(1, 0, 0, 1, 0, 0);
                this.shaderData.removeDefine(Laya.ShaderDefines2D.RENDERTEXTURE);
            }
            context.passData = this.shaderData;
            if (sizeX !== this._rtsize.x || sizeY !== this._rtsize.y) {
                this._rtsize.setValue(sizeX, sizeY);
                this.shaderData.setVector2(Laya.ShaderDefines2D.UNIFORM_SIZE, this._rtsize);
            }
            this.shaderData.setNumber(Laya.ShaderDefines2D.UNIFORM_TIME, renderTime);
            return true;
        }
        static setBuffer(buffer) {
            if (buffer._inPass)
                return;
            buffer._inPass = true;
            WebRender2DPass.buffers.add(buffer);
        }
        static uploadBuffer() {
            if (WebRender2DPass.buffers.length > 0) {
                let elements = WebRender2DPass.buffers.elements;
                for (let i = 0, n = WebRender2DPass.buffers.length; i < n; i++) {
                    let buffer = elements[i];
                    buffer._upload();
                    buffer._inPass = false;
                }
                WebRender2DPass.buffers.length = 0;
            }
        }
        _updateInvertMatrix() {
            let rootTrans = this.root.trans;
            if (!rootTrans) {
                this._setInvertMatrix(1, 0, 0, 1, 0, 0);
                return true;
            }
            if (rootTrans.matrix.a == 0
                && rootTrans.matrix.b == 0
                && rootTrans.matrix.c == 0
                && rootTrans.matrix.d == 0) {
                return false;
            }
            let temp = _TEMP_InvertMatrix;
            let mask = this.mask;
            let offset = this.offsetMatrix;
            if (mask && mask.trans) {
                let maskMatrix = mask.renderMatrix;
                maskMatrix.copyTo(temp);
            }
            else {
                rootTrans.matrix.copyTo(temp);
            }
            Laya.Matrix.mul(offset, temp, temp);
            temp.invert();
            this._setInvertMatrix(temp.a, temp.b, temp.c, temp.d, temp.tx, temp.ty);
            return true;
        }
        _setInvertMatrix(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
            if (a === this._invertMat_0.x
                && b === this._invertMat_1.x
                && c === this._invertMat_0.y
                && d === this._invertMat_1.y
                && tx === this._invertMat_0.z
                && ty === this._invertMat_1.z)
                return;
            this._invertMat_0.setValue(a, c, tx);
            this._invertMat_1.setValue(b, d, ty);
            this.shaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_INVERTMAT_0, this._invertMat_0);
            this.shaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_INVERTMAT_1, this._invertMat_1);
        }
        updatePostProcess() { }
        destroy() {
            if (this.destroyed) {
                return;
            }
            this.destroyed = true;
            this._renderElements.length = 0;
            for (let i = 0, n = this._batchProviders.length; i < n; i++) {
                this._batchProviders[i] && this._batchProviders[i].destroy();
            }
            this._batchProviders.length = 0;
            this.root = null;
            this.renderTexture = null;
            this.postProcess = null;
            this.shaderData.destroy();
            this.shaderData = null;
        }
    }
    WebRender2DPass.buffers = new Laya.FastSinglelist();
    class WebRender2DPassManager {
        constructor() {
            this._modify = false;
            this._passes = [];
        }
        removePass(pass) {
            let index = this._passes.indexOf(pass);
            if (index === -1) {
                return;
            }
            this._passes.splice(index, 1);
            this._modify = true;
        }
        apply(context, renderTime) {
            if (this._modify) {
                this._modify = false;
                this._passes.sort((a, b) => b._priority - a._priority);
            }
            for (const pass of this._passes) {
                if (pass.needRender()) {
                    pass.fowardRender(context, renderTime);
                }
            }
        }
        clear() {
            this._passes.length = 0;
        }
        addPass(pass) {
            if (this._passes.indexOf(pass) !== -1) {
                return;
            }
            this._passes.push(pass);
            this._modify = true;
        }
    }
    const _TEMP_InvertMatrix = new Laya.Matrix();

    class Web2DGraphicsBufferDataView {
    }
    class Web2DGraphic2DVertexDataView extends Web2DGraphicsBufferDataView {
        _getData() {
            return this._view;
        }
        _modify() {
            this.owner._modifyOneView(this);
            WebRender2DPass.setBuffer(this.owner);
        }
        _updateView(wholeData) {
            if (!this._view || this._view.buffer !== wholeData.buffer) {
                this._view = new Float32Array(wholeData.buffer, this.start * 4, this.length);
            }
        }
        setData(data) {
            this._view.set(data);
            this._modify();
        }
        constructor(owner, start, length, stride = 1) {
            super();
            this.stride = 1;
            this.owner = owner;
            this.start = start;
            this.length = length;
            this.stride = stride;
            this._updateView(owner._dataView);
            owner.addDataView(this);
        }
    }
    class Web2DGraphic2DIndexDataView extends Web2DGraphicsBufferDataView {
        setGeometry(value) {
            this._geometry = value;
        }
        setData(data) {
            this._view.set(data);
            this._modify();
        }
        constructor(owner, length, create = true) {
            super();
            this.owner = owner;
            this.length = length;
            if (create) {
                this._view = new Uint16Array(length);
            }
        }
        _updateView(wholeData) {
            wholeData.set(this._view, this.start);
        }
        _modify() {
            this.owner._modifyOneView(this);
            WebRender2DPass.setBuffer(this.owner);
        }
        _clone(cloneOwner = true, create = true) {
            let owner = cloneOwner ? this.owner : null;
            let nview = new Web2DGraphic2DIndexCloneDataView(owner, this.length, create);
            if (!create) {
                this._cloneView(nview);
            }
            return nview;
        }
        _cloneView(view) {
            view._view = this._view;
            view.length = this.length;
        }
        destroy() {
            this._view = null;
            this._geometry = null;
            this.owner = null;
            this._next = null;
            this._prev = null;
        }
    }
    class Web2DGraphic2DIndexCloneDataView extends Web2DGraphic2DIndexDataView {
        destroy() {
            super.destroy();
        }
    }

    class WebRender2DDataHandle {
        get owner() {
            return this._owner;
        }
        set owner(value) {
            this._owner = value;
        }
        constructor() {
            this._nMatrix_0 = new Laya.Vector3();
            this._nMatrix_1 = new Laya.Vector3();
            this._needUseMatrix = true;
        }
        get needUseMatrix() {
            return this._needUseMatrix;
        }
        set needUseMatrix(value) {
            this._needUseMatrix = value;
            if (!value) {
                this._nMatrix_0.set(1, 0, 0);
                this._nMatrix_1.set(0, 1, 0);
                this._owner.spriteShaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_0, this._nMatrix_0);
                this._owner.spriteShaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_1, this._nMatrix_1);
            }
        }
        destroy() {
        }
        inheriteRenderData(context) {
            let data = this._owner.spriteShaderData;
            if (!data)
                return;
            if (this._needUseMatrix) {
                let mat = this._owner.renderMatrix;
                this._nMatrix_0.setValue(mat.a, mat.c, mat.tx);
                this._nMatrix_1.setValue(mat.b, mat.d, mat.ty);
                this._owner.spriteShaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_0, this._nMatrix_0);
                this._owner.spriteShaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_1, this._nMatrix_1);
            }
        }
    }
    class WebEmptyRender2DDataHandle extends WebRender2DDataHandle {
        inheriteRenderData(_context) {
        }
        destroy() {
        }
    }
    class WebGraphics2DBufferBlock {
    }
    class WebGraphics2DVertexBlock {
    }
    class WebPrimitiveDataHandle extends WebRender2DDataHandle {
        constructor() {
            super(...arguments);
            this.logicMatrix = null;
            this.mask = null;
            this._bufferBlocks = null;
            this._modifiedFrame = -1;
            this._globalAlpha = 1;
        }
        applyVertexBufferBlock(blocks) {
            this._bufferBlocks = blocks;
            this.updateCloneView();
            this._globalAlpha = this._owner.globalAlpha;
            if (this._owner.trans) {
                this._modifiedFrame = this._owner.trans.modifiedFrame;
            }
        }
        skipBufferUpdate() {
            if (this._owner.trans) {
                this._modifiedFrame = this._owner.trans.modifiedFrame;
            }
        }
        _getBlocks() {
            return this._bufferBlocks;
        }
        inheriteRenderData(context) {
            let data = this._owner.spriteShaderData;
            if (!data)
                return;
            let trans = this._owner.trans;
            let mat = trans.matrix;
            if (this._modifiedFrame < trans.modifiedFrame) {
                if (!this._bufferBlocks || !this._bufferBlocks.length) {
                    if (this.logicMatrix) {
                        let temp = Laya.Matrix.TEMP;
                        Laya.Matrix.mul(this.logicMatrix, mat.copyTo(temp), temp);
                        this._nMatrix_0.setValue(temp.a, temp.c, temp.tx);
                        this._nMatrix_1.setValue(temp.b, temp.d, temp.ty);
                    }
                    else {
                        this._nMatrix_0.setValue(mat.a, mat.c, mat.tx);
                        this._nMatrix_1.setValue(mat.b, mat.d, mat.ty);
                    }
                    this._owner.spriteShaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_0, this._nMatrix_0);
                    this._owner.spriteShaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_1, this._nMatrix_1);
                }
                else {
                    this._updateVertexData(mat, this._owner.globalAlpha, true, true, false);
                    this._globalAlpha = this._owner.globalAlpha;
                }
                this._modifiedFrame = trans.modifiedFrame;
            }
            else if (this._globalAlpha != this._owner.globalAlpha) {
                this._globalAlpha = this._owner.globalAlpha;
                if (this._bufferBlocks && this._bufferBlocks.length)
                    this._updateVertexData(mat, this._owner.globalAlpha, false, true, false);
            }
        }
        _updateVertexData(mat, globalAlpha, updateMatrix, updateGlobalAlpha, updateTextureArrayLayerIndex) {
            let pos = 0, dataViewIndex = 0, ci = 0;
            let dataView = null;
            let m00 = 1, m01 = 0, m10 = 0, m11 = 1, tx = 0, ty = 0;
            if (updateMatrix) {
                m00 = mat.a, m01 = mat.b, m10 = mat.c, m11 = mat.d, tx = mat.tx, ty = mat.ty;
            }
            let vbdata = null;
            let vertexCount = 0, positions = null, vertexViews = null;
            let stride = this._bufferBlocks[0].vertexBuffer.vertexDeclaration.vertexStride / 4;
            let textureArrayLayerIndex = 0;
            for (let i = 0, n = this._bufferBlocks.length; i < n; i++) {
                let vertexs = this._bufferBlocks[i].vertexs;
                textureArrayLayerIndex = this._bufferBlocks[i].textureArrayIndex;
                for (let index = 0, len = vertexs.length; index < len; index++) {
                    positions = vertexs[index].positions;
                    vertexViews = vertexs[index].vertexViews;
                    vertexCount = positions.length / 2;
                    dataView = null;
                    pos = 0, ci = 0, dataViewIndex = 0;
                    for (let j = 0; j < vertexCount; j++) {
                        if (!dataView || dataView.length <= pos) {
                            dataView = vertexViews[dataViewIndex];
                            dataView._modify();
                            dataViewIndex++;
                            pos = 0;
                            vbdata = dataView._getData();
                        }
                        if (updateMatrix) {
                            let x = positions[ci], y = positions[ci + 1];
                            vbdata[pos] = x * m00 + y * m10 + tx;
                            vbdata[pos + 1] = x * m01 + y * m11 + ty;
                        }
                        if (updateGlobalAlpha) {
                            vbdata[pos + 10] = globalAlpha;
                        }
                        if (updateTextureArrayLayerIndex) {
                            vbdata[pos + 11] = textureArrayLayerIndex;
                        }
                        pos += stride;
                        ci += 2;
                    }
                }
            }
        }
        getCloneViews() {
            if (!this._clonesViews) {
                this._clonesViews = [];
                for (let i = 0, n = this._bufferBlocks.length; i < n; i++) {
                    this._clonesViews[i] = this._cloneView(this._bufferBlocks[i].indexView);
                }
            }
            return this._clonesViews;
        }
        updateCloneView() {
            let cloneViews = this.getCloneViews();
            let blockLength = this._bufferBlocks.length;
            let cloneLength = cloneViews.length;
            if (cloneLength > blockLength) {
                for (let i = blockLength; i < cloneLength; i++) {
                    let view = cloneViews[i];
                    view._geometry.destroy();
                    if (view.owner)
                        view.owner.removeDataView(view);
                }
            }
            this._clonesViews.length = blockLength;
            for (let i = 0; i < blockLength; i++) {
                let view = cloneViews[i];
                let block = this._bufferBlocks[i];
                if (block) {
                    cloneViews[i] = this._cloneView(block.indexView, view);
                }
            }
        }
        _cloneView(view, oView = null) {
            let clone;
            if (oView && oView._geometry) {
                clone = oView;
                view._cloneView(clone);
            }
            else {
                clone = view._clone(false, false);
                clone._geometry = Laya.LayaGL.renderDeviceFactory.createRenderGeometryElement(Laya.MeshTopology.Triangles, Laya.DrawType.DrawElement);
                clone._geometry.indexFormat = Laya.IndexFormat.UInt16;
            }
            return clone;
        }
        destroy() {
            super.destroy();
            if (this._clonesViews) {
                for (let i = 0, n = this._clonesViews.length; i < n; i++)
                    this._clonesViews[i]._geometry.destroy();
                this._clonesViews = null;
            }
            this._bufferBlocks = null;
        }
    }
    class Web2DBaseRenderDataHandle extends WebRender2DDataHandle {
        constructor() {
            super(...arguments);
            this._lightReceive = false;
        }
        get lightReceive() {
            return this._lightReceive;
        }
        set lightReceive(value) {
            this._lightReceive = value;
            if (value) {
                this._owner.spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_ENABLE);
            }
            else {
                this._owner.spriteShaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_ENABLE);
            }
        }
        get owner() {
            return this._owner;
        }
        set owner(value) {
            if (value == this.owner)
                return;
            if (this._owner) {
                this._owner.spriteShaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
            }
            this._owner = value;
            if (this._owner) {
                this._owner.spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
            }
        }
    }
    const _setRenderColor = new Laya.Color(1, 1, 1, 1);
    class WebMesh2DRenderDataHandle extends Web2DBaseRenderDataHandle {
        constructor() {
            super(...arguments);
            this._baseColor = new Laya.Color(1, 1, 1, 1);
            this._tilingOffset = new Laya.Vector4();
            this._renderAlpha = -1;
        }
        get baseColor() {
            return this._baseColor;
        }
        set baseColor(value) {
            if (value != this._baseColor && this._baseColor.equal(value))
                return;
            value = value ? value : Laya.Color.BLACK;
            value.cloneTo(this._baseColor);
            this._renderAlpha = -1;
            this._owner.spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, this._baseColor);
        }
        get baseTexture() {
            return this._baseTexture;
        }
        set baseTexture(value) {
            if (this._baseTexture != null && value == this._baseTexture)
                return;
            if (this._baseTexture)
                this._baseTexture._removeReference();
            this._baseTexture = value;
            value = value ? value : Laya.Texture2D.whiteTexture;
            this._owner.spriteShaderData.setTexture(Laya.BaseRenderNode2D.BASERENDER2DTEXTURE, value);
            if (value) {
                value._addReference();
                if (value.gammaCorrection != 1) {
                    this._owner.spriteShaderData.addDefine(Laya.ShaderDefines2D.GAMMATEXTURE);
                }
                else {
                    this._owner.spriteShaderData.removeDefine(Laya.ShaderDefines2D.GAMMATEXTURE);
                }
            }
        }
        get tilingOffset() {
            return this._tilingOffset;
        }
        set tilingOffset(value) {
            if (!value)
                return;
            this._owner.spriteShaderData.setVector(Laya.BaseRenderNode2D.TILINGOFFSET, value);
            value ? value.cloneTo(this._tilingOffset) : null;
        }
        get normal2DTexture() {
            return this._normal2DTexture;
        }
        set normal2DTexture(value) {
            if (value === this._normal2DTexture)
                return;
            if (this._normal2DTexture)
                this._normal2DTexture._removeReference(1);
            if (value)
                value._addReference();
            this._normal2DTexture = value;
            this._owner.spriteShaderData.setTexture(Laya.BaseRenderNode2D.NORMAL2DTEXTURE, value);
            if (this._normal2DStrength > 0 && this._normal2DTexture)
                this._owner.spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_NORMAL_PARAM);
            else
                this._owner.spriteShaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_NORMAL_PARAM);
        }
        get normal2DStrength() {
            return this._normal2DStrength;
        }
        set normal2DStrength(value) {
            value = Math.max(0, Math.min(1, value));
            if (this._normal2DStrength === value)
                return;
            this._normal2DStrength = value;
            this._owner.spriteShaderData.setNumber(Laya.BaseRenderNode2D.NORMAL2DSTRENGTH, value);
            if (value > 0 && this._normal2DTexture)
                this._owner.spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_NORMAL_PARAM);
            else
                this._owner.spriteShaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_NORMAL_PARAM);
        }
        inheriteRenderData(context) {
            super.inheriteRenderData(context);
            if (this._renderAlpha != this._owner.globalAlpha) {
                let a = this._owner.globalAlpha * this._baseColor.a;
                _setRenderColor.setValue(this._baseColor.r, this._baseColor.g, this._baseColor.b, a);
                this._owner.spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, _setRenderColor);
                this._renderAlpha = this._owner.globalAlpha;
            }
        }
    }
    class WebSpineRenderDataHandle extends Web2DBaseRenderDataHandle {
        constructor() {
            super(...arguments);
            this._renderAlpha = -1;
            this._baseColor = new Laya.Color(1, 1, 1, 1);
            this.normalUpdater = null;
        }
        get baseColor() {
            return this._baseColor;
        }
        set baseColor(value) {
            if (value != this._baseColor && this._baseColor.equal(value))
                return;
            value = value ? value : Laya.Color.BLACK;
            value.cloneTo(this._baseColor);
            this._renderAlpha = -1;
            this._owner.spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, this._baseColor);
        }
        get owner() {
            return this._owner;
        }
        set owner(value) {
            if (value == this.owner)
                return;
            if (this._owner) {
                let shaderData = this._owner.spriteShaderData;
                shaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
                shaderData.removeDefine(Laya.SpineShaderInit.SPINE_UV);
                shaderData.removeDefine(Laya.SpineShaderInit.SPINE_COLOR);
            }
            this._owner = value;
            if (this._owner) {
                let shaderData = this._owner.spriteShaderData;
                shaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
                shaderData.addDefine(Laya.SpineShaderInit.SPINE_UV);
                shaderData.addDefine(Laya.SpineShaderInit.SPINE_COLOR);
            }
        }
        get offset() {
            return this._offset;
        }
        set offset(value) {
            this._offset = value;
        }
        inheriteRenderData(context) {
            if (!this._owner || !this._owner.spriteShaderData || !this.skeleton)
                return;
            let shaderData = this.owner.spriteShaderData;
            let trans = this.owner.renderMatrix;
            let mat = trans;
            if (this._offset) {
                let ofx = this._offset.x;
                let ofy = this._offset.y;
                this._nMatrix_0.setValue(mat.a, mat.c, mat.tx + mat.a * ofx + mat.c * ofy);
                this._nMatrix_1.setValue(mat.b, mat.d, mat.ty + mat.b * ofx + mat.d * ofy);
            }
            else {
                this._nMatrix_0.setValue(mat.a, mat.c, mat.tx);
                this._nMatrix_1.setValue(mat.b, mat.d, mat.ty);
            }
            shaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_0, this._nMatrix_0);
            shaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_1, this._nMatrix_1);
            if (this._renderAlpha != this._owner.globalAlpha) {
                let a = this._owner.globalAlpha * this._baseColor.a;
                _setRenderColor.setValue(this._baseColor.r, this._baseColor.g, this._baseColor.b, a);
                this._owner.spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, _setRenderColor);
                this._renderAlpha = this._owner.globalAlpha;
            }
        }
    }

    const _DefaultClipInfo = {
        clipMatrix: new Laya.Matrix(),
        clipMatDir: new Laya.Vector4(Laya.Const.MAX_CLIP_SIZE, 0, 0, Laya.Const.MAX_CLIP_SIZE),
        clipMatPos: new Laya.Vector4(0, 0, 0, 0),
        _updateFrame: 0
    };
    class WebGlobalRenderData {
    }
    var ChildrenUpdateType;
    (function (ChildrenUpdateType) {
        ChildrenUpdateType[ChildrenUpdateType["All"] = -1] = "All";
        ChildrenUpdateType[ChildrenUpdateType["None"] = 0] = "None";
        ChildrenUpdateType[ChildrenUpdateType["Clip"] = 1] = "Clip";
        ChildrenUpdateType[ChildrenUpdateType["Blend"] = 2] = "Blend";
        ChildrenUpdateType[ChildrenUpdateType["Alpha"] = 4] = "Alpha";
        ChildrenUpdateType[ChildrenUpdateType["Pass"] = 8] = "Pass";
        ChildrenUpdateType[ChildrenUpdateType["Global"] = 16] = "Global";
        ChildrenUpdateType[ChildrenUpdateType["Culling"] = 32] = "Culling";
        ChildrenUpdateType[ChildrenUpdateType["DcOptimize"] = 64] = "DcOptimize";
    })(ChildrenUpdateType || (ChildrenUpdateType = {}));
    const _DefaultParentData = {
        clipInfo: _DefaultClipInfo,
        blendMode: Laya.BlendMode.invalid,
        globalRenderData: null,
        pass: null,
        enableCulling: false,
        dcOptimize: false,
        globalAlpha: 1,
    };
    class WebRenderStruct2D {
        get enableCulling() {
            return this._enableCulling;
        }
        set enableCulling(value) {
            this._enableCulling = value;
            this.updateChildren(ChildrenUpdateType.Culling);
        }
        get inheritedEnableCulling() {
            return this._enableCulling || this._parentData.enableCulling;
        }
        get dcOptimize() {
            return this._dcOptimize;
        }
        set dcOptimize(value) {
            this._dcOptimize = value;
            this.updateChildren(ChildrenUpdateType.DcOptimize);
        }
        get inheritedDcOptimize() {
            return this._dcOptimize || this._parentData.dcOptimize;
        }
        get renderMatrix() {
            return this.trans.matrix;
        }
        set renderMatrix(value) {
            if (this.trans) {
                this.trans.matrix = value;
                this.trans.modifiedFrame = Laya.Stat.loopCount;
            }
            else {
                this.trans = { matrix: value, modifiedFrame: Laya.Stat.loopCount };
            }
        }
        get globalAlpha() {
            return this._currentData.globalAlpha;
        }
        set globalAlpha(value) {
            this._parentData.globalAlpha = value;
        }
        get alpha() {
            return this._alpha;
        }
        set alpha(value) {
            this._alpha = value;
            this._updateGlobalAlpha(value, this.parent ? this.parent.globalAlpha : 1);
            this.updateChildren(ChildrenUpdateType.Alpha);
        }
        get blendMode() {
            return this._blendMode || this._currentData.blendMode || Laya.BlendMode.normal;
        }
        set blendMode(value) {
            this._updateBlendMode(value);
            this._setBlendMode();
            this.updateChildren(ChildrenUpdateType.Blend);
        }
        get renderDataHandler() {
            return this._renderDataHandler;
        }
        set renderDataHandler(value) {
            if (this._renderDataHandler) {
                this._renderDataHandler.owner = null;
            }
            this._renderDataHandler = value;
            if (value)
                this._renderDataHandler.owner = this;
        }
        get globalRenderData() {
            return this._globalRenderData || this._currentData.globalRenderData;
        }
        set globalRenderData(value) {
            this._globalRenderData = value;
            this._updateGlobalShaderData();
            this.updateChildren(ChildrenUpdateType.Global);
        }
        _updateGlobalShaderData() {
            let renderData = this.globalRenderData;
            if (renderData) {
                this._globalShaderData = renderData.globalShaderData;
            }
            else {
                this._globalShaderData = null;
            }
            if (this._subStruct) {
                this._subStruct._updateGlobalShaderData();
            }
        }
        _updatePriority() {
            if (this._pass) {
                if (this._maskParentPass) {
                    this._pass.priority = this._maskParentPass.priority + 1;
                }
                else if (this._parentData.pass) {
                    this._pass.priority = this._parentData.pass.priority + 1;
                }
                else {
                    this._pass.priority = 0;
                }
            }
        }
        setMaskParentPass(pass) {
            this._maskParentPass = pass;
            this._updatePriority();
            if (this._pass) {
                this.updateChildren(ChildrenUpdateType.Pass);
            }
        }
        get pass() {
            return this._pass || this._currentData.pass;
        }
        set pass(value) {
            if (value !== this._pass) {
                this._pass = value;
                this._updatePriority();
                this.updateChildren(ChildrenUpdateType.Pass);
            }
        }
        get subStruct() {
            return this._subStruct;
        }
        set subStruct(value) {
            if (value != this._subStruct) {
                let updateFlag = 0;
                if (value) {
                    let parentData = this._parentData;
                    value._blendMode = this._blendMode;
                    value._currentData = parentData;
                    value._maskParentPass = this._maskParentPass;
                    if (parentData.globalAlpha !== 1) {
                        updateFlag |= ChildrenUpdateType.Alpha;
                    }
                    if (!this._globalRenderData && parentData.globalRenderData) {
                        updateFlag |= ChildrenUpdateType.Global;
                    }
                    if (!this._clipInfo && parentData.clipInfo) {
                        updateFlag |= ChildrenUpdateType.Clip;
                    }
                    if (this._blendMode !== Laya.BlendMode.invalid || parentData.blendMode !== Laya.BlendMode.invalid) {
                        updateFlag |= ChildrenUpdateType.Blend;
                    }
                    this._blendMode = Laya.BlendMode.invalid;
                    this._currentData = _DefaultParentData;
                    value.needUploadAlpha = true;
                }
                else if (this._subStruct) {
                    let parentData = this._parentData;
                    this._subStruct._currentData = this._subStruct._parentData;
                    this._blendMode = this._subStruct._blendMode;
                    if (parentData.globalAlpha !== 1) {
                        updateFlag |= ChildrenUpdateType.Alpha;
                    }
                    if (!this._clipInfo && parentData.clipInfo) {
                        updateFlag |= ChildrenUpdateType.Clip;
                    }
                    if (!this._globalRenderData && parentData.globalRenderData) {
                        updateFlag |= ChildrenUpdateType.Global;
                    }
                    if (this._blendMode !== Laya.BlendMode.invalid || parentData.blendMode !== Laya.BlendMode.invalid) {
                        updateFlag |= ChildrenUpdateType.Blend;
                    }
                    this._subStruct._blendMode = Laya.BlendMode.invalid;
                    this._subStruct._maskParentPass = null;
                    this._currentData = parentData;
                }
                this._subStruct = value;
                this._updateGlobalShaderData();
                this.updateChildren(updateFlag);
                this._setBlendMode();
            }
        }
        constructor() {
            this.manualRender = false;
            this._parentData = Object.assign({}, _DefaultParentData);
            this._currentData = this._parentData;
            this.zIndex = 0;
            this._effectZ = 0;
            this.stackingRoot = false;
            this.rect = new Laya.Rectangle();
            this._enableCulling = false;
            this.renderLayer = 1;
            this.children = [];
            this.renderType = -1;
            this.renderUpdateMask = 0;
            this._alpha = 1.0;
            this._blendMode = Laya.BlendMode.invalid;
            this.needUploadClip = -1;
            this.needUploadAlpha = true;
            this.enabled = true;
            this.isRenderStruct = false;
            this.renderElements = null;
            this.spriteShaderData = null;
            this._globalShaderData = null;
            this._globalRenderData = null;
            this._clipRect = null;
            this._clipInfo = null;
            this._uniformClip = false;
            this._rnUpdateFun = null;
        }
        get _parentClipInfo() {
            return this._currentData.clipInfo;
        }
        setRenderUpdateCallback(func) {
            this._rnUpdateFun = func;
        }
        _handleInterData() {
            let rect = this._clipRect;
            if (rect) {
                let info = this._clipInfo;
                let trans = this.trans;
                let clipInfo = this._currentData.clipInfo;
                let parentClipUpdateFrame = clipInfo && clipInfo !== _DefaultClipInfo ? clipInfo._updateFrame : -1;
                if (trans) {
                    if (info._updateFrame < trans.modifiedFrame || info._updateFrame < parentClipUpdateFrame) {
                        let mat = trans.matrix;
                        let cm = info.clipMatrix;
                        let { x, y, width, height } = rect;
                        width = Math.max(width, 0.0001);
                        height = Math.max(height, 0.0001);
                        let tx = mat.tx, ty = mat.ty;
                        cm.tx = x * mat.a + y * mat.c + tx;
                        cm.ty = x * mat.b + y * mat.d + ty;
                        cm.a = width * mat.a;
                        cm.b = width * mat.b;
                        cm.c = height * mat.c;
                        cm.d = height * mat.d;
                        if (parentClipUpdateFrame !== -1) {
                            let parentClipPos = clipInfo.clipMatPos;
                            let offsetx = parentClipPos.z - parentClipPos.x;
                            let offsety = parentClipPos.w - parentClipPos.y;
                            let parentMat = clipInfo.clipMatrix;
                            let pmRot = parentMat.b !== 0 || parentMat.c !== 0;
                            let cmRot = cm.b !== 0 || cm.c !== 0;
                            if (!pmRot && !cmRot) {
                                if (cm.a > 0 && cm.d > 0) {
                                    let parentMinX = parentMat.tx;
                                    let parentMinY = parentMat.ty;
                                    let parentMaxX = parentMinX + parentMat.a;
                                    let parentMaxY = parentMinY + parentMat.d;
                                    let cmaxx = tx + cm.a;
                                    let cmaxy = ty + cm.d;
                                    if (cmaxx <= parentMinX || cmaxy <= parentMinY || tx >= parentMaxX || ty >= parentMaxY) {
                                        cm.a = -0.1;
                                        cm.d = -0.1;
                                    }
                                    else {
                                        if (tx < parentMinX) {
                                            cm.a -= (parentMinX - tx);
                                            tx = parentMinX;
                                        }
                                        if (cmaxx > parentMaxX) {
                                            cm.a -= (cmaxx - parentMaxX);
                                        }
                                        if (ty < parentMinY) {
                                            cm.d -= (parentMinY - ty);
                                            ty = parentMinY;
                                        }
                                        if (cmaxy > parentMaxY) {
                                            cm.d -= (cmaxy - parentMaxY);
                                        }
                                        if (cm.a <= 0)
                                            cm.a = -0.1;
                                        if (cm.d <= 0)
                                            cm.d = -0.1;
                                        if (cm.tx < parentMinX) {
                                            cm.tx = parentMinX;
                                        }
                                        if (cm.ty < parentMinY) {
                                            cm.ty = parentMinY;
                                        }
                                    }
                                }
                            }
                            else {
                                let det = parentMat.a * parentMat.d - parentMat.b * parentMat.c;
                                if (det === 0) {
                                    cm.a = -0.1;
                                    cm.b = 0;
                                    cm.c = 0;
                                    cm.d = -0.1;
                                }
                                else {
                                    let invDet = 1 / det;
                                    let dx0 = cm.tx - parentMat.tx, dy0 = cm.ty - parentMat.ty;
                                    let u0 = (parentMat.d * dx0 - parentMat.c * dy0) * invDet;
                                    let v0 = (-parentMat.b * dx0 + parentMat.a * dy0) * invDet;
                                    let du1 = (parentMat.d * cm.a - parentMat.c * cm.b) * invDet;
                                    let dv1 = (-parentMat.b * cm.a + parentMat.a * cm.b) * invDet;
                                    let du2 = (parentMat.d * cm.c - parentMat.c * cm.d) * invDet;
                                    let dv2 = (-parentMat.b * cm.c + parentMat.a * cm.d) * invDet;
                                    let du1N = du1 < 0 ? du1 : 0, du1P = du1 > 0 ? du1 : 0;
                                    let du2N = du2 < 0 ? du2 : 0, du2P = du2 > 0 ? du2 : 0;
                                    let dv1N = dv1 < 0 ? dv1 : 0, dv1P = dv1 > 0 ? dv1 : 0;
                                    let dv2N = dv2 < 0 ? dv2 : 0, dv2P = dv2 > 0 ? dv2 : 0;
                                    let cMinU = u0 + du1N + du2N, cMaxU = u0 + du1P + du2P;
                                    let cMinV = v0 + dv1N + dv2N, cMaxV = v0 + dv1P + dv2P;
                                    let iu0 = cMinU > 0 ? cMinU : 0;
                                    let iv0 = cMinV > 0 ? cMinV : 0;
                                    let iu1 = cMaxU < 1 ? cMaxU : 1;
                                    let iv1 = cMaxV < 1 ? cMaxV : 1;
                                    if (iu0 >= iu1 || iv0 >= iv1) {
                                        cm.a = -0.1;
                                        cm.b = 0;
                                        cm.c = 0;
                                        cm.d = -0.1;
                                    }
                                    else {
                                        let du = iu1 - iu0, dv = iv1 - iv0;
                                        cm.tx = parentMat.tx + iu0 * parentMat.a + iv0 * parentMat.c;
                                        cm.ty = parentMat.ty + iu0 * parentMat.b + iv0 * parentMat.d;
                                        cm.a = du * parentMat.a;
                                        cm.b = du * parentMat.b;
                                        cm.c = dv * parentMat.c;
                                        cm.d = dv * parentMat.d;
                                        tx = cm.tx;
                                        ty = cm.ty;
                                    }
                                }
                            }
                            tx += offsetx;
                            ty += offsety;
                        }
                        info.clipMatDir.setValue(cm.a, cm.b, cm.c, cm.d);
                        info.clipMatPos.setValue(cm.tx, cm.ty, tx, ty);
                        info._updateFrame = Math.max(trans.modifiedFrame, parentClipUpdateFrame);
                    }
                }
            }
            if (this._renderDataHandler) {
                let data = this.spriteShaderData;
                let info = this.getClipInfo();
                if (info !== _DefaultClipInfo) {
                    if (this.needUploadClip < info._updateFrame) {
                        data.setVector(Laya.ShaderDefines2D.UNIFORM_CLIPMATDIR, info.clipMatDir);
                        data.setVector(Laya.ShaderDefines2D.UNIFORM_CLIPMATPOS, info.clipMatPos);
                        this.needUploadClip = info._updateFrame;
                    }
                    if (!this._uniformClip) {
                        this._uniformClip = true;
                        data.addDefine(Laya.ShaderDefines2D.UNIFORMCLIP);
                    }
                }
                else if (this._uniformClip) {
                    data.removeDefine(Laya.ShaderDefines2D.UNIFORMCLIP);
                    this._uniformClip = false;
                }
                if (this.needUploadAlpha) {
                    data.setNumber(Laya.ShaderDefines2D.UNIFORM_VERTALPHA, this.globalAlpha);
                    this.needUploadAlpha = false;
                }
            }
        }
        _setBlendMode() {
            if (!this.spriteShaderData)
                return;
            Laya.BlendModeHandler.setShaderData(this.blendMode, this.spriteShaderData);
            if (this._subStruct) {
                this._subStruct._setBlendMode();
            }
        }
        setClipRect(rect) {
            this._clipRect = rect;
            rect ? this._initClipInfo() : this._clipInfo = null;
            this.updateChildren(ChildrenUpdateType.Clip);
        }
        _initClipInfo() {
            if (!this._clipInfo) {
                this._clipInfo = {
                    clipMatDir: new Laya.Vector4,
                    clipMatPos: new Laya.Vector4,
                    clipMatrix: new Laya.Matrix,
                    _updateFrame: -1
                };
            }
            else
                this._clipInfo._updateFrame = -1;
        }
        _updateGlobalAlpha(value, parentAlpha = 1) {
            this._parentData.globalAlpha = parentAlpha * value;
        }
        _updateBlendMode(blendMode) {
            if (this._subStruct && this._subStruct.enabled) {
                this._subStruct._blendMode = blendMode;
            }
            else {
                this._blendMode = blendMode;
            }
        }
        getClipInfo() {
            return this._clipInfo || this._currentData.clipInfo || _DefaultClipInfo;
        }
        hasClip() {
            return this.getClipInfo() !== _DefaultClipInfo;
        }
        updateChildren(type) {
            if (type == ChildrenUpdateType.None)
                return;
            let info, blendMode, alpha;
            let priority = 0, pass = null, enableCulling = false, dcOptimize = false;
            let globalRenderData = null;
            let updateBlend = false, updateClip = false, updateAlpha = false, updatePass = false, updateGlobal = false, updateCulling = false, updateDcOptimize = false;
            if (type & ChildrenUpdateType.Clip) {
                info = this.getClipInfo();
                this.needUploadClip = -1;
                if (this._subStruct) {
                    this._subStruct.needUploadClip = -1;
                }
                updateClip = true;
            }
            if (type & ChildrenUpdateType.Blend) {
                blendMode = this.blendMode;
                updateBlend = true;
            }
            if (type & ChildrenUpdateType.Alpha) {
                alpha = this.globalAlpha;
                this.needUploadAlpha = true;
                if (this._subStruct) {
                    this._subStruct.needUploadAlpha = true;
                }
                updateAlpha = true;
            }
            if (type & ChildrenUpdateType.Pass) {
                pass = this.pass;
                priority = pass ? pass.priority + 1 : 0;
                updatePass = true;
            }
            if (type & ChildrenUpdateType.Global) {
                updateGlobal = true;
                this._globalShaderData;
                globalRenderData = this.globalRenderData;
            }
            if (type & ChildrenUpdateType.Culling) {
                updateCulling = true;
                enableCulling = this.inheritedEnableCulling;
            }
            if (type & ChildrenUpdateType.DcOptimize) {
                updateDcOptimize = true;
                dcOptimize = this.inheritedDcOptimize;
            }
            for (const child of this.children) {
                let updateChild = false;
                let childParentData = child._parentData;
                if (updateClip) {
                    childParentData.clipInfo = info;
                    if (!child._clipInfo) {
                        updateChild = true;
                    }
                }
                if (updateBlend) {
                    if (child._blendMode === Laya.BlendMode.invalid) {
                        childParentData.blendMode = blendMode;
                        child._setBlendMode();
                        updateChild = true;
                    }
                }
                if (updateAlpha) {
                    child._updateGlobalAlpha(child.alpha, alpha);
                    updateChild = true;
                }
                if (updatePass) {
                    childParentData.pass = pass;
                    if (child._pass && child._pass !== pass) {
                        child._pass.priority = priority;
                    }
                    updateChild = true;
                }
                if (updateGlobal) {
                    childParentData.globalRenderData = globalRenderData;
                    child._updateGlobalShaderData();
                    if (!child._globalRenderData) {
                        updateChild = true;
                    }
                }
                if (updateCulling) {
                    childParentData.enableCulling = enableCulling;
                    if (child._pass) {
                        child._pass.repaint = true;
                    }
                    updateChild = true;
                }
                if (updateDcOptimize) {
                    childParentData.dcOptimize = dcOptimize;
                    if (child._pass) {
                        child._pass.repaint = true;
                    }
                    updateChild = true;
                }
                if (updateChild) {
                    child.updateChildren(type);
                }
            }
        }
        setRepaint() {
            if (this.pass) {
                this.pass.repaint = true;
            }
        }
        addChild(child, index) {
            child.parent = this;
            this.children.splice(index, 0, child);
            let childParentData = child._parentData;
            childParentData.clipInfo = this.getClipInfo();
            childParentData.blendMode = this.blendMode;
            child._setBlendMode();
            child._updateGlobalAlpha(child.alpha, this.globalAlpha);
            let parentPass = this.pass;
            childParentData.pass = parentPass;
            child._updatePriority();
            childParentData.globalRenderData = this.globalRenderData;
            child._updateGlobalShaderData();
            childParentData.enableCulling = this.inheritedEnableCulling;
            childParentData.dcOptimize = this.inheritedDcOptimize;
            child.updateChildren(ChildrenUpdateType.All);
            return;
        }
        updateChildIndex(child, oldIndex, index) {
            if (oldIndex === index)
                return;
            this.children.splice(oldIndex, 1);
            if (index >= this.children.length) {
                this.children.push(child);
            }
            else {
                this.children.splice(index, 0, child);
            }
        }
        removeChild(child) {
            const index = this.children.indexOf(child);
            if (index !== -1) {
                child.parent = null;
                this.children.splice(index, 1);
                let childParentData = child._parentData;
                childParentData.pass = null;
                child._updatePriority();
                childParentData.clipInfo = null;
                childParentData.blendMode = Laya.BlendMode.invalid;
                child._updateGlobalAlpha(child._alpha);
                childParentData.globalRenderData = null;
                child._updateGlobalShaderData();
                childParentData.enableCulling = false;
                childParentData.dcOptimize = false;
                child.updateChildren(ChildrenUpdateType.All);
            }
        }
        renderUpdate(context) {
            if (this.renderDataHandler) {
                this.renderDataHandler.inheriteRenderData(context);
            }
            if (this._rnUpdateFun) {
                this._rnUpdateFun(context);
            }
        }
        destroy() {
            this._clipInfo = null;
            this._currentData = null;
            this._parentData = null;
            this._clipRect = null;
            this.renderElements = null;
            this.spriteShaderData = null;
            this.parent = null;
            this.children.length = 0;
            this.children = null;
            this._pass = null;
        }
    }

    class WebDefineDatas {
        constructor() {
            this._changeFlags = new Set();
            this._mask = [];
            this._length = 0;
        }
        _intersectionDefineDatas(define) {
            var unionMask = define._mask;
            var mask = this._mask;
            for (var i = this._length - 1; i >= 0; i--) {
                var value = mask[i] & unionMask[i];
                if (value === 0 && i === this._length - 1)
                    this._length--;
                else
                    mask[i] = value;
            }
        }
        add(define) {
            let changed = false;
            var index = define._index;
            var size = index + 1;
            var mask = this._mask;
            var maskStart = this._length;
            if (maskStart < size) {
                (mask.length < size) && (mask.length = size);
                for (; maskStart < index; maskStart++)
                    mask[maskStart] = 0;
                mask[index] = define._value;
                this._length = size;
                changed = true;
            }
            else {
                let last = mask[index];
                mask[index] |= define._value;
                changed = last != mask[index];
            }
            if (changed) {
                this._notifyChangeFlag();
            }
            return changed;
        }
        remove(define) {
            var index = define._index;
            var mask = this._mask;
            var endIndex = this._length - 1;
            if (index > endIndex)
                return false;
            let lastValue = mask[index];
            var newValue = mask[index] & ~define._value;
            if (index == endIndex && newValue === 0)
                this._length--;
            else
                mask[index] = newValue;
            let changed = lastValue != newValue;
            if (changed) {
                this._notifyChangeFlag();
            }
            return changed;
        }
        addDefineDatas(define) {
            var addMask = define._mask;
            var size = define._length;
            var mask = this._mask;
            var maskStart = this._length;
            if (maskStart < size) {
                mask.length = size;
                for (var i = 0; i < maskStart; i++)
                    mask[i] |= addMask[i];
                for (; i < size; i++)
                    mask[i] = addMask[i];
                this._length = size;
            }
            else {
                for (var i = 0; i < size; i++) {
                    mask[i] |= addMask[i];
                }
            }
            this._notifyChangeFlag();
        }
        removeDefineDatas(define) {
            var removeMask = define._mask;
            var mask = this._mask;
            var endIndex = this._length - 1;
            var i = Math.min(define._length, endIndex);
            for (; i >= 0; i--) {
                var newValue = mask[i] & ~removeMask[i];
                if (i == endIndex && newValue === 0) {
                    endIndex--;
                    this._length--;
                }
                else {
                    mask[i] = newValue;
                }
            }
            this._notifyChangeFlag();
        }
        has(define) {
            var index = define._index;
            if (index >= this._length)
                return false;
            return (this._mask[index] & define._value) !== 0;
        }
        _notifyChangeFlag() {
            if (this._changeFlags.size > 0) {
                this._changeFlags.forEach(value => {
                    value.setValue(Laya.Stat.loopCount, Laya.LayaGL.renderEngine._framePassCount);
                });
            }
        }
        addChangeFlagInfo(flag) {
            if (!this._changeFlags.has(flag)) {
                flag.setValue(Laya.Stat.loopCount, Laya.LayaGL.renderEngine._framePassCount);
                this._changeFlags.add(flag);
            }
        }
        removeChangeFlagInfo(flag) {
            if (this._changeFlags.has(flag)) {
                flag.setValue(Laya.Stat.loopCount, Laya.LayaGL.renderEngine._framePassCount);
                this._changeFlags.delete(flag);
            }
        }
        clear() {
            this._length = 0;
            this._notifyChangeFlag();
        }
        cloneTo(destObject) {
            var destMask = destObject._mask;
            var mask = this._mask;
            var count = this._length;
            destMask.length = count;
            for (var i = 0; i < count; i++)
                destMask[i] = mask[i];
            destObject._length = count;
            destObject._notifyChangeFlag();
        }
        clone() {
            var dest = new WebDefineDatas();
            this.cloneTo(dest);
            return dest;
        }
        destroy() {
            delete this._mask;
        }
        isEual(other) {
            var count = this._length;
            if (count != other._length)
                return false;
            let mask = this._mask;
            let otherMask = other._mask;
            for (var i = 0; i < count; i++)
                if (mask[i] != otherMask[i])
                    return false;
            return true;
        }
    }

    class WebGLShaderData extends Laya.ShaderData {
        get renderStateChanged() {
            return this._renderStateChanged;
        }
        updateRenderState() {
            var _a, _b, _c;
            this._renderStateChanged = false;
            const datas = this.getData();
            const renderState = this.renderState;
            let depthWrite = datas[Laya.Shader3D.DEPTH_WRITE];
            depthWrite = depthWrite !== null && depthWrite !== void 0 ? depthWrite : Laya.RenderState.Default.depthWrite;
            renderState.depthWrite = depthWrite;
            let depthTest = datas[Laya.Shader3D.DEPTH_TEST];
            depthTest = depthTest !== null && depthTest !== void 0 ? depthTest : Laya.RenderState.Default.depthTest;
            renderState.depthTest = depthTest;
            let stencilWrite = datas[Laya.Shader3D.STENCIL_WRITE];
            stencilWrite = stencilWrite !== null && stencilWrite !== void 0 ? stencilWrite : Laya.RenderState.Default.stencilWrite;
            renderState.stencilWrite = stencilWrite;
            let stencilWriteMask = ((_a = datas[Laya.Shader3D.STENCIL_WRITE_MASK]) !== null && _a !== void 0 ? _a : Laya.RenderState.Default.stencilWriteMask);
            renderState.stencilWriteMask = stencilWriteMask;
            let stencilOp = datas[Laya.Shader3D.STENCIL_Op];
            stencilOp = stencilOp !== null && stencilOp !== void 0 ? stencilOp : Laya.RenderState.Default.stencilOp;
            renderState.stencilOp.set(stencilOp.x, stencilOp.y, stencilOp.z);
            let stencilTest = datas[Laya.Shader3D.STENCIL_TEST];
            stencilTest = stencilTest !== null && stencilTest !== void 0 ? stencilTest : Laya.RenderState.Default.stencilTest;
            renderState.stencilTest = stencilTest;
            let stencilReadMask = (_b = datas[Laya.Shader3D.STENCIL_READ_MASK]) !== null && _b !== void 0 ? _b : Laya.RenderState.Default.stencilReadMask;
            renderState.stencilReadMask = stencilReadMask;
            var stencilRef = datas[Laya.Shader3D.STENCIL_Ref];
            stencilRef = stencilRef !== null && stencilRef !== void 0 ? stencilRef : Laya.RenderState.Default.stencilRef;
            renderState.stencilRef = stencilRef;
            let depthBias = (_c = datas[Laya.Shader3D.DEPTH_BIAS]) !== null && _c !== void 0 ? _c : Laya.RenderState.Default.depthBias;
            renderState.depthBias = depthBias;
            let depthBiasConstant = datas[Laya.Shader3D.DEPTH_BIAS_CONSTANT];
            depthBiasConstant = depthBiasConstant !== null && depthBiasConstant !== void 0 ? depthBiasConstant : Laya.RenderState.Default.depthBiasConstant;
            renderState.depthBiasConstant = depthBiasConstant;
            let depthBiasSlopeScale = datas[Laya.Shader3D.DEPTH_BIAS_SLOPESCALE];
            depthBiasSlopeScale = depthBiasSlopeScale !== null && depthBiasSlopeScale !== void 0 ? depthBiasSlopeScale : Laya.RenderState.Default.depthBiasSlopeScale;
            renderState.depthBiasSlopeScale = depthBiasSlopeScale;
            let depthBiasClamp = datas[Laya.Shader3D.DEPTH_BIAS_CLAMP];
            depthBiasClamp = depthBiasClamp !== null && depthBiasClamp !== void 0 ? depthBiasClamp : Laya.RenderState.Default.depthBiasClamp;
            renderState.depthBiasClamp = depthBiasClamp;
            let blend = datas[Laya.Shader3D.BLEND];
            blend = blend !== null && blend !== void 0 ? blend : Laya.RenderState.Default.blend;
            renderState.blend = blend;
            let blendEquation = datas[Laya.Shader3D.BLEND_EQUATION];
            blendEquation = blendEquation !== null && blendEquation !== void 0 ? blendEquation : Laya.RenderState.Default.blendEquation;
            renderState.blendEquation = blendEquation;
            let srcBlend = datas[Laya.Shader3D.BLEND_SRC];
            srcBlend = srcBlend !== null && srcBlend !== void 0 ? srcBlend : Laya.RenderState.Default.srcBlend;
            renderState.srcBlend = srcBlend;
            let dstBlend = datas[Laya.Shader3D.BLEND_DST];
            dstBlend = dstBlend !== null && dstBlend !== void 0 ? dstBlend : Laya.RenderState.Default.dstBlend;
            renderState.dstBlend = dstBlend;
            let blendEquationRGB = datas[Laya.Shader3D.BLEND_EQUATION_RGB];
            blendEquationRGB = blendEquationRGB !== null && blendEquationRGB !== void 0 ? blendEquationRGB : Laya.RenderState.Default.blendEquationRGB;
            renderState.blendEquationRGB = blendEquationRGB;
            let blendEquationAlpha = datas[Laya.Shader3D.BLEND_EQUATION_ALPHA];
            blendEquationAlpha = blendEquationAlpha !== null && blendEquationAlpha !== void 0 ? blendEquationAlpha : Laya.RenderState.Default.blendEquationAlpha;
            renderState.blendEquationAlpha = blendEquationAlpha;
            let srcRGB = datas[Laya.Shader3D.BLEND_SRC_RGB];
            srcRGB = srcRGB !== null && srcRGB !== void 0 ? srcRGB : Laya.RenderState.Default.srcBlendRGB;
            renderState.srcBlendRGB = srcRGB;
            let dstRGB = datas[Laya.Shader3D.BLEND_DST_RGB];
            dstRGB = dstRGB !== null && dstRGB !== void 0 ? dstRGB : Laya.RenderState.Default.dstBlendRGB;
            renderState.dstBlendRGB = dstRGB;
            let srcAlpha = datas[Laya.Shader3D.BLEND_SRC_ALPHA];
            srcAlpha = srcAlpha !== null && srcAlpha !== void 0 ? srcAlpha : Laya.RenderState.Default.srcBlendAlpha;
            renderState.srcBlendAlpha = srcAlpha;
            let dstAlpha = datas[Laya.Shader3D.BLEND_DST_ALPHA];
            dstAlpha = dstAlpha !== null && dstAlpha !== void 0 ? dstAlpha : Laya.RenderState.Default.dstBlendAlpha;
            renderState.dstBlendAlpha = dstAlpha;
            let cull = datas[Laya.Shader3D.CULL];
            cull = cull !== null && cull !== void 0 ? cull : Laya.RenderState.Default.cull;
            renderState.cull = cull;
            const engine = Laya.WebGLEngine.instance;
            const hash = engine.hashRenderState(renderState);
            renderState.hash = hash;
            this._renderStateChanged = false;
        }
        _checkRenderState(index) {
            if (Laya.isRenderStateProperty(index)) {
                this._renderStateChanged = true;
            }
        }
        constructor(ownerResource = null) {
            super(ownerResource);
            this._data = null;
            this._defineDatas = new WebDefineDatas();
            this._id = WebGLShaderData.pointerCount++;
            this._needCacheData = false;
            this._updateCacheArray = null;
            this._subUboBufferNumber = 0;
            this._renderStateChanged = true;
            this.renderState = new Laya.RenderState();
            this._initData();
        }
        _initData() {
            this._data = {};
            this._updateCacheArray = {};
            this._gammaColorMap = new Map();
            this._uniformBuffers = new Map();
            this._subUniformBuffers = new Map();
            this._uniformBuffersPropertyMap = new Map();
        }
        createUniformBuffer(name, uniformMap, needUpdata = false) {
            if (this._uniformBuffers.has(name)) {
                if (needUpdata) {
                    this._updateUBOBuffer(name);
                }
                return this._uniformBuffers.get(name);
            }
            this._needCacheData = true;
            let uboBuffer = new Laya.WebGLUniformBuffer(name);
            uniformMap.forEach(uniform => {
                uboBuffer.addUniform(uniform.id, uniform.uniformtype, uniform.arrayLength);
            });
            uboBuffer.create();
            this._uniformBuffers.set(name, uboBuffer);
            let id = Laya.Shader3D.propertyNameToID(name);
            this._data[id] = uboBuffer;
            uniformMap.forEach(uniform => {
                let uniformId = uniform.id;
                let data = this._data[uniformId];
                if (data != null) {
                    uboBuffer.setUniformData(uniformId, uniform.uniformtype, data);
                }
                this._uniformBuffersPropertyMap.set(uniformId, uboBuffer);
            });
            uboBuffer.needUpload && uboBuffer.upload();
            return uboBuffer;
        }
        _updateUBOBuffer(name) {
            if (!Laya.Config._uniformBlock) {
                return;
            }
            let buffer = this._uniformBuffers.get(name) || this._subUniformBuffers.get(name);
            if (!buffer) {
                return;
            }
            for (var i in this._updateCacheArray) {
                let index = parseInt(i);
                let ubo = this._uniformBuffersPropertyMap.get(index);
                if (ubo) {
                    this._updateCacheArray[i].call(ubo, index, this._data[index]);
                }
            }
            this._updateCacheArray = {};
            buffer.needUpload && buffer.upload();
        }
        createSubUniformBuffer(name, cacheName, uniformMap) {
            let subBuffer = this._subUniformBuffers.get(cacheName);
            if (subBuffer) {
                if (this._subUboBufferNumber < 2) {
                    for (var i in this._updateCacheArray) {
                        let index = parseInt(i);
                        let ubo = this._uniformBuffersPropertyMap.get(index);
                        if (ubo) {
                            this._updateCacheArray[i].call(ubo, index, this._data[index]);
                        }
                    }
                    this._updateCacheArray = {};
                }
                else {
                    uniformMap.forEach((uniform, index) => {
                        if (this._data[index] && this._updateCacheArray[index]) {
                            this._updateCacheArray[index].call(subBuffer, index, this._data[index]);
                        }
                    });
                }
                return subBuffer;
            }
            let engine = Laya.WebGLEngine.instance;
            let mgr = engine.bufferMgr;
            let uniformBuffer = new Laya.WebGLSubUniformBuffer(name, uniformMap, mgr, this);
            this._subUboBufferNumber++;
            this._needCacheData = true;
            uniformBuffer.notifyGPUBufferChange();
            this._subUniformBuffers.set(cacheName, uniformBuffer);
            let id = Laya.Shader3D.propertyNameToID(name);
            this._data[id] = uniformBuffer;
            uniformMap.forEach(uniform => {
                let uniformId = uniform.id;
                let data = this._data[uniformId];
                if (data != null) {
                    uniformBuffer.setUniformData(uniformId, uniform.uniformtype, data);
                }
                this._uniformBuffersPropertyMap.set(uniformId, uniformBuffer);
            });
            return uniformBuffer;
        }
        getData() {
            return this._data;
        }
        addDefine(define) {
            this._defineDatas.add(define);
        }
        addDefines(define) {
            this._defineDatas.addDefineDatas(define);
        }
        removeDefine(define) {
            this._defineDatas.remove(define);
        }
        removeDefines(defines) {
            this._defineDatas.removeDefineDatas(defines);
        }
        hasDefine(define) {
            return this._defineDatas.has(define);
        }
        clearDefine() {
            this._defineDatas.clear();
        }
        clearData() {
            for (const key in this._data) {
                if (this._data[key] instanceof Laya.Resource) {
                    this._data[key]._removeReference();
                }
            }
            this._uniformBuffersPropertyMap.clear();
            this._uniformBuffers.forEach(buffer => {
                buffer.destroy();
            });
            this._uniformBuffers.clear();
            this._subUniformBuffers.forEach(buffer => {
                buffer.destroy();
            });
            this._subUniformBuffers.clear();
            this._data = {};
            this._gammaColorMap.clear();
            this.clearDefine();
            this._needCacheData = false;
            this._subUboBufferNumber = 0;
            this.renderState.setNull();
        }
        getBool(index) {
            return this._data[index];
        }
        setBool(index, value) {
            this._data[index] = value;
            if (this._needCacheData) ;
            this._checkRenderState(index);
        }
        getInt(index) {
            return this._data[index];
        }
        setInt(index, value) {
            this._data[index] = value;
            if (this._needCacheData) {
                this._updateCacheArray[index] = Laya.WebGLUniformBufferBase.prototype.setInt;
            }
            this._checkRenderState(index);
        }
        getNumber(index) {
            return this._data[index];
        }
        setNumber(index, value) {
            this._data[index] = value;
            if (this._needCacheData) {
                this._updateCacheArray[index] = Laya.WebGLUniformBufferBase.prototype.setFloat;
            }
            this._checkRenderState(index);
        }
        getVector2(index) {
            return this._data[index];
        }
        setVector2(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else
                this._data[index] = value.clone();
            if (this._needCacheData) {
                this._updateCacheArray[index] = Laya.WebGLUniformBufferBase.prototype.setVector2;
            }
        }
        getVector3(index) {
            return this._data[index];
        }
        setVector3(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else
                this._data[index] = value.clone();
            if (this._needCacheData) {
                this._updateCacheArray[index] = Laya.WebGLUniformBufferBase.prototype.setVector3;
            }
        }
        getVector(index) {
            return this._data[index];
        }
        setVector(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else
                this._data[index] = value.clone();
            if (this._needCacheData) {
                this._updateCacheArray[index] = Laya.WebGLUniformBufferBase.prototype.setVector4;
            }
        }
        getColor(index) {
            return this._gammaColorMap.get(index);
        }
        setColor(index, value) {
            if (!value)
                return;
            if (this._data[index]) {
                let gammaColor = this._gammaColorMap.get(index);
                value.cloneTo(gammaColor);
                let linearColor = this._data[index];
                linearColor.x = Laya.Color.gammaToLinearSpace(value.r);
                linearColor.y = Laya.Color.gammaToLinearSpace(value.g);
                linearColor.z = Laya.Color.gammaToLinearSpace(value.b);
                linearColor.w = value.a;
            }
            else {
                let linearColor = new Laya.Vector4();
                linearColor.x = Laya.Color.gammaToLinearSpace(value.r);
                linearColor.y = Laya.Color.gammaToLinearSpace(value.g);
                linearColor.z = Laya.Color.gammaToLinearSpace(value.b);
                linearColor.w = value.a;
                this._data[index] = linearColor;
                this._gammaColorMap.set(index, value.clone());
            }
            if (this._needCacheData) {
                this._updateCacheArray[index] = Laya.WebGLUniformBufferBase.prototype.setVector4;
            }
        }
        getLinearColor(index) {
            return this._data[index];
        }
        getMatrix4x4(index) {
            return this._data[index];
        }
        setMatrix4x4(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else {
                this._data[index] = value.clone();
            }
            if (this._needCacheData)
                this._updateCacheArray[index] = Laya.WebGLUniformBufferBase.prototype.setMatrix4x4;
        }
        getMatrix3x3(index) {
            return this._data[index];
        }
        setMatrix3x3(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else {
                this._data[index] = value.clone();
            }
            if (this._needCacheData) {
                this._updateCacheArray[index] = Laya.WebGLUniformBufferBase.prototype.setMatrix3x3;
            }
        }
        getBuffer(index) {
            return this._data[index];
        }
        setBuffer(index, value) {
            this._data[index] = value;
            if (this._needCacheData) {
                this._updateCacheArray[index] = Laya.WebGLUniformBufferBase.prototype.setArrayBuffer;
            }
        }
        setTexture(index, value) {
            var lastValue = this._data[index];
            if (value) {
                let shaderDefine = Laya.WebGLEngine._texGammaDefine[index];
                if (shaderDefine && value && value.gammaCorrection > 1) {
                    this.addDefine(shaderDefine);
                }
                else {
                    shaderDefine && this.removeDefine(shaderDefine);
                }
            }
            this._data[index] = value;
            lastValue && lastValue._removeReference();
            value && value._addReference();
        }
        _setInternalTexture(index, value) {
            this._data[index];
            if (value) {
                let shaderDefine = Laya.WebGLEngine._texGammaDefine[index];
                if (shaderDefine && value && value.gammaCorrection > 1) {
                    this.addDefine(shaderDefine);
                }
                else {
                    shaderDefine && this.removeDefine(shaderDefine);
                }
            }
            this._data[index] = value;
        }
        uploadCache() {
            let uploaded = false;
            for (let i in this._updateCacheArray) {
                uploaded = true;
                let index = parseInt(i);
                let ubo = this._uniformBuffersPropertyMap.get(index);
                if (ubo) {
                    this._updateCacheArray[i].call(ubo, index, this._data[index]);
                }
            }
            if (uploaded) {
                this._updateCacheArray = {};
            }
        }
        update(name) {
            if (Laya.Config._uniformBlock) {
                let unifomrMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(name);
                let uniformBuffer = this.createSubUniformBuffer(name, name, unifomrMap._idata);
                if (uniformBuffer) {
                    uniformBuffer.upload();
                }
            }
        }
        getTexture(index) {
            return this._data[index];
        }
        getSourceIndex(value) {
            for (var i in this._data) {
                if (this._data[i] == value)
                    return Number(i);
            }
            return -1;
        }
        cloneTo(destObject) {
            destObject.clearData();
            var destData = destObject._data;
            for (var k in this._data) {
                var value = this._data[k];
                if (value != null) {
                    if (typeof value == "number") {
                        destData[k] = value;
                    }
                    else if (typeof value == "boolean") {
                        destData[k] = value;
                    }
                    else if (value instanceof Laya.Vector2) {
                        let v2 = destData[k] || (destData[k] = new Laya.Vector2());
                        value.cloneTo(v2);
                    }
                    else if (value instanceof Laya.Vector3) {
                        let v3 = destData[k] || (destData[k] = new Laya.Vector3());
                        value.cloneTo(v3);
                    }
                    else if (value instanceof Laya.Vector4) {
                        let color = this.getColor(parseInt(k));
                        if (color) {
                            let clonecolor = color.clone();
                            destObject.setColor(parseInt(k), clonecolor);
                        }
                        else {
                            let v4 = destData[k] || (destData[k] = new Laya.Vector4());
                            value.cloneTo(v4);
                        }
                    }
                    else if (value instanceof Laya.Matrix3x3) {
                        let mat = destData[k] || (destData[k] = new Laya.Matrix3x3());
                        value.cloneTo(mat);
                    }
                    else if (value instanceof Laya.Matrix4x4) {
                        let mat = destData[k] || (destData[k] = new Laya.Matrix4x4());
                        value.cloneTo(mat);
                    }
                    else if (value instanceof Laya.Resource) {
                        destData[k] = value;
                        value._addReference();
                    }
                }
            }
            this._defineDatas.cloneTo(destObject._defineDatas);
            this._gammaColorMap.forEach((color, index) => {
                destObject._gammaColorMap.set(index, color.clone());
            });
        }
        getDefineData() {
            return this._defineDatas;
        }
        clone() {
            var dest = new WebGLShaderData();
            this.cloneTo(dest);
            return dest;
        }
        destroy() {
            if (this.destroyed) {
                return;
            }
            this.clearData();
            this._defineDatas.destroy();
            this._defineDatas = null;
            this.destroyed = true;
        }
    }
    WebGLShaderData.pointerCount = 0;

    class WebShaderPass {
        get renderState() {
            return this._renderState;
        }
        set renderState(value) {
            this._renderState = value;
        }
        get validDefine() {
            return this._validDefine;
        }
        set validDefine(value) {
            this._validDefine = value;
        }
        constructor(pass) {
            this._cacheShaderHierarchy = 1;
            this._cacheSharders = {};
            this._renderState = new Laya.RenderState();
            this._renderState.setNull();
        }
        _resizeCacheShaderMap(cacheMap, hierarchy, resizeLength) {
            var end = this._cacheShaderHierarchy - 1;
            if (hierarchy == end) {
                for (var k in cacheMap) {
                    var shader = cacheMap[k];
                    for (var i = 0, n = resizeLength - end; i < n; i++) {
                        if (i === n - 1)
                            cacheMap[0] = shader;
                        else
                            cacheMap = cacheMap[i == 0 ? k : 0] = {};
                    }
                }
            }
            else {
                ++hierarchy;
                for (var k in cacheMap)
                    this._resizeCacheShaderMap(cacheMap[k], hierarchy, resizeLength);
            }
        }
        setCacheShader(compileDefine, shader) {
            var cacheShaders = this._cacheSharders;
            var mask = compileDefine._mask;
            var endIndex = compileDefine._length - 1;
            var maxEndIndex = this._cacheShaderHierarchy - 1;
            for (var i = 0; i < maxEndIndex; i++) {
                var subMask = endIndex < i ? 0 : mask[i];
                var subCacheShaders = cacheShaders[subMask];
                (subCacheShaders) || (cacheShaders[subMask] = subCacheShaders = {});
                cacheShaders = subCacheShaders;
            }
            var cacheKey = endIndex < maxEndIndex ? 0 : mask[maxEndIndex];
            cacheShaders[cacheKey] = shader;
        }
        getCacheShader(compileDefine) {
            compileDefine._intersectionDefineDatas(this._validDefine);
            var cacheShaders = this._cacheSharders;
            var maskLength = compileDefine._length;
            if (maskLength > this._cacheShaderHierarchy) {
                this._resizeCacheShaderMap(cacheShaders, 0, maskLength);
                this._cacheShaderHierarchy = maskLength;
            }
            var mask = compileDefine._mask;
            var endIndex = compileDefine._length - 1;
            var maxEndIndex = this._cacheShaderHierarchy - 1;
            for (var i = 0; i < maxEndIndex; i++) {
                var subMask = endIndex < i ? 0 : mask[i];
                var subCacheShaders = cacheShaders[subMask];
                (subCacheShaders) || (cacheShaders[subMask] = subCacheShaders = {});
                cacheShaders = subCacheShaders;
            }
            var cacheKey = endIndex < maxEndIndex ? 0 : mask[maxEndIndex];
            var shader = cacheShaders[cacheKey];
            return shader;
        }
        destroy() {
        }
    }

    class WebSubShader {
        setUniformMap(_uniformMap) {
        }
        destroy() {
            throw new Laya.NotImplementedError();
        }
        addShaderPass(pass) { }
    }

    class WebUnitRenderModuleDataFactory {
        createSubShader() {
            return new WebSubShader();
        }
        createShaderPass(pass) {
            return new WebShaderPass(pass);
        }
        createRenderState() {
            return new Laya.RenderState();
        }
        createDefineDatas() {
            return new WebDefineDatas();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.unitRenderModuleDataFactory)
            Laya.LayaGL.unitRenderModuleDataFactory = new WebUnitRenderModuleDataFactory();
    });

    class WebGPUShaderCompiler {
        constructor() {
        }
        async init() {
            const glslInit = ShaderCompiler().then(module => {
                this.glslang = module;
            }, reason => {
                console.error("glslang init failed", reason);
            });
            const Nagabind = wasm_bindgen;
            const nagaInit = Nagabind().then(() => {
                this.naga = Nagabind;
            });
            return Promise.all([glslInit, nagaInit]);
        }
        destroy() {
            this.glslang = null;
            this.naga = null;
        }
    }

    class WebGPUCapable {
        constructor(descriptor) {
            this.initCapable(descriptor);
        }
        initCapable(descriptor) {
            this._capabilityMap = new Map();
            this._capabilityMap.set(Laya.RenderCapable.Element_Index_Uint32, true);
            this._capabilityMap.set(Laya.RenderCapable.Element_Index_Uint8, false);
            this._capabilityMap.set(Laya.RenderCapable.TextureFormat_R32G32B32A32, true);
            this._capabilityMap.set(Laya.RenderCapable.TextureFormat_R16G16B16A16, true);
            this._capabilityMap.set(Laya.RenderCapable.Texture_anisotropic, true);
            this._capabilityMap.set(Laya.RenderCapable.RenderTextureFormat_R16G16B16A16, true);
            this._capabilityMap.set(Laya.RenderCapable.RenderTextureFormat_Depth, true);
            this._capabilityMap.set(Laya.RenderCapable.RenderTextureFormat_ShadowMap, true);
            this._capabilityMap.set(Laya.RenderCapable.Vertex_VAO, true);
            this._capabilityMap.set(Laya.RenderCapable.DrawElement_Instance, true);
            this._capabilityMap.set(Laya.RenderCapable.Shader_TextureLod, true);
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_S3TC, false);
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_S3TC_SRGB, false);
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_PVRTC, false);
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_ETC1, false);
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_ETC, false);
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_ASTC, false);
            this._capabilityMap.set(Laya.RenderCapable.Texture_SRGB, true);
            this._capabilityMap.set(Laya.RenderCapable.MSAA, true);
            this._capabilityMap.set(Laya.RenderCapable.UnifromBufferObject, false);
            this._capabilityMap.set(Laya.RenderCapable.Texture3D, true);
            this._capabilityMap.set(Laya.RenderCapable.Texture_HalfFloatLinearFiltering, true);
            this._capabilityMap.set(Laya.RenderCapable.RenderTextureFormat_R32G32B32A32, true);
            this._capabilityMap.set(Laya.RenderCapable.RenderTextureFormat_R16G16B16A16, true);
            this._capabilityMap.set(Laya.RenderCapable.ComputeShader, true);
            this._capabilityMap.set(Laya.RenderCapable.StorageBuffer, true);
            this._capabilityMap.set(Laya.RenderCapable.IndirectDraw, true);
            let features = descriptor.requiredFeatures;
            for (const iterator of features) {
                switch (iterator) {
                    case "texture-compression-astc":
                        this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_ASTC, true);
                        break;
                    case "texture-compression-bc":
                        this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_S3TC, true);
                        this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_S3TC_SRGB, true);
                        break;
                    case "texture-compression-etc2":
                        this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_ETC1, true);
                        this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_ETC, true);
                        break;
                    case "float32-filterable":
                        this._capabilityMap.set(Laya.RenderCapable.Texture_FloatLinearFiltering, true);
                        break;
                }
            }
        }
        getCapable(type) {
            return this._capabilityMap.get(type);
        }
    }

    class WebGPUBuffer {
        constructor(usage, byteSize = 0, mappedAtCreation = false) {
            this._size = 0;
            this._isCreate = false;
            this._mappedAtCreation = false;
            this._size = Laya.roundUp(byteSize, 4);
            this._usage = usage;
            this._mappedAtCreation = mappedAtCreation;
            if (this._size > 0)
                this._create();
            if (usage & GPUBufferUsage.STORAGE) {
                this._isStorageBuffer = true;
            }
            if (usage & GPUBufferUsage.INDIRECT) {
                this._isIndirectDraw = true;
            }
            if (usage & GPUBufferUsage.INDEX) {
                this._statistics_M_Buffer = Laya.StatElement.M_IndexBuffer;
                this._statistics_RC_Buffer = Laya.StatElement.C_IndexBuffer;
                this._statistics_BufferUpload = Laya.StatElement.CT_GeometryBufferUploadCount;
            }
            else if (usage & GPUBufferUsage.UNIFORM) {
                this._statistics_M_Buffer = Laya.StatElement.M_UBOBuffer;
                this._statistics_RC_Buffer = Laya.StatElement.C_UBOBuffer;
                this._statistics_BufferUpload = Laya.StatElement.CT_UBOBufferUploadCount;
            }
            else if (usage & GPUBufferUsage.VERTEX) {
                this._statistics_M_Buffer = Laya.StatElement.M_VertexBuffer;
                this._statistics_RC_Buffer = Laya.StatElement.C_VertexBuffer;
                this._statistics_BufferUpload = Laya.StatElement.CT_GeometryBufferUploadCount;
            }
        }
        _memorychange(bytelength) {
            Laya.LayaGL.statAgent.recordMemoryData(Laya.StatElement.M_GPUMemory, bytelength);
            Laya.LayaGL.statAgent.recordMemoryData(Laya.StatElement.M_GPUBuffer, bytelength);
            Laya.LayaGL.statAgent.recordMemoryData(this._statistics_M_Buffer, bytelength);
        }
        setDataLength(length) {
            const size = Laya.roundUp(length, 4);
            if (!this._isCreate || this._size != size) {
                this._releaseResource();
                this._size = size;
                this._create();
            }
        }
        _create() {
            this._source = WebGPURenderEngine._instance.getDevice().createBuffer({
                size: this._size,
                usage: this._usage,
                mappedAtCreation: this._mappedAtCreation
            });
            this._isCreate = true;
            this._memorychange(this._size);
            Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_GPUBuffer, 1);
            Laya.LayaGL.statAgent.recordCountData(this._statistics_RC_Buffer, 1);
        }
        setData(srcData, srcOffset) {
            let size = 0, offset = 0;
            let buffer = srcData.buffer;
            if (buffer) {
                offset = srcData.byteOffset + srcOffset;
                size = Laya.roundUp(srcData.byteLength, 4);
                if (size > srcData.byteLength) {
                    const buffer2 = new ArrayBuffer(size);
                    new Uint8Array(buffer2).set(new Uint8Array(buffer, offset, srcData.byteLength));
                    buffer = buffer2;
                    offset = 0;
                }
                if (this._mappedAtCreation) {
                    new Uint8Array(this._source.getMappedRange(0, size)).set(new Uint8Array(buffer, offset, size));
                    this._mappedAtCreation = false;
                    this._source.unmap();
                }
                else {
                    WebGPURenderEngine._instance.getDevice().queue.writeBuffer(this._source, 0, buffer, offset, size);
                }
            }
            else {
                offset = srcOffset;
                size = Laya.roundUp(srcData.byteLength - offset, 4);
                if (size > srcData.byteLength - offset) {
                    const buffer2 = new ArrayBuffer(size);
                    new Uint8Array(buffer2).set(new Uint8Array(srcData, offset, srcData.byteLength - offset));
                    srcData = buffer2;
                    offset = 0;
                }
                if (this._mappedAtCreation) {
                    new Uint8Array(this._source.getMappedRange(0, size)).set(new Uint8Array(srcData, offset, size));
                    this._mappedAtCreation = false;
                    this._source.unmap();
                }
                else {
                    WebGPURenderEngine._instance.getDevice().queue.writeBuffer(this._source, 0, srcData, offset, size);
                }
            }
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_BufferUploadCount, 1);
            Laya.LayaGL.statAgent.recordCTData(this._statistics_BufferUpload, 1);
            if (this._statistics_BufferUpload == Laya.StatElement.CT_UBOBufferUploadCount) {
                Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_UBOBufferUploadMemory, size / 1048576);
            }
        }
        setDataEx(srcData, srcOffset, byteLength, dstOffset = 0) {
            let size = 0, offset = 0;
            let buffer = srcData.buffer;
            if (buffer) {
                offset = srcData.byteOffset + srcOffset;
                size = Laya.roundUp(srcData.byteLength, 4);
                if (size > srcData.byteLength) {
                    const buffer2 = new ArrayBuffer(size);
                    new Uint8Array(buffer2).set(new Uint8Array(buffer, offset, srcData.byteLength));
                    buffer = buffer2;
                    offset = 0;
                }
                if (this._mappedAtCreation) {
                    new Uint8Array(this._source.getMappedRange(dstOffset, size)).set(new Uint8Array(buffer, offset, size));
                    this._mappedAtCreation = false;
                    this._source.unmap();
                }
                else
                    WebGPURenderEngine._instance.getDevice().queue.writeBuffer(this._source, dstOffset, buffer, offset, byteLength);
            }
            else {
                offset = srcOffset;
                size = Laya.roundUp(byteLength, 4);
                if (size > byteLength) {
                    const buffer2 = new ArrayBuffer(size);
                    new Uint8Array(buffer2).set(new Uint8Array(srcData, offset, byteLength));
                    srcData = buffer2;
                    offset = 0;
                }
                if (this._mappedAtCreation) {
                    new Uint8Array(this._source.getMappedRange(dstOffset, size)).set(new Uint8Array(srcData, offset, size));
                    this._mappedAtCreation = false;
                    this._source.unmap();
                }
                else
                    WebGPURenderEngine._instance.getDevice().queue.writeBuffer(this._source, dstOffset, srcData, offset, size);
            }
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_BufferUploadCount, 1);
            Laya.LayaGL.statAgent.recordCTData(this._statistics_BufferUpload, 1);
        }
        copyArrayBuffer(source, destination, sourceOffset = 0, destOffset = 0, length) {
            const sourceView = new Uint8Array(source, sourceOffset);
            const destView = new Uint8Array(destination, destOffset);
            destView.set(sourceView.subarray(0, length), 0);
        }
        readDataFromBuffer(dest, destOffset, srcOffset, byteLength) {
            return new Promise((resolve, reject) => {
                this._source.mapAsync(GPUMapMode.READ)
                    .then(() => {
                    const arrayBuffer = this._source.getMappedRange(srcOffset, byteLength);
                    this.copyArrayBuffer(arrayBuffer, dest, 0, destOffset, byteLength);
                    this._source.unmap();
                    resolve();
                })
                    .catch(error => {
                    this._source.unmap();
                    reject(error);
                });
            });
        }
        async readFromBuffer(buffer, offset, byteLength) {
            await buffer.mapAsync(GPUMapMode.READ);
            const arrayBuffer = buffer.getMappedRange(offset, byteLength);
            const data = new Float32Array(arrayBuffer).slice(byteLength / 4);
            buffer.unmap();
            return data;
        }
        async writeFromBuffer(srcBuffer, srcOffset, byteLength, dstOffset) {
            await this._source.mapAsync(GPUMapMode.WRITE);
            const arrayBuffer = this._source.getMappedRange(dstOffset, byteLength);
            const data = new Float32Array(arrayBuffer);
            data.set(new Float32Array(srcBuffer, srcOffset, byteLength / 4));
            this._source.unmap();
        }
        _releaseResource() {
            if (this._source) {
                this._source.destroy();
                this._source = null;
                this._memorychange(-this._size);
                this._size = 0;
                Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_GPUBuffer, -1);
                Laya.LayaGL.statAgent.recordCountData(this._statistics_RC_Buffer, -1);
            }
        }
        release() {
            this._releaseResource();
        }
    }

    class WebGPUGlobal {
        static getUniformInfoId() {
            return this._uniformInfoIdCounter++;
        }
        static getUniformBufferId() {
            return this._uniformBufferIdCounter++;
        }
        static getId(object) {
            return this._idCounter++;
        }
        static reset() {
            this._idCounter = 0;
        }
        static get idCounter() {
            return this._idCounter;
        }
    }
    WebGPUGlobal._idCounter = 0;
    WebGPUGlobal._uniformInfoIdCounter = 0;
    WebGPUGlobal._uniformBufferIdCounter = 0;

    class WebGPUDeviceBuffer {
        constructor(type, usages = 0) {
            this._cacheShaderData = new Map();
            this._destroyed = false;
            this.objectName = "WebGPUDeviceBuffer";
            this.globalId = WebGPUGlobal.getId(this);
            let usage = 0;
            usage |= (type & Laya.EDeviceBufferUsage.MAP_READ) ? GPUBufferUsage.MAP_READ : 0;
            usage |= (type & Laya.EDeviceBufferUsage.MAP_WRITE) ? GPUBufferUsage.MAP_WRITE : 0;
            usage |= (type & Laya.EDeviceBufferUsage.COPY_SRC) ? GPUBufferUsage.COPY_SRC : 0;
            usage |= (type & Laya.EDeviceBufferUsage.COPY_DST) ? GPUBufferUsage.COPY_DST : 0;
            usage |= (type & Laya.EDeviceBufferUsage.STORAGE) ? GPUBufferUsage.STORAGE : 0;
            usage |= (type & Laya.EDeviceBufferUsage.INDIRECT) ? GPUBufferUsage.INDIRECT : 0;
            usage |= (type & Laya.EDeviceBufferUsage.VERTEX) ? GPUBufferUsage.VERTEX : 0;
            this._buffer = new WebGPUBuffer(usage);
            Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_DeviceBuffer, 1);
        }
        _reSetBindGroupEntry() {
            this._GPUBindGroupEntry = {
                binding: 0,
                resource: {
                    buffer: this._buffer._source,
                    offset: 0,
                    size: this._buffer._size,
                }
            };
        }
        _addCacheShaderData(shaderData, propertyID) {
            if (!this._cacheShaderData.has(shaderData)) {
                this._cacheShaderData.set(shaderData, propertyID);
            }
        }
        _removeCacheShaderData(shaderData) {
            if (this._cacheShaderData.has(shaderData)) {
                this._cacheShaderData.delete(shaderData);
            }
        }
        getNativeBuffer() {
            return this._buffer;
        }
        getBindGroupEntry(binding) {
            this._GPUBindGroupEntry.binding = binding;
            return this._GPUBindGroupEntry;
        }
        setData(buffer, bufferOffset, dataStartIndex, dataCount) {
            const needSubData = dataStartIndex !== 0 || dataCount !== Number.MAX_SAFE_INTEGER;
            if (needSubData) {
                this._buffer.setDataEx(buffer, dataStartIndex, dataCount, bufferOffset);
            }
            else {
                this._buffer.setData(buffer, bufferOffset);
            }
        }
        setDataLength(byteLength) {
            if (byteLength != this._buffer._size) {
                Laya.LayaGL.statAgent.recordMemoryData(Laya.StatElement.M_DeviceBuffer, byteLength - this._buffer._size);
                this._buffer.setDataLength(byteLength);
                this._reSetBindGroupEntry();
            }
        }
        copyToBuffer(buffer, sourceOffset, destoffset, bytelength) {
            const device = WebGPURenderEngine._instance.getDevice();
            const encoder = device.createCommandEncoder();
            encoder.copyBufferToBuffer(this._buffer._source, sourceOffset, buffer.getNativeBuffer()._source, destoffset, bytelength);
            device.queue.submit([encoder.finish()]);
        }
        copyToTexture() {
        }
        readData(dest, destOffset, srcOffset, byteLength) {
            return this._buffer.readDataFromBuffer(dest, destOffset, srcOffset, byteLength);
        }
        destroy() {
            if (this._buffer) {
                this._buffer.release();
                this._buffer = null;
                Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_DeviceBuffer, -1);
            }
            for (var [key, value] of this._cacheShaderData) {
                key.setDeviceBuffer(value, null);
            }
            this._cacheShaderData = null;
            this._destroyed = true;
        }
    }

    class WebGPUBlendState {
        static getBlendState(blend, operationRGB, srcBlendRGB, dstBlendRGB, operationAlpha, srcBlendAlpha, dstBlendAlpha) {
            const cacheID = this._getBlendStateCacheID(blend, operationRGB, srcBlendRGB, dstBlendRGB, operationAlpha, srcBlendAlpha, dstBlendAlpha);
            let state = this._cache[cacheID];
            if (!state)
                if (cacheID == 0) {
                    this._cache[cacheID] = state = { state: null, key: cacheID, id: this._idCounter++ };
                }
                else {
                    this._cache[cacheID] = state = { state: this._createBlendState(operationRGB, srcBlendRGB, dstBlendRGB, operationAlpha, srcBlendAlpha, dstBlendAlpha), key: cacheID, id: this._idCounter++ };
                }
            return state;
        }
        static _getBlendStateCacheID(blend, operationRGB, srcBlendRGB, dstBlendRGB, operationAlpha, srcBlendAlpha, dstBlendAlpha) {
            if (blend === Laya.BlendType.BLEND_DISABLE) {
                return 0;
            }
            else {
                return (blend << this._pointer_BlendType) +
                    (srcBlendRGB << this._pointer_srcBlendRGB_BlendFactor) +
                    (dstBlendRGB << this._pointer_dstBlendRGB_BlendFactor) +
                    (srcBlendAlpha << this._pointer_srcBlendAlpha_BlendFactor) +
                    (dstBlendAlpha << this._pointer_dstBlendAlpha_BlendFactor) +
                    (operationRGB << this._pointer_OperationRGB_BlendEquationSeparate) +
                    (operationAlpha << this._pointer_OperationAlpha_BlendEquationSeparate);
            }
        }
        static _createBlendState(operationRGB, srcBlendRGB, dstBlendRGB, operationAlpha, srcBlendAlpha, dstBlendAlpha) {
            return {
                color: this._getComponent(operationRGB, srcBlendRGB, dstBlendRGB),
                alpha: this._getComponent(operationAlpha, srcBlendAlpha, dstBlendAlpha)
            };
        }
        static _getFactor(factor) {
            switch (factor) {
                case Laya.BlendFactor.Zero:
                    return "zero";
                case Laya.BlendFactor.One:
                    return "one";
                case Laya.BlendFactor.SourceColor:
                    return "src";
                case Laya.BlendFactor.OneMinusSourceColor:
                    return "one-minus-src";
                case Laya.BlendFactor.DestinationColor:
                    return "dst";
                case Laya.BlendFactor.OneMinusDestinationColor:
                    return "one-minus-dst";
                case Laya.BlendFactor.SourceAlpha:
                    return "src-alpha";
                case Laya.BlendFactor.OneMinusSourceAlpha:
                    return "one-minus-src-alpha";
                case Laya.BlendFactor.DestinationAlpha:
                    return "dst-alpha";
                case Laya.BlendFactor.OneMinusDestinationAlpha:
                    return "one-minus-dst-alpha";
                case Laya.BlendFactor.SourceAlphaSaturate:
                    return "src-alpha-saturated";
                case Laya.BlendFactor.BlendColor:
                    return "constant";
                case Laya.BlendFactor.OneMinusBlendColor:
                    return "one-minus-constant";
            }
        }
        static _getComponent(operation, src, dst) {
            const comp = {};
            switch (operation) {
                case Laya.BlendEquationSeparate.ADD:
                    comp.operation = "add";
                    break;
                case Laya.BlendEquationSeparate.SUBTRACT:
                    comp.operation = "subtract";
                    break;
                case Laya.BlendEquationSeparate.MAX:
                    comp.operation = "max";
                    break;
                case Laya.BlendEquationSeparate.MIN:
                    comp.operation = "min";
                    break;
                case Laya.BlendEquationSeparate.REVERSE_SUBTRACT:
                    comp.operation = "reverse-subtract";
                    break;
                default:
                    comp.operation = "add";
                    break;
            }
            comp.srcFactor = WebGPUBlendState._getFactor(src);
            comp.dstFactor = WebGPUBlendState._getFactor(dst);
            return comp;
        }
    }
    WebGPUBlendState._idCounter = 0;
    WebGPUBlendState._pointer_BlendType = 0;
    WebGPUBlendState._pointer_OperationRGB_BlendEquationSeparate = 4;
    WebGPUBlendState._pointer_OperationAlpha_BlendEquationSeparate = 8;
    WebGPUBlendState._pointer_srcBlendRGB_BlendFactor = 12;
    WebGPUBlendState._pointer_dstBlendRGB_BlendFactor = 16;
    WebGPUBlendState._pointer_srcBlendAlpha_BlendFactor = 20;
    WebGPUBlendState._pointer_dstBlendAlpha_BlendFactor = 24;
    WebGPUBlendState._cache = {};
    class DepthStencilParam {
    }
    class WebGPUDepthStencilState {
        static getDepthStencilState(format, depthStencilParam) {
            const cacheID = this._getDepthStencilCacheID(format, depthStencilParam);
            if (this._cache.has(cacheID)) {
                return this._cache.get(cacheID);
            }
            let state = {
                state: this._createDepthStencilState(format, depthStencilParam),
                key: cacheID,
                id: this._idCounter++
            };
            this._cache.set(cacheID, state);
            return state;
        }
        static getDepthStencilParamCacheID(depthStencilParam) {
            let depthWrite = depthStencilParam.depthWrite;
            let depthTest = depthStencilParam.depthTest;
            let depthBias = depthStencilParam.depthBias;
            let depthBiasConstant = depthStencilParam.depthBiasConstant;
            let depthBiasSlopeScale = depthStencilParam.depthBiasSlopeScale;
            let depthBiasClamp = depthStencilParam.depthBiasClamp;
            if (depthWrite == false) {
                depthBias = false;
            }
            if (depthBias == false) {
                depthBiasConstant = 0;
                depthBiasSlopeScale = 0;
                depthBiasClamp = 0;
            }
            let depthState = (depthWrite ? 1 : 0) + (depthTest << 1) + ((depthBias ? 1 : 0) << 4);
            let depthStateKey = `${depthState}_${depthBiasConstant}_${depthBiasSlopeScale}_${depthBiasClamp}`;
            let stencilEnable = depthStencilParam.stencilEnable;
            let stencilTest = depthStencilParam.stencilTest;
            let stencilWrite = depthStencilParam.stencilWrite;
            let stencilRef = depthStencilParam.stencilRef;
            let stencilReadMask = depthStencilParam.stencilReadMask;
            let stencilWriteMask = depthStencilParam.stencilWriteMask;
            let stencilOp = depthStencilParam.stencilOp;
            let stencilState = stencilEnable ? 1 : 0 + (stencilTest << 1) + ((stencilWrite ? 1 : 0) << 4) + (stencilOp.x << 5) + (stencilOp.y << 8) + (stencilOp.z << 11);
            let stencilState2 = stencilRef & 0xff + ((stencilReadMask & 0xff) << 8) + ((stencilWriteMask & 0xff) << 16);
            let stencilStateKey = `${stencilState}_${stencilState2}`;
            return `${depthStateKey}|${stencilStateKey}`;
        }
        static _getDepthStencilCacheID(format, depthStencilParam) {
            let key = this.getDepthStencilParamCacheID(depthStencilParam);
            return `${format}|${key}`;
        }
        static _createDepthStencilState(format, depthStencilParam) {
            let stateFormat;
            let stateDepthCompare;
            switch (format) {
                case Laya.RenderTargetFormat.DEPTH_16:
                    stateFormat = "depth16unorm";
                    break;
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_8:
                    stateFormat = "depth24plus-stencil8";
                    break;
                case Laya.RenderTargetFormat.DEPTH_32:
                    stateFormat = "depth32float";
                    break;
                case Laya.RenderTargetFormat.STENCIL_8:
                    stateFormat = "stencil8";
                    break;
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_Plus:
                    stateFormat = "depth24plus";
                    break;
                default:
                    stateFormat = "depth24plus-stencil8";
                    break;
            }
            switch (depthStencilParam.depthTest) {
                case Laya.CompareFunction.Never:
                    stateDepthCompare = "never";
                    break;
                case Laya.CompareFunction.Less:
                    stateDepthCompare = "less";
                    break;
                case Laya.CompareFunction.Equal:
                    stateDepthCompare = "equal";
                    break;
                case Laya.CompareFunction.LessEqual:
                    stateDepthCompare = "less-equal";
                    break;
                case Laya.CompareFunction.Greater:
                    stateDepthCompare = "greater";
                    break;
                case Laya.CompareFunction.NotEqual:
                    stateDepthCompare = "not-equal";
                    break;
                case Laya.CompareFunction.GreaterEqual:
                    stateDepthCompare = "greater-equal";
                    break;
                case Laya.CompareFunction.Always:
                    stateDepthCompare = "always";
                    break;
                default:
                    stateDepthCompare = "less";
                    break;
            }
            const state = {
                format: stateFormat,
                depthCompare: stateDepthCompare,
                depthWriteEnabled: depthStencilParam.depthWrite,
            };
            if (depthStencilParam.depthWrite && depthStencilParam.depthBias) {
                state.depthBias = depthStencilParam.depthBiasConstant;
                state.depthBiasSlopeScale = depthStencilParam.depthBiasSlopeScale;
                state.depthBiasClamp = depthStencilParam.depthBiasClamp;
            }
            if (depthStencilParam.stencilEnable) {
                let stateStencilCompare;
                let stateFailOp = getGPUStencilOperation(depthStencilParam.stencilOp.x);
                let stateDepthFailOp = getGPUStencilOperation(depthStencilParam.stencilOp.y);
                let statePassOp = getGPUStencilOperation(depthStencilParam.stencilOp.z);
                switch (depthStencilParam.stencilTest) {
                    case Laya.RenderState.STENCILTEST_NEVER:
                        stateStencilCompare = 'never';
                        break;
                    case Laya.RenderState.STENCILTEST_LESS:
                        stateStencilCompare = 'less';
                        break;
                    case Laya.RenderState.STENCILTEST_EQUAL:
                        stateStencilCompare = 'equal';
                        break;
                    case Laya.RenderState.STENCILTEST_GREATER:
                        stateStencilCompare = 'greater';
                        break;
                    case Laya.RenderState.STENCILTEST_NOTEQUAL:
                        stateStencilCompare = 'not-equal';
                        break;
                    case Laya.RenderState.STENCILTEST_GEQUAL:
                        stateStencilCompare = 'greater-equal';
                        break;
                    case Laya.RenderState.STENCILTEST_ALWAYS:
                        stateStencilCompare = 'always';
                        break;
                    default:
                        stateStencilCompare = 'less';
                        break;
                }
                state.stencilFront = {
                    compare: stateStencilCompare,
                    failOp: stateFailOp,
                    depthFailOp: stateDepthFailOp,
                    passOp: statePassOp
                };
                state.stencilReadMask = depthStencilParam.stencilReadMask || 0xff;
                if (depthStencilParam.stencilWrite)
                    state.stencilWriteMask = depthStencilParam.stencilWriteMask || 0xff;
            }
            return state;
        }
    }
    WebGPUDepthStencilState._idCounter = 0;
    WebGPUDepthStencilState._cache = new Map();
    class WebGPUPrimitiveState {
        static getGPUPrimitiveState(topology, frontFace, cullMode) {
            const cacheID = this._getGPUPrimitiveStateID(topology, frontFace, cullMode);
            let state = this._cache[cacheID];
            if (!state)
                this._cache[cacheID] = state = { state: this._createPrimitiveState(topology, frontFace, cullMode), key: cacheID, id: this._idCounter++ };
            return state;
        }
        static _getGPUPrimitiveStateID(topology, frontFace, cullMode) {
            return (topology << this._pointer_Topology) +
                (frontFace << this._pointer_FrontFace) +
                (cullMode << this._pointer_CullMode);
        }
        static _createPrimitiveState(topology, frontFace, cullMode) {
            const state = {};
            switch (topology) {
                case Laya.MeshTopology.Points:
                    state.topology = "point-list";
                    break;
                case Laya.MeshTopology.Lines:
                    state.topology = "line-list";
                    break;
                case Laya.MeshTopology.LineStrip:
                    state.topology = "line-strip";
                    break;
                case Laya.MeshTopology.Triangles:
                    state.topology = "triangle-list";
                    break;
                case Laya.MeshTopology.TriangleStrip:
                    state.topology = "triangle-strip";
                    break;
                default:
                    state.topology = "triangle-list";
                    break;
            }
            switch (cullMode) {
                case Laya.CullMode.Off:
                    state.cullMode = "none";
                    break;
                case Laya.CullMode.Back:
                    state.cullMode = "back";
                    break;
                case Laya.CullMode.Front:
                    state.cullMode = "front";
                    break;
            }
            switch (frontFace) {
                case Laya.FrontFace.CCW:
                    state.frontFace = "ccw";
                    break;
                case Laya.FrontFace.CW:
                    state.frontFace = "cw";
                    break;
            }
            return state;
        }
    }
    WebGPUPrimitiveState._idCounter = 0;
    WebGPUPrimitiveState._pointer_Topology = 0;
    WebGPUPrimitiveState._pointer_FrontFace = 4;
    WebGPUPrimitiveState._pointer_CullMode = 8;
    WebGPUPrimitiveState._cache = {};
    class IRenderPipelineInfo {
    }
    function getGPUStencilOperation(key) {
        switch (key) {
            case Laya.StencilOperation.Keep:
                return "keep";
            case Laya.StencilOperation.Zero:
                return "zero";
            case Laya.StencilOperation.Invert:
                return "invert";
            case Laya.StencilOperation.Replace:
                return "replace";
            case Laya.StencilOperation.IncrementSaturate:
                return "increment-clamp";
            case Laya.StencilOperation.DecrementSaturate:
                return "decrement-clamp";
            case Laya.StencilOperation.IncrementWrap:
                return "increment-wrap";
            case Laya.StencilOperation.DecrementWrap:
                return "decrement-wrap";
        }
    }
    function getDepthStencilParamFromShader(shaderData, shaderInstance, dest, depthStencilParam) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const data = shaderData.getData();
        const renderState = (shaderInstance._shaderPass).renderState;
        {
            const depthWrite = (_b = ((_a = renderState.depthWrite) !== null && _a !== void 0 ? _a : data[Laya.Shader3D.DEPTH_WRITE])) !== null && _b !== void 0 ? _b : Laya.RenderState.Default.depthWrite;
            const depthTest = (_d = ((_c = renderState.depthTest) !== null && _c !== void 0 ? _c : data[Laya.Shader3D.DEPTH_TEST])) !== null && _d !== void 0 ? _d : Laya.RenderState.Default.depthTest;
            let depthBias = (_e = data[Laya.Shader3D.DEPTH_BIAS]) !== null && _e !== void 0 ? _e : Laya.RenderState.Default.depthBias;
            let depthBiasConstant = (_f = data[Laya.Shader3D.DEPTH_BIAS_CONSTANT]) !== null && _f !== void 0 ? _f : Laya.RenderState.Default.depthBiasConstant;
            let depthBiasSlopeScale = (_g = data[Laya.Shader3D.DEPTH_BIAS_SLOPESCALE]) !== null && _g !== void 0 ? _g : Laya.RenderState.Default.depthBiasSlopeScale;
            let depthBiasClamp = (_h = data[Laya.Shader3D.DEPTH_BIAS_CLAMP]) !== null && _h !== void 0 ? _h : Laya.RenderState.Default.depthBiasClamp;
            depthStencilParam.depthWrite = depthWrite;
            depthStencilParam.depthTest = depthTest;
            depthStencilParam.depthBias = depthBias;
            depthStencilParam.depthBiasConstant = depthBiasConstant;
            depthStencilParam.depthBiasSlopeScale = depthBiasSlopeScale;
            depthStencilParam.depthBiasClamp = depthBiasClamp;
        }
        {
            const stencilParam = depthStencilParam;
            const stencilTest = (_k = ((_j = renderState.stencilTest) !== null && _j !== void 0 ? _j : data[Laya.Shader3D.STENCIL_TEST])) !== null && _k !== void 0 ? _k : Laya.RenderState.Default.stencilTest;
            let formatHasStencil = dest.depthStencilFormat === Laya.RenderTargetFormat.STENCIL_8 || dest.depthStencilFormat === Laya.RenderTargetFormat.DEPTHSTENCIL_24_8 || dest.depthStencilFormat === Laya.RenderTargetFormat.DEPTHSTENCIL_24_Plus;
            const stencilRef = (_m = (_l = renderState.stencilRef) !== null && _l !== void 0 ? _l : data[Laya.Shader3D.STENCIL_Ref]) !== null && _m !== void 0 ? _m : Laya.RenderState.Default.stencilRef;
            const stencilWrite = (_p = (_o = renderState.stencilWrite) !== null && _o !== void 0 ? _o : data[Laya.Shader3D.STENCIL_WRITE]) !== null && _p !== void 0 ? _p : Laya.RenderState.Default.stencilWrite;
            const stencilOp = stencilWrite ? ((_r = (_q = renderState.stencilOp) !== null && _q !== void 0 ? _q : data[Laya.Shader3D.STENCIL_Op]) !== null && _r !== void 0 ? _r : Laya.RenderState.Default.stencilOp) : Laya.RenderState.Default.stencilOp;
            const stencilReadMask = (_t = (_s = renderState.stencilReadMask) !== null && _s !== void 0 ? _s : data[Laya.Shader3D.STENCIL_READ_MASK]) !== null && _t !== void 0 ? _t : Laya.RenderState.Default.stencilReadMask;
            const stencilWriteMask = stencilWrite ? ((_v = (_u = renderState.stencilWriteMask) !== null && _u !== void 0 ? _u : data[Laya.Shader3D.STENCIL_WRITE_MASK]) !== null && _v !== void 0 ? _v : Laya.RenderState.Default.stencilWriteMask) : 0x00;
            stencilParam.stencilEnable = stencilTest !== Laya.RenderState.STENCILTEST_OFF && formatHasStencil;
            stencilParam.stencilTest = stencilTest;
            stencilParam.stencilRef = stencilRef;
            stencilParam.stencilWrite = stencilWrite;
            stencilParam.stencilOp = stencilOp;
            stencilParam.stencilReadMask = stencilReadMask;
            stencilParam.stencilWriteMask = stencilWriteMask;
        }
    }
    function getDepthStencilParamFromMaterial(shaderData, dest, depthStencilParam) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const data = shaderData.getData();
        const depthWrite = (_a = data[Laya.Shader3D.DEPTH_WRITE]) !== null && _a !== void 0 ? _a : Laya.RenderState.Default.depthWrite;
        const depthTest = (_b = data[Laya.Shader3D.DEPTH_TEST]) !== null && _b !== void 0 ? _b : Laya.RenderState.Default.depthTest;
        let depthBias = (_c = data[Laya.Shader3D.DEPTH_BIAS]) !== null && _c !== void 0 ? _c : Laya.RenderState.Default.depthBias;
        let depthBiasConstant = (_d = data[Laya.Shader3D.DEPTH_BIAS_CONSTANT]) !== null && _d !== void 0 ? _d : Laya.RenderState.Default.depthBiasConstant;
        let depthBiasSlopeScale = (_e = data[Laya.Shader3D.DEPTH_BIAS_SLOPESCALE]) !== null && _e !== void 0 ? _e : Laya.RenderState.Default.depthBiasSlopeScale;
        let depthBiasClamp = (_f = data[Laya.Shader3D.DEPTH_BIAS_CLAMP]) !== null && _f !== void 0 ? _f : Laya.RenderState.Default.depthBiasClamp;
        depthStencilParam.depthWrite = depthWrite;
        depthStencilParam.depthTest = depthTest;
        depthStencilParam.depthBias = depthBias;
        depthStencilParam.depthBiasConstant = depthBiasConstant;
        depthStencilParam.depthBiasSlopeScale = depthBiasSlopeScale;
        depthStencilParam.depthBiasClamp = depthBiasClamp;
        let formatHasStencil = dest.depthStencilFormat === Laya.RenderTargetFormat.STENCIL_8 || dest.depthStencilFormat === Laya.RenderTargetFormat.DEPTHSTENCIL_24_8 || dest.depthStencilFormat === Laya.RenderTargetFormat.DEPTHSTENCIL_24_Plus;
        const stencilTest = (_g = data[Laya.Shader3D.STENCIL_TEST]) !== null && _g !== void 0 ? _g : Laya.RenderState.Default.stencilTest;
        const stencilRef = (_h = data[Laya.Shader3D.STENCIL_Ref]) !== null && _h !== void 0 ? _h : Laya.RenderState.Default.stencilRef;
        const stencilWrite = (_j = data[Laya.Shader3D.STENCIL_WRITE]) !== null && _j !== void 0 ? _j : Laya.RenderState.Default.stencilWrite;
        const stencilOp = stencilWrite ? ((_k = data[Laya.Shader3D.STENCIL_Op]) !== null && _k !== void 0 ? _k : Laya.RenderState.Default.stencilOp) : Laya.RenderState.Default.stencilOp;
        let stencilReadMask = (_l = data[Laya.Shader3D.STENCIL_READ_MASK]) !== null && _l !== void 0 ? _l : Laya.RenderState.Default.stencilReadMask;
        let stencilWriteMask = stencilWrite ? ((_m = data[Laya.Shader3D.STENCIL_WRITE_MASK]) !== null && _m !== void 0 ? _m : Laya.RenderState.Default.stencilWriteMask) : 0x00;
        depthStencilParam.stencilEnable = stencilTest !== Laya.RenderState.STENCILTEST_OFF && formatHasStencil;
        depthStencilParam.stencilTest = stencilTest;
        depthStencilParam.stencilRef = stencilRef;
        depthStencilParam.stencilWrite = stencilWrite;
        depthStencilParam.stencilOp = stencilOp;
        depthStencilParam.stencilReadMask = stencilReadMask;
        depthStencilParam.stencilWriteMask = stencilWriteMask;
    }

    var PrimitiveDataViewGet;
    (function (PrimitiveDataViewGet) {
        PrimitiveDataViewGet["f32"] = "getFloat32";
        PrimitiveDataViewGet["u32"] = "getUint32";
        PrimitiveDataViewGet["i32"] = "getInt32";
    })(PrimitiveDataViewGet || (PrimitiveDataViewGet = {}));
    var PrimitiveDataViewSet;
    (function (PrimitiveDataViewSet) {
        PrimitiveDataViewSet["f32"] = "setFloat32";
        PrimitiveDataViewSet["u32"] = "setUint32";
        PrimitiveDataViewSet["i32"] = "setInt32";
    })(PrimitiveDataViewSet || (PrimitiveDataViewSet = {}));
    exports.wgsl = void 0;
    (function (wgsl) {
        (function (PrimitiveToGPUVertexFormat) {
            PrimitiveToGPUVertexFormat["u32"] = "uint32";
            PrimitiveToGPUVertexFormat["i32"] = "sint32";
            PrimitiveToGPUVertexFormat["f32"] = "float32";
            PrimitiveToGPUVertexFormat["vec2f"] = "float32x2";
            PrimitiveToGPUVertexFormat["vec3f"] = "float32x3";
            PrimitiveToGPUVertexFormat["vec4f"] = "float32x4";
            PrimitiveToGPUVertexFormat["vec2i"] = "sint32x2";
            PrimitiveToGPUVertexFormat["vec3i"] = "sint32x3";
            PrimitiveToGPUVertexFormat["vec4i"] = "sint32x4";
            PrimitiveToGPUVertexFormat["vec2u"] = "uint32x2";
            PrimitiveToGPUVertexFormat["vec3u"] = "uint32x3";
            PrimitiveToGPUVertexFormat["vec4u"] = "uint32x4";
        })(wgsl.PrimitiveToGPUVertexFormat || (wgsl.PrimitiveToGPUVertexFormat = {}));
        const PrimitiveTypedArrayLenMap = Object.freeze({
            vec2: 2,
            vec3: 3,
            vec4: 4,
            mat3x3: 12,
            mat4x4: 16,
        });
        const PrimitiveAlignSize = Object.freeze({
            f32: { size: 4, align: 4 },
            u32: { size: 4, align: 4 },
            i32: { size: 4, align: 4 },
            vec2f: { size: 8, align: 8 },
            vec2u: { size: 8, align: 8 },
            vec2i: { size: 8, align: 8 },
            vec3f: { size: 12, align: 16 },
            vec3u: { size: 12, align: 16 },
            vec3i: { size: 12, align: 16 },
            vec4f: { size: 16, align: 16 },
            vec4u: { size: 16, align: 16 },
            vec4i: { size: 16, align: 16 },
            mat3x3f: { size: 48, align: 16 },
            mat4x4f: { size: 64, align: 16 },
        });
        wgsl.SuffixTypedArrayMap = {
            f: Float32Array,
            u: Uint32Array,
            i: Int32Array,
        };
        function nextAlign(current, align) {
            let aligned = current - (current % align);
            if (current % align != 0)
                aligned += align;
            return aligned;
        }
        function structSize(struct, ignoreAlign) {
            let stride = 0;
            for (const value of Object.values(struct)) {
                const { align, size } = structValueSizeAlign(value);
                stride = nextAlign(stride, ignoreAlign ? 1 : align) + size;
            }
            stride = nextAlign(stride, structAlign(struct, ignoreAlign));
            return stride;
        }
        wgsl.structSize = structSize;
        function structValueSizeAlign(value) {
            let align, size, itemSize;
            if (Array.isArray(value)) {
                align = structAlign(value[0]);
                itemSize = structSize(value[0]);
                size = itemSize * value[1];
            }
            else if (typeof value === 'object') {
                align = structAlign(value);
                size = structSize(value);
            }
            else {
                ({ align, size } = PrimitiveAlignSize[value]);
            }
            return { align, size, itemSize: itemSize !== null && itemSize !== void 0 ? itemSize : size };
        }
        function structAlign(struct, ignoreAlign) {
            if (ignoreAlign)
                return 1;
            return Math.max(...Object.values(struct).map(value => {
                if (Array.isArray(value))
                    return structAlign(value[0]);
                else if (typeof value === 'object')
                    return structAlign(value);
                else
                    return PrimitiveAlignSize[value].align;
            }));
        }
        wgsl.structAlign = structAlign;
        function structView(buffer, struct, byteOffset = 0, ignoreAlign = false, info) {
            const view = {};
            const dataView = new DataView(buffer);
            let stride = byteOffset;
            for (let [key, value] of Object.entries(struct)) {
                const { align, size, itemSize } = structValueSizeAlign(value);
                const offset = nextAlign(stride, ignoreAlign ? 1 : align);
                if (Array.isArray(value)) {
                    const arrayView = new Array(value[1]);
                    if (info) {
                        const arrayInfo = [];
                        for (let i = 0, il = value[1]; i < il; i++) {
                            arrayInfo[i] = {};
                            arrayView[i] = structView(buffer, value[0], offset + itemSize * i, ignoreAlign, arrayInfo[i]);
                        }
                        info[key] = arrayInfo;
                    }
                    else
                        for (let i = 0, il = value[1]; i < il; i++) {
                            arrayView[i] = structView(buffer, value[0], offset + itemSize * i, ignoreAlign);
                        }
                    Object.freeze(arrayView);
                    view[key] = arrayView;
                }
                else if (typeof value === 'object') {
                    if (info)
                        info[key] = {};
                    view[key] = structView(buffer, value, offset, ignoreAlign, info ? info[key] : undefined);
                }
                else {
                    if (info)
                        info[key] = { offset, size };
                    if (value.startsWith('vec') || value.startsWith('mat')) {
                        const suffixType = value[value.length - 1];
                        const prefix = value.slice(0, -1);
                        const TypedArray = wgsl.SuffixTypedArrayMap[suffixType];
                        const length = PrimitiveTypedArrayLenMap[prefix];
                        view[key] = new TypedArray(buffer, offset, length);
                    }
                    else {
                        const numberValue = value;
                        const get = PrimitiveDataViewGet[numberValue];
                        const set = PrimitiveDataViewSet[numberValue];
                        Object.defineProperty(view, key, {
                            get() {
                                return dataView[get](offset, true);
                            },
                            set(v) {
                                dataView[set](offset, v, true);
                            },
                        });
                    }
                }
                stride = offset + size;
            }
            Object.freeze(view);
            return view;
        }
        wgsl.structView = structView;
        function plainStructInfo(plainStruct, ignoreAlign) {
            const info = {};
            let stride = 0;
            for (let [key, value] of Object.entries(plainStruct)) {
                const { align, size } = structValueSizeAlign(value);
                const offset = nextAlign(stride, ignoreAlign ? 1 : align);
                info[key] = { offset, size };
                stride = offset + size;
            }
            return info;
        }
        wgsl.plainStructInfo = plainStructInfo;
        function struct(struct) {
            return struct;
        }
        wgsl.struct = struct;
        class StructBuffer {
            constructor(struct, ignoreAlign, genInfo) {
                this.struct = struct;
                const byteLength = wgsl.structSize(struct, ignoreAlign);
                this.buffer = new Uint8Array(byteLength);
                if (genInfo)
                    this.info = {};
                this.view = wgsl.structView(this.buffer.buffer, struct, 0, ignoreAlign, this.info);
            }
            clone() {
                return new StructBuffer(this.struct);
            }
        }
        wgsl.StructBuffer = StructBuffer;
        function stringifyStruct(name, struct, structCache = new Map()) {
            let structStr = `struct ${name} {
${Object.entries(struct)
            .map(([key, value]) => {
            let typeStr;
            if (Array.isArray(value)) {
                typeStr = `array<${name}_${key}${value[2] ? '' : `, ${value[1]}`}>`;
                if (!structCache.has(JSON.stringify(value[0]))) {
                    stringifyStruct(`${name}_${key}`, value[0], structCache);
                }
            }
            else if (typeof value === 'object') {
                typeStr = `${name}_${key}`;
                if (!structCache.has(JSON.stringify(value))) {
                    stringifyStruct(typeStr, value, structCache);
                }
            }
            else {
                typeStr = value;
            }
            return `  ${key}: ${typeStr},`;
        })
            .join('\n')}
};`;
            structCache.set(JSON.stringify(struct), { name, structStr });
            const subStruct = [...structCache.values()]
                .filter(i => i.name !== name)
                .map(i => i.structStr)
                .join('\n');
            return subStruct + '\n' + structStr;
        }
        wgsl.stringifyStruct = stringifyStruct;
    })(exports.wgsl || (exports.wgsl = {}));

    class WebGPUUniformBufferDescriptor {
        constructor(lable) {
            this.lable = lable;
            this.uniforms = new Map();
        }
        get byteLength() {
            return this._byteLength;
        }
        _getPrimitive(type) {
            switch (type) {
                case Laya.ShaderDataType.Int:
                case Laya.ShaderDataType.Bool:
                    return "i32";
                case Laya.ShaderDataType.Float:
                    return "f32";
                case Laya.ShaderDataType.Vector2:
                    return "vec2f";
                case Laya.ShaderDataType.Vector3:
                    return "vec3f";
                case Laya.ShaderDataType.Vector4u:
                    return "vec4u";
                case Laya.ShaderDataType.Vector4:
                case Laya.ShaderDataType.Color:
                    return "vec4f";
                case Laya.ShaderDataType.Matrix3x3:
                    return "mat3x3f";
                case Laya.ShaderDataType.Matrix4x4:
                    return "mat4x4f";
                case Laya.ShaderDataType.Buffer:
                case Laya.ShaderDataType.Texture2D:
                case Laya.ShaderDataType.Texture3D:
                case Laya.ShaderDataType.TextureCube:
                case Laya.ShaderDataType.Texture2DArray:
                case Laya.ShaderDataType.None:
                default:
                    return null;
            }
        }
        _getsize(type) {
            switch (type) {
                case Laya.ShaderDataType.Int:
                case Laya.ShaderDataType.Bool:
                case Laya.ShaderDataType.Float:
                    return 1;
                case Laya.ShaderDataType.Vector2:
                    return 2;
                case Laya.ShaderDataType.Vector3:
                    return 3;
                case Laya.ShaderDataType.Vector4u:
                case Laya.ShaderDataType.Vector4:
                case Laya.ShaderDataType.Color:
                    return 4;
                case Laya.ShaderDataType.Matrix3x3:
                    return 9;
                case Laya.ShaderDataType.Matrix4x4:
                    return 16;
                case Laya.ShaderDataType.Buffer:
                case Laya.ShaderDataType.Texture2D:
                case Laya.ShaderDataType.Texture3D:
                case Laya.ShaderDataType.TextureCube:
                case Laya.ShaderDataType.Texture2DArray:
                case Laya.ShaderDataType.None:
                default:
                    return null;
            }
        }
        setUniforms(uniforms) {
            let bufferStruct = {};
            for (const [key, value] of uniforms) {
                let structKey = value.propertyName;
                let primitive;
                primitive = this._getPrimitive(value.uniformtype);
                if (!primitive)
                    continue;
                if (value.arrayLength < 1) {
                    bufferStruct[structKey] = primitive;
                }
                else {
                    let arraystruct = [
                        {
                            structKey: primitive
                        },
                        value.arrayLength
                    ];
                    bufferStruct[structKey] = arraystruct;
                }
            }
            let strucbuffer = new exports.wgsl.StructBuffer(bufferStruct, false, true);
            let infos = strucbuffer.info;
            this._byteLength = strucbuffer.buffer.length;
            this._byteLength = (Math.ceil(this._byteLength / 16)) * 16;
            for (const [key, value] of uniforms) {
                let offset, viewByteLength, size, alignStride;
                size = this._getsize(value.uniformtype);
                if (!size)
                    continue;
                let tsc = Float32Array;
                if (value.uniformtype == Laya.ShaderDataType.Int || value.uniformtype == Laya.ShaderDataType.Bool)
                    tsc = Int32Array;
                if (value.uniformtype == Laya.ShaderDataType.Vector4u)
                    tsc = Uint32Array;
                if (value.arrayLength > 1) {
                    let info = infos[value.propertyName];
                    offset = info[0].structKey.offset;
                    let oneElementbyte = info[1].structKey.offset - offset;
                    viewByteLength = oneElementbyte * info.length;
                    alignStride = oneElementbyte / tsc.BYTES_PER_ELEMENT;
                }
                else {
                    let info = infos[value.propertyName];
                    offset = info.offset;
                    viewByteLength = info.size;
                    alignStride = info.size / tsc.BYTES_PER_ELEMENT;
                }
                let uniform = {
                    index: key,
                    view: null,
                    size: size,
                    alignStride: alignStride,
                    offset: offset,
                    dataView: tsc,
                    viewByteLength: viewByteLength,
                    arrayLength: value.arrayLength,
                };
                this.uniforms.set(key, uniform);
            }
        }
        destroy() {
            this.uniforms.clear();
        }
    }
    class WebGPUUniformBufferBase {
        constructor() {
            this.objectName = 'WebGPUUniformBufferBase';
            this.globalId = WebGPUGlobal.getId(this);
        }
        setInt(index, value) {
            let uniform = this.descriptor.uniforms.get(index);
            if (uniform) {
                uniform.view[0] = value;
                this.needUpload = true;
            }
        }
        setFloat(index, value) {
            let uniform = this.descriptor.uniforms.get(index);
            if (uniform) {
                uniform.view[0] = value;
                this.needUpload = true;
            }
        }
        setVector2(index, value) {
            let uniform = this.descriptor.uniforms.get(index);
            if (uniform) {
                uniform.view[0] = value.x;
                uniform.view[1] = value.y;
                this.needUpload = true;
            }
        }
        setVector3(index, value) {
            let uniform = this.descriptor.uniforms.get(index);
            if (uniform) {
                uniform.view[0] = value.x;
                uniform.view[1] = value.y;
                uniform.view[2] = value.z;
                this.needUpload = true;
            }
        }
        setVector4(index, value) {
            let uniform = this.descriptor.uniforms.get(index);
            if (uniform) {
                uniform.view[0] = value.x;
                uniform.view[1] = value.y;
                uniform.view[2] = value.z;
                uniform.view[3] = value.w;
                this.needUpload = true;
            }
        }
        setMatrix3x3(index, value) {
            let uniform = this.descriptor.uniforms.get(index);
            if (uniform) {
                let element = value.elements;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        uniform.view[i * 4 + j] = element[i * 3 + j];
                    }
                }
                this.needUpload = true;
            }
        }
        setMatrix4x4(index, value) {
            let uniform = this.descriptor.uniforms.get(index);
            if (uniform) {
                uniform.view.set(value.elements);
                this.needUpload = true;
            }
        }
        setBuffer(index, value) {
            let uniform = this.descriptor.uniforms.get(index);
            if (uniform) {
                uniform.view.set(value);
                this.needUpload = true;
            }
        }
        setArrayBuffer(index, value) {
            let uniform = this.descriptor.uniforms.get(index);
            if (uniform) {
                let arrayLength = uniform.arrayLength;
                let size = uniform.size;
                let alignStride = uniform.alignStride;
                for (let i = 0; i < arrayLength; i++) {
                    uniform.view.set(value.subarray(i * size, (i + 1) * size), i * alignStride);
                }
                this.needUpload = true;
            }
        }
        setMatrix3x3Array(index, value) {
            let uniform = this.descriptor.uniforms.get(index);
            if (uniform) {
                let arrayLength = uniform.arrayLength;
                uniform.size;
                let alignStride = uniform.alignStride;
                for (let i = 0; i < arrayLength; i++) {
                    for (let j = 0; j < 3; j++) {
                        for (let k = 0; k < 3; k++) {
                            uniform.view[i * alignStride + j * 4 + k] = value[i * 9 + j * 3 + k];
                        }
                    }
                }
                this.needUpload = true;
            }
        }
        setUniformData(index, type, data) {
            let uniform = this.descriptor.uniforms.get(index);
            if (uniform) {
                switch (type) {
                    case Laya.ShaderDataType.Bool:
                        if (uniform.arrayLength > 0) ;
                        else {
                            let vaule = data;
                            this.setInt(index, vaule ? 1 : 0);
                        }
                        break;
                    case Laya.ShaderDataType.Int:
                        if (uniform.arrayLength > 0) {
                            this.setArrayBuffer(index, data);
                        }
                        else {
                            this.setInt(index, data);
                        }
                        break;
                    case Laya.ShaderDataType.Float:
                        if (uniform.arrayLength > 0) {
                            this.setArrayBuffer(index, data);
                        }
                        else {
                            this.setFloat(index, data);
                        }
                        break;
                    case Laya.ShaderDataType.Vector2:
                        if (uniform.arrayLength > 0) {
                            this.setArrayBuffer(index, data);
                        }
                        else {
                            this.setVector2(index, data);
                        }
                        break;
                    case Laya.ShaderDataType.Vector3:
                        if (uniform.arrayLength > 0) {
                            this.setArrayBuffer(index, data);
                        }
                        else {
                            this.setVector3(index, data);
                        }
                        break;
                    case Laya.ShaderDataType.Vector4:
                    case Laya.ShaderDataType.Color:
                        if (uniform.arrayLength > 0) {
                            this.setArrayBuffer(index, data);
                        }
                        else {
                            this.setVector4(index, data);
                        }
                        break;
                    case Laya.ShaderDataType.Matrix3x3:
                        if (uniform.arrayLength > 0) {
                            this.setMatrix3x3Array(index, data);
                        }
                        else {
                            this.setMatrix3x3(index, data);
                        }
                        break;
                    case Laya.ShaderDataType.Matrix4x4:
                        if (uniform.arrayLength > 0) {
                            this.setArrayBuffer(index, data);
                        }
                        else {
                            this.setMatrix4x4(index, data);
                        }
                        break;
                    case Laya.ShaderDataType.Buffer:
                        break;
                    case Laya.ShaderDataType.None:
                    case Laya.ShaderDataType.Texture2D:
                    case Laya.ShaderDataType.Texture3D:
                    case Laya.ShaderDataType.TextureCube:
                    case Laya.ShaderDataType.Texture2DArray:
                }
            }
        }
    }

    class WebGPUSubUniformBuffer extends WebGPUUniformBufferBase {
        constructor(lable, uniformMap, owner) {
            super();
            this.uniformName = lable;
            let descriptor = this.descriptor = new WebGPUUniformBufferDescriptor(lable);
            descriptor.setUniforms(uniformMap);
            this.bytelength = descriptor.byteLength;
            let uboManager = this.manager = WebGPURenderEngine._instance.gpuBufferMgr;
            this.bufferBlock = uboManager.getBlock(this.bytelength, this);
            this._reSetBindGroupEntry();
            this._owner = owner;
            this.notifyGPUBufferChange();
        }
        _reSetBindGroupEntry() {
            var _a;
            this._gpuBuffer = this.bufferBlock.cluster.buffer;
            let resource = {
                buffer: this._gpuBuffer,
                offset: this.bufferBlock.offset,
                size: this.descriptor.byteLength,
            };
            let oldResource = (_a = this._GPUBindGroupEntry) === null || _a === void 0 ? void 0 : _a.resource;
            if (oldResource && oldResource.buffer == resource.buffer &&
                oldResource.offset == resource.offset &&
                oldResource.size == resource.size) {
                return;
            }
            this._GPUBindGroupEntry = {
                binding: 0,
                resource: resource
            };
            if (oldResource) {
                this.globalId = WebGPUGlobal.getId(this);
            }
        }
        getBindGroupEntry(binding) {
            this._GPUBindGroupEntry.binding = binding;
            return this._GPUBindGroupEntry;
        }
        upload() {
            this.needUpload && this.bufferBlock.needUpload();
        }
        notifyGPUBufferChange(info) {
            this.offset = this.bufferBlock.offset;
            this.descriptor.uniforms.forEach(uniform => {
                let size = uniform.viewByteLength / uniform.dataView.BYTES_PER_ELEMENT;
                let offset = uniform.offset + this.bufferBlock.offset;
                uniform.view = new uniform.dataView(this.bufferBlock.cluster.data, offset, size);
            });
            this.needUpload = true;
            this.bufferBlock.needUpload();
            if (info) {
                this._reSetBindGroupEntry();
                if (this._owner) {
                    let mapID = Laya.Shader3D.propertyNameToID(this.descriptor.lable);
                    this._owner && this._owner.bindGroupUpdateBuffer(mapID, this);
                }
            }
        }
        updateOver() {
            this.needUpload = false;
        }
        destroy() {
            this.manager.freeBlock(this.bufferBlock);
        }
    }

    class WebGPUUniformBuffer extends WebGPUUniformBufferBase {
        constructor(lable, uniformMap) {
            super();
            this.uniformName = lable;
            let descriptor = this.descriptor = new WebGPUUniformBufferDescriptor(lable);
            descriptor.setUniforms(uniformMap);
            let _data = this._data = new Float32Array(descriptor.byteLength);
            let buffer = _data.buffer;
            for (const [key, uniform] of descriptor.uniforms) {
                uniform.view = new uniform.dataView(buffer, uniform.offset, uniform.viewByteLength / uniform.dataView.BYTES_PER_ELEMENT);
            }
            this._gpuBuffer = WebGPURenderEngine._instance.getDevice().createBuffer({
                label: this.lable,
                size: buffer.byteLength,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });
            this._GPUBindGroupEntry = {
                binding: 0,
                resource: {
                    buffer: this._gpuBuffer,
                    offset: 0,
                    size: this.bytelength,
                }
            };
            this.needUpload = true;
        }
        getBindGroupEntry(binding) {
            this._GPUBindGroupEntry.binding = binding;
            return this._GPUBindGroupEntry;
        }
        upload() {
            if (this.needUpload) {
                WebGPUUniformBufferBase.device.queue.writeBuffer(this._gpuBuffer, 0, this._data, 0, this._data.length);
                this.needUpload = false;
                Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_UBOBufferUploadCount, 1);
                Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_UBOBufferUploadMemory, this._data.length / 1048576);
                Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_BufferUploadCount, 1);
            }
        }
        destroy() {
            this._data = null;
        }
    }

    class WebGPUShaderData extends Laya.ShaderData {
        static __init__() {
            Laya.Material.__initDefine__();
        }
        static endFrame() {
        }
        get textureStatesMap() {
            return this._textureStatesMap;
        }
        get blendStateCache() {
            if (this._needUpdateBlendStateCache) {
                this.updateBlendStateCache();
            }
            return this._blendStateCache;
        }
        updateBlendStateCache() {
            var _a;
            this._needUpdateBlendStateCache = false;
            const blend = (_a = this._data[Laya.Shader3D.BLEND]) !== null && _a !== void 0 ? _a : Laya.RenderState.Default.blend;
            switch (blend) {
                case Laya.RenderState.BLEND_DISABLE:
                    this._blendStateCache = WebGPUBlendState.getBlendState(blend, Laya.RenderState.BLENDEQUATION_ADD, Laya.RenderState.BLENDPARAM_ONE, Laya.RenderState.BLENDPARAM_ZERO, Laya.RenderState.BLENDEQUATION_ADD, Laya.RenderState.BLENDPARAM_ONE, Laya.RenderState.BLENDPARAM_ZERO);
                    break;
                case Laya.RenderState.BLEND_ENABLE_ALL:
                    let blendEquation = this._data[Laya.Shader3D.BLEND_EQUATION];
                    blendEquation = blendEquation !== null && blendEquation !== void 0 ? blendEquation : Laya.RenderState.Default.blendEquation;
                    let srcBlend = this._data[Laya.Shader3D.BLEND_SRC];
                    srcBlend = srcBlend !== null && srcBlend !== void 0 ? srcBlend : Laya.RenderState.Default.srcBlend;
                    let dstBlend = this._data[Laya.Shader3D.BLEND_DST];
                    dstBlend = dstBlend !== null && dstBlend !== void 0 ? dstBlend : Laya.RenderState.Default.dstBlend;
                    this._blendStateCache = WebGPUBlendState.getBlendState(blend, blendEquation, srcBlend, dstBlend, blendEquation, srcBlend, dstBlend);
                    break;
                case Laya.RenderState.BLEND_ENABLE_SEPERATE:
                    let blendEquationRGB = this._data[Laya.Shader3D.BLEND_EQUATION_RGB];
                    blendEquationRGB = blendEquationRGB !== null && blendEquationRGB !== void 0 ? blendEquationRGB : Laya.RenderState.Default.blendEquationRGB;
                    let blendEquationAlpha = this._data[Laya.Shader3D.BLEND_EQUATION_ALPHA];
                    blendEquationAlpha = blendEquationAlpha !== null && blendEquationAlpha !== void 0 ? blendEquationAlpha : Laya.RenderState.Default.blendEquationAlpha;
                    let srcRGB = this._data[Laya.Shader3D.BLEND_SRC_RGB];
                    srcRGB = srcRGB !== null && srcRGB !== void 0 ? srcRGB : Laya.RenderState.Default.srcBlendRGB;
                    let dstRGB = this._data[Laya.Shader3D.BLEND_DST_RGB];
                    dstRGB = dstRGB !== null && dstRGB !== void 0 ? dstRGB : Laya.RenderState.Default.dstBlendRGB;
                    let srcAlpha = this._data[Laya.Shader3D.BLEND_SRC_ALPHA];
                    srcAlpha = srcAlpha !== null && srcAlpha !== void 0 ? srcAlpha : Laya.RenderState.Default.srcBlendAlpha;
                    let dstAlpha = this._data[Laya.Shader3D.BLEND_DST_ALPHA];
                    dstAlpha = dstAlpha !== null && dstAlpha !== void 0 ? dstAlpha : Laya.RenderState.Default.dstBlendAlpha;
                    this._blendStateCache = WebGPUBlendState.getBlendState(blend, blendEquationRGB, srcRGB, dstRGB, blendEquationAlpha, srcAlpha, dstAlpha);
                    break;
                default:
                    console.warn("WebGPUShaderData: unknown blend state: " + blend);
                    break;
            }
        }
        get depthStencilStateKey() {
            if (this._needUpdateDepthStencilStateCache) {
                this.updateDepthStencilStateCache();
            }
            return this._depthStencilStateKey;
        }
        set depthStencilStateKey(value) {
            this._depthStencilStateKey = value;
        }
        updateDepthStencilStateCache() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            this._needUpdateDepthStencilStateCache = false;
            const data = this._data;
            let depthStencilParam = this._depthStencilParam;
            const depthWrite = (_a = data[Laya.Shader3D.DEPTH_WRITE]) !== null && _a !== void 0 ? _a : Laya.RenderState.Default.depthWrite;
            const depthTest = (_b = data[Laya.Shader3D.DEPTH_TEST]) !== null && _b !== void 0 ? _b : Laya.RenderState.Default.depthTest;
            let depthBias = (_c = data[Laya.Shader3D.DEPTH_BIAS]) !== null && _c !== void 0 ? _c : Laya.RenderState.Default.depthBias;
            let depthBiasConstant = (_d = data[Laya.Shader3D.DEPTH_BIAS_CONSTANT]) !== null && _d !== void 0 ? _d : Laya.RenderState.Default.depthBiasConstant;
            let depthBiasSlopeScale = (_e = data[Laya.Shader3D.DEPTH_BIAS_SLOPESCALE]) !== null && _e !== void 0 ? _e : Laya.RenderState.Default.depthBiasSlopeScale;
            let depthBiasClamp = (_f = data[Laya.Shader3D.DEPTH_BIAS_CLAMP]) !== null && _f !== void 0 ? _f : Laya.RenderState.Default.depthBiasClamp;
            depthStencilParam.depthWrite = depthWrite;
            depthStencilParam.depthTest = depthTest;
            depthStencilParam.depthBias = depthBias;
            depthStencilParam.depthBiasConstant = depthBiasConstant;
            depthStencilParam.depthBiasSlopeScale = depthBiasSlopeScale;
            depthStencilParam.depthBiasClamp = depthBiasClamp;
            let formatHasStencil = true;
            const stencilTest = (_g = data[Laya.Shader3D.STENCIL_TEST]) !== null && _g !== void 0 ? _g : Laya.RenderState.Default.stencilTest;
            const stencilRef = (_h = data[Laya.Shader3D.STENCIL_Ref]) !== null && _h !== void 0 ? _h : Laya.RenderState.Default.stencilRef;
            const stencilWrite = (_j = data[Laya.Shader3D.STENCIL_WRITE]) !== null && _j !== void 0 ? _j : Laya.RenderState.Default.stencilWrite;
            const stencilOp = stencilWrite ? ((_k = data[Laya.Shader3D.STENCIL_Op]) !== null && _k !== void 0 ? _k : Laya.RenderState.Default.stencilOp) : Laya.RenderState.Default.stencilOp;
            let stencilReadMask = (_l = data[Laya.Shader3D.STENCIL_READ_MASK]) !== null && _l !== void 0 ? _l : Laya.RenderState.Default.stencilReadMask;
            let stencilWriteMask = stencilWrite ? ((_m = data[Laya.Shader3D.STENCIL_WRITE_MASK]) !== null && _m !== void 0 ? _m : Laya.RenderState.Default.stencilWriteMask) : 0x00;
            depthStencilParam.stencilEnable = stencilTest !== Laya.RenderState.STENCILTEST_OFF && formatHasStencil;
            depthStencilParam.stencilTest = stencilTest;
            depthStencilParam.stencilRef = stencilRef;
            depthStencilParam.stencilWrite = stencilWrite;
            depthStencilParam.stencilOp = stencilOp;
            depthStencilParam.stencilReadMask = stencilReadMask;
            depthStencilParam.stencilWriteMask = stencilWriteMask;
            this._depthStencilStateKey = WebGPUDepthStencilState.getDepthStencilParamCacheID(depthStencilParam);
        }
        _checkRenderState(index) {
            if (Laya.isBlendProperty(index)) {
                this._needUpdateBlendStateCache = true;
            }
            else if (Laya.isDepthStencilProperty(index)) {
                this._needUpdateDepthStencilStateCache = true;
            }
        }
        _clearRenderStateCheck() {
            this._needUpdateBlendStateCache = true;
            this._needUpdateDepthStencilStateCache = true;
        }
        constructor(ownerResource = null) {
            super(ownerResource);
            this._id = WebGPUShaderData.pointerCount++;
            this._subUboBufferNumber = 0;
            this._textureStatesMap = new Map();
            this._textureData = {};
            this._needUpdateBlendStateCache = true;
            this._needUpdateDepthStencilStateCache = false;
            this._depthStencilParam = new DepthStencilParam();
            this._BindGroupFlagMap = new Map();
            this._BindGroupLayoutFlagMap = new Map();
            this._propertyLinkBindGroupMap = {};
            this._data = {};
            this._gammaColorMap = new Map();
            this._defineDatas = new WebDefineDatas();
            this._uniformBuffers = new Map();
            this._subUniformBuffers = new Map();
            this._uniformBuffersPropertyMap = new Map();
        }
        nearEqual(n1, n2) {
            return Math.abs(n1 - n2) < Number.EPSILON;
        }
        addBindGroupChangeLink(commandMapID, uniformMap) {
            let mapID = Laya.Shader3D.propertyNameToID(commandMapID);
            if (this._BindGroupFlagMap.has(mapID))
                return;
            this._BindGroupFlagMap.set(mapID, new Set());
            this._BindGroupLayoutFlagMap.set(mapID, new Set());
            let uboid = Laya.Shader3D.propertyNameToID(commandMapID);
            let notifyArray = this._propertyLinkBindGroupMap[uboid];
            if (!notifyArray)
                notifyArray = this._propertyLinkBindGroupMap[uboid] = [];
            notifyArray.push(mapID);
            uniformMap.forEach((uniform, index) => {
                if (!Laya.isUboBufferShaderType(uniform.uniformtype)) {
                    let notifyArray = this._propertyLinkBindGroupMap[uniform.id];
                    if (!notifyArray)
                        notifyArray = this._propertyLinkBindGroupMap[uniform.id] = [];
                    notifyArray.push(mapID);
                }
            });
        }
        removeBindGroupChangeLink(commandMapID, uniformMap) {
            let mapID = Laya.Shader3D.propertyNameToID(commandMapID);
            if (!this._BindGroupFlagMap.has(mapID))
                return;
            this._BindGroupFlagMap.delete(mapID);
            this._BindGroupLayoutFlagMap.delete(mapID);
            let uboid = Laya.Shader3D.propertyNameToID(commandMapID);
            let notifyArray = this._propertyLinkBindGroupMap[uboid];
            if (notifyArray) {
                let pos = notifyArray.indexOf(mapID);
                notifyArray.splice(pos, 1);
            }
            uniformMap.forEach((uniform, index) => {
                if (!Laya.isUboBufferShaderType(uniform.uniformtype)) {
                    let notifyArray = this._propertyLinkBindGroupMap[uniform.id];
                    if (notifyArray) {
                        let pos = notifyArray.indexOf(mapID);
                        notifyArray.splice(pos, 1);
                    }
                }
            });
        }
        addBindGroupChangeFlag(commandMapID, flag, layoutFlag) {
            let mapID = Laya.Shader3D.propertyNameToID(commandMapID);
            if (this._BindGroupFlagMap.has(mapID)) {
                let setBindgroup = this._BindGroupFlagMap.get(mapID);
                if (!setBindgroup.has(flag)) {
                    flag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                    setBindgroup.add(flag);
                }
                let setlayout = this._BindGroupLayoutFlagMap.get(mapID);
                if (!setlayout.has(layoutFlag)) {
                    layoutFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                    setlayout.add(layoutFlag);
                }
            }
        }
        removeBindGroupChangeFlag(commandMapID, flag, layoutFlag) {
            let mapID = Laya.Shader3D.propertyNameToID(commandMapID);
            if (this._BindGroupFlagMap.has(mapID)) {
                this._BindGroupFlagMap.get(mapID).delete(flag);
                flag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                layoutFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                this._BindGroupLayoutFlagMap.get(mapID).delete(layoutFlag);
            }
        }
        _initBufferData(uniformBuffer, name, uniformMap) {
            this._textureStatesMap.set(name, 0);
            let valueMap = new Map();
            if (uniformBuffer.descriptor.byteLength > 0) {
                valueMap.set(Laya.Shader3D.propertyNameToID(name), uniformBuffer.globalId);
            }
            uniformMap.forEach(uniform => {
                let uniformId = uniform.id;
                let data = this._data[uniformId];
                if (data != null) {
                    uniformBuffer.setUniformData(uniformId, uniform.uniformtype, data);
                }
                this._uniformBuffersPropertyMap.set(uniformId, uniformBuffer);
                this._updateTextureState(uniformId, name, data);
            });
        }
        createUniformBuffer(name, uniformMap) {
            if (this._uniformBuffers.has(name)) {
                return this._uniformBuffers.get(name);
            }
            let uboBuffer = new WebGPUUniformBuffer(name, uniformMap._idata);
            this._uniformBuffers.set(name, uboBuffer);
            let id = Laya.Shader3D.propertyNameToID(name);
            this._data[id] = uboBuffer;
            this._initBufferData(uboBuffer, name, uniformMap._idata);
            return uboBuffer;
        }
        _cacheSubUniformBuffer(buffer, name, cacheName, uniformMap) {
            let subBuffer = this._subUniformBuffers.get(cacheName);
            if (!subBuffer || buffer != subBuffer) {
                if (!subBuffer) {
                    this._subUboBufferNumber++;
                }
                buffer.notifyGPUBufferChange();
                this._subUniformBuffers.set(cacheName, buffer);
                this._textureStatesMap.set(cacheName, 0);
                let id = Laya.Shader3D.propertyNameToID(name);
                this._data[id] = buffer;
                uniformMap.forEach(uniform => {
                    let uniformId = uniform.id;
                    this._uniformBuffersPropertyMap.set(uniformId, buffer);
                });
            }
        }
        createSubUniformBuffer(name, cacheName, uniformMap) {
            let subBuffer = this._subUniformBuffers.get(cacheName);
            if (subBuffer) {
                return subBuffer;
            }
            let uniformBuffer = new WebGPUSubUniformBuffer(cacheName, uniformMap, this);
            uniformBuffer.uniformName = name;
            if (uniformBuffer.bytelength == 0) {
                return null;
            }
            this._subUboBufferNumber++;
            uniformBuffer.notifyGPUBufferChange();
            this._subUniformBuffers.set(cacheName, uniformBuffer);
            let id = Laya.Shader3D.propertyNameToID(name);
            this._data[id] = uniformBuffer;
            this._initBufferData(uniformBuffer, cacheName, uniformMap);
            return uniformBuffer;
        }
        getData() {
            return this._data;
        }
        getDefineData() {
            return this._defineDatas;
        }
        addDefine(define) {
            this._defineDatas.add(define);
        }
        addDefines(define) {
            this._defineDatas.addDefineDatas(define);
        }
        removeDefine(define) {
            this._defineDatas.remove(define);
        }
        removeDefines(defines) {
            this._defineDatas.removeDefineDatas(defines);
        }
        hasDefine(define) {
            return this._defineDatas.has(define);
        }
        clearDefine() {
            this._defineDatas.clear();
        }
        getBool(index) {
            return this._data[index];
        }
        setBool(index, value) {
            if (this._data[index] === value)
                return;
            this._data[index] = value;
        }
        getInt(index) {
            return this._data[index];
        }
        setInt(index, value) {
            if (this._data[index] === value)
                return;
            this._data[index] = value;
            if (this._uniformBuffersPropertyMap.has(index)) {
                let buffer = this._uniformBuffersPropertyMap.get(index);
                buffer.setInt(index, value);
            }
            this._checkRenderState(index);
        }
        getNumber(index) {
            return this._data[index];
        }
        setNumber(index, value) {
            if (this.nearEqual(this._data[index], value))
                return;
            this._data[index] = value;
            if (this._uniformBuffersPropertyMap.has(index)) {
                let buffer = this._uniformBuffersPropertyMap.get(index);
                buffer.setFloat(index, value);
            }
            this._checkRenderState(index);
        }
        getVector2(index) {
            return this._data[index];
        }
        setVector2(index, value) {
            if (this._data[index]) {
                if (Laya.Vector2.equals(this._data[index], value))
                    return;
                value.cloneTo(this._data[index]);
            }
            else
                this._data[index] = value.clone();
            if (this._uniformBuffersPropertyMap.has(index)) {
                let buffer = this._uniformBuffersPropertyMap.get(index);
                buffer.setVector2(index, value);
            }
        }
        getVector3(index) {
            return this._data[index];
        }
        setVector3(index, value) {
            if (this._data[index]) {
                if (Laya.Vector3.equals(this._data[index], value))
                    return;
                value.cloneTo(this._data[index]);
            }
            else
                this._data[index] = value.clone();
            if (this._uniformBuffersPropertyMap.has(index)) {
                let buffer = this._uniformBuffersPropertyMap.get(index);
                buffer.setVector3(index, value);
            }
        }
        getVector(index) {
            return this._data[index];
        }
        setVector(index, value) {
            if (this._data[index]) {
                if (Laya.Vector4.equals(this._data[index], value))
                    return;
                value.cloneTo(this._data[index]);
            }
            else
                this._data[index] = value.clone();
            if (this._uniformBuffersPropertyMap.has(index)) {
                let buffer = this._uniformBuffersPropertyMap.get(index);
                buffer.setVector4(index, value);
            }
        }
        getColor(index) {
            return this._gammaColorMap.get(index);
        }
        setColor(index, value) {
            if (!value)
                return;
            if (this._data[index]) {
                let gammaColor = this._gammaColorMap.get(index);
                if (gammaColor.equal(value))
                    return;
                value.cloneTo(gammaColor);
                let linearColor = this._data[index];
                linearColor.x = Laya.Color.gammaToLinearSpace(value.r);
                linearColor.y = Laya.Color.gammaToLinearSpace(value.g);
                linearColor.z = Laya.Color.gammaToLinearSpace(value.b);
                linearColor.w = value.a;
            }
            else {
                let linearColor = new Laya.Vector4();
                linearColor.x = Laya.Color.gammaToLinearSpace(value.r);
                linearColor.y = Laya.Color.gammaToLinearSpace(value.g);
                linearColor.z = Laya.Color.gammaToLinearSpace(value.b);
                linearColor.w = value.a;
                this._data[index] = linearColor;
                this._gammaColorMap.set(index, value.clone());
            }
            if (this._uniformBuffersPropertyMap.has(index)) {
                let buffer = this._uniformBuffersPropertyMap.get(index);
                let color = this._data[index];
                buffer.setVector4(index, color);
            }
        }
        getLinearColor(index) {
            return this._data[index];
        }
        getMatrix3x3(index) {
            return this._data[index];
        }
        setMatrix3x3(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else {
                this._data[index] = value.clone();
            }
            if (this._uniformBuffersPropertyMap.has(index)) {
                let buffer = this._uniformBuffersPropertyMap.get(index);
                buffer.setMatrix3x3(index, value);
            }
        }
        getMatrix4x4(index) {
            return this._data[index];
        }
        setMatrix4x4(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else {
                this._data[index] = value.clone();
            }
            if (this._uniformBuffersPropertyMap.has(index)) {
                let buffer = this._uniformBuffersPropertyMap.get(index);
                buffer.setMatrix4x4(index, value);
            }
        }
        getBuffer(index) {
            return this._data[index];
        }
        setBuffer(index, value) {
            this._data[index] = value;
            if (this._uniformBuffersPropertyMap.has(index)) {
                let buffer = this._uniformBuffersPropertyMap.get(index);
                buffer.setArrayBuffer(index, value);
            }
        }
        setTexture(index, value) {
            var lastValue = this._textureData[index];
            if (value && value.bitmap)
                value = value.bitmap;
            this._textureData[index] = value;
            if (value) {
                this._setInternalTexture(index, value._texture);
            }
            else {
                this._setInternalTexture(index, null);
            }
            lastValue && lastValue._removeReference();
            value && value._addReference();
        }
        _updateTextureState(index, mapName, value) {
            var _a;
            if (this._textureStatesMap.has(mapName)) {
                let map = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(mapName);
                if (!map._textureBits.has(index)) {
                    return false;
                }
                value = value || ((_a = map._defaultData.get(index)) === null || _a === void 0 ? void 0 : _a._texture);
                let textureBit = map._textureBits.get(index);
                let stateMask = this._textureStatesMap.get(mapName);
                let oldStateMask = stateMask;
                let sampler = { type: "filtering" };
                if (value) {
                    let tex = value;
                    tex._getSampleBindingLayout(sampler);
                }
                if (sampler.type != "filtering") {
                    stateMask = stateMask | (1 << textureBit);
                }
                else {
                    stateMask = stateMask & ~(1 << textureBit);
                }
                this._textureStatesMap.set(mapName, stateMask);
                return stateMask != oldStateMask;
            }
            return false;
        }
        bindGroupUpdateBuffer(index, value) {
            let bindgroupMap = this._propertyLinkBindGroupMap[index];
            if (bindgroupMap && bindgroupMap.length > 0) {
                for (var i = 0; i < bindgroupMap.length; i++) {
                    let bidngroupMap = this._BindGroupFlagMap.get(bindgroupMap[i]);
                    bidngroupMap.forEach(value => {
                        value.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                    });
                }
            }
        }
        bindGroupUpdateTex(index, value) {
            let bindgroupMap = this._propertyLinkBindGroupMap[index];
            if (bindgroupMap && bindgroupMap.length > 0) {
                for (var i = 0; i < bindgroupMap.length; i++) {
                    let bidngroupMap = this._BindGroupFlagMap.get(bindgroupMap[i]);
                    bidngroupMap.forEach(value => {
                        value.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                    });
                }
            }
            let layoutChange = false;
            let buffer = this._uniformBuffersPropertyMap.get(index);
            if (buffer) {
                let name = buffer.descriptor.lable;
                layoutChange = this._updateTextureState(index, name, value);
            }
            if (layoutChange) {
                let bindgroupMap = this._propertyLinkBindGroupMap[index];
                if (bindgroupMap && bindgroupMap.length > 0) {
                    for (var i = 0; i < bindgroupMap.length; i++) {
                        let bidngroupMap = this._BindGroupLayoutFlagMap.get(bindgroupMap[i]);
                        bidngroupMap.forEach(value => {
                            value.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                        });
                    }
                }
            }
        }
        _setInternalTexture(index, value) {
            const lastValue = this._data[index];
            if (lastValue != value) {
                if (lastValue) {
                    lastValue.shaderDatas.delete(this);
                }
                if (value) {
                    const shaderDefine = WebGPURenderEngine._instance._texGammaDefine[index];
                    if (shaderDefine) {
                        if (value.gammaCorrection > 1)
                            this.addDefine(shaderDefine);
                        else
                            this.removeDefine(shaderDefine);
                    }
                    value.shaderDatas.set(this, index);
                }
                this._data[index] = value;
                this.bindGroupUpdateTex(index, value);
            }
        }
        update(name) {
            let unifomrMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(name);
            let uniformBuffer = this.createSubUniformBuffer(name, name, unifomrMap._idata);
            uniformBuffer.upload();
            this.addBindGroupChangeLink(name, unifomrMap._idata);
        }
        setDeviceBuffer(index, value) {
            let lastBuffer = this._data[index];
            if (this._data[index] != value) {
                if (lastBuffer) {
                    lastBuffer._removeCacheShaderData(this);
                }
                this._data[index] = value;
                if (value) {
                    value._addCacheShaderData(this, index);
                }
                let bindgroupMap = this._propertyLinkBindGroupMap[index];
                if (bindgroupMap && bindgroupMap.length > 0) {
                    for (var i = 0; i < bindgroupMap.length; i++) {
                        let bidngroupMap = this._BindGroupFlagMap.get(bindgroupMap[i]);
                        bidngroupMap.forEach(value => {
                            value.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                        });
                    }
                }
            }
        }
        getTexture(index) {
            return this._textureData[index];
        }
        cloneTo(dest) {
            dest.clearData();
            var destData = dest._data;
            for (var k in this._data) {
                var value = this._data[k];
                if (value != null) {
                    if (typeof value == "number") {
                        destData[k] = value;
                    }
                    else if (typeof value == "boolean") {
                        destData[k] = value;
                    }
                    else if (value instanceof Laya.Vector2) {
                        destData[k] || (destData[k] = new Laya.Vector2());
                        dest.setVector2(parseInt(k), value);
                    }
                    else if (value instanceof Laya.Vector3) {
                        destData[k] || (destData[k] = new Laya.Vector3());
                        dest.setVector3(parseInt(k), value);
                    }
                    else if (value instanceof Laya.Vector4) {
                        let color = this.getColor(parseInt(k));
                        if (color) {
                            let clonecolor = color.clone();
                            dest.setColor(parseInt(k), clonecolor);
                        }
                        else {
                            destData[k] || (destData[k] = new Laya.Vector4());
                            dest.setVector(parseInt(k), value);
                        }
                    }
                    else if (value instanceof Laya.Matrix3x3) {
                        destData[k] || (destData[k] = new Laya.Matrix3x3());
                        dest.setMatrix3x3(parseInt(k), value);
                    }
                    else if (value instanceof Laya.Matrix4x4) {
                        destData[k] || (destData[k] = new Laya.Matrix4x4());
                        dest.setMatrix4x4(parseInt(k), value);
                    }
                    else if (value instanceof Laya.Resource) {
                        destData[k] = value;
                        value._addReference();
                    }
                }
            }
            this._defineDatas.cloneTo(dest._defineDatas);
            this._gammaColorMap.forEach((color, index) => {
                dest._gammaColorMap.set(index, color.clone());
            });
            for (let texInfo in this._textureData) {
                dest.setTexture(parseInt(texInfo), this._textureData[texInfo]);
            }
        }
        clone() {
            const dest = new WebGPUShaderData();
            this.cloneTo(dest);
            return dest;
        }
        clearUBO() {
            this._uniformBuffersPropertyMap.clear();
            this._uniformBuffers.forEach(buffer => {
                buffer.destroy();
            });
            this._uniformBuffers.clear();
            this._subUniformBuffers.forEach(buffer => {
                buffer.destroy();
            });
            this._subUniformBuffers.clear();
        }
        clearData() {
            for (const index in this._data) {
                if (this._data[index] instanceof Laya.Resource)
                    this._data[index]._removeReference();
                if (this._data[index] instanceof WebGPUDeviceBuffer)
                    this._data[index]._removeCacheShaderData(this);
            }
            this._data = {};
            this._uniformBuffers.forEach((buffer, name) => {
                let id = Laya.Shader3D.propertyNameToID(name);
                this._data[id] = buffer;
                buffer.descriptor.uniforms.forEach((uniform, index) => {
                    uniform.view.fill(0);
                });
                buffer.needUpload = true;
            });
            this._subUniformBuffers.forEach((buffer, name) => {
                let id = Laya.Shader3D.propertyNameToID(buffer.uniformName);
                this._data[id] = buffer;
                buffer.descriptor.uniforms.forEach((uniform, index) => {
                    uniform.view.fill(0);
                });
                buffer.needUpload = true;
            });
            this._gammaColorMap.clear();
            this.clearDefine();
            this._subUboBufferNumber = 0;
            this._textureStatesMap.clear();
            this._clearRenderStateCheck();
        }
        destroy() {
            this.clearData();
            this.clearUBO();
            this._defineDatas.destroy();
            this._gammaColorMap.clear();
        }
    }
    WebGPUShaderData.pointerCount = 0;

    const byDevice$2 = new WeakMap();
    function getColorBlitWGSL(invertY) {
        const uvY = invertY ? '1.0 - uv.y' : 'uv.y';
        return `
        @group(0) @binding(0) var srcSampler: sampler;
        @group(0) @binding(1) var srcTexture: texture_2d<f32>;

        struct VSOutput {
            @builtin(position) position: vec4f,
            @location(0) texcoord: vec2f,
        };

        @vertex fn vs(@builtin(vertex_index) vertexIndex: u32) -> VSOutput {
            var pos = array<vec2f, 3>(
                vec2f(-1.0, -1.0),
                vec2f(-1.0,  3.0),
                vec2f( 3.0, -1.0),
            );
            var vsOutput: VSOutput;
            let xy = pos[vertexIndex];
            vsOutput.position = vec4f(xy, 0.0, 1.0);
            vsOutput.texcoord = xy * vec2f(0.5, -0.5) + vec2f(0.5);
            return vsOutput;
        }

        @fragment fn fs(fsInput: VSOutput) -> @location(0) vec4f {
            let uv = fsInput.texcoord;
            return textureSample(srcTexture, srcSampler, vec2f(uv.x, ${uvY}));
        }
    `;
    }
    function getDepthBlitWGSL(invertY, msaa) {
        const yExpr = invertY
            ? 'i32(dims.y) - 1 - coord.y'
            : 'coord.y';
        if (msaa) {
            return `
        @group(0) @binding(0) var srcTexture: texture_depth_multisampled_2d;

        struct VSOutput {
            @builtin(position) position: vec4f,
        };

        @vertex fn vs(@builtin(vertex_index) vertexIndex: u32) -> VSOutput {
            var pos = array<vec2f, 3>(
                vec2f(-1.0, -1.0),
                vec2f(-1.0,  3.0),
                vec2f( 3.0, -1.0),
            );
            var vsOutput: VSOutput;
            vsOutput.position = vec4f(pos[vertexIndex], 0.0, 1.0);
            return vsOutput;
        }

        @fragment fn fs(fsInput: VSOutput) -> @builtin(frag_depth) f32 {
            let coord = vec2i(fsInput.position.xy);
            let dims = textureDimensions(srcTexture);
            return textureLoad(srcTexture, vec2i(coord.x, ${yExpr}), 0);
        }
    `;
        }
        return `
        @group(0) @binding(0) var srcTexture: texture_depth_2d;

        struct VSOutput {
            @builtin(position) position: vec4f,
        };

        @vertex fn vs(@builtin(vertex_index) vertexIndex: u32) -> VSOutput {
            var pos = array<vec2f, 3>(
                vec2f(-1.0, -1.0),
                vec2f(-1.0,  3.0),
                vec2f( 3.0, -1.0),
            );
            var vsOutput: VSOutput;
            vsOutput.position = vec4f(pos[vertexIndex], 0.0, 1.0);
            return vsOutput;
        }

        @fragment fn fs(fsInput: VSOutput) -> @builtin(frag_depth) f32 {
            let coord = vec2i(fsInput.position.xy);
            let dims = textureDimensions(srcTexture, 0);
            return textureLoad(srcTexture, vec2i(coord.x, ${yExpr}), 0);
        }
    `;
    }
    function blitFramebuffer(device, srcColorTexture, dstColorTexture, dstColorFormat, srcDepthTexture, dstDepthTexture, dstDepthFormat, width, height, invertY) {
        let perDeviceInfo = byDevice$2.get(device);
        if (!perDeviceInfo) {
            perDeviceInfo = {
                colorSampler: null,
                colorPipelines: {},
                depthPipelines: {},
            };
            byDevice$2.set(device, perDeviceInfo);
        }
        if (!perDeviceInfo.colorSampler) {
            perDeviceInfo.colorSampler = device.createSampler({
                minFilter: 'nearest',
                magFilter: 'nearest',
            });
        }
        const colorSampler = perDeviceInfo.colorSampler;
        const encoder = device.createCommandEncoder({ label: 'blitFramebuffer encoder' });
        {
            const key = `${dstColorFormat}_${invertY}`;
            if (!perDeviceInfo.colorPipelines[key]) {
                const module = device.createShaderModule({
                    label: `blitFramebuffer color module (invertY=${invertY})`,
                    code: getColorBlitWGSL(invertY),
                });
                perDeviceInfo.colorPipelines[key] = device.createRenderPipeline({
                    label: `blitFramebuffer color pipeline`,
                    layout: 'auto',
                    vertex: { module, entryPoint: 'vs' },
                    fragment: {
                        module,
                        entryPoint: 'fs',
                        targets: [{ format: dstColorFormat }],
                    },
                });
            }
            const pipeline = perDeviceInfo.colorPipelines[key];
            const bindGroup = device.createBindGroup({
                layout: pipeline.getBindGroupLayout(0),
                entries: [
                    { binding: 0, resource: colorSampler },
                    { binding: 1, resource: srcColorTexture.createView() },
                ],
            });
            const pass = encoder.beginRenderPass({
                label: 'blitFramebuffer color pass',
                colorAttachments: [{
                        view: dstColorTexture.createView(),
                        loadOp: 'clear',
                        storeOp: 'store',
                    }],
            });
            pass.setPipeline(pipeline);
            pass.setBindGroup(0, bindGroup);
            pass.draw(3);
            pass.end();
        }
        if (srcDepthTexture && dstDepthTexture && dstDepthFormat) {
            const srcDepthMSAA = srcDepthTexture.sampleCount > 1;
            const key = `${dstDepthFormat}_${invertY}_msaa${srcDepthMSAA}`;
            if (!perDeviceInfo.depthPipelines[key]) {
                const module = device.createShaderModule({
                    label: `blitFramebuffer depth module (invertY=${invertY}, msaa=${srcDepthMSAA})`,
                    code: getDepthBlitWGSL(invertY, srcDepthMSAA),
                });
                perDeviceInfo.depthPipelines[key] = device.createRenderPipeline({
                    label: `blitFramebuffer depth pipeline`,
                    layout: 'auto',
                    vertex: { module, entryPoint: 'vs' },
                    fragment: {
                        module,
                        entryPoint: 'fs',
                        targets: [],
                    },
                    depthStencil: {
                        format: dstDepthFormat,
                        depthWriteEnabled: true,
                        depthCompare: 'always',
                    },
                });
            }
            const pipeline = perDeviceInfo.depthPipelines[key];
            const bindGroup = device.createBindGroup({
                layout: pipeline.getBindGroupLayout(0),
                entries: [
                    { binding: 0, resource: srcDepthTexture.createView({ aspect: 'depth-only' }) },
                ],
            });
            const hasStencil = dstDepthFormat === 'depth24plus-stencil8'
                || dstDepthFormat === 'depth32float-stencil8';
            const depthStencilAttachment = {
                view: dstDepthTexture.createView(),
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
                depthClearValue: 1.0,
            };
            if (hasStencil) {
                depthStencilAttachment.stencilLoadOp = 'load';
                depthStencilAttachment.stencilStoreOp = 'store';
            }
            const pass = encoder.beginRenderPass({
                label: 'blitFramebuffer depth pass',
                colorAttachments: [],
                depthStencilAttachment,
            });
            pass.setPipeline(pipeline);
            pass.setBindGroup(0, bindGroup);
            pass.draw(3);
            pass.end();
        }
        device.queue.submit([encoder.finish()]);
    }

    const isTypedArray = (arr) => arr && typeof arr.length === 'number' && arr.buffer instanceof ArrayBuffer && typeof arr.byteLength === 'number';
    function guessTextureBindingViewDimensionForTexture$1(texture) {
        switch (texture.dimension) {
            case '1d':
                return '1d';
            case '3d':
                return '3d';
            default:
            case '2d':
                return texture.depthOrArrayLayers > 1 ? '2d-array' : '2d';
        }
    }
    function normalizeGPUExtent3Dict(size) {
        return [size.width, size.height || 1, size.depthOrArrayLayers || 1];
    }
    function normalizeGPUExtent3D(size) {
        return (Array.isArray(size) || isTypedArray(size))
            ? [...size, 1, 1].slice(0, 3)
            : normalizeGPUExtent3Dict(size);
    }
    function numMipLevels(size, dimension) {
        const sizes = normalizeGPUExtent3D(size);
        const maxSize = Math.max(...sizes.slice(0, dimension === '3d' ? 3 : 2));
        return 1 + Math.log2(maxSize) | 0;
    }
    function getMipmapGenerationWGSL(textureBindingViewDimension) {
        let textureSnippet;
        let sampleSnippet;
        switch (textureBindingViewDimension) {
            case '2d':
                textureSnippet = 'texture_2d<f32>';
                sampleSnippet = 'textureSample(ourTexture, ourSampler, fsInput.texcoord)';
                break;
            case '2d-array':
                textureSnippet = 'texture_2d_array<f32>';
                sampleSnippet = `
          textureSample(
              ourTexture,
              ourSampler,
              fsInput.texcoord,
              uni.layer)`;
                break;
            case 'cube':
                textureSnippet = 'texture_cube<f32>';
                sampleSnippet = `
          textureSample(
              ourTexture,
              ourSampler,
              faceMat[uni.layer] * vec3f(fract(fsInput.texcoord), 1))`;
                break;
            case 'cube-array':
                textureSnippet = 'texture_cube_array<f32>';
                sampleSnippet = `
          textureSample(
              ourTexture,
              ourSampler,
              faceMat[uni.layer] * vec3f(fract(fsInput.texcoord), 1), uni.layer)`;
                break;
            default:
                throw new Error(`unsupported view: ${textureBindingViewDimension}`);
        }
        return `
        const faceMat = array(
          mat3x3f( 0,  0,  -2,  0, -2,   0,  1,  1,   1),   // pos-x
          mat3x3f( 0,  0,   2,  0, -2,   0, -1,  1,  -1),   // neg-x
          mat3x3f( 2,  0,   0,  0,  0,   2, -1,  1,  -1),   // pos-y
          mat3x3f( 2,  0,   0,  0,  0,  -2, -1, -1,   1),   // neg-y
          mat3x3f( 2,  0,   0,  0, -2,   0, -1,  1,   1),   // pos-z
          mat3x3f(-2,  0,   0,  0, -2,   0,  1,  1,  -1));  // neg-z

        struct VSOutput {
          @builtin(position) position: vec4f,
          @location(0) texcoord: vec2f,
        };

        @vertex fn vs(
          @builtin(vertex_index) vertexIndex : u32
        ) -> VSOutput {
          var pos = array<vec2f, 3>(
            vec2f(-1.0, -1.0),
            vec2f(-1.0,  3.0),
            vec2f( 3.0, -1.0),
          );

          var vsOutput: VSOutput;
          let xy = pos[vertexIndex];
          vsOutput.position = vec4f(xy, 0.0, 1.0);
          vsOutput.texcoord = xy * vec2f(0.5, -0.5) + vec2f(0.5);
          return vsOutput;
        }

        struct Uniforms {
          layer: u32,
        };

        @group(0) @binding(0) var ourSampler: sampler;
        @group(0) @binding(1) var ourTexture: ${textureSnippet};
        @group(0) @binding(2) var<uniform> uni: Uniforms;

        @fragment fn fs(fsInput: VSOutput) -> @location(0) vec4f {
          _ = uni.layer; // make sure this is used so all pipelines have the same bindings
          return ${sampleSnippet};
        }
      `;
    }
    const byDevice$1 = new WeakMap();
    function genMipmap(device, texture, textureBindingViewDimension) {
        let perDeviceInfo = byDevice$1.get(device);
        if (!perDeviceInfo) {
            perDeviceInfo = {
                pipelineByFormatAndView: {},
                moduleByViewType: {},
            };
            byDevice$1.set(device, perDeviceInfo);
        }
        let { sampler, uniformBuffer, uniformValues, } = perDeviceInfo;
        const { pipelineByFormatAndView, moduleByViewType, } = perDeviceInfo;
        textureBindingViewDimension = textureBindingViewDimension || guessTextureBindingViewDimensionForTexture$1(texture);
        let module = moduleByViewType[textureBindingViewDimension];
        if (!module) {
            const code = getMipmapGenerationWGSL(textureBindingViewDimension);
            module = device.createShaderModule({
                label: `mipLevelGeneration for ${textureBindingViewDimension}`,
                code,
            });
            moduleByViewType[textureBindingViewDimension] = module;
        }
        if (!sampler) {
            sampler = device.createSampler({
                minFilter: 'linear',
                magFilter: 'linear',
            });
            uniformBuffer = device.createBuffer({
                size: 16,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });
            uniformValues = new Uint32Array(1);
            Object.assign(perDeviceInfo, { sampler, uniformBuffer, uniformValues });
        }
        const id = `${texture.format}.${textureBindingViewDimension}`;
        if (!pipelineByFormatAndView[id]) {
            pipelineByFormatAndView[id] = device.createRenderPipeline({
                label: `mipLevelGenerator for ${textureBindingViewDimension}`,
                layout: 'auto',
                vertex: {
                    module,
                    entryPoint: 'vs',
                },
                fragment: {
                    module,
                    entryPoint: 'fs',
                    targets: [{ format: texture.format }],
                },
            });
        }
        const pipeline = pipelineByFormatAndView[id];
        for (let baseMipLevel = 1; baseMipLevel < texture.mipLevelCount; ++baseMipLevel) {
            for (let baseArrayLayer = 0; baseArrayLayer < texture.depthOrArrayLayers; ++baseArrayLayer) {
                uniformValues[0] = baseArrayLayer;
                device.queue.writeBuffer(uniformBuffer, 0, uniformValues);
                const bindGroup = device.createBindGroup({
                    layout: pipeline.getBindGroupLayout(0),
                    entries: [
                        { binding: 0, resource: sampler },
                        {
                            binding: 1,
                            resource: texture.createView({
                                dimension: textureBindingViewDimension,
                                baseMipLevel: baseMipLevel - 1,
                                mipLevelCount: 1,
                            }),
                        },
                        { binding: 2, resource: { buffer: uniformBuffer } },
                    ],
                });
                const renderPassDescriptor = {
                    label: 'mip gen renderPass',
                    colorAttachments: [
                        {
                            view: texture.createView({
                                dimension: '2d',
                                baseMipLevel,
                                mipLevelCount: 1,
                                baseArrayLayer,
                                arrayLayerCount: 1,
                            }),
                            loadOp: 'clear',
                            storeOp: 'store',
                        },
                    ],
                };
                const encoder = device.createCommandEncoder({
                    label: 'mip gen encoder',
                });
                const pass = encoder.beginRenderPass(renderPassDescriptor);
                pass.setPipeline(pipeline);
                pass.setBindGroup(0, bindGroup);
                pass.draw(3);
                pass.end();
                const commandBuffer = encoder.finish();
                device.queue.submit([commandBuffer]);
            }
        }
    }

    function guessTextureBindingViewDimensionForTexture(texture) {
        switch (texture.dimension) {
            case '1d':
                return '1d';
            case '3d':
                return '3d';
            default:
            case '2d':
                return texture.depthOrArrayLayers > 1 ? '2d-array' : '2d';
        }
    }
    function getGPUTextureDescriptor(dimension, width, height, format) {
        const textureSize = {
            width,
            height,
            depthOrArrayLayers: 1,
        };
        let usage = GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC;
        let dimensionType;
        switch (dimension) {
            case Laya.TextureDimension.Tex2D:
            case Laya.TextureDimension.Cube:
            case Laya.TextureDimension.Texture2DArray:
                dimensionType = exports.WebGPUTextureDimension.D2D;
                break;
            case Laya.TextureDimension.Tex3D:
                dimensionType = exports.WebGPUTextureDimension.D3D;
                break;
            default:
                throw "DimensionType Unknown format";
        }
        const textureDescriptor = {
            size: textureSize,
            mipLevelCount: 1,
            sampleCount: 1,
            dimension: dimensionType,
            format,
            usage,
        };
        return textureDescriptor;
    }
    function getPremultiplyAlphaWGSL(textureBindingViewDimension) {
        let textureSnippet;
        let sampleSnippet;
        switch (textureBindingViewDimension) {
            case '2d':
                textureSnippet = 'texture_2d<f32>';
                sampleSnippet = 'textureSample(ourTexture, ourSampler, fsInput.texcoord)';
                break;
            case '2d-array':
                textureSnippet = 'texture_2d_array<f32>';
                sampleSnippet = `
          textureSample(
              ourTexture,
              ourSampler,
              fsInput.texcoord,
              uni.layer)`;
                break;
            case 'cube':
                textureSnippet = 'texture_cube<f32>';
                sampleSnippet = `
          textureSample(
              ourTexture,
              ourSampler,
              faceMat[uni.layer] * vec3f(fract(fsInput.texcoord), 1))`;
                break;
            case 'cube-array':
                textureSnippet = 'texture_cube_array<f32>';
                sampleSnippet = `
          textureSample(
              ourTexture,
              ourSampler,
              faceMat[uni.layer] * vec3f(fract(fsInput.texcoord), 1), uni.layer)`;
                break;
            default:
                throw new Error(`unsupported view: ${textureBindingViewDimension}`);
        }
        return `
        const faceMat = array(
          mat3x3f( 0,  0,  -2,  0, -2,   0,  1,  1,   1),   // pos-x
          mat3x3f( 0,  0,   2,  0, -2,   0, -1,  1,  -1),   // neg-x
          mat3x3f( 2,  0,   0,  0,  0,   2, -1,  1,  -1),   // pos-y
          mat3x3f( 2,  0,   0,  0,  0,  -2, -1, -1,   1),   // neg-y
          mat3x3f( 2,  0,   0,  0, -2,   0, -1,  1,   1),   // pos-z
          mat3x3f(-2,  0,   0,  0, -2,   0,  1,  1,  -1));  // neg-z

        struct VSOutput {
          @builtin(position) position: vec4f,
          @location(0) texcoord: vec2f,
        };

        struct Uniforms {
          layer: f32,
          sx: f32,
          sy: f32,
          wx: f32,
          wy: f32,
        };

        @vertex fn vs(
          @builtin(vertex_index) vertexIndex : u32
        ) -> VSOutput {
          let pos1 = array<vec2f, 6>(
            vec2f(-1.0, 1.0),
            vec2f(1.0, 1.0),
            vec2f(-1.0, -1.0),
            vec2f(1.0, 1.0),
            vec2f(1.0, -1.0),
            vec2f(-1.0, -1.0),
          );

          let pos2 = array<vec2f, 6>(
            vec2f(uni.sx, uni.sy),
            vec2f(uni.sx + uni.wx, uni.sy),
            vec2f(uni.sx, uni.sy + uni.wy),
            vec2f(uni.sx + uni.wx, uni.sy),
            vec2f(uni.sx + uni.wx, uni.sy + uni.wy),
            vec2f(uni.sx, uni.sy + uni.wy),
          );

          var vsOutput: VSOutput;
          let xy1 = pos1[vertexIndex];
          let xy2 = pos2[vertexIndex];
          vsOutput.position = vec4f(xy1, 0.0, 1.0);
          vsOutput.texcoord = xy2 * vec2f(0.5) + vec2f(0.5);
          return vsOutput;
        }

        @group(0) @binding(0) var ourSampler: sampler;
        @group(0) @binding(1) var ourTexture: ${textureSnippet};
        @group(0) @binding(2) var<uniform> uni: Uniforms;

        @fragment fn fs(fsInput: VSOutput) -> @location(0) vec4f {
          _ = uni.layer; //make sure this is used so all pipelines have the same bindings
          let c = ${sampleSnippet};
          let r = c.x * c.w;
          let g = c.y * c.w;
          let b = c.z * c.w;
          let a = c.w;
          return vec4f(r, g, b, a);
        }
      `;
    }
    const byDevice = new WeakMap();
    function doPremultiplyAlpha(device, tex, xOffset, yOffset, width, height) {
        const texture = tex.resource;
        const tw = texture.width;
        const th = texture.height;
        const sx = -1.0 + xOffset / tw * 2.0;
        const sy = -1.0 + yOffset / th * 2.0;
        const wx = width / tw * 2.0;
        const wy = height / th * 2.0;
        const textureDescriptor = getGPUTextureDescriptor(tex.dimension, width, height, tex._webGPUFormat);
        const textureTemp = device.createTexture(textureDescriptor);
        let perDeviceInfo = byDevice.get(device);
        if (!perDeviceInfo) {
            perDeviceInfo = {
                pipelineByFormatAndView: {},
                moduleByViewType: {},
            };
            byDevice.set(device, perDeviceInfo);
        }
        let { sampler, uniformBuffer, uniformValues, } = perDeviceInfo;
        const { pipelineByFormatAndView, moduleByViewType, } = perDeviceInfo;
        const textureBindingViewDimension = guessTextureBindingViewDimensionForTexture(texture);
        let module = moduleByViewType[textureBindingViewDimension];
        if (!module) {
            const code = getPremultiplyAlphaWGSL(textureBindingViewDimension);
            module = device.createShaderModule({
                label: `premultiplyAlpha for ${textureBindingViewDimension}`,
                code,
            });
            moduleByViewType[textureBindingViewDimension] = module;
        }
        if (!sampler) {
            sampler = device.createSampler({
                minFilter: 'linear',
                magFilter: 'linear',
            });
            uniformBuffer = device.createBuffer({
                size: 32,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });
            uniformValues = new Float32Array(8);
            Object.assign(perDeviceInfo, { sampler, uniformBuffer, uniformValues });
        }
        const id = `${texture.format}.${textureBindingViewDimension}`;
        if (!pipelineByFormatAndView[id]) {
            pipelineByFormatAndView[id] = device.createRenderPipeline({
                label: `premultiplyAlpha for ${textureBindingViewDimension}`,
                layout: 'auto',
                vertex: {
                    module,
                    entryPoint: 'vs',
                },
                fragment: {
                    module,
                    entryPoint: 'fs',
                    targets: [{ format: texture.format }],
                },
            });
        }
        const pipeline = pipelineByFormatAndView[id];
        uniformValues[1] = sx;
        uniformValues[2] = sy;
        uniformValues[3] = wx;
        uniformValues[4] = wy;
        for (let baseArrayLayer = 0; baseArrayLayer < texture.depthOrArrayLayers; ++baseArrayLayer) {
            uniformValues[0] = baseArrayLayer;
            device.queue.writeBuffer(uniformBuffer, 0, uniformValues);
            const bindGroup = device.createBindGroup({
                layout: pipeline.getBindGroupLayout(0),
                entries: [
                    { binding: 0, resource: sampler },
                    {
                        binding: 1,
                        resource: texture.createView({
                            dimension: textureBindingViewDimension,
                            baseMipLevel: 0,
                            mipLevelCount: 1,
                        }),
                    },
                    { binding: 2, resource: { buffer: uniformBuffer } },
                ],
            });
            const renderPassDescriptor = {
                label: 'premultiAlpha renderPass',
                colorAttachments: [
                    {
                        view: textureTemp.createView({
                            dimension: '2d',
                            baseMipLevel: 0,
                            mipLevelCount: 1,
                            baseArrayLayer,
                            arrayLayerCount: 1,
                        }),
                        loadOp: 'clear',
                        storeOp: 'store',
                    },
                ],
            };
            const encoder = device.createCommandEncoder({
                label: 'premultiAlpha encoder',
            });
            const pass = encoder.beginRenderPass(renderPassDescriptor);
            pass.setPipeline(pipeline);
            pass.setBindGroup(0, bindGroup);
            pass.draw(6);
            pass.end();
            encoder.copyTextureToTexture({ texture: textureTemp }, { texture, origin: { x: xOffset, y: yOffset } }, { width, height, depthOrArrayLayers: 1 });
            const commandBuffer = encoder.finish();
            device.queue.submit([commandBuffer]);
        }
    }

    class WebGPUInternalRT {
        constructor(colorFormat, depthStencilFormat, isCube, generateMipmap, samples, sRGB) {
            this.isSRGB = false;
            this.gpuMemory = 0;
            this._stateCacheKey = '';
            this._arrayLayerIndex = -1;
            this._isCube = isCube;
            this._samples = samples;
            this.isSRGB = sRGB;
            this._generateMipmap = generateMipmap;
            this.colorFormat = colorFormat;
            this.depthStencilFormat = depthStencilFormat;
            this._textures = [];
            if (samples > 1)
                this._texturesResolve = [];
            this._colorStates = [];
            Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_RenderTexture, 1);
        }
        _getCacheInfo() {
            let id = "";
            if (this._textures && this._textures.length > 0) {
                for (let i = 0; i < this._textures.length; i++) {
                    if (this._textures[i]) {
                        id += `c${i}_${this._textures[i].format}_`;
                    }
                }
            }
            if (this._depthTexture) {
                id += `d_${this._depthTexture._webGPUFormat}`;
            }
            id += `_s${this._samples}`;
            id += this.isSRGB ? '_srgb' : '';
            this._stateCacheKey = id;
            if (WebGPUInternalRT._formatCounter.has(id))
                this.stateCacheID = WebGPUInternalRT._formatCounter.get(id);
            else {
                this.stateCacheID = WebGPUInternalRT._pipelineAttachIDCounter++;
                WebGPUInternalRT._formatCounter.set(id, this.stateCacheID);
            }
        }
        dispose() {
            if (this._textures) {
                for (let i = this._textures.length - 1; i > -1; i--)
                    this._textures[i].dispose();
                this._textures.length = 0;
            }
            if (this._texturesResolve) {
                for (let i = this._texturesResolve.length - 1; i > -1; i--)
                    this._texturesResolve[i].dispose();
                this._texturesResolve.length = 0;
            }
            if (this._depthTexture) {
                this._depthTexture.dispose();
                this._depthTexture = null;
            }
            Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_RenderTexture, -1);
        }
    }
    WebGPUInternalRT._formatCounter = new Map();
    WebGPUInternalRT._pipelineAttachIDCounter = 0;

    var GPUAddressMode;
    (function (GPUAddressMode) {
        GPUAddressMode["clamp"] = "clamp-to-edge";
        GPUAddressMode["repeat"] = "repeat";
        GPUAddressMode["mirror"] = "mirror-repeat";
    })(GPUAddressMode || (GPUAddressMode = {}));
    var GPUFilterMode;
    (function (GPUFilterMode) {
        GPUFilterMode["nearest"] = "nearest";
        GPUFilterMode["linear"] = "linear";
    })(GPUFilterMode || (GPUFilterMode = {}));
    var GPUCompareFunction;
    (function (GPUCompareFunction) {
        GPUCompareFunction["never"] = "never";
        GPUCompareFunction["less"] = "less";
        GPUCompareFunction["equal"] = "equal";
        GPUCompareFunction["less_equal"] = "less-equal";
        GPUCompareFunction["greater"] = "greater";
        GPUCompareFunction["not_equal"] = "not-equal";
        GPUCompareFunction["greater_equal"] = "greater-equal";
        GPUCompareFunction["always"] = "always";
    })(GPUCompareFunction || (GPUCompareFunction = {}));
    class WebGPUSampler {
        constructor(obj) {
            this.globalId = WebGPUSampler._idCounter++;
            this.objectName = 'WebGPUSamper';
            this.source = this._createGPUSampler(obj);
            this.globalId = WebGPUGlobal.getId(this);
        }
        static getWebGPUSampler(params) {
            const cacheKey = WebGPUSampler._getCacheSamplerKey(params);
            if (!this._cacheMap[cacheKey])
                this._cacheMap[cacheKey] = new WebGPUSampler(params);
            return this._cacheMap[cacheKey];
        }
        static _getCacheSamplerKey(params) {
            return (params.wrapU << WebGPUSampler.pointer_wrapU) +
                (params.wrapV << WebGPUSampler.pointer_wrapV) +
                (params.wrapW << WebGPUSampler.pointer_wrapW) +
                (params.filterMode << WebGPUSampler.pointer_filterMode) +
                (params.mipmapFilter << WebGPUSampler.pointer_mipmapFilter) +
                (params.comparedMode << WebGPUSampler.pointer_comparedMode) +
                ((params.mipmapFilter == Laya.FilterMode.Point ? 1 : params.anisoLevel) << WebGPUSampler.pointer_anisoLevel);
        }
        _createGPUSampler(params) {
            this._descriptor = this._getSamplerDescriptor(params);
            if (this._descriptor.maxAnisotropy < 1)
                this._descriptor.maxAnisotropy = 1;
            return WebGPURenderEngine._instance.getDevice().createSampler(this._descriptor);
        }
        _getSamplerDescriptor(params) {
            let anisoLevel = params.anisoLevel;
            if (params.mipmapFilter !== Laya.FilterMode.Bilinear) {
                anisoLevel = 1;
            }
            return {
                addressModeU: this._getSamplerAddressMode(params.wrapU),
                addressModeV: this._getSamplerAddressMode(params.wrapV),
                addressModeW: this._getSamplerAddressMode(params.wrapW),
                magFilter: this._getFilterMode(params.filterMode),
                minFilter: this._getFilterMode(params.filterMode),
                mipmapFilter: this._getFilterMode(params.mipmapFilter),
                compare: this._getGPUCompareFunction(params.comparedMode),
                maxAnisotropy: anisoLevel
            };
        }
        _getSamplerAddressMode(warpMode) {
            switch (warpMode) {
                case Laya.WrapMode.Repeat:
                    return GPUAddressMode.repeat;
                case Laya.WrapMode.Mirrored:
                    return GPUAddressMode.mirror;
                case Laya.WrapMode.Clamp:
                default:
                    return GPUAddressMode.clamp;
            }
        }
        _getFilterMode(filterMode) {
            switch (filterMode) {
                case Laya.FilterMode.Bilinear:
                case Laya.FilterMode.Trilinear:
                    return GPUFilterMode.linear;
                case Laya.FilterMode.Point:
                default:
                    return GPUFilterMode.nearest;
            }
        }
        _getGPUCompareFunction(compareMode) {
            switch (compareMode) {
                case Laya.TextureCompareMode.ALWAYS:
                    return GPUCompareFunction.always;
                case Laya.TextureCompareMode.EQUAL:
                    return GPUCompareFunction.equal;
                case Laya.TextureCompareMode.GREATER:
                    return GPUCompareFunction.greater;
                case Laya.TextureCompareMode.GEQUAL:
                    return GPUCompareFunction.greater_equal;
                case Laya.TextureCompareMode.LESS:
                    return GPUCompareFunction.less;
                case Laya.TextureCompareMode.LEQUAL:
                    return GPUCompareFunction.less_equal;
                case Laya.TextureCompareMode.NEVER:
                    return GPUCompareFunction.never;
                case Laya.TextureCompareMode.NOTEQUAL:
                    return GPUCompareFunction.not_equal;
                case Laya.TextureCompareMode.None:
                default:
                    return undefined;
            }
        }
    }
    WebGPUSampler._idCounter = 0;
    WebGPUSampler.pointer_wrapU = 0;
    WebGPUSampler.pointer_wrapV = 2;
    WebGPUSampler.pointer_wrapW = 4;
    WebGPUSampler.pointer_filterMode = 6;
    WebGPUSampler.pointer_mipmapFilter = 8;
    WebGPUSampler.pointer_comparedMode = 10;
    WebGPUSampler.pointer_anisoLevel = 14;
    WebGPUSampler._cacheMap = {};

    class WebGPUInternalTex {
        get resource() {
            return this._resource;
        }
        set resource(value) {
            if (!this._resource) {
                Laya.LayaGL.statAgent.recordCountData(this._statistics_RC_TextureX, 1);
                Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_AllTexture, 1);
            }
            this._resource = value;
            this.samplerView = null;
            this.attachmentView = null;
            this.getTextureView();
        }
        _onStateChange() {
            this.shaderDatas.forEach((value, key) => {
                key.bindGroupUpdateTex(value, this);
            });
        }
        get filterMode() {
            return this._filterMode;
        }
        set filterMode(value) {
            if (this._filterMode !== value) {
                switch (value) {
                    case Laya.FilterMode.Point:
                        this._webGPUSamplerParams.filterMode = Laya.FilterMode.Point;
                        this._webGPUSamplerParams.mipmapFilter = Laya.FilterMode.Point;
                        break;
                    case Laya.FilterMode.Bilinear:
                        this._webGPUSamplerParams.filterMode = Laya.FilterMode.Bilinear;
                        this._webGPUSamplerParams.mipmapFilter = Laya.FilterMode.Point;
                        break;
                    case Laya.FilterMode.Trilinear:
                        this._webGPUSamplerParams.filterMode = Laya.FilterMode.Bilinear;
                        this._webGPUSamplerParams.mipmapFilter = Laya.FilterMode.Bilinear;
                        break;
                }
                let sampler = WebGPUSampler.getWebGPUSampler(this._webGPUSamplerParams);
                this._changeSampler(sampler);
                this._filterMode = value;
            }
        }
        get wrapU() {
            return this._wrapU;
        }
        set wrapU(value) {
            if (this._wrapU !== value) {
                this._webGPUSamplerParams.wrapU = value;
                let sampler = WebGPUSampler.getWebGPUSampler(this._webGPUSamplerParams);
                this._changeSampler(sampler);
                this._wrapU = value;
            }
        }
        get wrapV() {
            return this._wrapV;
        }
        set wrapV(value) {
            if (this._wrapV !== value) {
                this._webGPUSamplerParams.wrapV = value;
                let sampler = WebGPUSampler.getWebGPUSampler(this._webGPUSamplerParams);
                this._changeSampler(sampler);
                this._wrapV = value;
            }
        }
        get wrapW() {
            return this._wrapW;
        }
        set wrapW(value) {
            if (this._wrapW !== value) {
                this._webGPUSamplerParams.wrapW = value;
                let sampler = WebGPUSampler.getWebGPUSampler(this._webGPUSamplerParams);
                this._changeSampler(sampler);
                this._wrapW = value;
            }
        }
        get anisoLevel() {
            return this._anisoLevel;
        }
        set anisoLevel(value) {
            if (this._anisoLevel !== value && this.resource) {
                this._webGPUSamplerParams.anisoLevel = value;
                let sampler = WebGPUSampler.getWebGPUSampler(this._webGPUSamplerParams);
                this._changeSampler(sampler);
                this._anisoLevel = value;
            }
        }
        get compareMode() {
            return this._compareMode;
        }
        set compareMode(value) {
            if (this._compareMode !== value) {
                this._webGPUSamplerParams.comparedMode = value;
                let sampler = WebGPUSampler.getWebGPUSampler(this._webGPUSamplerParams);
                this._changeSampler(sampler);
                this._compareMode = value;
                this._onStateChange();
            }
        }
        _changeSampler(sampler) {
            if (this._webgpuSampler !== sampler) {
                this._webgpuSampler = sampler;
                this._onStateChange();
            }
        }
        get sampler() {
            return this._webgpuSampler;
        }
        get gpuMemory() {
            return this._gpuMemory;
        }
        set gpuMemory(value) {
            this._changeTexMemory(value);
            this._gpuMemory = value;
        }
        constructor(width, height, depth, dimension, mipmap, multiSamples, useSRGBLoader, gammaCorrection) {
            this.globalId = WebGPUInternalTex._idCounter++;
            this.objectName = 'WebGPUInternalTex';
            this.shaderDatas = new Map();
            this._webGPUSamplerParams = {
                comparedMode: Laya.TextureCompareMode.None,
                wrapU: Laya.WrapMode.Repeat,
                wrapV: Laya.WrapMode.Repeat,
                wrapW: Laya.WrapMode.Repeat,
                mipmapFilter: Laya.FilterMode.Bilinear,
                filterMode: Laya.FilterMode.Bilinear,
                anisoLevel: 4
            };
            this._gpuMemory = 0;
            this.width = width;
            this.height = height;
            this.depth = depth;
            this.dimension = dimension;
            this.multiSamplers = multiSamples;
            const _isPot = (value) => {
                return (value & (value - 1)) === 0;
            };
            this.isPotSize = _isPot(width) && _isPot(height);
            if (dimension === Laya.TextureDimension.Tex3D) {
                this.isPotSize = this.isPotSize && _isPot(this.depth);
            }
            this.mipmap = mipmap && this.isPotSize;
            this.mipmapCount = this.mipmap ? Math.max(Math.ceil(Math.log2(width)) + 1, Math.ceil(Math.log2(height)) + 1) : 1;
            this.maxMipmapLevel = this.mipmapCount - 1;
            this.baseMipmapLevel = 0;
            this.useSRGBLoad = useSRGBLoader;
            this.gammaCorrection = gammaCorrection;
            this.anisoLevel = 4;
            this._engine = WebGPURenderEngine._instance;
            this._webgpuSampler = WebGPUSampler.getWebGPUSampler(this._webGPUSamplerParams);
            switch (dimension) {
                case Laya.TextureDimension.Tex2D:
                    this._statistics_M_TextureX = Laya.StatElement.M_Texture2D;
                    this._statistics_RC_TextureX = Laya.StatElement.C_Texture2D;
                    break;
                case Laya.TextureDimension.Tex3D:
                    this._statistics_M_TextureX = Laya.StatElement.M_Texture3D;
                    this._statistics_RC_TextureX = Laya.StatElement.C_Texture3D;
                    break;
                case Laya.TextureDimension.Cube:
                    this._statistics_M_TextureX = Laya.StatElement.M_TextureCube;
                    this._statistics_RC_TextureX = Laya.StatElement.C_TextureCube;
                    break;
                case Laya.TextureDimension.Texture2DArray:
                    this._statistics_M_TextureX = Laya.StatElement.M_Texture2DArray;
                    this._statistics_RC_TextureX = Laya.StatElement.C_Texture2DArray;
                    break;
            }
        }
        _getGPUTextureBindingLayout(layout) {
            if (this.compareMode > 0)
                layout.sampleType = 'depth';
            else if (this._webGPUFormat === exports.WebGPUTextureFormat.depth16unorm
                || this._webGPUFormat === exports.WebGPUTextureFormat.depth24plus_stencil8
                || this._webGPUFormat === exports.WebGPUTextureFormat.depth32float) {
                layout.sampleType = 'unfilterable-float';
            }
            else {
                const supportFloatLinearFiltering = Laya.LayaGL.renderEngine.getCapable(Laya.RenderCapable.Texture_FloatLinearFiltering);
                if (!supportFloatLinearFiltering && this.format === Laya.TextureFormat.R32G32B32A32)
                    layout.sampleType = 'unfilterable-float';
                else
                    layout.sampleType = 'float';
            }
        }
        _getSampleBindingLayout(layout) {
            if (this.compareMode > 0)
                layout.type = 'comparison';
            else if (this._webGPUFormat === exports.WebGPUTextureFormat.depth16unorm
                || this._webGPUFormat === exports.WebGPUTextureFormat.depth24plus_stencil8
                || this._webGPUFormat === exports.WebGPUTextureFormat.depth32float) {
                if (layout.type !== 'non-filtering') {
                    layout.type = 'non-filtering';
                }
                this.filterMode = Laya.FilterMode.Point;
            }
            else {
                const supportFloatLinearFiltering = Laya.LayaGL.renderEngine.getCapable(Laya.RenderCapable.Texture_FloatLinearFiltering);
                if (!supportFloatLinearFiltering && this.format === Laya.TextureFormat.R32G32B32A32) {
                    if (layout.type !== 'non-filtering') {
                        layout.type = 'non-filtering';
                    }
                    this.filterMode = Laya.FilterMode.Point;
                }
                else if (layout.type !== 'filtering') {
                    layout.type = 'filtering';
                    this.filterMode = Laya.FilterMode.Bilinear;
                }
            }
        }
        _getStorageBindingLayout(layout) {
            layout.format = this._webGPUFormat;
            switch (this.dimension) {
                case Laya.TextureDimension.Tex2D:
                    layout.viewDimension = '2d';
                    break;
                case Laya.TextureDimension.Cube:
                    layout.viewDimension = 'cube';
                    break;
                case Laya.TextureDimension.Tex3D:
                    layout.viewDimension = '3d';
                    break;
                case Laya.TextureDimension.Texture2DArray:
                    layout.viewDimension = '2d-array';
                    break;
                case Laya.TextureDimension.CubeArray:
                    layout.viewDimension = 'cube-array';
                    break;
                case Laya.TextureDimension.Unkonw:
                case Laya.TextureDimension.None:
            }
        }
        statisAsRenderTexture() {
            this._statistics_M_TextureA = Laya.StatElement.M_RenderTexture;
        }
        getSamplerView(descriptor) {
            if (this.format == Laya.RenderTargetFormat.DEPTHSTENCIL_24_8) {
                descriptor.aspect = 'depth-only';
            }
            this.samplerView = this.resource.createView(descriptor);
            return this.samplerView;
        }
        getAttachmentView(descriptor) {
            descriptor.aspect = 'all';
            this.attachmentView = this.resource.createView(descriptor);
            return this.attachmentView;
        }
        getTextureView(attachment = false) {
            if (attachment) {
                if (this.attachmentView) {
                    return this.attachmentView;
                }
            }
            else {
                if (this.samplerView) {
                    return this.samplerView;
                }
            }
            let dimension;
            switch (this.dimension) {
                case Laya.TextureDimension.Tex2D:
                    dimension = '2d';
                    break;
                case Laya.TextureDimension.Cube:
                    dimension = 'cube';
                    break;
                case Laya.TextureDimension.Tex3D:
                    dimension = '3d';
                    break;
                case Laya.TextureDimension.Texture2DArray:
                    dimension = '2d-array';
                    break;
                case Laya.TextureDimension.CubeArray:
                    dimension = 'cube-array';
                    break;
                default:
                    dimension = '2d';
                    break;
            }
            const descriptor = {
                format: this._webGPUFormat,
                dimension,
                baseMipLevel: this.baseMipmapLevel,
                mipLevelCount: this.maxMipmapLevel - this.baseMipmapLevel + 1,
            };
            if (attachment) {
                let view = this.getAttachmentView(descriptor);
                return view;
            }
            else {
                let view = this.getSamplerView(descriptor);
                return view;
            }
        }
        getTextureViewForArrayLayer(layer, mipLevel = this.baseMipmapLevel) {
            const descriptor = {
                format: this._webGPUFormat,
                dimension: '2d',
                baseMipLevel: mipLevel,
                mipLevelCount: 1,
                baseArrayLayer: layer,
                arrayLayerCount: 1,
            };
            return this.resource.createView(descriptor);
        }
        _changeTexMemory(memory) {
            Laya.LayaGL.statAgent.recordMemoryData(Laya.StatElement.M_GPUMemory, -this._gpuMemory + memory);
            Laya.LayaGL.statAgent.recordMemoryData(Laya.StatElement.M_AllTexture, -this._gpuMemory + memory);
            if (this._statistics_M_TextureA == Laya.StatElement.M_RenderTexture)
                Laya.LayaGL.statAgent.recordMemoryData(this._statistics_M_TextureA, -this._gpuMemory + memory);
            Laya.LayaGL.statAgent.recordMemoryData(this._statistics_M_TextureX, -this._gpuMemory + memory);
        }
        dispose() {
            this.gpuMemory = 0;
            this.resource.destroy();
            Laya.LayaGL.statAgent.recordCountData(this._statistics_RC_TextureX, -1);
            Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_AllTexture, -1);
        }
    }
    WebGPUInternalTex._idCounter = 0;

    const WebGPUCubeMap = [4, 5, 0, 1, 2, 3];
    exports.WebGPUTextureDimension = void 0;
    (function (WebGPUTextureDimension) {
        WebGPUTextureDimension["D1D"] = "1d";
        WebGPUTextureDimension["D2D"] = "2d";
        WebGPUTextureDimension["D3D"] = "3d";
    })(exports.WebGPUTextureDimension || (exports.WebGPUTextureDimension = {}));
    exports.WebGPUTextureFormat = void 0;
    (function (WebGPUTextureFormat) {
        WebGPUTextureFormat["r8unorm"] = "r8unorm";
        WebGPUTextureFormat["r8snorm"] = "r8snorm";
        WebGPUTextureFormat["r8uint"] = "r8uint";
        WebGPUTextureFormat["r8sint"] = "r8sint";
        WebGPUTextureFormat["r16uint"] = "r16uint";
        WebGPUTextureFormat["r16sint"] = "r16sint";
        WebGPUTextureFormat["r16float"] = "r16float";
        WebGPUTextureFormat["rg8unorm"] = "rg8unorm";
        WebGPUTextureFormat["rg8snorm"] = "rg8snorm";
        WebGPUTextureFormat["rg8uint"] = "rg8uint";
        WebGPUTextureFormat["rg8sint"] = "rg8sint";
        WebGPUTextureFormat["r32uint"] = "r32uint";
        WebGPUTextureFormat["r32sint"] = "r32sint";
        WebGPUTextureFormat["r32float"] = "r32float";
        WebGPUTextureFormat["rg16uint"] = "rg16uint";
        WebGPUTextureFormat["rg16sint"] = "rg16sint";
        WebGPUTextureFormat["rg16float"] = "rg16float";
        WebGPUTextureFormat["rgba8unorm"] = "rgba8unorm";
        WebGPUTextureFormat["rgba8unorm_srgb"] = "rgba8unorm-srgb";
        WebGPUTextureFormat["rgba8snorm"] = "rgba8snorm";
        WebGPUTextureFormat["rgba8uint"] = "rgba8uint";
        WebGPUTextureFormat["rgba8sint"] = "rgba8sint";
        WebGPUTextureFormat["bgra8unorm"] = "bgra8unorm";
        WebGPUTextureFormat["bgra8unorm_srgb"] = "bgra8unorm-srgb";
        WebGPUTextureFormat["rgb9e5ufloat"] = "rgb9e5ufloat";
        WebGPUTextureFormat["rgb10a2unorm"] = "rgb10a2unorm";
        WebGPUTextureFormat["rg11b10ufloat"] = "rg11b10ufloat";
        WebGPUTextureFormat["rg32uint"] = "rg32uint";
        WebGPUTextureFormat["rg32sint"] = "rg32sint";
        WebGPUTextureFormat["rg32float"] = "rg32float";
        WebGPUTextureFormat["rgba16uint"] = "rgba16uint";
        WebGPUTextureFormat["rgba16sint"] = "rgba16sint";
        WebGPUTextureFormat["rgba16float"] = "rgba16float";
        WebGPUTextureFormat["rgba32uint"] = "rgba32uint";
        WebGPUTextureFormat["rgba32sint"] = "rgba32sint";
        WebGPUTextureFormat["rgba32float"] = "rgba32float";
        WebGPUTextureFormat["stencil8"] = "stencil8";
        WebGPUTextureFormat["depth16unorm"] = "depth16unorm";
        WebGPUTextureFormat["depth24plus"] = "depth24plus";
        WebGPUTextureFormat["depth24plus_stencil8"] = "depth24plus-stencil8";
        WebGPUTextureFormat["depth32float"] = "depth32float";
        WebGPUTextureFormat["depth32float_stencil8"] = "depth32float-stencil8";
        WebGPUTextureFormat["bc1_rgba_unorm"] = "bc1-rgba-unorm";
        WebGPUTextureFormat["bc1_rgba_unorm_srgb"] = "bc1-rgba-unorm-srgb";
        WebGPUTextureFormat["bc2_rgba_unorm"] = "bc2-rgba-unorm";
        WebGPUTextureFormat["bc2_rgba_unorm_srgb"] = "bc2-rgba-unorm-srgb";
        WebGPUTextureFormat["bc3_rgba_unorm"] = "bc3-rgba-unorm";
        WebGPUTextureFormat["bc3_rgba_unorm_srgb"] = "bc3-rgba-unorm-srgb";
        WebGPUTextureFormat["bc4_r_unorm"] = "bc4-r-unorm";
        WebGPUTextureFormat["bc4_r_snorm"] = "bc4-r-snorm";
        WebGPUTextureFormat["bc5_rg_unorm"] = "bc5-rg-unorm";
        WebGPUTextureFormat["bc5_rg_snorm"] = "bc5-rg-snorm";
        WebGPUTextureFormat["bc6h_rgb_ufloat"] = "bc6h-rgb-ufloat";
        WebGPUTextureFormat["bc6h_rgb_float"] = "bc6h-rgb-float";
        WebGPUTextureFormat["bc7_rgba_unorm"] = "bc7-rgba-unorm";
        WebGPUTextureFormat["bc7_rgba_unorm_srgb"] = "bc7-rgba-unorm-srgb";
        WebGPUTextureFormat["etc2_rgb8unorm"] = "etc2-rgb8unorm";
        WebGPUTextureFormat["etc2_rgb8unorm_srgb"] = "etc2-rgb8unorm-srgb";
        WebGPUTextureFormat["etc2_rgb8a1unorm"] = "etc2-rgb8a1unorm";
        WebGPUTextureFormat["etc2_rgb8a1unorm_srgb"] = "etc2-rgb8a1unorm-srgb";
        WebGPUTextureFormat["etc2_rgba8unorm"] = "etc2-rgba8unorm";
        WebGPUTextureFormat["etc2_rgba8unorm_srgb"] = "etc2-rgba8unorm-srgb";
        WebGPUTextureFormat["astc_4x4_unorm"] = "astc-4x4-unorm";
        WebGPUTextureFormat["astc_4x4_unorm_srgb"] = "astc-4x4-unorm-srgb";
        WebGPUTextureFormat["astc_5x4_unorm"] = "astc-5x4-unorm";
        WebGPUTextureFormat["astc_5x4_unorm_srgb"] = "astc-5x4-unorm-srgb";
        WebGPUTextureFormat["astc_5x5_unorm"] = "astc-5x5-unorm";
        WebGPUTextureFormat["astc_5x5_unorm_srgb"] = "astc-5x5-unorm-srgb";
        WebGPUTextureFormat["astc_6x5_unorm"] = "astc-6x5-unorm";
        WebGPUTextureFormat["astc_6x5_unorm_srgb"] = "astc-6x5-unorm-srgb";
        WebGPUTextureFormat["astc_6x6_unorm"] = "astc-6x6-unorm";
        WebGPUTextureFormat["astc_6x6_unorm_srgb"] = "astc-6x6-unorm-srgb";
        WebGPUTextureFormat["astc_8x5_unorm"] = "astc-8x5-unorm";
        WebGPUTextureFormat["astc_8x5_unorm_srgb"] = "astc-8x5-unorm-srgb";
        WebGPUTextureFormat["astc_8x6_unorm"] = "astc-8x6-unorm";
        WebGPUTextureFormat["astc_8x6_unorm_srgb"] = "astc-8x6-unorm-srgb";
        WebGPUTextureFormat["astc_8x8_unorm"] = "astc-8x8-unorm";
        WebGPUTextureFormat["astc_8x8_unorm_srgb"] = "astc-8x8-unorm-srgb";
        WebGPUTextureFormat["astc_10x5_unorm"] = "astc-10x5-unorm";
        WebGPUTextureFormat["astc_10x5_unorm_srgb"] = "astc-10x5-unorm-srgb";
        WebGPUTextureFormat["astc_10x6_unorm"] = "astc-10x6-unorm";
        WebGPUTextureFormat["astc_10x6_unorm_srgb"] = "astc-10x6-unorm-srgb";
        WebGPUTextureFormat["astc_10x8_unorm"] = "astc-10x8-unorm";
        WebGPUTextureFormat["astc_10x8_unorm_srgb"] = "astc-10x8-unorm-srgb";
        WebGPUTextureFormat["astc_10x10_unorm"] = "astc-10x10-unorm";
        WebGPUTextureFormat["astc_10x10_unorm_srgb"] = "astc-10x10-unorm-srgb";
        WebGPUTextureFormat["astc_12x10_unorm"] = "astc-12x10-unorm";
        WebGPUTextureFormat["astc_12x10_unorm_srgb"] = "astc-12x10-unorm-srgb";
        WebGPUTextureFormat["astc_12x12_unorm"] = "astc-12x12-unorm";
        WebGPUTextureFormat["astc_12x12_unorm_srgb"] = "astc-12x12-unorm-srgb";
    })(exports.WebGPUTextureFormat || (exports.WebGPUTextureFormat = {}));
    class WebGPUTextureContext {
        constructor(engine) {
            this.needBitmap = true;
            this._engine = engine;
        }
        createTexture3DInternal(dimension, width, height, depth, format, generateMipmap, sRGB, premultipliedAlpha) {
            let useSRGBExt = this._isSRGBFormat(format) || (sRGB && this._supportSRGB(format, generateMipmap));
            if (premultipliedAlpha) {
                useSRGBExt = false;
            }
            let gammaCorrection = 1.0;
            if (!useSRGBExt && sRGB) {
                gammaCorrection = 2.2;
            }
            const pixelByteSize = this._getGPUTexturePixelByteSize(format);
            const gpuTextureFormat = this._getGPUTextureFormat(format, useSRGBExt);
            const textureDescriptor = this._getGPUTextureDescriptor(dimension, width, height, gpuTextureFormat, depth, generateMipmap, 1, this._isCompressTexture(format));
            if (generateMipmap)
                textureDescriptor.mipLevelCount = 1 + Math.log2(Math.max(width, height)) | 0;
            textureDescriptor.label = 'texture array';
            const gpuTexture = this._engine.getDevice().createTexture(textureDescriptor);
            const internalTex = new WebGPUInternalTex(width, height, depth, dimension, generateMipmap, 1, useSRGBExt, gammaCorrection);
            internalTex.format = format;
            internalTex.resource = gpuTexture;
            internalTex._webGPUFormat = gpuTextureFormat;
            internalTex.gpuMemory = (width * height * depth * pixelByteSize * (generateMipmap ? 1.33333 : 1)) | 0;
            return internalTex;
        }
        async setTexture3DImageData(texture, source, depth, premultiplyAlpha, invertY) {
            if (!source)
                return;
            const device = WebGPURenderEngine._instance.getDevice();
            for (let i = 0; i < depth; i++) {
                const imageBitmapSource = source[i];
                const image = {
                    source: imageBitmapSource,
                    flipY: invertY,
                    origin: [0, 0]
                };
                const textureCopyView = {
                    texture: texture.resource,
                    origin: {
                        x: 0,
                        y: 0,
                        z: i,
                    },
                    mipLevel: 0,
                    premultipliedAlpha: premultiplyAlpha,
                    colorSpace: texture.useSRGBLoad ? "srgb" : undefined,
                };
                const copySize = {
                    width: source[i].width,
                    height: source[i].height,
                    depthOrArrayLayers: 1,
                };
                device.queue.copyExternalImageToTexture(image, textureCopyView, copySize);
            }
            if (this._isTextureNeedGenMipmap(texture))
                genMipmap(device, texture.resource);
        }
        setTexture3DPixelsData(texture, source, depth, premultiplyAlpha, invertY) {
            if (!source)
                return;
            const imageCopy = {
                texture: texture.resource,
                mipLevel: 0,
                premultipliedAlpha: premultiplyAlpha
            };
            const block = this._getBlockInformationFromFormat(texture._webGPUFormat);
            const bytesPerRow = Math.ceil(texture.width / block.width) * block.length;
            const height = texture.height;
            const dataLayout = {
                offset: 0,
                bytesPerRow: bytesPerRow,
                rowsPerImage: height
            };
            const size = {
                width: Math.ceil(texture.width / block.width) * block.width,
                height: Math.ceil(height / block.height) * block.height,
                depthOrArrayLayers: depth
            };
            const device = WebGPURenderEngine._instance.getDevice();
            device.queue.writeTexture(imageCopy, source.buffer, dataLayout, size);
            if (premultiplyAlpha)
                doPremultiplyAlpha(device, texture, 0, 0, texture.width, texture.height);
            if (this._isTextureNeedGenMipmap(texture))
                genMipmap(device, texture.resource);
        }
        setTexture3DSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, zOffset, width, height, depth, premultiplyAlpha, invertY) {
            if (!source)
                return;
            const imageCopy = {
                texture: texture.resource,
                mipLevel: mipmapLevel,
                premultipliedAlpha: premultiplyAlpha,
                origin: {
                    x: xOffset,
                    y: yOffset,
                    z: zOffset,
                },
            };
            const block = this._getBlockInformationFromFormat(texture._webGPUFormat);
            const bytesPerRow = Math.ceil(width / block.width) * block.length;
            const dataLayout = {
                offset: 0,
                bytesPerRow: bytesPerRow,
                rowsPerImage: height
            };
            const size = {
                width: Math.ceil(width / block.width) * block.width,
                height: Math.ceil(height / block.height) * block.height,
                depthOrArrayLayers: depth
            };
            const device = WebGPURenderEngine._instance.getDevice();
            device.queue.writeTexture(imageCopy, source.buffer, dataLayout, size);
            if (premultiplyAlpha)
                doPremultiplyAlpha(device, texture, xOffset, yOffset, width, height);
            if (generateMipmap && this._isTextureNeedGenMipmap(texture))
                genMipmap(device, texture.resource);
        }
        _getGPUTexturePixelByteSize(format) {
            switch (format) {
                case Laya.TextureFormat.R5G6B5:
                    return 2;
                case Laya.TextureFormat.R8G8B8:
                    return 3;
                case Laya.TextureFormat.R8G8B8A8:
                    return 4;
                case Laya.TextureFormat.R32G32B32:
                    return 12;
                case Laya.TextureFormat.R32G32B32A32:
                    return 16;
                case Laya.TextureFormat.R16G16B16:
                    return 6;
                case Laya.TextureFormat.R16G16B16A16:
                    return 8;
                default:
                    return 4;
            }
        }
        _getGPURenderTexturePixelByteSize(format) {
            switch (format) {
                case Laya.RenderTargetFormat.R8G8B8:
                    return 3;
                case Laya.RenderTargetFormat.R8G8B8A8:
                    return 4;
                case Laya.RenderTargetFormat.R32G32B32:
                    return 12;
                case Laya.RenderTargetFormat.R32G32B32A32:
                    return 16;
                case Laya.RenderTargetFormat.R16G16B16:
                    return 6;
                case Laya.RenderTargetFormat.R16G16B16A16:
                    return 8;
                case Laya.RenderTargetFormat.DEPTH_16:
                    return 2;
                case Laya.RenderTargetFormat.DEPTH_32:
                    return 4;
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_8:
                    return 4;
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_Plus:
                    return 4;
                case Laya.RenderTargetFormat.STENCIL_8:
                    return 1;
                default:
                    return 4;
            }
        }
        _getGPUTextureFormat(format, useSRGB) {
            let webgpuTextureFormat = exports.WebGPUTextureFormat.rgba8uint;
            switch (format) {
                case Laya.TextureFormat.R5G6B5:
                    return null;
                case Laya.TextureFormat.R8G8B8:
                case Laya.TextureFormat.R8G8B8A8:
                    webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.rgba8unorm : exports.WebGPUTextureFormat.rgba8unorm_srgb;
                    break;
                case Laya.TextureFormat.R32G32B32:
                case Laya.TextureFormat.R32G32B32A32:
                    webgpuTextureFormat = exports.WebGPUTextureFormat.rgba32float;
                    break;
                case Laya.TextureFormat.R16G16B16:
                case Laya.TextureFormat.R16G16B16A16:
                    webgpuTextureFormat = exports.WebGPUTextureFormat.rgba16float;
                    break;
                case Laya.TextureFormat.DXT1:
                    webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.bc1_rgba_unorm : exports.WebGPUTextureFormat.bc1_rgba_unorm_srgb;
                    break;
                case Laya.TextureFormat.DXT3:
                    webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.bc2_rgba_unorm : exports.WebGPUTextureFormat.bc2_rgba_unorm_srgb;
                    break;
                case Laya.TextureFormat.DXT5:
                    webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.bc3_rgba_unorm : exports.WebGPUTextureFormat.bc3_rgba_unorm_srgb;
                    break;
                case Laya.TextureFormat.ETC2RGBA:
                case Laya.TextureFormat.ETC1RGB:
                case Laya.TextureFormat.ETC2RGB:
                case Laya.TextureFormat.ETC2SRGB:
                case Laya.TextureFormat.ETC2SRGB_Alpha8:
                    webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.etc2_rgba8unorm : exports.WebGPUTextureFormat.etc2_rgba8unorm_srgb;
                    break;
                case Laya.TextureFormat.ASTC4x4:
                case Laya.TextureFormat.ASTC4x4SRGB:
                    webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.astc_4x4_unorm : exports.WebGPUTextureFormat.astc_4x4_unorm_srgb;
                    break;
                case Laya.TextureFormat.ASTC6x6:
                case Laya.TextureFormat.ASTC6x6SRGB:
                    webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.astc_6x6_unorm : exports.WebGPUTextureFormat.astc_6x6_unorm_srgb;
                    break;
                case Laya.TextureFormat.ASTC8x8:
                case Laya.TextureFormat.ASTC8x8SRGB:
                    webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.astc_8x8_unorm : exports.WebGPUTextureFormat.astc_8x8_unorm_srgb;
                    break;
                case Laya.TextureFormat.ASTC10x10:
                case Laya.TextureFormat.ASTC10x10SRGB:
                    webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.astc_10x10_unorm : exports.WebGPUTextureFormat.astc_10x10_unorm_srgb;
                    break;
                case Laya.TextureFormat.ASTC12x12:
                case Laya.TextureFormat.ASTC12x12SRGB:
                    webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.astc_12x12_unorm : exports.WebGPUTextureFormat.astc_12x12_unorm_srgb;
                    break;
                default:
                    throw "unknow TextureFormat";
            }
            return webgpuTextureFormat;
        }
        _getGPURenderTargetFormat(format, useSRGB, storage) {
            const engine = WebGPURenderEngine._instance;
            let webgpuTextureFormat = exports.WebGPUTextureFormat.rgba8uint;
            switch (format) {
                case Laya.RenderTargetFormat.R8G8B8:
                case Laya.RenderTargetFormat.R8G8B8A8:
                    if (!storage && engine._preferredFormat == exports.WebGPUTextureFormat.bgra8unorm) {
                        webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.bgra8unorm : exports.WebGPUTextureFormat.bgra8unorm_srgb;
                    }
                    else {
                        webgpuTextureFormat = !useSRGB ? exports.WebGPUTextureFormat.rgba8unorm : exports.WebGPUTextureFormat.rgba8unorm_srgb;
                    }
                    break;
                case Laya.RenderTargetFormat.R32G32B32:
                case Laya.RenderTargetFormat.R32G32B32A32:
                    webgpuTextureFormat = exports.WebGPUTextureFormat.rgba32float;
                    break;
                case Laya.RenderTargetFormat.R16G16B16:
                case Laya.RenderTargetFormat.R16G16B16A16:
                    webgpuTextureFormat = exports.WebGPUTextureFormat.rgba16float;
                    break;
                case Laya.RenderTargetFormat.DEPTH_16:
                    webgpuTextureFormat = exports.WebGPUTextureFormat.depth16unorm;
                    break;
                case Laya.RenderTargetFormat.DEPTH_32:
                    webgpuTextureFormat = exports.WebGPUTextureFormat.depth32float;
                    break;
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_8:
                    webgpuTextureFormat = exports.WebGPUTextureFormat.depth24plus_stencil8;
                    break;
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_Plus:
                    webgpuTextureFormat = exports.WebGPUTextureFormat.depth24plus;
                    break;
                case Laya.RenderTargetFormat.STENCIL_8:
                    webgpuTextureFormat = exports.WebGPUTextureFormat.stencil8;
                    break;
                default:
                    throw "unknow TextureFormat";
            }
            return webgpuTextureFormat;
        }
        _isCompressTexture(format) {
            switch (format) {
                case Laya.TextureFormat.DXT1:
                case Laya.TextureFormat.DXT3:
                case Laya.TextureFormat.DXT5:
                case Laya.TextureFormat.ETC1RGB:
                case Laya.TextureFormat.ETC2RGB:
                case Laya.TextureFormat.ETC2RGBA:
                case Laya.TextureFormat.ETC2SRGB:
                case Laya.TextureFormat.ETC2SRGB_Alpha8:
                case Laya.TextureFormat.ETC2RGB_Alpha1:
                case Laya.TextureFormat.ETC2SRGB_Alpha1:
                case Laya.TextureFormat.PVRTCRGB_2BPPV:
                case Laya.TextureFormat.PVRTCRGBA_2BPPV:
                case Laya.TextureFormat.PVRTCRGB_4BPPV:
                case Laya.TextureFormat.PVRTCRGBA_4BPPV:
                case Laya.TextureFormat.ASTC4x4:
                case Laya.TextureFormat.ASTC4x4SRGB:
                case Laya.TextureFormat.ASTC6x6:
                case Laya.TextureFormat.ASTC6x6SRGB:
                case Laya.TextureFormat.ASTC8x8:
                case Laya.TextureFormat.ASTC8x8SRGB:
                case Laya.TextureFormat.ASTC10x10:
                case Laya.TextureFormat.ASTC10x10SRGB:
                case Laya.TextureFormat.ASTC12x12:
                case Laya.TextureFormat.ASTC12x12SRGB:
                case Laya.TextureFormat.KTXTEXTURE:
                case Laya.TextureFormat.PVRTEXTURE:
                    return true;
                default:
                    return false;
            }
        }
        _supportStorage(format) {
            switch (format) {
                case exports.WebGPUTextureFormat.rgba8unorm:
                case exports.WebGPUTextureFormat.rgba16float:
                case exports.WebGPUTextureFormat.rgba32float:
                    return true;
                case exports.WebGPUTextureFormat.bgra8unorm:
                    {
                        let requiredFeatures = this._engine._config.deviceDescriptor.requiredFeatures;
                        if (requiredFeatures.indexOf("bgra8unorm-storage") != -1) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                case exports.WebGPUTextureFormat.bgra8unorm_srgb:
                case exports.WebGPUTextureFormat.rgba8unorm_srgb:
                default:
                    return false;
            }
        }
        _getFormatPixelsParams(format) {
            const formatParams = {
                channels: 0,
                bytesPerPixel: 0,
                dataTypedCons: Uint8Array,
                typedSize: 1
            };
            switch (format) {
                case Laya.TextureFormat.R8G8B8A8:
                    formatParams.channels = 4;
                    formatParams.bytesPerPixel = 4;
                    formatParams.dataTypedCons = Uint8Array;
                    formatParams.typedSize = 1;
                    return formatParams;
                case Laya.TextureFormat.R8G8B8:
                    formatParams.channels = 3;
                    formatParams.bytesPerPixel = 3;
                    formatParams.dataTypedCons = Uint8Array;
                    formatParams.typedSize = 1;
                    return formatParams;
                case Laya.TextureFormat.R5G6B5:
                    formatParams.channels = 3;
                    formatParams.bytesPerPixel = 2;
                    formatParams.dataTypedCons = Uint16Array;
                    formatParams.typedSize = 2;
                    return formatParams;
                case Laya.TextureFormat.R16G16B16:
                    formatParams.channels = 3;
                    formatParams.bytesPerPixel = 6;
                    formatParams.dataTypedCons = Uint16Array;
                    formatParams.typedSize = 2;
                    return formatParams;
                case Laya.TextureFormat.R16G16B16A16:
                    formatParams.channels = 4;
                    formatParams.bytesPerPixel = 8;
                    formatParams.dataTypedCons = Uint16Array;
                    formatParams.typedSize = 2;
                    return formatParams;
                case Laya.TextureFormat.R32G32B32:
                    formatParams.channels = 3;
                    formatParams.bytesPerPixel = 12;
                    formatParams.dataTypedCons = Float32Array;
                    formatParams.typedSize = 4;
                    return formatParams;
                case Laya.TextureFormat.R32G32B32A32:
                    formatParams.channels = 4;
                    formatParams.bytesPerPixel = 16;
                    formatParams.dataTypedCons = Float32Array;
                    formatParams.typedSize = 4;
                    return formatParams;
                default:
                    return formatParams;
            }
        }
        _getGPUTextureDescriptor(dimension, width, height, gpuFormat, layerCount, generateMipmap, multiSamples, isCompressTexture) {
            const textureSize = {
                width: width,
                height: height,
                depthOrArrayLayers: layerCount,
            };
            const canCopy = !isCompressTexture;
            let usage = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST;
            const mipLevelCount = generateMipmap ? Math.max(Math.ceil(Math.log2(width)) + 1, Math.ceil(Math.log2(height)) + 1) : 1;
            if (canCopy)
                usage |= GPUTextureUsage.RENDER_ATTACHMENT;
            let dimensionType;
            switch (dimension) {
                case Laya.TextureDimension.Tex2D:
                case Laya.TextureDimension.Cube:
                case Laya.TextureDimension.Texture2DArray:
                    dimensionType = exports.WebGPUTextureDimension.D2D;
                    break;
                case Laya.TextureDimension.Tex3D:
                    dimensionType = exports.WebGPUTextureDimension.D3D;
                    break;
                default:
                    throw "DimensionType Unknown format";
            }
            const textureDescriptor = {
                size: textureSize,
                mipLevelCount,
                sampleCount: multiSamples,
                dimension: dimensionType,
                format: gpuFormat,
                usage,
            };
            return textureDescriptor;
        }
        _canGenerateMipmapByFormat(format) {
            if (this._isCompressTexture(format))
                return false;
            switch (format) {
                case Laya.TextureFormat.R8G8B8:
                case Laya.TextureFormat.R8G8B8A8:
                case Laya.TextureFormat.R5G6B5:
                case Laya.TextureFormat.Alpha8:
                case Laya.TextureFormat.R32G32B32A32:
                case Laya.TextureFormat.R32G32B32:
                case Laya.TextureFormat.R16G16B16A16:
                case Laya.TextureFormat.R16G16B16:
                    return true;
                default:
                    return false;
            }
        }
        _isTextureNeedGenMipmap(texture) {
            const tex = texture;
            return (tex.mipmap && !tex.mipmapLoaded && this._canGenerateMipmapByFormat(tex.format));
        }
        createTextureInternal(dimension, width, height, format, generateMipmap, sRGB, premultipliedAlpha) {
            let layerCount;
            switch (dimension) {
                case Laya.TextureDimension.Tex2D:
                    layerCount = 1;
                    break;
                case Laya.TextureDimension.Cube:
                    layerCount = 6;
                    break;
            }
            if (dimension === Laya.TextureDimension.Tex3D) {
                throw "error";
            }
            let useSRGBExt = this._isSRGBFormat(format) || (sRGB && this._supportSRGB(format, generateMipmap));
            if (premultipliedAlpha) {
                useSRGBExt = false;
            }
            let gammaCorrection = 1.0;
            if (!useSRGBExt && sRGB) {
                gammaCorrection = 2.2;
            }
            const pixelByteSize = this._getGPUTexturePixelByteSize(format);
            const gpuTextureFormat = this._getGPUTextureFormat(format, useSRGBExt);
            const textureDescriptor = this._getGPUTextureDescriptor(dimension, width, height, gpuTextureFormat, layerCount, generateMipmap, 1, this._isCompressTexture(format));
            if (generateMipmap)
                textureDescriptor.mipLevelCount = 1 + Math.log2(Math.max(width, height)) | 0;
            layerCount === 6 ? textureDescriptor.label = 'textureCube' : textureDescriptor.label = 'texture';
            const gpuTexture = this._engine.getDevice().createTexture(textureDescriptor);
            const internalTex = new WebGPUInternalTex(width, height, 1, dimension, generateMipmap, 1, useSRGBExt, gammaCorrection);
            internalTex.format = format;
            internalTex.resource = gpuTexture;
            internalTex._webGPUFormat = gpuTextureFormat;
            internalTex.gpuMemory = (width * height * pixelByteSize * (generateMipmap ? 1.33333 : 1)) | 0;
            return internalTex;
        }
        async setTextureImageData(texture, source, premultiplyAlpha, invertY) {
            if (!source)
                return;
            const image = { source: source, flipY: invertY, origin: [0, 0] };
            const textureCopyView = {
                texture: texture.resource,
                origin: {
                    x: 0,
                    y: 0,
                },
                mipLevel: 0,
                premultipliedAlpha: premultiplyAlpha,
                colorSpace: texture.useSRGBLoad ? "srgb" : undefined,
            };
            const copySize = { width: source.width, height: source.height };
            const device = WebGPURenderEngine._instance.getDevice();
            device.queue.copyExternalImageToTexture(image, textureCopyView, copySize);
            if (this._isTextureNeedGenMipmap(texture))
                genMipmap(device, texture.resource);
        }
        setTextureSubImageData(texture, source, x, y, premultiplyAlpha, invertY) {
            if (!source)
                return;
            const image = { source: source, flipY: invertY, origin: { x: 0, y: 0 } };
            const textureCopyView = {
                texture: texture.resource,
                origin: {
                    x: x,
                    y: y,
                },
                mipLevel: 0,
                premultipliedAlpha: premultiplyAlpha,
                colorSpace: texture.useSRGBLoad ? "srgb" : undefined
            };
            const copySize = { width: source.width, height: source.height };
            WebGPURenderEngine._instance.getDevice().queue.copyExternalImageToTexture(image, textureCopyView, copySize);
        }
        _getBlockInformationFromFormat(format) {
            switch (format) {
                case exports.WebGPUTextureFormat.r8unorm:
                case exports.WebGPUTextureFormat.r8snorm:
                case exports.WebGPUTextureFormat.r8uint:
                case exports.WebGPUTextureFormat.r8sint:
                    return { width: 1, height: 1, length: 1 };
                case exports.WebGPUTextureFormat.r16uint:
                case exports.WebGPUTextureFormat.r16sint:
                case exports.WebGPUTextureFormat.r16float:
                case exports.WebGPUTextureFormat.rg8unorm:
                case exports.WebGPUTextureFormat.rg8snorm:
                case exports.WebGPUTextureFormat.rg8uint:
                case exports.WebGPUTextureFormat.rg8sint:
                    return { width: 1, height: 1, length: 2 };
                case exports.WebGPUTextureFormat.r32uint:
                case exports.WebGPUTextureFormat.r32sint:
                case exports.WebGPUTextureFormat.r32float:
                case exports.WebGPUTextureFormat.rg16uint:
                case exports.WebGPUTextureFormat.rg16sint:
                case exports.WebGPUTextureFormat.rg16float:
                case exports.WebGPUTextureFormat.rgba8unorm:
                case exports.WebGPUTextureFormat.rgba8unorm_srgb:
                case exports.WebGPUTextureFormat.rgba8snorm:
                case exports.WebGPUTextureFormat.rgba8uint:
                case exports.WebGPUTextureFormat.rgba8sint:
                case exports.WebGPUTextureFormat.bgra8unorm:
                case exports.WebGPUTextureFormat.bgra8unorm_srgb:
                case exports.WebGPUTextureFormat.rgb9e5ufloat:
                case exports.WebGPUTextureFormat.rgb10a2unorm:
                case exports.WebGPUTextureFormat.rg11b10ufloat:
                    return { width: 1, height: 1, length: 4 };
                case exports.WebGPUTextureFormat.rg32uint:
                case exports.WebGPUTextureFormat.rg32sint:
                case exports.WebGPUTextureFormat.rg32float:
                case exports.WebGPUTextureFormat.rgba16uint:
                case exports.WebGPUTextureFormat.rgba16sint:
                case exports.WebGPUTextureFormat.rgba16float:
                    return { width: 1, height: 1, length: 8 };
                case exports.WebGPUTextureFormat.rgba32uint:
                case exports.WebGPUTextureFormat.rgba32sint:
                case exports.WebGPUTextureFormat.rgba32float:
                    return { width: 1, height: 1, length: 16 };
                case exports.WebGPUTextureFormat.stencil8:
                    throw "No fixed size for Stencil8 format!";
                case exports.WebGPUTextureFormat.depth16unorm:
                    return { width: 1, height: 1, length: 2 };
                case exports.WebGPUTextureFormat.depth24plus:
                    throw "No fixed size for Depth24Plus format!";
                case exports.WebGPUTextureFormat.depth24plus_stencil8:
                    return { width: 1, height: 1, length: 4 };
                case exports.WebGPUTextureFormat.depth32float:
                    return { width: 1, height: 1, length: 4 };
                case exports.WebGPUTextureFormat.depth32float_stencil8:
                    return { width: 1, height: 1, length: 5 };
                case exports.WebGPUTextureFormat.bc7_rgba_unorm:
                case exports.WebGPUTextureFormat.bc7_rgba_unorm_srgb:
                case exports.WebGPUTextureFormat.bc6h_rgb_float:
                case exports.WebGPUTextureFormat.bc6h_rgb_ufloat:
                case exports.WebGPUTextureFormat.bc5_rg_unorm:
                case exports.WebGPUTextureFormat.bc5_rg_snorm:
                case exports.WebGPUTextureFormat.bc3_rgba_unorm:
                case exports.WebGPUTextureFormat.bc3_rgba_unorm_srgb:
                case exports.WebGPUTextureFormat.bc2_rgba_unorm:
                case exports.WebGPUTextureFormat.bc2_rgba_unorm_srgb:
                    return { width: 4, height: 4, length: 16 };
                case exports.WebGPUTextureFormat.bc4_r_unorm:
                case exports.WebGPUTextureFormat.bc4_r_snorm:
                case exports.WebGPUTextureFormat.bc1_rgba_unorm:
                case exports.WebGPUTextureFormat.bc1_rgba_unorm_srgb:
                    return { width: 4, height: 4, length: 8 };
                case exports.WebGPUTextureFormat.etc2_rgb8unorm:
                case exports.WebGPUTextureFormat.etc2_rgb8unorm_srgb:
                case exports.WebGPUTextureFormat.etc2_rgb8a1unorm:
                case exports.WebGPUTextureFormat.etc2_rgb8a1unorm_srgb:
                    return { width: 4, height: 4, length: 8 };
                case exports.WebGPUTextureFormat.etc2_rgba8unorm:
                case exports.WebGPUTextureFormat.etc2_rgba8unorm_srgb:
                    return { width: 4, height: 4, length: 16 };
                case exports.WebGPUTextureFormat.astc_4x4_unorm:
                case exports.WebGPUTextureFormat.astc_4x4_unorm_srgb:
                    return { width: 4, height: 4, length: 16 };
                case exports.WebGPUTextureFormat.astc_5x4_unorm:
                case exports.WebGPUTextureFormat.astc_5x4_unorm_srgb:
                    return { width: 5, height: 4, length: 16 };
                case exports.WebGPUTextureFormat.astc_5x5_unorm:
                case exports.WebGPUTextureFormat.astc_5x5_unorm_srgb:
                    return { width: 5, height: 5, length: 16 };
                case exports.WebGPUTextureFormat.astc_6x5_unorm:
                case exports.WebGPUTextureFormat.astc_6x5_unorm_srgb:
                    return { width: 6, height: 5, length: 16 };
                case exports.WebGPUTextureFormat.astc_6x6_unorm:
                case exports.WebGPUTextureFormat.astc_6x6_unorm_srgb:
                    return { width: 6, height: 6, length: 16 };
                case exports.WebGPUTextureFormat.astc_8x5_unorm:
                case exports.WebGPUTextureFormat.astc_8x5_unorm_srgb:
                    return { width: 8, height: 5, length: 16 };
                case exports.WebGPUTextureFormat.astc_8x6_unorm:
                case exports.WebGPUTextureFormat.astc_8x6_unorm_srgb:
                    return { width: 8, height: 6, length: 16 };
                case exports.WebGPUTextureFormat.astc_8x8_unorm:
                case exports.WebGPUTextureFormat.astc_8x8_unorm_srgb:
                    return { width: 8, height: 8, length: 16 };
                case exports.WebGPUTextureFormat.astc_10x5_unorm:
                case exports.WebGPUTextureFormat.astc_10x5_unorm_srgb:
                    return { width: 10, height: 5, length: 16 };
                case exports.WebGPUTextureFormat.astc_10x6_unorm:
                case exports.WebGPUTextureFormat.astc_10x6_unorm_srgb:
                    return { width: 10, height: 6, length: 16 };
                case exports.WebGPUTextureFormat.astc_10x8_unorm:
                case exports.WebGPUTextureFormat.astc_10x8_unorm_srgb:
                    return { width: 10, height: 8, length: 16 };
                case exports.WebGPUTextureFormat.astc_10x10_unorm:
                case exports.WebGPUTextureFormat.astc_10x10_unorm_srgb:
                    return { width: 10, height: 10, length: 16 };
                case exports.WebGPUTextureFormat.astc_12x10_unorm:
                case exports.WebGPUTextureFormat.astc_12x10_unorm_srgb:
                    return { width: 12, height: 10, length: 16 };
                case exports.WebGPUTextureFormat.astc_12x12_unorm:
                case exports.WebGPUTextureFormat.astc_12x12_unorm_srgb:
                    return { width: 12, height: 12, length: 16 };
            }
            return { width: 1, height: 1, length: 4 };
        }
        setTexturePixelsData(texture, source, premultiplyAlpha, invertY) {
            if (!source)
                return;
            const imageCopy = {
                texture: texture.resource,
                mipLevel: 0,
                premultipliedAlpha: premultiplyAlpha,
            };
            const block = this._getBlockInformationFromFormat(texture._webGPUFormat);
            const bytesPerRow = Math.ceil(texture.width / block.width) * block.length;
            const height = texture.height;
            const dataLayout = {
                offset: 0,
                bytesPerRow: bytesPerRow,
                rowsPerImage: height
            };
            const size = {
                width: Math.ceil(texture.width / block.width) * block.width,
                height: Math.ceil(height / block.height) * block.height,
                depthOrArrayLayers: texture.depth
            };
            const device = WebGPURenderEngine._instance.getDevice();
            device.queue.writeTexture(imageCopy, source.buffer, dataLayout, size);
            if (premultiplyAlpha)
                doPremultiplyAlpha(device, texture, 0, 0, texture.width, texture.height);
            if (this._isTextureNeedGenMipmap(texture))
                genMipmap(device, texture.resource);
        }
        setTextureSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
            if (!source)
                return;
            const imageCopy = {
                texture: texture.resource,
                mipLevel: mipmapLevel,
                premultipliedAlpha: premultiplyAlpha,
                origin: {
                    x: xOffset,
                    y: yOffset,
                },
            };
            const block = this._getBlockInformationFromFormat(texture._webGPUFormat);
            const bytesPerRow = Math.ceil(width / block.width) * block.length;
            const dataLayout = {
                offset: 0,
                bytesPerRow: bytesPerRow,
                rowsPerImage: height
            };
            const size = {
                width: Math.ceil(width / block.width) * block.width,
                height: Math.ceil(height / block.height) * block.height,
                depthOrArrayLayers: texture.depth
            };
            const device = WebGPURenderEngine._instance.getDevice();
            device.queue.writeTexture(imageCopy, source.buffer, dataLayout, size);
            if (premultiplyAlpha)
                doPremultiplyAlpha(device, texture, xOffset, yOffset, width, height);
            if (generateMipmap && this._isTextureNeedGenMipmap(texture))
                genMipmap(device, texture.resource);
        }
        setTextureDDSData(texture, ddsInfo) {
            const device = WebGPURenderEngine._instance.getDevice();
            let premultiplyAlpha = false;
            let source = ddsInfo.source;
            let dataOffset = ddsInfo.dataOffset;
            let bpp = ddsInfo.bpp;
            let blockBytes = ddsInfo.blockBytes;
            let mipmapCount = Math.min(ddsInfo.mipmapCount, texture.mipmapCount);
            let compressed = ddsInfo.compressed;
            let width = texture.width;
            let height = texture.height;
            texture.maxMipmapLevel = mipmapCount - 1;
            let formatParams = this._getFormatPixelsParams(ddsInfo.format);
            let channelsByte = formatParams.bytesPerPixel / formatParams.channels;
            let dataTypeConstur = formatParams.dataTypedCons;
            let mipmapWidth = width;
            let mipmapHeight = height;
            for (let index = 0; index < mipmapCount; index++) {
                const block = this._getBlockInformationFromFormat(texture._webGPUFormat);
                const bytesPerRow = Math.ceil(mipmapWidth / block.width) * block.length;
                const size = {
                    width: Math.ceil(mipmapWidth / block.width) * block.width,
                    height: Math.ceil(mipmapHeight / block.height) * block.height,
                    depthOrArrayLayers: texture.depth
                };
                const imageCopy = {
                    texture: texture.resource,
                    mipLevel: index,
                    premultipliedAlpha: premultiplyAlpha
                };
                const dataLayout = {
                    offset: 0,
                    bytesPerRow: bytesPerRow,
                    rowsPerImage: mipmapHeight
                };
                if (compressed) {
                    let dataLength = (((Math.max(4, mipmapWidth) / 4) * Math.max(4, mipmapHeight)) / 4) * blockBytes;
                    let sourceData = new Uint8Array(source, dataOffset, dataLength);
                    device.queue.writeTexture(imageCopy, sourceData, dataLayout, size);
                    dataOffset += bpp ? (mipmapWidth * mipmapHeight * (bpp / 8)) : dataLength;
                }
                else {
                    let dataLength = mipmapWidth * mipmapHeight * formatParams.channels;
                    let sourceData = new dataTypeConstur(source, dataOffset, dataLength);
                    device.queue.writeTexture(imageCopy, sourceData, dataLayout, size);
                    dataOffset += dataLength * channelsByte;
                }
                mipmapWidth = Math.max(1, mipmapWidth * 0.5);
                mipmapHeight = Math.max(1, mipmapHeight * 0.5);
            }
            texture.mipmapLoaded = true;
        }
        setTextureKTXData(texture, ktxInfo) {
            const device = WebGPURenderEngine._instance.getDevice();
            let premultipliedAlpha = false;
            let width = texture.width;
            let height = texture.height;
            let mipmapCount = Math.min(ktxInfo.mipmapCount, texture.mipmapCount);
            texture.maxMipmapLevel = mipmapCount - 1;
            let source = ktxInfo.source;
            ktxInfo.compress;
            let mipmapWidth = width;
            let mipmapHeight = height;
            let dataOffset = ktxInfo.headerOffset + ktxInfo.bytesOfKeyValueData;
            const imageSize = new Int32Array(source, dataOffset, 1)[0];
            dataOffset += 4;
            const block = this._getBlockInformationFromFormat(texture._webGPUFormat);
            const bytesPerRow = Math.ceil(mipmapWidth / block.width) * block.length;
            const size = {
                width: Math.ceil(mipmapWidth / block.width) * block.width,
                height: Math.ceil(mipmapHeight / block.height) * block.height,
                depthOrArrayLayers: texture.depth
            };
            const imageCopy = {
                texture: texture.resource,
                mipLevel: 0,
                premultipliedAlpha: premultipliedAlpha
            };
            let sourceData = new Uint8Array(source, dataOffset, imageSize);
            const dataLayout = {
                offset: 0,
                bytesPerRow: bytesPerRow,
                rowsPerImage: mipmapHeight
            };
            device.queue.writeTexture(imageCopy, sourceData, dataLayout, size);
            dataOffset += imageSize;
            dataOffset += 3 - ((imageSize + 3) % 4);
            mipmapWidth = Math.max(1, mipmapWidth * 0.5);
            mipmapHeight = Math.max(1, mipmapHeight * 0.5);
            if (this._isTextureNeedGenMipmap(texture))
                genMipmap(WebGPURenderEngine._instance.getDevice(), texture.resource);
        }
        setTextureHDRData(texture, hdrInfo) {
            const hdrPixelData = hdrInfo.readScanLine();
            this.setTexturePixelsData(texture, hdrPixelData, false, false);
        }
        setCubeImageData(texture, source, premultiplyAlpha, invertY) {
            if (!source)
                return;
            for (let index = 0; index < 6; index++) {
                const sourceData = source[index];
                if (sourceData) {
                    const image = { source: sourceData, flipY: invertY, origin: { x: 0, y: 0 } };
                    const textureCopyView = {
                        texture: texture.resource,
                        origin: {
                            x: 0,
                            y: 0,
                            z: WebGPUCubeMap[index]
                        },
                        mipLevel: 0,
                        premultipliedAlpha: premultiplyAlpha,
                        colorSpace: texture.useSRGBLoad ? "srgb" : undefined
                    };
                    const copySize = { width: sourceData.width, height: sourceData.height };
                    WebGPURenderEngine._instance.getDevice().queue.copyExternalImageToTexture(image, textureCopyView, copySize);
                }
            }
            if (premultiplyAlpha)
                doPremultiplyAlpha(WebGPURenderEngine._instance.getDevice(), texture, 0, 0, texture.width, texture.height);
            if (this._isTextureNeedGenMipmap(texture))
                genMipmap(WebGPURenderEngine._instance.getDevice(), texture.resource);
        }
        setCubePixelsData(texture, source, premultiplyAlpha, invertY) {
            if (!source)
                return;
            for (let index = 0; index < 6; index++) {
                const sourceData = source[index];
                if (sourceData) {
                    const imageCopy = {
                        texture: texture.resource,
                        mipLevel: 0,
                        premultipliedAlpha: premultiplyAlpha,
                        origin: {
                            x: 0,
                            y: 0,
                            z: WebGPUCubeMap[index]
                        }
                    };
                    const width = texture.width;
                    const height = texture.height;
                    const block = this._getBlockInformationFromFormat(texture._webGPUFormat);
                    const bytesPerRow = Math.ceil(width / block.width) * block.length;
                    const dataLayout = {
                        offset: 0,
                        bytesPerRow: bytesPerRow,
                        rowsPerImage: height
                    };
                    const size = {
                        width: Math.ceil(width / block.width) * block.width,
                        height: Math.ceil(height / block.height) * block.height,
                        depthOrArrayLayers: 1
                    };
                    WebGPURenderEngine._instance.getDevice().queue.writeTexture(imageCopy, sourceData.buffer, dataLayout, size);
                }
            }
            if (premultiplyAlpha)
                doPremultiplyAlpha(WebGPURenderEngine._instance.getDevice(), texture, 0, 0, texture.width, texture.height);
            if (this._isTextureNeedGenMipmap(texture))
                genMipmap(WebGPURenderEngine._instance.getDevice(), texture.resource);
        }
        setCubeSubPixelData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
            if (!source)
                return;
            generateMipmap = generateMipmap && mipmapLevel === 0;
            for (let index = 0; index < 6; index++) {
                const sourceData = source[index];
                if (sourceData) {
                    const imageCopy = {
                        texture: texture.resource,
                        mipLevel: mipmapLevel,
                        premultipliedAlpha: premultiplyAlpha,
                        origin: {
                            x: xOffset,
                            y: yOffset,
                            z: WebGPUCubeMap[index]
                        }
                    };
                    const block = this._getBlockInformationFromFormat(texture._webGPUFormat);
                    const bytesPerRow = Math.ceil(width / block.width) * block.length;
                    const dataLayout = {
                        offset: 0,
                        bytesPerRow: bytesPerRow,
                        rowsPerImage: height
                    };
                    const size = {
                        width: Math.ceil(width / block.width) * block.width,
                        height: Math.ceil(height / block.height) * block.height,
                        depthOrArrayLayers: 1
                    };
                    WebGPURenderEngine._instance.getDevice().queue.writeTexture(imageCopy, sourceData.buffer, dataLayout, size);
                }
            }
            if (premultiplyAlpha)
                doPremultiplyAlpha(WebGPURenderEngine._instance.getDevice(), texture, xOffset, yOffset, width, height);
            if (generateMipmap && this._isTextureNeedGenMipmap(texture))
                genMipmap(WebGPURenderEngine._instance.getDevice(), texture.resource);
        }
        setCubeKTXData(texture, ktxInfo) {
            const device = WebGPURenderEngine._instance.getDevice();
            let premultipliedAlpha = false;
            let mipmapCount = Math.min(ktxInfo.mipmapCount, texture.mipmapCount);
            texture.maxMipmapLevel = mipmapCount - 1;
            let width = texture.width;
            let height = texture.height;
            let mipmapWidth = width;
            let mipmapHeight = height;
            let dataOffset = ktxInfo.headerOffset + ktxInfo.bytesOfKeyValueData;
            let source = ktxInfo.source;
            let compressed = ktxInfo.compress;
            for (let index = 0; index < mipmapCount; index++) {
                let imageSize = new Int32Array(source, dataOffset, 1)[0];
                dataOffset += 4;
                for (let face = 0; face < 6; face++) {
                    const block = this._getBlockInformationFromFormat(texture._webGPUFormat);
                    const bytesPerRow = Math.ceil(mipmapWidth / block.width) * block.length;
                    const size = {
                        width: Math.ceil(mipmapWidth / block.width) * block.width,
                        height: Math.ceil(mipmapHeight / block.height) * block.height,
                        depthOrArrayLayers: 1
                    };
                    const imageCopy = {
                        texture: texture.resource,
                        mipLevel: index,
                        premultipliedAlpha: premultipliedAlpha,
                        origin: {
                            x: 0,
                            y: 0,
                            z: face
                        }
                    };
                    const dataLayout = {
                        offset: 0,
                        bytesPerRow: bytesPerRow,
                        rowsPerImage: mipmapHeight
                    };
                    if (compressed) {
                        let sourceData = new Uint8Array(source, dataOffset, imageSize);
                        device.queue.writeTexture(imageCopy, sourceData, dataLayout, size);
                    }
                    else {
                        let pixelParams = this._getFormatPixelsParams(ktxInfo.format);
                        let typedSize = imageSize / pixelParams.typedSize;
                        let sourceData = new pixelParams.dataTypedCons(source, dataOffset, typedSize);
                        device.queue.writeTexture(imageCopy, sourceData, dataLayout, size);
                    }
                    dataOffset += imageSize;
                    dataOffset += 3 - ((imageSize + 3) % 4);
                }
                mipmapWidth = Math.max(1, mipmapWidth * 0.5);
                mipmapHeight = Math.max(1, mipmapHeight * 0.5);
            }
            texture.mipmapLoaded = true;
        }
        setCubeDDSData(texture, ddsInfo) {
            const device = WebGPURenderEngine._instance.getDevice();
            let premultiplyAlpha = false;
            let source = ddsInfo.source;
            let dataOffset = ddsInfo.dataOffset;
            let bpp = ddsInfo.bpp;
            let blockBytes = ddsInfo.blockBytes;
            let mipmapCount = Math.min(ddsInfo.mipmapCount, texture.mipmapCount);
            let compressed = ddsInfo.compressed;
            let width = texture.width;
            let height = texture.height;
            texture.maxMipmapLevel = mipmapCount - 1;
            let formatParams = this._getFormatPixelsParams(ddsInfo.format);
            let channelsByte = formatParams.bytesPerPixel / formatParams.channels;
            let dataTypeConstur = formatParams.dataTypedCons;
            for (let face = 0; face < 6; face++) {
                let mipmapWidth = width;
                let mipmapHeight = height;
                for (let index = 0; index < mipmapCount; index++) {
                    const block = this._getBlockInformationFromFormat(texture._webGPUFormat);
                    const bytesPerRow = Math.ceil(mipmapWidth / block.width) * block.length;
                    const size = {
                        width: Math.ceil(mipmapWidth / block.width) * block.width,
                        height: Math.ceil(mipmapHeight / block.height) * block.height,
                        depthOrArrayLayers: 1
                    };
                    const imageCopy = {
                        texture: texture.resource,
                        mipLevel: index,
                        premultipliedAlpha: premultiplyAlpha,
                        origin: {
                            x: 0,
                            y: 0,
                            z: face
                        }
                    };
                    const dataLayout = {
                        offset: 0,
                        bytesPerRow: bytesPerRow,
                        rowsPerImage: mipmapHeight
                    };
                    if (compressed) {
                        let dataLength = Math.max(4, mipmapWidth) / 4 * Math.max(4, mipmapHeight) / 4 * blockBytes;
                        let sourceData = new Uint8Array(source, dataOffset, dataLength);
                        device.queue.writeTexture(imageCopy, sourceData, dataLayout, size);
                        dataOffset += bpp ? (mipmapWidth * mipmapHeight * (bpp / 8)) : dataLength;
                    }
                    else {
                        let dataLength = mipmapWidth * mipmapHeight * formatParams.channels;
                        let sourceData = new dataTypeConstur(source, dataOffset, dataLength);
                        device.queue.writeTexture(imageCopy, sourceData, dataLayout, size);
                        dataOffset += dataLength * channelsByte;
                    }
                    mipmapWidth = Math.max(1, mipmapWidth * 0.5);
                    mipmapHeight = Math.max(1, mipmapHeight * 0.5);
                }
            }
            texture.mipmapLoaded = true;
        }
        setTextureCompareMode(texture, compareMode) {
            switch (compareMode) {
                case Laya.TextureCompareMode.LEQUAL:
                    break;
                case Laya.TextureCompareMode.GEQUAL:
                    break;
                case Laya.TextureCompareMode.LESS:
                    break;
                case Laya.TextureCompareMode.GREATER:
                    break;
                case Laya.TextureCompareMode.EQUAL:
                    break;
                case Laya.TextureCompareMode.NOTEQUAL:
                    break;
                case Laya.TextureCompareMode.ALWAYS:
                    break;
                case Laya.TextureCompareMode.NEVER:
                    break;
                case Laya.TextureCompareMode.None:
            }
            return compareMode;
        }
        _isSRGBFormat(format) {
            switch (format) {
                case Laya.TextureFormat.ETC2SRGB:
                case Laya.TextureFormat.ETC2SRGB_Alpha8:
                case Laya.TextureFormat.ASTC4x4SRGB:
                case Laya.TextureFormat.ASTC6x6SRGB:
                case Laya.TextureFormat.ASTC8x8SRGB:
                case Laya.TextureFormat.ASTC10x10SRGB:
                case Laya.TextureFormat.ASTC12x12SRGB:
                    return true;
                default:
                    return false;
            }
        }
        _supportSRGB(format, mipmap) {
            switch (format) {
                case Laya.TextureFormat.R8G8B8:
                    return this._engine.getCapable(Laya.RenderCapable.Texture_SRGB);
                case Laya.TextureFormat.R8G8B8A8:
                    return this._engine.getCapable(Laya.RenderCapable.Texture_SRGB);
                case Laya.TextureFormat.DXT1:
                case Laya.TextureFormat.DXT3:
                case Laya.TextureFormat.DXT5:
                    return this._engine.getCapable(Laya.RenderCapable.COMPRESS_TEXTURE_S3TC_SRGB);
                default:
                    return false;
            }
        }
        createRenderTargetInternal(width, height, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples, storage) {
            const useSRGBExt = this._isSRGBFormat(colorFormat) || (sRGB && this._supportSRGB(colorFormat, generateMipmap));
            let gammaCorrection = 1.0;
            const pixelByteSize = this._getGPURenderTexturePixelByteSize(colorFormat);
            const gpuColorFormat = this._getGPURenderTargetFormat(colorFormat, sRGB, storage);
            const gpuColorDescriptor = this._getGPUTextureDescriptor(Laya.TextureDimension.Tex2D, width, height, gpuColorFormat, 1, generateMipmap, multiSamples, false);
            gpuColorDescriptor.usage = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC | GPUTextureUsage.COPY_DST;
            if (storage) {
                let supportStorage = this._supportStorage(gpuColorFormat);
                if (supportStorage) {
                    gpuColorDescriptor.usage |= GPUTextureUsage.STORAGE_BINDING;
                }
                else {
                    console.warn(`WebGPU: RenderTarget format ${colorFormat} does not support storage usage.`);
                }
            }
            gpuColorDescriptor.label = 'renderTarget color';
            const gpuColorTexture = this._engine.getDevice().createTexture(gpuColorDescriptor);
            const internalRT = new WebGPUInternalRT(colorFormat, depthStencilFormat, false, generateMipmap, multiSamples, useSRGBExt);
            internalRT._textures.push(new WebGPUInternalTex(width, height, 1, Laya.TextureDimension.Tex2D, generateMipmap, multiSamples, useSRGBExt, gammaCorrection));
            internalRT._textures[0].format = colorFormat;
            internalRT._textures[0].resource = gpuColorTexture;
            internalRT._textures[0]._webGPUFormat = gpuColorFormat;
            internalRT._textures[0].statisAsRenderTexture();
            internalRT._textures[0].gpuMemory = (width * height * multiSamples * pixelByteSize * (generateMipmap ? 1.33333 : 1)) | 0;
            if (multiSamples > 1) {
                const gpuColorDescriptor = this._getGPUTextureDescriptor(Laya.TextureDimension.Tex2D, width, height, gpuColorFormat, 1, generateMipmap, 1, false);
                gpuColorDescriptor.usage = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC | GPUTextureUsage.COPY_DST;
                const gpuColorTexture = this._engine.getDevice().createTexture(gpuColorDescriptor);
                internalRT._texturesResolve.push(new WebGPUInternalTex(width, height, 1, Laya.TextureDimension.Tex2D, generateMipmap, 1, useSRGBExt, gammaCorrection));
                internalRT._texturesResolve[0].format = colorFormat;
                internalRT._texturesResolve[0].resource = gpuColorTexture;
                internalRT._texturesResolve[0]._webGPUFormat = gpuColorFormat;
                internalRT._texturesResolve[0].statisAsRenderTexture();
                internalRT._texturesResolve[0].gpuMemory = (width * height * pixelByteSize * (generateMipmap ? 1.33333 : 1)) | 0;
            }
            if (depthStencilFormat !== Laya.RenderTargetFormat.None) {
                const pixelByteSize = this._getGPURenderTexturePixelByteSize(depthStencilFormat);
                const gpuDepthFormat = this._getGPURenderTargetFormat(depthStencilFormat, false, storage);
                const gpuDepthDescriptor = this._getGPUTextureDescriptor(Laya.TextureDimension.Tex2D, width, height, gpuDepthFormat, 1, generateMipmap, multiSamples, false);
                gpuDepthDescriptor.usage = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT;
                gpuDepthDescriptor.label = 'renderTarget depth';
                const gpuDepthTexture = this._engine.getDevice().createTexture(gpuDepthDescriptor);
                internalRT._depthTexture = new WebGPUInternalTex(width, height, 1, Laya.TextureDimension.Tex2D, false, 1, false, 1);
                internalRT._depthTexture.format = depthStencilFormat;
                internalRT._depthTexture.resource = gpuDepthTexture;
                internalRT._depthTexture._webGPUFormat = gpuDepthFormat;
                internalRT._depthTexture.statisAsRenderTexture();
                internalRT._depthTexture.gpuMemory = width * height * multiSamples * pixelByteSize;
            }
            internalRT._getCacheInfo();
            return internalRT;
        }
        createRenderTargetFromArrayLayer(arrayTex, layer, colorFormat, depthStencilFormat, sRGB) {
            const internalRT = new WebGPUInternalRT(colorFormat, depthStencilFormat, false, false, 1, sRGB);
            internalRT._textures = [arrayTex];
            internalRT._texturesResolve = null;
            internalRT._arrayLayerIndex = layer;
            internalRT._getCacheInfo();
            return internalRT;
        }
        createRenderTargetDepthTexture(renderTarget, dimension, width, height) {
            return renderTarget._depthTexture;
        }
        blitFrameBuffer(source, dest, invertY) {
            const device = this._engine.getDevice();
            let srcColorTex;
            if (source._samples > 1 && source._texturesResolve && source._texturesResolve.length > 0) {
                srcColorTex = source._texturesResolve[0];
            }
            else {
                srcColorTex = source._textures[0];
            }
            let dstColorTex;
            if (dest._samples > 1 && dest._texturesResolve && dest._texturesResolve.length > 0) {
                dstColorTex = dest._texturesResolve[0];
            }
            else {
                dstColorTex = dest._textures[0];
            }
            const srcDepthRes = source._depthTexture ? source._depthTexture.resource : null;
            const dstDepthRes = dest._depthTexture ? dest._depthTexture.resource : null;
            const dstDepthFormat = dest._depthTexture ? dest._depthTexture._webGPUFormat : null;
            blitFramebuffer(device, srcColorTex.resource, dstColorTex.resource, dstColorTex._webGPUFormat, srcDepthRes, dstDepthRes, dstDepthFormat, srcColorTex.width, srcColorTex.height, invertY);
        }
        createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
            throw new Laya.NotImplementedError();
        }
        bindRenderTarget(renderTarget, faceIndex) {
            throw new Laya.NotImplementedError();
        }
        bindoutScreenTarget() {
            throw new Laya.NotImplementedError();
        }
        unbindRenderTarget(renderTarget) {
            throw new Laya.NotImplementedError();
        }
        readRenderTargetPixelData(renderTarget, xOffset, yOffset, width, height, out) {
            throw new Laya.NotImplementedError();
        }
        async readRenderTargetPixelDataAsync(renderTarget, xOffset, yOffset, width, height, out) {
            const texture = renderTarget._textures[0].resource;
            const device = this._engine.getDevice();
            let bytesPerPixel = 4;
            let dataTypedCons = Uint8Array;
            switch (renderTarget.colorFormat) {
                case Laya.RenderTargetFormat.R8G8B8A8:
                    bytesPerPixel = 4;
                    dataTypedCons = Uint8Array;
                    break;
                case Laya.RenderTargetFormat.R16G16B16A16:
                    bytesPerPixel = 8;
                    dataTypedCons = Uint16Array;
                    break;
                case Laya.RenderTargetFormat.R32G32B32A32:
                    bytesPerPixel = 16;
                    dataTypedCons = Uint32Array;
                    break;
            }
            const bytesPerRow = Math.ceil(width * bytesPerPixel / 256) * 256;
            const bufferSize = bytesPerRow * height;
            const buffer = device.createBuffer({
                size: bufferSize,
                usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
            });
            const commandEncoder = device.createCommandEncoder();
            let source = {
                texture,
                origin: [xOffset, yOffset]
            };
            commandEncoder.copyTextureToBuffer(source, { buffer, bytesPerRow }, { width, height, depthOrArrayLayers: 1 });
            const commands = commandEncoder.finish();
            device.queue.submit([commands]);
            const outView = new dataTypedCons(out.buffer);
            return buffer.mapAsync(GPUMapMode.READ).then(() => {
                const arrayBuffer = buffer.getMappedRange();
                const data = new dataTypedCons(arrayBuffer);
                if (renderTarget.colorFormat == Laya.RenderTargetFormat.R8G8B8A8 && this._engine._preferredFormat == exports.WebGPUTextureFormat.bgra8unorm) {
                    for (let j = 0; j < height; j++) {
                        for (let i = 0; i < width; i++) {
                            let outOffset = (j * width + i) * 4;
                            let dataOffset = (j * bytesPerRow + i * 4);
                            outView[outOffset + 0] = data[dataOffset + 2];
                            outView[outOffset + 1] = data[dataOffset + 1];
                            outView[outOffset + 2] = data[dataOffset + 0];
                            outView[outOffset + 3] = data[dataOffset + 3];
                        }
                    }
                }
                else {
                    for (let j = 0; j < height; j++) {
                        for (let i = 0; i < width; i++) {
                            let outOffset = (j * width + i) * 4;
                            let dataOffset = (j * bytesPerRow + i * 4);
                            outView[outOffset + 0] = data[dataOffset + 0];
                            outView[outOffset + 1] = data[dataOffset + 1];
                            outView[outOffset + 2] = data[dataOffset + 2];
                            outView[outOffset + 3] = data[dataOffset + 3];
                        }
                    }
                }
                buffer.unmap();
                buffer.destroy();
                return out;
            });
        }
        initVideoTextureData(texture) { }
        async updateVideoTexture(texture, video, premultiplyAlpha, invertY) {
            if (!video || video.readyState < 2)
                return;
            const image = { source: video, flipY: invertY, origin: [0, 0] };
            const textureCopyView = {
                texture: texture.resource,
                origin: {
                    x: 0,
                    y: 0,
                },
                mipLevel: 0,
                premultipliedAlpha: premultiplyAlpha,
                colorSpace: texture.useSRGBLoad ? "srgb" : undefined,
            };
            const copySize = { width: video.videoWidth, height: video.videoHeight };
            const device = WebGPURenderEngine._instance.getDevice();
            device.queue.copyExternalImageToTexture(image, textureCopyView, copySize);
        }
        getRenderTextureDataAsync(internalTex, x, y, width, height) {
            let bytesPerRow = 0;
            switch (internalTex.colorFormat) {
                case Laya.RenderTargetFormat.R8G8B8A8:
                    bytesPerRow = Math.ceil(width * 4 / 256) * 256;
                    break;
                case Laya.RenderTargetFormat.R16G16B16A16:
                    bytesPerRow = Math.ceil(width * 8 / 256) * 256;
                    break;
                case Laya.RenderTargetFormat.R32G32B32A32:
                    bytesPerRow = Math.ceil(width * 16 / 256) * 256;
                    break;
            }
            return this.readRenderTargetPixelDataAsync(internalTex, x, y, width, height, new Uint8Array(bytesPerRow * height));
        }
    }

    class WebGPUBufferManager extends Laya.UniformBufferManager {
        constructor(engine, useBigBuffer) {
            super(useBigBuffer);
            engine.on("endFrame", this, this.endFrame);
            engine.on("startFrame", this, this.startFrame);
        }
        destroy() {
            return false;
        }
        createGPUBuffer(size, name) {
            return WebGPURenderEngine._instance.getDevice().createBuffer({
                label: name,
                size,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });
        }
        writeBuffer(buffer, data, offset, size) {
            WebGPURenderEngine._instance.getDevice().queue.writeBuffer(buffer, offset, data, offset, size);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_UBOBufferUploadCount, 1);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_UBOBufferUploadMemory, size / 1048576);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_BufferUploadCount, 1);
        }
        statisGPUMemory(bytes) {
            super.statisGPUMemory(bytes);
        }
    }

    class WebGPUConfig {
        constructor() {
            this.deviceDescriptor = {};
            this.alphaMode = 'opaque';
            this.usage = GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC;
            this.colorSpace = 'srgb';
            this.depthStencilFormat = exports.WebGPUTextureFormat.depth24plus_stencil8;
            this.msaa = false;
        }
    }
    class WebGPURenderEngine extends Laya.EventDispatcher {
        constructor(config, canvas) {
            super();
            this._screenResized = false;
            this._remapZ = false;
            this._screenInvertY = true;
            this._lodTextureSample = false;
            this._breakTextureSample = false;
            this._framePassCount = 0;
            this._timingCount = 0;
            this._timingAverage = 0;
            this._timingQuerySum = 0;
            this._timingQueryStart = 0;
            this.useSPRIV = false;
            this.objectName = 'WebGPURenderEngine';
            this._propertyNameMap = {};
            this._propertyNameCounter = 0;
            this._defineMap = {};
            this._defineCounter = 0;
            this._maskMap = [];
            this._texGammaDefine = {};
            this.hasScreenCleared = false;
            this._config = config;
            this._canvas = canvas;
            if (navigator.gpu) {
                WebGPURenderEngine._instance = this;
                this.wgslLanguageFeatures = navigator.gpu.wgslLanguageFeatures;
            }
            else
                console.error('WebGPU is not supported by your browser');
            this.gpuBufferMgr = new WebGPUBufferManager(this, true);
            this.shaderCompiler = new WebGPUShaderCompiler();
        }
        _getAdapter() {
            return navigator.gpu.requestAdapter({ powerPreference: this._config.powerPreference });
        }
        _initAdapter(adapter) {
            var _a;
            if (!adapter) {
                throw 'Could not retrieve a WebGPU adapter (adapter is null).';
            }
            else {
                this._adapter = adapter;
                const deviceDescriptor = this._config.deviceDescriptor;
                this._adapterSupportedExtensions = [];
                (_a = this._adapter.features) === null || _a === void 0 ? void 0 : _a.forEach(feature => this._adapterSupportedExtensions.push(feature));
                if (deviceDescriptor === null || deviceDescriptor === void 0 ? void 0 : deviceDescriptor.requiredFeatures) {
                    const requestedExtensions = deviceDescriptor.requiredFeatures;
                    const validExtensions = [];
                    for (const extension of requestedExtensions)
                        if (this._adapterSupportedExtensions.indexOf(extension) !== -1)
                            validExtensions.push(extension);
                        else {
                            console.warn(`WebGPU: ${extension} is not supported by the adapter.`);
                        }
                    deviceDescriptor.requiredFeatures = validExtensions;
                }
            }
        }
        _getGPUdevice(deviceDescriptor) {
            this._supportCapatable = new WebGPUCapable(deviceDescriptor);
            deviceDescriptor = deviceDescriptor || {};
            if (this._adapter && !deviceDescriptor.requiredLimits) {
                const al = this._adapter.limits;
                deviceDescriptor.requiredLimits = {
                    maxTextureDimension1D: al.maxTextureDimension1D,
                    maxTextureDimension2D: al.maxTextureDimension2D,
                    maxTextureDimension3D: al.maxTextureDimension3D,
                    maxTextureArrayLayers: al.maxTextureArrayLayers,
                    maxBufferSize: al.maxBufferSize,
                    maxStorageBufferBindingSize: al.maxStorageBufferBindingSize,
                    maxUniformBufferBindingSize: al.maxUniformBufferBindingSize,
                    maxComputeWorkgroupStorageSize: al.maxComputeWorkgroupStorageSize,
                    maxComputeInvocationsPerWorkgroup: al.maxComputeInvocationsPerWorkgroup,
                    maxComputeWorkgroupSizeX: al.maxComputeWorkgroupSizeX,
                    maxComputeWorkgroupSizeY: al.maxComputeWorkgroupSizeY,
                    maxComputeWorkgroupSizeZ: al.maxComputeWorkgroupSizeZ,
                    maxComputeWorkgroupsPerDimension: al.maxComputeWorkgroupsPerDimension,
                };
            }
            return this._adapter.requestDevice(deviceDescriptor);
        }
        _unCapturedErrorCall(event) {
            console.warn('WebGPU unCaptured error: ' + event.error);
            console.warn('WebGPU unCaptured error message: ' + event.error.message);
        }
        _deviceLostCall(info) {
            console.error('WebGPU context lost' + info);
        }
        _initDevice(device) {
            this._device = device;
            this._deviceEnabledExtensions = [];
            this._device.features.forEach(element => {
                this._deviceEnabledExtensions.push(element);
            });
            this._device.addEventListener('uncapturederror', this._unCapturedErrorCall);
            this._device.lost.then(this._deviceLostCall);
        }
        async _initAsync() {
            return this._getAdapter().then((adapter) => {
                this._initAdapter(adapter);
                return this._getGPUdevice(this._config.deviceDescriptor);
            }).then((device) => {
                this._initDevice(device);
                console.log('WebGPU start');
                return Promise.resolve();
            }, (e) => {
                console.log(e);
                throw 'Could not get WebGPU device';
            }).then(() => {
                return this.shaderCompiler.init();
            });
        }
        resizeOffScreen(width, height) {
            const w = width | 0;
            const h = height | 0;
            if (w === 0 || h === 0)
                return;
            if (!this._screenRT
                || this._screenRT._textures[0].width !== w
                || this._screenRT._textures[0].height !== h) {
                this._createScreenRT();
            }
        }
        getDevice() {
            return this._device;
        }
        upload() {
            this.gpuBufferMgr.upload();
        }
        _initContext() {
            var _a;
            this._context = this._canvas.getContext('webgpu');
            if (!this._context)
                throw 'Could not get context';
            this._preferredFormat = navigator.gpu.getPreferredCanvasFormat();
            const format = this._config.swapChainFormat || (this._preferredFormat == exports.WebGPUTextureFormat.bgra8unorm ? exports.WebGPUTextureFormat.bgra8unorm : exports.WebGPUTextureFormat.rgba8unorm);
            const usage = (_a = this._config.usage) !== null && _a !== void 0 ? _a : GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC;
            this._context.configure({
                device: this._device,
                format,
                usage,
                alphaMode: this._config.alphaMode,
            });
        }
        async initRenderEngine() {
            await this._initAsync();
            this._initContext();
            this._textureContext = new WebGPUTextureContext(this);
            this._createScreenRT();
        }
        copySubFrameBuffertoTex(texture, level, xoffset, yoffset, x, y, width, height) {
            throw new Laya.NotImplementedError;
        }
        propertyNameToID(name) {
            if (this._propertyNameMap[name] !== undefined) {
                return this._propertyNameMap[name];
            }
            else {
                const id = this._propertyNameCounter++;
                this._propertyNameMap[name] = id;
                this._propertyNameMap[id] = name;
                return id;
            }
        }
        propertyIDToName(id) {
            return this._propertyNameMap[id];
        }
        getDefineByName(name) {
            let define = this._defineMap[name];
            if (!define) {
                const maskMap = this._maskMap;
                const counter = this._defineCounter;
                const index = Math.floor(counter / 32);
                const value = 1 << counter % 32;
                define = new Laya.ShaderDefine(index, value);
                this._defineMap[name] = define;
                if (index === maskMap.length) {
                    maskMap.length++;
                    maskMap[index] = {};
                }
                maskMap[index][value] = name;
                this._defineCounter++;
            }
            return define;
        }
        getNamesByDefineData(defineData, out) {
            const maskMap = this._maskMap;
            const mask = defineData._mask;
            out.length = 0;
            for (let i = 0, n = defineData._length; i < n; i++) {
                const subMaskMap = maskMap[i];
                const subMask = mask[i];
                for (let j = 0; j < 32; j++) {
                    const d = 1 << j;
                    if (subMask > 0 && d > subMask)
                        break;
                    if (subMask & d)
                        out.push(subMaskMap[d]);
                }
            }
        }
        addTexGammaDefine(key, value) {
            this._texGammaDefine[key] = value;
        }
        getParams(params) {
            switch (params) {
                case Laya.RenderParams.Max_Active_Texture_Count:
                    return this._device.limits.maxSampledTexturesPerShaderStage;
                case Laya.RenderParams.Max_Uniform_Count:
                    return this._device.limits.maxUniformBuffersPerShaderStage;
                case Laya.RenderParams.Max_AnisoLevel_Count:
                    return 16;
                case Laya.RenderParams.MAX_Texture_Size:
                    return this._device.limits.maxTextureDimension2D;
                case Laya.RenderParams.MAX_Texture_Image_Uint:
                    return 1024;
                case Laya.RenderParams.MaxComputeElement:
                    return this._device.limits.maxComputeWorkgroupSizeX * this._device.limits.maxComputeWorkgroupsPerDimension;
            }
            return 0;
        }
        getCapable(capatableType) {
            return this._supportCapatable.getCapable(capatableType);
        }
        getTextureContext() {
            return this._textureContext;
        }
        _createScreenRT() {
            this._screenRT =
                this._textureContext.createRenderTargetInternal(this._canvas.width, this._canvas.height, Laya.RenderTargetFormat.R8G8B8A8, Laya.RenderTargetFormat.None, false, false, 1, false);
            this._screenResized = true;
        }
        startFrame() {
            this.hasScreenCleared = false;
            let rt = this._screenRT;
            rt._textures[0].resource = this._context.getCurrentTexture();
            rt._textures[0].multiSamplers = 1;
            this.event('startFrame');
        }
        endFrame() {
            this.event('endFrame');
            this._framePassCount = 0;
            WebGPUShaderData.endFrame();
        }
    }

    class WebGPUSetRendertarget2DCMD extends Laya.SetRendertarget2DCMD {
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ChangeRenderTarget;
            this._clearColorValue = new Laya.Color();
        }
        apply(context) {
            let engine = WebGPURenderEngine._instance;
            if (this.rt != engine._screenRT) {
                context.invertY = WebGPURenderEngine._instance._screenInvertY ? (!this.invertY) : this.invertY;
            }
            else {
                context.invertY = false;
            }
            context.setRenderTarget(this.rt, this.clearColor, this.clearColorValue);
            context.passData.setVector2(Laya.ShaderDefines2D.UNIFORM_SIZE, this.size);
        }
    }
    class WebGPUDraw2DElementCMD extends Laya.Draw2DElementCMD {
        constructor() {
            super();
            this.type = Laya.RenderCMDType.DrawElement;
        }
        setRenderelements(value) {
            this._elements = value;
        }
        apply(context) {
            if (this._elements.length == 1) {
                context.drawRenderElementOne(this._elements[0]);
            }
            else {
                this._elements.forEach(element => {
                    context.drawRenderElementOne(element);
                });
            }
        }
    }
    class WebGPUBlit2DQuadCMD extends Laya.Blit2DQuadCMD {
        static __init__() {
            WebGPUBlit2DQuadCMD.SCREENTEXTURE_ID = Laya.Shader3D.propertyNameToID("u_MainTex");
            WebGPUBlit2DQuadCMD.SCREENTEXTUREOFFSETSCALE_ID = Laya.Shader3D.propertyNameToID("u_OffsetScale");
            WebGPUBlit2DQuadCMD.MAINTEXTURE_TEXELSIZE_ID = Laya.Shader3D.propertyNameToID("u_MainTex_TexelSize");
        }
        constructor() {
            super();
            if (!WebGPUBlit2DQuadCMD.SCREENTEXTURE_ID)
                WebGPUBlit2DQuadCMD.__init__();
            this.type = Laya.RenderCMDType.Blit;
            this._viewport = new Laya.Viewport();
            this._offsetScale = new Laya.Vector4();
            this._sourceTexelSize = new Laya.Vector4();
        }
        set source(value) {
            this._source = value;
            if (this._source)
                this._sourceTexelSize.setValue(1 / this._source.width, 1 / this._source.height, this._source.width, this._source.height);
        }
        apply(context) {
            this.element.materialShaderData._setInternalTexture(WebGPUBlit2DQuadCMD.SCREENTEXTURE_ID, this._source);
            this.element.materialShaderData.setVector(WebGPUBlit2DQuadCMD.SCREENTEXTUREOFFSETSCALE_ID, this._offsetScale);
            this.element.materialShaderData.setVector(WebGPUBlit2DQuadCMD.MAINTEXTURE_TEXELSIZE_ID, this._sourceTexelSize);
            context.setRenderTarget(this._dest, false, Laya.Color.BLACK);
            context.drawRenderElementOne(this.element);
        }
    }

    exports.WebGPUBindingInfoType = void 0;
    (function (WebGPUBindingInfoType) {
        WebGPUBindingInfoType[WebGPUBindingInfoType["buffer"] = 0] = "buffer";
        WebGPUBindingInfoType[WebGPUBindingInfoType["texture"] = 1] = "texture";
        WebGPUBindingInfoType[WebGPUBindingInfoType["sampler"] = 2] = "sampler";
        WebGPUBindingInfoType[WebGPUBindingInfoType["storageBuffer"] = 3] = "storageBuffer";
        WebGPUBindingInfoType[WebGPUBindingInfoType["storageTexture"] = 4] = "storageTexture";
    })(exports.WebGPUBindingInfoType || (exports.WebGPUBindingInfoType = {}));
    class WebGPUBindGroupHelper {
        static CacheBindGroupPropertyInfo(key, infos, force = false) {
            if (!force && WebGPUBindGroupHelper.BindGroupPropertyInfoMap.has(key)) {
                console.warn("WebGPUBindGroupHelper.CacheBindGroupPropertyInfo: key already exists, overwriting.");
            }
            WebGPUBindGroupHelper.BindGroupPropertyInfoMap.set(key, infos);
        }
        static _getBindGroupID(array) {
            if (!array || array.length === 0) {
                return "";
            }
            const sortedArray = [...array].sort();
            return sortedArray.join("_");
        }
        static _getBindGroupPropertyID(bindGroupID, array) {
            return `${bindGroupID}` + this._getBindGroupID(array);
        }
        static _getTextureType(uniformType) {
            switch (uniformType) {
                case Laya.ShaderDataType.Texture2D:
                    return '2d';
                case Laya.ShaderDataType.Texture3D:
                    return '3d';
                case Laya.ShaderDataType.TextureCube:
                    return 'cube';
                case Laya.ShaderDataType.Texture2DArray:
                    return '2d-array';
                default:
                    return '2d';
            }
        }
        static createBindPropertyInfoArrayByCommandMap(groupID, unifromCommandMapArray, isComputeShader = false, force = false) {
            var _a;
            const bindGroupKey = this._getBindGroupPropertyID(groupID, unifromCommandMapArray);
            if (!force && WebGPUBindGroupHelper.BindGroupPropertyInfoMap.has(bindGroupKey)) {
                return WebGPUBindGroupHelper.BindGroupPropertyInfoMap.get(bindGroupKey);
            }
            let bindingInfos = [];
            let bindingIndex = 0;
            let visibility = GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT;
            if (isComputeShader) {
                visibility = GPUShaderStage.COMPUTE;
            }
            for (let i = 0; i < unifromCommandMapArray.length; i++) {
                const commandName = unifromCommandMapArray[i];
                const propertyId = Laya.Shader3D.propertyNameToID(commandName);
                const uniformMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(commandName);
                if (uniformMap._hasUniformBuffer) {
                    const bindingInfo = {
                        id: 0,
                        name: commandName,
                        set: groupID,
                        binding: bindingIndex++,
                        propertyId: propertyId,
                        visibility: visibility,
                        type: exports.WebGPUBindingInfoType.buffer,
                        buffer: {
                            type: 'uniform'
                        }
                    };
                    if (commandName == "SkinSprite3D") {
                        bindingInfo.buffer.hasDynamicOffset = true;
                    }
                    bindingInfos.push(bindingInfo);
                }
                if (uniformMap && uniformMap._idata) {
                    let defaultMap = uniformMap._defaultData;
                    for (let [propertyID, uniformProperty] of uniformMap._idata) {
                        if (uniformProperty.uniformtype >= Laya.ShaderDataType.Texture2D) {
                            let defaultTex = (_a = defaultMap.get(propertyID)) === null || _a === void 0 ? void 0 : _a._texture;
                            let textureBindInfo = {
                                id: 0,
                                set: groupID,
                                binding: bindingIndex++,
                                name: uniformProperty.propertyName + "_Texture",
                                propertyId: propertyID,
                                visibility: visibility,
                                type: exports.WebGPUBindingInfoType.texture,
                                texture: {
                                    sampleType: 'float',
                                    viewDimension: WebGPUBindGroupHelper._getTextureType(uniformProperty.uniformtype),
                                    multisampled: false
                                }
                            };
                            bindingInfos.push(textureBindInfo);
                            let samplerBindInfo = {
                                id: 0,
                                set: groupID,
                                binding: bindingIndex++,
                                name: uniformProperty.propertyName + "_Sampler",
                                propertyId: propertyID,
                                visibility: visibility,
                                type: exports.WebGPUBindingInfoType.sampler,
                                sampler: {
                                    type: 'filtering'
                                },
                                texture: {
                                    sampleType: 'float',
                                    viewDimension: WebGPUBindGroupHelper._getTextureType(uniformProperty.uniformtype),
                                    multisampled: false
                                }
                            };
                            bindingInfos.push(samplerBindInfo);
                            if (defaultTex) {
                                defaultTex._getGPUTextureBindingLayout(textureBindInfo.texture);
                                defaultTex._getSampleBindingLayout(samplerBindInfo.sampler);
                            }
                        }
                        if (uniformProperty.uniformtype == Laya.ShaderDataType.ReadOnlyDeviceBuffer) {
                            let storageBufferBindInfo = {
                                id: 0,
                                set: groupID,
                                binding: bindingIndex++,
                                name: uniformProperty.propertyName,
                                propertyId: propertyID,
                                visibility: visibility,
                                type: exports.WebGPUBindingInfoType.storageBuffer,
                                buffer: {
                                    type: "read-only-storage"
                                }
                            };
                            bindingInfos.push(storageBufferBindInfo);
                        }
                        if (uniformProperty.uniformtype == Laya.ShaderDataType.DeviceBuffer) {
                            let storageBufferBindInfo = {
                                id: 0,
                                set: groupID,
                                binding: bindingIndex++,
                                name: uniformProperty.propertyName,
                                propertyId: propertyID,
                                visibility: visibility,
                                type: exports.WebGPUBindingInfoType.storageBuffer,
                                buffer: {
                                    type: "storage"
                                }
                            };
                            bindingInfos.push(storageBufferBindInfo);
                        }
                        if (uniformProperty.uniformtype == Laya.ShaderDataType.StorageTexture2D) {
                            let gpuFormat = getWebGPUFormat(uniformProperty.format);
                            let gpuAccess = getWebGPUAccess(uniformProperty.access);
                            let info = {
                                id: 0,
                                set: groupID,
                                binding: bindingIndex++,
                                name: uniformProperty.propertyName,
                                propertyId: propertyID,
                                visibility: visibility,
                                type: exports.WebGPUBindingInfoType.storageTexture,
                                format: uniformProperty.format,
                                storageTexture: {
                                    access: gpuAccess,
                                    format: gpuFormat,
                                    viewDimension: WebGPUBindGroupHelper._getTextureType(uniformProperty.uniformtype)
                                }
                            };
                            bindingInfos.push(info);
                        }
                    }
                }
            }
            WebGPUBindGroupHelper.CacheBindGroupPropertyInfo(bindGroupKey, bindingInfos, force);
            return bindingInfos;
        }
        static createBindGroupInfosByUniformMap(groupID, name, cacheName, uniformMap) {
            const bindGroupKey = this._getBindGroupPropertyID(groupID, [cacheName]);
            if (WebGPUBindGroupHelper.BindGroupPropertyInfoMap.has(bindGroupKey)) {
                return WebGPUBindGroupHelper.BindGroupPropertyInfoMap.get(bindGroupKey);
            }
            let bindingIndex = 0;
            const propertyId = Laya.Shader3D.propertyNameToID(name);
            let bindingInfos = [];
            let hasBuffer = false;
            for (let [propertyID, uniformProperty] of uniformMap) {
                if (uniformProperty.uniformtype >= Laya.ShaderDataType.Texture2D) {
                    let textureBindInfo = {
                        id: 0,
                        set: groupID,
                        binding: bindingIndex++,
                        name: uniformProperty.propertyName + "_Texture",
                        propertyId: propertyID,
                        visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                        type: exports.WebGPUBindingInfoType.texture,
                        texture: {
                            sampleType: 'float',
                            viewDimension: WebGPUBindGroupHelper._getTextureType(uniformProperty.uniformtype),
                            multisampled: false
                        }
                    };
                    bindingInfos.push(textureBindInfo);
                    let samplerBindInfo = {
                        id: 0,
                        set: groupID,
                        binding: bindingIndex++,
                        name: uniformProperty.propertyName + "_Sampler",
                        propertyId: propertyID,
                        visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                        type: exports.WebGPUBindingInfoType.sampler,
                        sampler: {
                            type: 'filtering'
                        },
                        texture: {
                            sampleType: 'float',
                            viewDimension: WebGPUBindGroupHelper._getTextureType(uniformProperty.uniformtype),
                            multisampled: false
                        }
                    };
                    bindingInfos.push(samplerBindInfo);
                }
                else if (uniformProperty.uniformtype == Laya.ShaderDataType.ReadOnlyDeviceBuffer) {
                    let storageBufferBindInfo = {
                        id: 0,
                        set: groupID,
                        binding: bindingIndex++,
                        name: uniformProperty.propertyName,
                        propertyId: propertyID,
                        visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                        type: exports.WebGPUBindingInfoType.storageBuffer,
                        buffer: {
                            type: "read-only-storage"
                        }
                    };
                    bindingInfos.push(storageBufferBindInfo);
                }
                else if (uniformProperty.uniformtype == Laya.ShaderDataType.DeviceBuffer) {
                    let storageBufferBindInfo = {
                        id: 0,
                        set: groupID,
                        binding: bindingIndex++,
                        name: uniformProperty.propertyName,
                        propertyId: propertyID,
                        visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                        type: exports.WebGPUBindingInfoType.storageBuffer,
                        buffer: {
                            type: "storage"
                        }
                    };
                    bindingInfos.push(storageBufferBindInfo);
                }
                else {
                    hasBuffer = true;
                }
            }
            if (hasBuffer) {
                const bindingInfo = {
                    id: 0,
                    name: name,
                    set: groupID,
                    binding: bindingIndex++,
                    propertyId: propertyId,
                    visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                    type: exports.WebGPUBindingInfoType.buffer,
                    buffer: {
                        type: 'uniform'
                    }
                };
                bindingInfos.unshift(bindingInfo);
                bindingInfos.forEach((info, index) => {
                    info.binding = index;
                });
            }
            WebGPUBindGroupHelper.BindGroupPropertyInfoMap.set(bindGroupKey, bindingInfos);
            return bindingInfos;
        }
    }
    WebGPUBindGroupHelper.BindGroupPropertyInfoMap = new Map();
    function getWebGPUFormat(format) {
        switch (format) {
            case "rgba8":
                return "rgba8unorm";
        }
        return "rgba8unorm";
    }
    function getWebGPUAccess(access) {
        switch (access) {
            case "readonly":
                return "read-only";
            case "writeonly":
                return "write-only";
            case "readwrite":
                return "read-write";
        }
    }

    const empthArray = [];
    class WebGPUBindGroupLayoutInfo {
        constructor(entries, properties, values, textureStates, textureExits) {
            this.id = WebGPUBindGroupLayoutInfo._idCounter++;
            this.entries = entries;
            this.properties = properties;
            this.values = values;
            this.textureStates = textureStates;
            this.textureExits = textureExits;
        }
    }
    WebGPUBindGroupLayoutInfo._idCounter = 0;
    class WebGPUBindGroup {
        constructor(info) {
            this.info = info;
        }
    }
    class WebGPUBindGroupCache {
        constructor() {
            this.layoutCache = new Map();
            this.bindGroupCache = new Map();
        }
        clearCache() {
            this.bindGroupCache.clear();
            this.layoutCache.clear();
        }
        getInfoCacheKey(commands, shaderData, addition, textureExitsMask) {
            let textureStates = 0;
            let textureExits = 0;
            let texOffset = 0;
            let cacheKey = commands === null || commands === void 0 ? void 0 : commands.join(",");
            const getInfoData = (mapName, data) => {
                let map = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(mapName);
                let dataState = data.textureStatesMap.get(mapName) || 0;
                textureStates = textureStates | (dataState << texOffset);
                textureExits = textureExits | (map._textureExits << texOffset);
                texOffset += map._textureCount;
            };
            commands.forEach(mapName => {
                getInfoData(mapName, shaderData);
            });
            if (addition) {
                addition.forEach((data, mapName) => {
                    getInfoData(mapName, data);
                    cacheKey += `,${mapName}`;
                });
            }
            textureExits &= textureExitsMask;
            textureStates &= textureExits;
            cacheKey = `${cacheKey}_${textureExits}_${textureStates}`;
            if (texOffset > 31) {
                console.warn("WebGPUBindGroupCache: texture bits exceed 32, this may cause issues with texture binding.");
            }
            return cacheKey;
        }
        getLayoutInfo(commands, shaderData, addition, resources, textureExitsMask) {
            const cacheKey = this.getInfoCacheKey(commands, shaderData, addition, textureExitsMask);
            if (this.layoutCache.has(cacheKey)) {
                return this.layoutCache.get(cacheKey);
            }
            let entries = [];
            let properties = [];
            let values = [];
            let bindIndex = 0;
            let textureStates = 0;
            let textureExits = 0;
            let bitOffset = 0;
            const func2 = (name, data) => {
                let map = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(name);
                resources.forEach(resource => {
                    let propertyID = resource.propertyId;
                    if (map.hasPtrID(propertyID)) {
                        let entry = {
                            binding: bindIndex++,
                            visibility: resource.visibility,
                        };
                        entries.push(entry);
                        properties.push(propertyID);
                        let value = data._data[propertyID];
                        values.push(name);
                        switch (resource.type) {
                            case exports.WebGPUBindingInfoType.buffer:
                                entry.buffer = {
                                    type: resource.buffer.type,
                                    hasDynamicOffset: resource.buffer.hasDynamicOffset,
                                    minBindingSize: resource.buffer.minBindingSize,
                                };
                                break;
                            case exports.WebGPUBindingInfoType.texture:
                                entry.texture = {
                                    viewDimension: resource.texture.viewDimension,
                                    sampleType: resource.texture.sampleType,
                                    multisampled: resource.texture.multisampled
                                };
                                if (value) {
                                    let tex = value;
                                    tex._getGPUTextureBindingLayout(entry.texture);
                                }
                                break;
                            case exports.WebGPUBindingInfoType.sampler:
                                entry.sampler = {
                                    type: resource.sampler.type,
                                };
                                if (value) {
                                    let tex = value;
                                    tex._getSampleBindingLayout(entry.sampler);
                                }
                                let textureBit = map._textureBits.get(propertyID) + bitOffset;
                                let posMask = 1 << textureBit;
                                textureExits |= posMask;
                                if (entry.sampler.type != "filtering") {
                                    textureStates |= posMask;
                                }
                                break;
                            case exports.WebGPUBindingInfoType.storageBuffer:
                                entry.buffer = {
                                    type: resource.buffer.type,
                                    hasDynamicOffset: resource.buffer.hasDynamicOffset,
                                    minBindingSize: resource.buffer.minBindingSize,
                                };
                                break;
                            case exports.WebGPUBindingInfoType.storageTexture:
                                entry.storageTexture = {
                                    access: resource.storageTexture.access,
                                    format: resource.storageTexture.format,
                                    viewDimension: resource.storageTexture.viewDimension,
                                };
                                if (value) {
                                    let tex = value;
                                    tex._getStorageBindingLayout(entry.storageTexture);
                                }
                                break;
                        }
                    }
                });
                bitOffset += map._textureCount;
            };
            commands === null || commands === void 0 ? void 0 : commands.forEach(mapName => {
                func2(mapName, shaderData);
            });
            if (addition) {
                Array.from(addition.keys()).sort().forEach((mapName) => {
                    func2(mapName, addition.get(mapName));
                });
            }
            let info = new WebGPUBindGroupLayoutInfo(entries, properties, values, textureStates, textureExits);
            this.layoutCache.set(cacheKey, info);
            return info;
        }
        getBindGroupLayout(info) {
            let descriptor = {
                label: `Layout_${info.id}`,
                entries: info.entries,
            };
            const device = WebGPURenderEngine._instance.getDevice();
            let layout = device.createBindGroupLayout(descriptor);
            return layout;
        }
        getBindGroup(commands, shaderData, addition, resource, textureExitsMask) {
            commands = commands || empthArray;
            let info = this.getLayoutInfo(commands, shaderData, addition, resource, textureExitsMask);
            if (!info.layout) {
                info.layout = this.getBindGroupLayout(info);
            }
            let layout = info.layout;
            let cacheKey = `L:${info.id}V:`;
            let entries = [];
            let tempTex = new Map();
            info.entries.forEach((layoutEntry, index) => {
                let propertyID = info.properties[index];
                let blockName = info.values[index];
                let value;
                if (commands.indexOf(blockName) >= 0) {
                    value = shaderData._data[propertyID];
                }
                if (addition && addition.has(blockName)) {
                    value = addition.get(blockName)._data[propertyID];
                }
                if (layoutEntry.buffer) {
                    let buffer = value;
                    cacheKey += `_${buffer.globalId}`;
                    let entry = buffer.getBindGroupEntry(layoutEntry.binding);
                    entries.push(entry);
                }
                else if (layoutEntry.texture) {
                    let texture = value;
                    if (!texture) {
                        texture = getDefaultTexture(layoutEntry.texture);
                        tempTex.set(propertyID, texture);
                    }
                    let textureView = texture.getTextureView();
                    cacheKey += `_${texture.globalId}`;
                    let entry = {
                        binding: layoutEntry.binding,
                        resource: textureView,
                    };
                    entries.push(entry);
                }
                else if (layoutEntry.sampler) {
                    let texture = value;
                    if (!texture) {
                        texture = tempTex.get(propertyID);
                    }
                    let sampler = texture.sampler;
                    cacheKey += `_${sampler.globalId}`;
                    let entry = {
                        binding: layoutEntry.binding,
                        resource: sampler.source,
                    };
                    entries.push(entry);
                }
                else if (layoutEntry.storageTexture) {
                    let texture = value;
                    cacheKey += `_${texture.globalId}`;
                    let entry = {
                        binding: layoutEntry.binding,
                        resource: texture.getTextureView()
                    };
                    entries.push(entry);
                }
            });
            tempTex.clear();
            if (this.bindGroupCache.has(cacheKey)) {
                return this.bindGroupCache.get(cacheKey);
            }
            let descriptor = {
                label: `${cacheKey}`,
                layout: layout,
                entries: entries,
            };
            const device = WebGPURenderEngine._instance.getDevice();
            let bindGroup = device.createBindGroup(descriptor);
            let res = new WebGPUBindGroup(info);
            res.gpuRS = bindGroup;
            res.layout = layout;
            this.bindGroupCache.set(cacheKey, res);
            return res;
        }
        getBindGroupByNode(resource, node, textureExitsMask) {
            let commands = node === null || node === void 0 ? void 0 : node._commonUniformMap;
            let shaderData = node === null || node === void 0 ? void 0 : node.shaderData;
            let addition = node === null || node === void 0 ? void 0 : node.additionShaderData;
            let bindGroup = this.getBindGroup(commands, shaderData, addition, resource, textureExitsMask);
            return bindGroup;
        }
    }
    function getDefaultTexture(layout) {
        var _a;
        switch (layout.viewDimension) {
            case "1d":
                return null;
            case "2d":
                return Laya.Texture2D.whiteTexture._texture;
            case "2d-array":
                return (_a = Laya.Texture2DArray.defaultTexture) === null || _a === void 0 ? void 0 : _a._texture;
            case "cube":
                return Laya.TextureCube.whiteTexture._texture;
            case "cube-array":
            case "3d":
            default:
                return null;
        }
    }

    exports.WebGPUVertexStepMode = void 0;
    (function (WebGPUVertexStepMode) {
        WebGPUVertexStepMode["vertex"] = "vertex";
        WebGPUVertexStepMode["instance"] = "instance";
    })(exports.WebGPUVertexStepMode || (exports.WebGPUVertexStepMode = {}));
    class WebGPUBufferState {
        applyState(vertexBuffers, indexBuffer) {
            this._vertexBuffers = vertexBuffers.slice();
            if (vertexBuffers.length == 1) {
                this.vb0 = vertexBuffers[0];
            }
            this._bindedIndexBuffer = indexBuffer;
            this._getCacheInfo();
        }
        constructor() {
            this.stateCacheKey = '';
            this.vertexState = [];
            this._attriLocArray = new Set();
        }
        _getCacheInfo() {
            this.vertexState = [];
            let cacheKey = '';
            this._attriLocArray.clear();
            if (this._vertexBuffers && this._vertexBuffers.length > 0) {
                for (let i = 0; i < this._vertexBuffers.length; i++) {
                    if (this._vertexBuffers[i]) {
                        cacheKey += `vb${i}_${this._vertexBuffers[i].stateCacheID}_`;
                    }
                    let bufferLayout = this._vertexBuffers[i].verteBufferLayout;
                    this.vertexState.push(bufferLayout);
                    let attriArray = this._vertexBuffers[i].vertexDeclaration._VAElements;
                    for (var j = 0; j < attriArray.length; j++) {
                        this._attriLocArray.add(attriArray[j].shaderLocation);
                    }
                }
            }
            if (this._bindedIndexBuffer) {
                cacheKey += `ib_${this._bindedIndexBuffer.indexType}`;
            }
            this.stateCacheKey = cacheKey;
            if (WebGPUBufferState._bufferStatetConterMap.has(cacheKey)) {
                this.stateCacheID = WebGPUBufferState._bufferStatetConterMap.get(cacheKey);
            }
            else {
                this.stateCacheID = WebGPUBufferState._bufferStateIDConter++;
                WebGPUBufferState._bufferStatetConterMap.set(cacheKey, this.stateCacheID);
            }
        }
        destroy() {
        }
    }
    WebGPUBufferState._bufferStatetConterMap = new Map();
    WebGPUBufferState._bufferStateIDConter = 0;

    class WebGPUCommandUniformMap extends Laya.CommandUniformMap {
        constructor(stateName) {
            super(stateName);
            this._idata = new Map();
            this._defaultData = new Map();
            this._hasUniformBuffer = false;
            this._textureCount = 0;
            this._stateName = stateName;
            this._stateID = Laya.Shader3D.propertyNameToID(stateName);
            this._textureBits = new Map();
        }
        hasPtrID(propertyID) {
            return this._stateID == propertyID || this._idata.has(propertyID);
        }
        addShaderUniform(propertyID, propertyName, uniformtype, options) {
            let uniform = { id: propertyID, uniformtype, propertyName, arrayLength: 0, format: options === null || options === void 0 ? void 0 : options.format, access: options === null || options === void 0 ? void 0 : options.access };
            this._idata.set(propertyID, uniform);
            if (uniformtype < Laya.ShaderDataType.Texture2D && uniformtype != Laya.ShaderDataType.DeviceBuffer && uniformtype != Laya.ShaderDataType.ReadOnlyDeviceBuffer && uniformtype != Laya.ShaderDataType.StorageTexture2D) {
                this._hasUniformBuffer = true;
            }
            if (uniformtype >= Laya.ShaderDataType.Texture2D) {
                this._textureBits.set(propertyID, this._textureCount);
                this._textureExits |= (1 << this._textureCount);
                this._textureCount++;
                if (this._textureCount > 31) {
                    console.log(this._stateName, "max texture count 31", this._textureCount);
                }
            }
        }
        addShaderUniformArray(propertyID, propertyName, uniformtype, arrayLength) {
            this._idata.set(propertyID, { id: propertyID, uniformtype, propertyName, arrayLength });
            if (uniformtype < Laya.ShaderDataType.Texture2D && uniformtype != Laya.ShaderDataType.DeviceBuffer && uniformtype != Laya.ShaderDataType.ReadOnlyDeviceBuffer) {
                this._hasUniformBuffer = true;
            }
        }
        setDefaultTextureData(key, defaultTex) {
            this._defaultData.set(key, defaultTex);
        }
    }

    class WebGPUIndexBuffer {
        constructor(targetType, bufferUsageType) {
            this.globalId = WebGPUGlobal.getId(this);
            this.objectName = 'WebGPUIndexBuffer';
            this.bufferoffset = 0;
            let usage = GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC;
            this.source = new WebGPUBuffer(usage, 0);
        }
        getNativeBuffer() {
            return this.source;
        }
        _setIndexDataLength(length) {
            this.source.setDataLength(length);
        }
        setData(buffer, bufferOffset = 0, dataStartIndex = 0, dataCount = Number.MAX_SAFE_INTEGER) {
            const needSubData = dataStartIndex !== 0 || dataCount !== Number.MAX_SAFE_INTEGER;
            if (needSubData) {
                this.source.setDataEx(buffer, dataStartIndex, dataCount, bufferOffset);
                this.buffer = buffer;
            }
            else {
                this.source.setData(buffer, bufferOffset);
                this.buffer = buffer;
            }
            this.bufferoffset = dataStartIndex;
        }
        _setIndexData(data, bufferOffset) {
            this.source.setData(data, bufferOffset);
            this.buffer = data.buffer;
            this.bufferoffset = bufferOffset;
        }
        destroy() {
            this.source.release();
        }
    }

    exports.WebGPUPrimitiveTopology = void 0;
    (function (WebGPUPrimitiveTopology) {
        WebGPUPrimitiveTopology["point_list"] = "point-list";
        WebGPUPrimitiveTopology["line_list"] = "line-list";
        WebGPUPrimitiveTopology["line_strip"] = "line-strip";
        WebGPUPrimitiveTopology["triangle_list"] = "triangle-list";
        WebGPUPrimitiveTopology["triangle_strip"] = "triangle-strip";
    })(exports.WebGPUPrimitiveTopology || (exports.WebGPUPrimitiveTopology = {}));
    class WebGPURenderGeometry {
        set drawType(v) {
            this._drawType = v;
            switch (v) {
                case Laya.DrawType.DrawArray:
                case Laya.DrawType.DrawArrayInstance:
                    (!this._drawArrayInfo) && (this._drawArrayInfo = new Laya.FastSinglelist());
                    this.drawParams = this._drawArrayInfo;
                    break;
                case Laya.DrawType.DrawElement:
                case Laya.DrawType.DrawElementInstance:
                    (!this._drawElementInfo) && (this._drawElementInfo = new Laya.FastSinglelist());
                    this.drawParams = this._drawElementInfo;
                    break;
            }
        }
        get drawType() {
            return this._drawType;
        }
        isNeedReCreateCacheInfo() {
            return !(this.bufferState.stateCacheID == this._cacheBufferStateID);
        }
        getStateCacheID() {
            if (this.isNeedReCreateCacheInfo())
                this._getCacheInfo();
            return this.stateCacheID;
        }
        get instanceCount() {
            return this._instanceCount;
        }
        set instanceCount(value) {
            this._instanceCount = value;
        }
        get mode() {
            return this._mode;
        }
        set mode(value) {
            this._mode = value;
            this._getCacheInfo();
        }
        get bufferState() {
            return this._bufferState;
        }
        set bufferState(value) {
            this._bufferState = value;
            this._getCacheInfo();
        }
        get indexFormat() {
            return this._indexFormat;
        }
        set indexFormat(value) {
            this._indexFormat = value;
            this.gpuIndexFormat = (value === Laya.IndexFormat.UInt16) ? 'uint16' : 'uint32';
            this.gpuIndexByte = (value === Laya.IndexFormat.UInt16) ? 2 : 4;
        }
        constructor(mode, drawType) {
            this._id = ++WebGPURenderGeometry._idCounter;
            this._drawElementInfo0 = false;
            this.gpuIndexFormat = 'uint16';
            this.gpuIndexByte = 2;
            this.stateCacheKey = '';
            this.mode = mode;
            this.drawType = drawType;
            this.indexFormat = Laya.IndexFormat.UInt16;
            this._instanceCount = 1;
        }
        _getCacheInfo() {
            this.stateCacheKey = '';
            this.stateCacheKey += `mode_${this._mode}_`;
            if (this._bufferState) {
                this.stateCacheKey += `bufferState_${this._bufferState.stateCacheID}`;
                this._cacheBufferStateID = this._bufferState.stateCacheID;
            }
            if (WebGPURenderGeometry._geometryConterMap.has(this.stateCacheKey)) {
                this.stateCacheID = WebGPURenderGeometry._geometryConterMap.get(this.stateCacheKey);
            }
            else {
                this.stateCacheID = WebGPURenderGeometry._geometryIDConter;
                WebGPURenderGeometry._geometryConterMap.set(this.stateCacheKey, this.stateCacheID);
                WebGPURenderGeometry._geometryIDConter++;
            }
        }
        getDrawDataParams(out) {
            out.length = 0;
            if (this.drawType == Laya.DrawType.DrawArray || this.drawType == Laya.DrawType.DrawArrayInstance) {
                this._drawArrayInfo.cloneTo(out);
            }
            else {
                this._drawElementInfo.cloneTo(out);
            }
        }
        setDrawArrayParams(first, count) {
            this._drawArrayInfo.add(first);
            this._drawArrayInfo.add(count);
        }
        setDrawElemenParams(count, offset) {
            this._drawElementInfo.add(offset);
            this._drawElementInfo.add(count);
        }
        setInstanceRenderOffset(offset, instanceCount) {
        }
        setIndirectDrawBuffer(buffer, offset) {
            (!this._drawIndirectInfo) && (this._drawIndirectInfo = []);
            let buf = buffer;
            this._drawIndirectInfo.push({
                buffer: buf,
                offset: offset
            });
        }
        clearRenderParams() {
            this._drawElementInfo && (this._drawElementInfo.length = 0);
            this._drawElementInfo0 = null;
            this._drawArrayInfo && (this._drawArrayInfo.length = 0);
            this._drawIndirectInfo && (this._drawIndirectInfo.length = 0);
        }
        cloneTo(obj) {
            var _a, _b, _c;
            obj.mode = this.mode;
            obj.drawType = this.drawType;
            obj.indexFormat = this.indexFormat;
            obj.instanceCount = this.instanceCount;
            (_a = this._drawArrayInfo) === null || _a === void 0 ? void 0 : _a.cloneTo(obj._drawArrayInfo);
            (_b = this._drawElementInfo) === null || _b === void 0 ? void 0 : _b.cloneTo(obj._drawElementInfo);
            obj._drawElementInfo0 = this._drawElementInfo0;
            obj._drawIndirectInfo = (_c = this._drawIndirectInfo) === null || _c === void 0 ? void 0 : _c.slice();
        }
        applyToEncoder(encoder) {
            const bufferState = this.bufferState;
            const drawType = this.drawType;
            const indexBuffer = bufferState._bindedIndexBuffer;
            let indexByte = 2;
            let vb0 = bufferState.vb0;
            let enc = encoder.encoder;
            if (vb0) {
                let vb = vb0.source;
                encoder.setVertexBuffer(0, vb);
            }
            else {
                const vertexBuffers = bufferState._vertexBuffers;
                let vbCnt = vertexBuffers.length;
                for (let i = 0; i < vbCnt; i++) {
                    let vb = vertexBuffers[i].source;
                    encoder.setVertexBuffer(i, vb);
                }
            }
            if (indexBuffer) {
                indexByte = this.gpuIndexByte;
                encoder.setIndexBuffer(indexBuffer.source, this.gpuIndexFormat);
            }
            let triangles = 0;
            let drawCount = 0;
            let count = 0, start = 0;
            switch (drawType) {
                case Laya.DrawType.DrawArray:
                    {
                        let _drawArrayInfo = this._drawArrayInfo.elements;
                        for (let i = 0; i < this._drawArrayInfo.length; i += 2) {
                            count = _drawArrayInfo[i + 1];
                            start = _drawArrayInfo[i];
                            triangles += count - 2;
                            enc.draw(count, 1, start, 0);
                        }
                        drawCount = this._drawArrayInfo.length / 2;
                    }
                    break;
                case Laya.DrawType.DrawElement:
                    {
                        let info0 = this._drawElementInfo0;
                        if (info0) {
                            count = this._drawElementInfo.elements[1];
                            enc.drawIndexed(count, 1, this._drawElementInfo.elements[0] / indexByte, 0);
                            triangles += count / 3;
                            drawCount = 1;
                        }
                        else {
                            let element = this._drawElementInfo.elements;
                            for (let i = 0; i < this._drawElementInfo.length; i += 2) {
                                count = element[i + 1];
                                enc.drawIndexed(count, 1, element[i] / indexByte, 0);
                                triangles += count / 3;
                            }
                            drawCount = this._drawElementInfo.length / 2;
                        }
                    }
                    break;
                case Laya.DrawType.DrawArrayInstance:
                    {
                        let _drawArrayInfo = this._drawArrayInfo.elements;
                        const instanceCount = this.instanceCount;
                        for (let i = 0; i < this._drawArrayInfo.length; i += 2) {
                            count = _drawArrayInfo[i + 1];
                            start = _drawArrayInfo[i];
                            triangles += (count - 2) * instanceCount;
                            enc.draw(count, instanceCount, start, 0);
                        }
                        drawCount = this._drawArrayInfo.length / 2;
                        Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_Instancing_DrawCall, drawCount);
                    }
                    break;
                case Laya.DrawType.DrawElementInstance:
                    {
                        let element = this._drawElementInfo.elements;
                        const instanceCount = this.instanceCount;
                        for (let i = 0; i < this._drawElementInfo.length; i += 2) {
                            count = element[i + 1];
                            start = element[i];
                            triangles += count / 3 * instanceCount;
                            enc.drawIndexed(count, instanceCount, start / indexByte, 0);
                        }
                        drawCount = this._drawElementInfo.length / 2;
                        Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_Instancing_DrawCall, drawCount);
                    }
                    break;
                case Laya.DrawType.DrawArrayIndirect:
                    {
                        let _drawIndirectInfo = this._drawIndirectInfo;
                        for (let i = _drawIndirectInfo.length - 1; i > -1; i--) {
                            enc.drawIndirect(_drawIndirectInfo[i].buffer.getNativeBuffer()._source, _drawIndirectInfo[i].offset);
                        }
                        Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_IndirectDrawCall, _drawIndirectInfo.length);
                        drawCount = _drawIndirectInfo.length;
                    }
                    break;
                case Laya.DrawType.DrawElementIndirect:
                    {
                        let _drawIndirectInfo = this._drawIndirectInfo;
                        for (let i = _drawIndirectInfo.length - 1; i > -1; i--) {
                            enc.drawIndexedIndirect(_drawIndirectInfo[i].buffer.getNativeBuffer()._source, _drawIndirectInfo[i].offset);
                        }
                        Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_IndirectDrawCall, _drawIndirectInfo.length);
                        drawCount = _drawIndirectInfo.length;
                    }
                    break;
            }
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_Triangle, triangles);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_DrawCall, drawCount);
            return triangles;
        }
        destroy() {
        }
    }
    WebGPURenderGeometry._geometryConterMap = new Map();
    WebGPURenderGeometry._geometryIDConter = 0;
    WebGPURenderGeometry._idCounter = 0;

    function getTypeString(type) {
        switch (type) {
            case Laya.ShaderDataType.Int:
                return "int";
            case Laya.ShaderDataType.Bool:
                return "bool";
            case Laya.ShaderDataType.Float:
                return "float";
            case Laya.ShaderDataType.Vector2:
                return "vec2";
            case Laya.ShaderDataType.Vector3:
                return "vec3";
            case Laya.ShaderDataType.Vector4:
            case Laya.ShaderDataType.Color:
                return "vec4";
            case Laya.ShaderDataType.Vector4u:
                return "uvec4";
            case Laya.ShaderDataType.Matrix4x4:
                return "mat4";
            case Laya.ShaderDataType.Matrix3x3:
                return "mat3";
            case Laya.ShaderDataType.Texture2D:
                return "sampler2D";
            case Laya.ShaderDataType.TextureCube:
                return "samplerCube";
            case Laya.ShaderDataType.Texture2DArray:
                if (Laya.LayaGL.renderEngine.getCapable(Laya.RenderCapable.Texture3D)) {
                    return "sampler2DArray";
                }
                else {
                    return "";
                }
            case Laya.ShaderDataType.Texture3D:
                if (Laya.LayaGL.renderEngine.getCapable(Laya.RenderCapable.Texture3D)) {
                    return "sampler3D";
                }
                else {
                    return "";
                }
            default:
                return "";
        }
    }
    function getTypeDefaultString(type) {
        switch (type) {
            case Laya.ShaderDataType.Int:
                return "0";
            case Laya.ShaderDataType.Bool:
                return "false";
            case Laya.ShaderDataType.Float:
                return "0.0";
            case Laya.ShaderDataType.Vector2:
                return "vec2(0.0)";
            case Laya.ShaderDataType.Vector3:
                return "vec3(0.0)";
            case Laya.ShaderDataType.Vector4:
            case Laya.ShaderDataType.Color:
                return "vec4(0.0)";
            default:
                return "";
        }
    }
    function isSamplerType(type) {
        switch (type) {
            case Laya.ShaderDataType.Texture2D:
            case Laya.ShaderDataType.Texture3D:
            case Laya.ShaderDataType.TextureCube:
            case Laya.ShaderDataType.Texture2DArray:
                return true;
            case Laya.ShaderDataType.None:
            case Laya.ShaderDataType.Int:
            case Laya.ShaderDataType.Bool:
            case Laya.ShaderDataType.Float:
            case Laya.ShaderDataType.Vector2:
            case Laya.ShaderDataType.Vector3:
            case Laya.ShaderDataType.Vector4:
            case Laya.ShaderDataType.Color:
            case Laya.ShaderDataType.Buffer:
            case Laya.ShaderDataType.Matrix4x4:
            case Laya.ShaderDataType.Matrix3x3:
            default:
                return false;
        }
    }

    const uniformRegex = /(?:layout\s*\([^)]*\)\s*)?\buniform\s+(?:(lowp|mediump|highp)\s+)?(?:(?:readonly|writeonly|coherent|volatile|restrict)\s+)*(\w+)\s+(\w+)(\s*\[\s*(\d+)\s*\])?\s*;/gm;
    const uniformBlockRegex = /(?:layout\s*\([^)]*\)\s*)?uniform\s+(\w+)\s*\{([\s\S]*?)\}\s*;/g;
    class GLSLForVulkanGenerator {
        static process(defines, attributeMap, uniformMap, shaderPassName, materialMap, VS, FS, useTexArray, checkSetNumber, appendSet) {
            const engine = WebGPURenderEngine._instance;
            let defMap = {};
            for (const define of defines) {
                defMap[define] = true;
            }
            defMap["GRAPHICS_API_GLES3"] = true;
            defMap["COLORKEYCOUNT_8"] = true;
            defMap["COLOROVERLIFETIME_COLORKEY_8"] = true;
            let vs = VS.toscript(defMap, []);
            let fs = FS.toscript(defMap, []);
            if (vs[0].indexOf("#version") == 0) {
                vs[0] + '\n';
            }
            if (fs[0].indexOf("#version") == 0) {
                fs[0] + '\n';
            }
            let vertexCode = vs.join('\n');
            let fragmentCode = fs.join('\n');
            const defineStrs = defineString(defMap);
            const additionDefineStrs = additionDefineString();
            const precision = `precision highp float;
        precision highp int;`;
            {
                let vs = `layout(std140, column_major) uniform;
#define attribute in
#define varying out
#define textureCube texture
#define texture2D texture

${defineStrs}

${additionDefineStrs}

${vertexCode}
`;
                let resVS = engine.shaderCompiler.glslang.glsl300es_preprocess(vs, "vertex");
                if (!resVS.success) {
                    console.error("vertex shader preprocess error", resVS.info_log);
                }
                vertexCode = resVS.preprocessed_code;
                vertexCode = renameMainFunction(vertexCode, "main_vs");
                let fs = `layout(std140, column_major) uniform;
#define varying in
out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
#define gl_FragDepthEXT gl_FragDepth
#define texture2D texture
#define textureCube texture
#define texture2DProj textureProj
#define texture2DLodEXT textureLod
#define texture2DProjLodEXT textureProjLod
#define textureCubeLodEXT textureLod
#define texture2DGradEXT textureGrad
#define texture2DProjGradEXT textureProjGrad
#define textureCubeGradEXT textureGrad

${defineStrs}

${additionDefineStrs}

${fragmentCode}
`;
                let resFS = engine.shaderCompiler.glslang.glsl300es_preprocess(fs, "fragment");
                if (!resFS.success) {
                    console.error("fragment shader preprocess error", resFS.info_log);
                }
                fragmentCode = resFS.preprocessed_code;
            }
            const attributeStrs = attributeString(attributeMap[0], attributeMap[1]);
            const { varyings, vsOnlyVaryings } = executeVaryings(fragmentCode, vertexCode);
            const vertexVaryingStrs = varyingString(varyings, "out");
            const fragmentVaryingStrs = varyingString(varyings, "in");
            let vsOnlyGlobalStrs = "";
            for (const v of vsOnlyVaryings) {
                vsOnlyGlobalStrs += `${v}\n`;
            }
            const fragmentOutStrs = fragmentOutString();
            let collectionUniforms = new Map();
            const uniformCollect = (match, precision, type, name, arrayDecl, arrayLength) => {
                let u = {
                    type: getShaderDataType(type),
                };
                if (u.type != Laya.ShaderDataType.None) {
                    collectionUniforms.set(name, u);
                }
                if (type == "sampler2DShadow" || type == "samplerCubeShadow" || type == "sampler2DArrayShadow") {
                    u.samplerType = "depth";
                }
                if (type == "sampler2DArray") {
                    u.demision = "2d-array";
                }
                if (type == "samplerCube") {
                    u.demision = "cube";
                }
                if (arrayLength) {
                    let length = parseInt(arrayLength);
                    u.arrayLength = length;
                }
                return "\n";
            };
            vertexCode = vertexCode.replace(uniformRegex, uniformCollect);
            fragmentCode = fragmentCode.replace(uniformRegex, uniformCollect);
            const executeUniforms = (value, key) => {
                value.forEach(uniform => {
                    var _a;
                    if (uniform.type == exports.WebGPUBindingInfoType.texture) {
                        let name = uniform.name.replace("_Texture", "");
                        let collect = collectionUniforms.get(name);
                        if (collect) {
                            collect.set = uniform.set;
                        }
                    }
                    if (uniform.type == exports.WebGPUBindingInfoType.sampler) {
                        let name = uniform.name.replace("_Sampler", "");
                        let collect = collectionUniforms.get(name);
                        if (collect) {
                            collect.set = uniform.set;
                        }
                        else if (key < checkSetNumber) {
                            uniform.texture.sampleType;
                            if (((_a = uniform.sampler) === null || _a === void 0 ? void 0 : _a.type) == "comparison") ;
                            collectionUniforms.set(name, { type: Laya.ShaderDataType.Texture2D, set: uniform.set });
                        }
                    }
                    if (uniform.type == exports.WebGPUBindingInfoType.storageBuffer) {
                        let collect = collectionUniforms.get(uniform.name);
                        if (collect) {
                            collect.set = uniform.set;
                        }
                    }
                    if (uniform.type == exports.WebGPUBindingInfoType.buffer) {
                        let name = uniform.name;
                        let commandMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(name);
                        commandMap._idata.forEach((u, i) => {
                            let collect = collectionUniforms.get(u.propertyName);
                            if (collect) {
                                collect.set = uniform.set;
                            }
                        });
                    }
                });
            };
            uniformMap.forEach(executeUniforms);
            let appendNewUniform = false;
            {
                collectionUniforms.forEach((value, name) => {
                    if (value.set == undefined) {
                        appendNewUniform = true;
                        let uniform = {
                            id: Laya.Shader3D.propertyNameToID(name),
                            propertyName: name,
                            uniformtype: value.type,
                            arrayLength: value.arrayLength || 0
                        };
                        materialMap.set(uniform.id, uniform);
                    }
                });
                if (!uniformMap.has(appendSet)) {
                    uniformMap.set(appendSet, WebGPUBindGroupHelper.createBindGroupInfosByUniformMap(appendSet, "Material", shaderPassName, materialMap));
                    executeUniforms(uniformMap.get(appendSet), appendSet);
                }
            }
            vertexCode = vertexCode.replace(uniformBlockRegex, '\n');
            fragmentCode = fragmentCode.replace(uniformBlockRegex, '\n');
            vertexCode = vertexCode.replace(vertexVaryingRegex, '\n');
            fragmentCode = fragmentCode.replace(fragmentVaryingRegex, '\n');
            fragmentCode = fragmentCode.replace(vertexVaryingRegex, "");
            vertexCode = replaceTextureSampler(vertexCode, useTexArray);
            fragmentCode = replaceTextureSampler(fragmentCode, useTexArray);
            vertexCode = vertexCode.replace(/gl_VertexID/g, "gl_VertexIndex");
            fragmentCode = fragmentCode.replace(/gl_VertexID/g, "gl_VertexIndex");
            const uniformStrs = uniformString2(uniformMap, materialMap, useTexArray, collectionUniforms, checkSetNumber, appendSet);
            const glslVersion = "#version 450\n";
            let vertex = `${glslVersion}
${precision}

${defineStrs}

${attributeStrs}

${uniformStrs}

${vertexVaryingStrs}

${vsOnlyGlobalStrs}

${vertexCode}
`;
            let fragment = `${glslVersion}
${precision}

${fragmentOutStrs}

${additionDefineStrs}

${defineStrs}

${uniformStrs}

${fragmentVaryingStrs}

${fragmentCode}
`;
            return {
                vertex,
                fragment,
                appendNewUniform
            };
        }
        static proccessCompute(defines, uniformCommandMaps, uniformMaps, node, shaderName) {
            const engine = WebGPURenderEngine._instance;
            let defMap = {};
            for (const define of defines) {
                defMap[define] = true;
            }
            let code = node.toscript(defMap, []);
            let computeCode = code.join('\n');
            const defineStrs = defineString(defMap);
            const glslVersion = "#version 450\n";
            const ssboBindingMap = new Map();
            const getUniformDeclaration = (uniformMaps, usedTex) => {
                let res = "";
                uniformMaps.forEach((value, set) => {
                    let binding = 0;
                    for (let uniform of value) {
                        switch (uniform.type) {
                            case exports.WebGPUBindingInfoType.storageBuffer: {
                                let setIndex = set;
                                let bindingIndex = binding++;
                                ssboBindingMap.set(uniform.name, { set: setIndex, binding: bindingIndex });
                                break;
                            }
                            case exports.WebGPUBindingInfoType.storageTexture:
                                {
                                    let access = wgslAccessToGlsl(uniform.storageTexture.access);
                                    res = `${res}layout(${uniform.format ? uniform.format : "rgba8"}, set=${set}, binding=${binding++}) uniform ${access} image2D ${uniform.name};\n`;
                                    break;
                                }
                            case exports.WebGPUBindingInfoType.buffer: {
                                let commandMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(uniform.name);
                                if (commandMap._hasUniformBuffer) {
                                    let uniformMap = commandMap._idata;
                                    res = `${res}${uniformMapString(uniformMap, uniform.name, uniform.set, binding++, true, new Map()).code}\n`;
                                }
                                break;
                            }
                            case exports.WebGPUBindingInfoType.texture: {
                                const textureName = uniform.name.slice(0, -"_Texture".length);
                                if (!usedTex || usedTex.has(textureName)) {
                                    const textureType = getSamplerTextureType(uniform.texture.sampleType, uniform.texture.viewDimension);
                                    res = `${res}layout(set=${set}, binding=${binding}) uniform ${textureType} ${textureName};\n`;
                                }
                                binding += 2;
                                break;
                            }
                        }
                    }
                });
                return res;
            };
            const uniformStr = getUniformDeclaration(uniformMaps);
            let resCode = getComputeCode(glslVersion, defineStrs, uniformStr, computeCode);
            let preprocessRes = engine.shaderCompiler.glslang.preprocess_compute(resCode, 'compute');
            if (!preprocessRes.success) {
                console.error(`WebGPUComputeShaderInstance ${shaderName} preprocess error:`, preprocessRes.info_log);
                return {};
            }
            computeCode = computeCode.replace(uniformRegex, "");
            if (preprocessRes.uniforms.size > 0 || preprocessRes.ssbos.size > 0) {
                const exists = new Map();
                uniformMaps.forEach(properties => {
                    for (let uniform of properties) {
                        exists.set(uniform.propertyId, uniform);
                    }
                });
                let additionMaps = uniformCommandMaps[0];
                let addNewUniform = false;
                let uniformNames = preprocessRes.uniforms.keys();
                for (let name of uniformNames) {
                    let propertyId = Laya.Shader3D.propertyNameToID(name);
                    if (!exists.has(propertyId)) {
                        let info = preprocessRes.uniforms.get(name);
                        let type = info.type;
                        info.access;
                        let arrayLength = getArrayLength(type);
                        if (arrayLength > 0) {
                            type = type.substring(0, type.lastIndexOf('['));
                            additionMaps.addShaderUniformArray(propertyId, name, getShaderDataType(type), arrayLength);
                        }
                        else {
                            additionMaps.addShaderUniform(propertyId, name, getShaderDataType(type), info);
                        }
                        addNewUniform = true;
                    }
                }
                let addNewSSBO = false;
                let ssboNames = preprocessRes.ssbos.keys();
                for (let name of ssboNames) {
                    let propertyId = Laya.Shader3D.propertyNameToID(name);
                    if (!exists.has(propertyId)) {
                        let shaderType = Laya.ShaderDataType.DeviceBuffer;
                        const access = preprocessRes.ssbos.get(name);
                        if (access == "readonly") {
                            shaderType = Laya.ShaderDataType.ReadOnlyDeviceBuffer;
                        }
                        additionMaps.addShaderUniform(propertyId, name, shaderType, { access });
                        addNewSSBO = true;
                    }
                    else {
                        let uniform = exists.get(propertyId);
                        const access = preprocessRes.ssbos.get(name);
                        switch (uniform.buffer.type) {
                            case "storage":
                                if (access == "readonly") {
                                    console.warn(`Shader ${shaderName} ssbo access type mismatch for ${name}`);
                                }
                                break;
                            case "read-only-storage":
                                if (access != "readonly") {
                                    console.warn(`Shader ${shaderName} ssbo access type mismatch for ${name}`);
                                }
                                break;
                        }
                    }
                }
                if (addNewUniform || addNewSSBO) {
                    uniformMaps.set(0, WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(0, [additionMaps._stateName], true, true));
                }
                ssboBindingMap.clear();
                const newUniformStr = getUniformDeclaration(uniformMaps, preprocessRes.uniforms);
                computeCode = ssboStrings(ssboBindingMap, computeCode);
                resCode = getComputeCode(glslVersion, defineStrs, newUniformStr, computeCode);
                return {
                    code: resCode,
                    hasSampler: preprocessRes.samplers.size > 0
                };
            }
            computeCode = ssboStrings(ssboBindingMap, computeCode);
            resCode = getComputeCode(glslVersion, defineStrs, uniformStr, computeCode);
            return {
                code: resCode,
                hasSampler: preprocessRes.samplers.size > 0
            };
        }
    }
    function defineString(defines) {
        let res = "";
        for (const key in defines) {
            if (defines[key]) {
                res += `#define ${key}\n`;
            }
        }
        return res;
    }
    function attributeString(attributeMap, nouseAttributeMap) {
        let res = "";
        let location = 0;
        let attributeDefines = "";
        for (const key in attributeMap) {
            let type = getTypeString(attributeMap[key][1]);
            if (key == "a_BoneIndices") {
                type = "uvec4";
            }
            location = attributeMap[key][0];
            if (type != "") {
                if (type == "mat4") {
                    res = `${res}layout(location = ${location++}) in vec4 ${key}_0;\n`;
                    res = `${res}layout(location = ${location++}) in vec4 ${key}_1;\n`;
                    res = `${res}layout(location = ${location++}) in vec4 ${key}_2;\n`;
                    res = `${res}layout(location = ${location}) in vec4 ${key}_3;\n`;
                    attributeDefines = `${attributeDefines}#define ${key} mat4(${key}_0, ${key}_1, ${key}_2, ${key}_3)\n`;
                }
                else {
                    res = `${res}layout(location = ${location}) in ${type} ${key};\n`;
                }
            }
        }
        for (const key in nouseAttributeMap) {
            let type = getTypeString(nouseAttributeMap[key][1]);
            let defaultValue = getTypeDefaultString(nouseAttributeMap[key][1]);
            if (key == "a_BoneIndices") {
                type = "uvec4";
                defaultValue = "uvec4(0)";
            }
            nouseAttributeMap[key][0];
            if (type != "") {
                if (type == "mat4") {
                    res = `${res}const vec4 ${key}_0 = vec4(0.0);\n`;
                    res = `${res}const vec4 ${key}_1 = vec4(0.0);\n`;
                    res = `${res}const vec4 ${key}_2 = vec4(0.0);\n`;
                    res = `${res}const vec4 ${key}_3 = vec4(0.0);\n`;
                    attributeDefines = `${attributeDefines}#define ${key} mat4(${key}_0, ${key}_1, ${key}_2, ${key}_3);\n`;
                }
                else {
                    res = `${res}const ${type} ${key} =${defaultValue};\n`;
                }
            }
        }
        return `${res}
${attributeDefines}
`;
    }
    function uniformMapString(uniformMap, name, set, bindOffset, skipTexture, collectUniforms) {
        var _a;
        let textureUniforms = [];
        let blockUniforms = [];
        uniformMap.forEach(uniform => {
            if (isSamplerType(uniform.uniformtype)) {
                textureUniforms.push(uniform);
            }
            else {
                blockUniforms.push(uniform);
            }
        });
        let res = "";
        let binding = bindOffset;
        if (blockUniforms.length > 0) {
            res = `${res}layout(std140, set=${set}, binding=${binding++}) uniform ${name} {`;
            for (let uniform of blockUniforms) {
                let uniformName = uniform.propertyName;
                if (uniform.arrayLength > 0) {
                    let arrayLength = ((_a = collectUniforms.get(uniformName)) === null || _a === void 0 ? void 0 : _a.arrayLength) || uniform.arrayLength;
                    uniformName = `${uniformName}[${arrayLength}]`;
                }
                let typeStr = getTypeString(uniform.uniformtype);
                if (typeStr != "") {
                    res = `${res}
    ${typeStr} ${uniformName};`;
                }
            }
            res = `${res}
};
`;
        }
        if (!skipTexture && textureUniforms.length > 0) {
            for (let uniform of textureUniforms) {
                switch (uniform.uniformtype) {
                    case Laya.ShaderDataType.Texture2D:
                        res = `${res}layout(set=${set}, binding=${binding++}) uniform texture2D ${uniform.propertyName}_Texture;
 layout(set=${set}, binding=${binding++}) uniform sampler ${uniform.propertyName}_Sampler;
`;
                        break;
                    case Laya.ShaderDataType.TextureCube:
                        res = `${res}layout(set=${set}, binding=${binding++}) uniform texture2D ${uniform.propertyName}_Texture;
layout(set=${set}, binding=${binding++}) uniform sampler ${uniform.propertyName}_Sampler;
`;
                        break;
                    case Laya.ShaderDataType.Texture2DArray:
                    case Laya.ShaderDataType.Texture3D:
                }
            }
        }
        return {
            code: res,
            binding: binding
        };
    }
    function uniformString2(uniformSetMap, materialMap, usedTexSet, collectUniforms, checkSetNumber, appendSet) {
        let res = "";
        let samplerMap = new Map();
        uniformSetMap.forEach((value, key) => {
            var _a;
            let binding = 0;
            if (value.length > 0) {
                for (let uniform of value) {
                    switch (uniform.type) {
                        case exports.WebGPUBindingInfoType.storageBuffer:
                            binding++;
                            break;
                        case exports.WebGPUBindingInfoType.storageTexture:
                            binding++;
                            break;
                        case exports.WebGPUBindingInfoType.buffer:
                            {
                                let uniformMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(uniform.name)._idata;
                                if (key == appendSet) {
                                    uniformMap = materialMap;
                                }
                                res = `${res}${uniformMapString(uniformMap, uniform.name, uniform.set, binding++, true, collectUniforms).code}\n`;
                                break;
                            }
                        case exports.WebGPUBindingInfoType.texture:
                            if (key < checkSetNumber || usedTexSet.has(uniform.name)) {
                                let textureName = uniform.name.replace("_Texture", "");
                                let collectUniform = collectUniforms.get(textureName);
                                if (collectUniform) {
                                    uniform.texture.sampleType = uniform.texture.sampleType;
                                    uniform.texture.viewDimension = collectUniform.demision || uniform.texture.viewDimension;
                                }
                                let textureType = getDimensionTextureType((_a = uniform.texture) === null || _a === void 0 ? void 0 : _a.viewDimension);
                                res = `${res}layout(set=${uniform.set}, binding=${binding++}) uniform ${textureType} ${uniform.name};\n`;
                                let samplerName = uniform.name.replace("_Texture", "");
                                samplerMap.set(samplerName, uniform);
                            }
                            break;
                        case exports.WebGPUBindingInfoType.sampler:
                            if (key < checkSetNumber || usedTexSet.has(uniform.name)) {
                                let sampler = "sampler";
                                let samplerName = uniform.name.replace("_Sampler", "");
                                let collectUniform = collectUniforms.get(samplerName);
                                if (collectUniform) {
                                    if (collectUniform.samplerType == "depth") {
                                        uniform.sampler.type = "comparison";
                                    }
                                }
                                res = `${res}layout(set=${uniform.set}, binding=${binding++}) uniform ${sampler} ${uniform.name};\n`;
                            }
                            break;
                    }
                }
            }
        });
        let samplerDefStrs = "\n";
        samplerMap.forEach((uniform, key) => {
            var _a;
            let sampleType = ((_a = collectUniforms.get(key)) === null || _a === void 0 ? void 0 : _a.samplerType) || uniform.texture.sampleType;
            let sampler = getSamplerTextureType(sampleType, uniform.texture.viewDimension);
            samplerDefStrs += `#define ${key} ${sampler}(${uniform.name}, ${key}_Sampler)\n`;
            uniform.texture.sampleType = sampleType;
        });
        return res + samplerDefStrs;
    }
    function getVaryingRegex(ioType) {
        return new RegExp(`(?:(flat|smooth|noperspective)\\s+)?${ioType}\\s+(?:(lowp|mediump|highp)\\s+)?(\\w+)\\s+(\\w+)\\s*;`, 'g');
    }
    const vertexVaryingRegex = getVaryingRegex("out");
    const fragmentVaryingRegex = getVaryingRegex("in");
    function findVaryings(source, regex) {
        let varyings = [];
        let result;
        while ((result = regex.exec(source)) !== null) {
            const interpolation = result[1] ? `${result[1]} ` : '';
            const precision = result[2] ? `${result[2]} ` : '';
            const type = result[3].trim();
            const name = result[4].trim();
            varyings.push(`${interpolation} ${precision} ${type} ${name};`);
        }
        return varyings;
    }
    function varyingString(varyings, io) {
        let res = "";
        for (let i = 0; i < varyings.length; i++) {
            res += `layout(location = ${i}) ${io} ${varyings[i]}\n`;
        }
        return res;
    }
    function executeVaryings(fsSource, vsSource) {
        let vertexVaryings = findVaryings(vsSource, vertexVaryingRegex);
        let fragmentVaryings = findVaryings(fsSource, fragmentVaryingRegex);
        let varyings = vertexVaryings.filter(item => fragmentVaryings.includes(item));
        let vsOnlyVaryings = vertexVaryings.filter(item => !fragmentVaryings.includes(item));
        return { varyings, vsOnlyVaryings };
    }
    function fragmentOutString(source) {
        return "layout(location = 0) out vec4 pc_fragColor;";
    }
    function replaceTextureSampler(source, usedTexSet) {
        const textureRegx = /texture\s*\(\s*([\w_]+)\s*,\s*([^)]*)\s*\)/g;
        let newSource = source.replace(textureRegx, (match, textureName, uvName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        const textureProjRegx = /textureProj\s*\(\s*([\w_]+)\s*,\s*([^)]*)\s*\)/g;
        newSource = newSource.replace(textureProjRegx, (match, textureName, uvName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        const textureLodRegx = /textureLod\s*\(\s*([\w_]+)\s*,\s*([^,]+)\s*,\s*([^)]*)\s*\)/g;
        newSource = newSource.replace(textureLodRegx, (match, textureName, uvName, lodName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        const textureProjLodRegx = /textureProjLod\s*\(\s*([\w_]+)\s*,\s*([^,]+)\s*,\s*([^)]*)\s*\)/g;
        newSource = newSource.replace(textureProjLodRegx, (match, textureName, uvName, lodName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        const textureGradRegx = /textureGrad\s*\(\s*([\w_]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]*)\s*\)/g;
        newSource = newSource.replace(textureGradRegx, (match, textureName, uvName, ddxName, ddyName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        const textureProjGradRegx = /textureProjGrad\s*\(\s*([\w_]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]*)\s*\)/g;
        newSource = newSource.replace(textureProjGradRegx, (match, textureName, uvName, ddxName, ddyName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        return newSource;
    }
    function additionDefineString() {
        return `
#define MAX_LIGHT_COUNT ${Laya.Config3D.maxLightCount}
#define MAX_LIGHT_COUNT_PER_CLUSTER ${Laya.Config3D._maxAreaLightCountPerClusterAverage}
#define CLUSTER_X_COUNT ${Laya.Config3D.lightClusterCount.x}
#define CLUSTER_Y_COUNT ${Laya.Config3D.lightClusterCount.y}
#define CLUSTER_Z_COUNT ${Laya.Config3D.lightClusterCount.z}
#define MORPH_MAX_COUNT ${Laya.Config3D.maxMorphTargetCount}
#define SHADER_CAPAILITY_LEVEL ${Laya.LayaGL.renderEngine.getParams(Laya.RenderParams.SHADER_CAPAILITY_LEVEL)}
`;
    }
    function getSamplerTextureType(type = "float", dimension = "2d") {
        if (dimension == "2d") {
            switch (type) {
                case "depth":
                    return "sampler2DShadow";
                case "float":
                case "unfilterable-float":
                case "sint":
                case "uint":
                default:
                    return "sampler2D";
            }
        }
        else if (dimension == "cube") {
            switch (type) {
                case "depth":
                    return "samplerCubeShadow";
                default:
                    return "samplerCube";
            }
        }
        else if (dimension == "2d-array") {
            switch (type) {
                case "depth":
                    return "sampler2DArrayShadow";
                default:
                    return "sampler2DArray";
            }
        }
        else if (dimension == "3d") {
            switch (type) {
                case "depth":
                    return "sampler3DShadow";
                default:
                    return "sampler3D";
            }
        }
        else if (dimension == "cube-array") {
            switch (type) {
                case "depth":
                    return "samplerCubeArrayShadow";
                default:
                    return "samplerCubeArray";
            }
        }
        else if (dimension == "1d") {
            switch (type) {
                case "depth":
                    return "sampler1DShadow";
                default:
                    return "sampler1D";
            }
        }
        else {
            return "sampler2D";
        }
    }
    function getDimensionTextureType(type) {
        switch (type) {
            case "1d":
                return "texture1D";
            case "2d":
                return "texture2D";
            case "2d-array":
                return "texture2DArray";
            case "cube":
                return "textureCube";
            case "cube-array":
                return "textureCubeArray";
            case "3d":
                return "texture3D";
            default:
                return "texture2D";
        }
    }
    function getShaderDataType(type) {
        switch (type) {
            case "float":
                return Laya.ShaderDataType.Float;
            case "int":
            case "uint":
                return Laya.ShaderDataType.Int;
            case "bool":
                return Laya.ShaderDataType.Bool;
            case "vec2":
                return Laya.ShaderDataType.Vector2;
            case "vec3":
                return Laya.ShaderDataType.Vector3;
            case "vec4":
                return Laya.ShaderDataType.Vector4;
            case "mat3":
                return Laya.ShaderDataType.Matrix3x3;
            case "mat4":
                return Laya.ShaderDataType.Matrix4x4;
            case "sampler2D":
                return Laya.ShaderDataType.Texture2D;
            case "samplerCube":
                return Laya.ShaderDataType.TextureCube;
            case "sampler2DArray":
                return Laya.ShaderDataType.Texture2DArray;
            case "image2D":
                return Laya.ShaderDataType.StorageTexture2D;
            default:
                return Laya.ShaderDataType.None;
        }
    }
    function wgslAccessToGlsl(access) {
        switch (access) {
            case "read-only":
                return "readonly";
            case "read-write":
                return "";
            case "write-only":
            default:
                return "writeonly";
        }
    }
    function getArrayLength(name) {
        let endPos = name.lastIndexOf(']');
        let startPos = name.lastIndexOf('[');
        if (startPos != -1 && endPos == name.length - 1) {
            let arrayLengthStr = name.slice(startPos + 1, endPos);
            let arrayLength = parseInt(arrayLengthStr);
            if (!isNaN(arrayLength) && arrayLength > 0) {
                return arrayLength;
            }
        }
        return 0;
    }
    function getComputeCode(glslVersion, defineStrs, uniformStr, computeCode) {
        return `${glslVersion}

layout(std140, column_major) uniform;
layout(std430, column_major) buffer;

${defineStrs}

${uniformStr}

${computeCode}
`;
    }
    const mainFuncRegex = /\bvoid\s+main\s*\(\s*\)/;
    function renameMainFunction(source, newName) {
        const newCode = source.replace(mainFuncRegex, `void ${newName}()`);
        return newCode;
    }
    const ssboRegexCompat = /((?:layout\s*\([^)]*\)\s*)*)\s*((?:(?:readonly|writeonly|coherent|volatile|restrict)\s+)*)buffer\s+([A-Za-z_]\w*)\s*\{([\s\S]*?)\}\s*([A-Za-z_]\w*)?\s*;/g;
    function ssboStrings(ssboBindingMap, code) {
        code = code.replace(ssboRegexCompat, (match, layoutStr, readonlyStr, blockName, body, instanceName) => {
            let bindingInfo = ssboBindingMap.get(blockName);
            if (bindingInfo) {
                let newLayoutStr = `layout(std430, set = ${bindingInfo.set}, binding = ${bindingInfo.binding}) `;
                if (readonlyStr.startsWith("writeonly")) {
                    readonlyStr = " ";
                }
                return `${newLayoutStr}${readonlyStr}buffer ${blockName} {${body}} ${instanceName || ""};\n`;
            }
            else {
                return "";
            }
        });
        return code;
    }

    class BindGroupBindingInfo {
        get bindGroup() {
            if (this.active) {
                return this._bindGroup;
            }
            else {
                return null;
            }
        }
        get dynamicOffsetsData() {
            return this._dynamicOffsetsData;
        }
        get active() {
            return this._active;
        }
        constructor(bindGroup, dynamicOffsetsData, dynamicOffsetsDataStart, dynamicOffsetsDataLength) {
            this._active = true;
            this.hasDynamicOffsets = false;
            this.update(bindGroup, dynamicOffsetsData, dynamicOffsetsDataStart, dynamicOffsetsDataLength);
        }
        update(bindGroup, dynamicOffsetsData, dynamicOffsetsDataStart, dynamicOffsetsDataLength) {
            this._active = true;
            this._bindGroup = bindGroup;
            if (dynamicOffsetsData) {
                this.hasDynamicOffsets = true;
                if (dynamicOffsetsDataStart === undefined)
                    dynamicOffsetsDataStart = 0;
                if (dynamicOffsetsDataLength === undefined)
                    dynamicOffsetsDataLength = dynamicOffsetsData.length - dynamicOffsetsDataStart;
                if (this._dynamicOffsetsData) {
                    if (this._dynamicOffsetsData.byteLength >= dynamicOffsetsDataLength * Uint32Array.BYTES_PER_ELEMENT) {
                        this._dynamicOffsetsData = new Uint32Array(this._dynamicOffsetsData.buffer, 0, dynamicOffsetsDataLength);
                    }
                    else {
                        this._dynamicOffsetsData = new Uint32Array(dynamicOffsetsDataLength);
                    }
                }
                else {
                    this._dynamicOffsetsData = new Uint32Array(dynamicOffsetsDataLength);
                }
                for (let i = 0; i < dynamicOffsetsDataLength; i++) {
                    this._dynamicOffsetsData[i] = dynamicOffsetsData[i + dynamicOffsetsDataStart];
                }
            }
            else {
                this.hasDynamicOffsets = false;
            }
        }
        equal(bindGroup, dynamicOffsetsData, dynamicOffsetsDataStart, dynamicOffsetsDataLength) {
            if (this.bindGroup !== bindGroup)
                return false;
            if (dynamicOffsetsData && this.dynamicOffsetsData && this.hasDynamicOffsets) {
                if (dynamicOffsetsDataStart === undefined)
                    dynamicOffsetsDataStart = 0;
                if (dynamicOffsetsDataLength === undefined)
                    dynamicOffsetsDataLength = dynamicOffsetsData.length;
                for (let i = 0; i < dynamicOffsetsDataLength; i++) {
                    if (this.dynamicOffsetsData[i + dynamicOffsetsDataStart] !== dynamicOffsetsData[i])
                        return false;
                }
            }
            else if (dynamicOffsetsData || this.hasDynamicOffsets) {
                return false;
            }
            return true;
        }
        clear() {
            this._active = false;
            this._bindGroup = null;
            this.hasDynamicOffsets = false;
        }
        destroy() {
            this.clear();
            this._dynamicOffsetsData = null;
        }
    }
    class WebGPURenderEncoder {
        constructor(isBundle = false) {
            this.isBundle = false;
            this.currentBindGroups = new Map();
            this.currentPipeline = null;
            this.currentBindVertexBuffer = [];
            this.isBundle = isBundle;
        }
        setPipeline(pipeline) {
            if (this.currentPipeline && this.currentPipeline === pipeline) {
                return;
            }
            this.encoder.setPipeline(pipeline);
            this.currentPipeline = pipeline;
        }
        setVertexBuffer(slot, buffer) {
            if (this.currentBindVertexBuffer[slot] != buffer) {
                this.encoder.setVertexBuffer(slot, buffer._source, 0, buffer._size);
                this.currentBindVertexBuffer[slot] = buffer;
            }
        }
        setIndexBuffer(buffer, indexFormat) {
            if (this.currentBindIndexBuffer != buffer._source) {
                this.encoder.setIndexBuffer(buffer._source, indexFormat, 0, buffer._size);
                this.currentBindIndexBuffer = buffer._source;
            }
        }
        setVertexBufferWithOffset(slot, buffer, offset, size) {
        }
        setBindGroup(index, bindGroup) {
            if (this.currentBindGroups.has(index)) {
                const bindGroupInfo = this.currentBindGroups.get(index);
                if (bindGroupInfo.equal(bindGroup)) {
                    return;
                }
            }
            this.encoder.setBindGroup(index, bindGroup.gpuRS);
            if (this.currentBindGroups.has(index)) {
                let info = this.currentBindGroups.get(index);
                info.update(bindGroup, null, null, null);
            }
            else {
                let info = new BindGroupBindingInfo(bindGroup, null, null, null);
                this.currentBindGroups.set(index, info);
            }
        }
        setBindGroupByDataOffaset(index, bindGroup, dynamicOffsetsData, dynamicOffsetsDataStart, dynamicOffsetsDataLength) {
            if (this.currentBindGroups.has(index)) {
                const bindGroupInfo = this.currentBindGroups.get(index);
                if (bindGroupInfo.equal(bindGroup, dynamicOffsetsData, dynamicOffsetsDataStart, dynamicOffsetsDataLength)) {
                    return;
                }
            }
            this.encoder.setBindGroup(index, bindGroup.gpuRS, dynamicOffsetsData, dynamicOffsetsDataStart, dynamicOffsetsDataLength);
            if (this.currentBindGroups.has(index)) {
                let info = this.currentBindGroups.get(index);
                info.update(bindGroup, dynamicOffsetsData, dynamicOffsetsDataStart, dynamicOffsetsDataLength);
            }
            else {
                this.currentBindGroups.set(index, new BindGroupBindingInfo(bindGroup, dynamicOffsetsData, dynamicOffsetsDataStart, dynamicOffsetsDataLength));
            }
        }
        applyGeometry(geometry) {
            let triangles1 = geometry.applyToEncoder(this);
            return triangles1;
        }
        applyGeometryIndex(geometry, index) {
            const { bufferState, indexFormat, drawType, instanceCount, _drawArrayInfo, _drawElementInfo, _drawIndirectInfo } = geometry;
            const { _vertexBuffers: vertexBuffers, _bindedIndexBuffer: indexBuffer } = bufferState;
            let indexByte = 2;
            vertexBuffers.forEach((vb, i) => this.setVertexBuffer(i, vb.source));
            if (indexBuffer) {
                indexByte = geometry.gpuIndexByte;
                this.setIndexBuffer(indexBuffer.source, geometry.gpuIndexFormat);
            }
            let triangles = 0;
            let count = 0, start = 0;
            switch (drawType) {
                case Laya.DrawType.DrawArray:
                    {
                        let info = _drawArrayInfo.elements;
                        count = info[index * 2 + 1];
                        start = info[index * 2];
                        triangles += count - 2;
                        this.encoder.draw(count, 1, start, 0);
                        break;
                    }
                case Laya.DrawType.DrawElement:
                    {
                        let info = _drawElementInfo.elements;
                        count = info[index * 2 + 1];
                        start = info[index * 2];
                        triangles += count / 3;
                        this.encoder.drawIndexed(count, 1, start / indexByte, 0);
                        break;
                    }
                case Laya.DrawType.DrawArrayInstance:
                    {
                        let info = _drawArrayInfo.elements;
                        count = info[index * 2 + 1];
                        start = info[index * 2];
                        triangles += (count - 2) * instanceCount;
                        this.encoder.draw(count, instanceCount, start, 0);
                        break;
                    }
                case Laya.DrawType.DrawElementInstance:
                    {
                        let info = _drawElementInfo.elements;
                        count = info[index * 2 + 1];
                        start = info[index * 2];
                        triangles += count / 3 * instanceCount;
                        this.encoder.drawIndexed(count, instanceCount, start / indexByte, 0);
                        break;
                    }
                case Laya.DrawType.DrawArrayIndirect:
                    {
                        let info = _drawIndirectInfo[index];
                        this.encoder.drawIndirect(info.buffer.getNativeBuffer()._source, info.offset);
                        break;
                    }
                case Laya.DrawType.DrawElementIndirect:
                    {
                        let info = _drawIndirectInfo[index];
                        this.encoder.drawIndexedIndirect(info.buffer.getNativeBuffer()._source, info.offset);
                        break;
                    }
            }
            return triangles;
        }
        onFinish() {
            for (let bindGroupInfo of this.currentBindGroups.values()) {
                bindGroupInfo.clear();
            }
            this.currentPipeline = null;
            for (var i = 0; i < this.currentBindVertexBuffer.length; i++) {
                this.currentBindVertexBuffer[i] = null;
            }
            this.currentBindIndexBuffer = null;
        }
    }
    class WebGPURenderCommandEncoder extends WebGPURenderEncoder {
        constructor() {
            super();
            this._engine = WebGPURenderEngine._instance;
            this._device = this._engine.getDevice();
        }
        startRender(renderPassDesc) {
            this._commandEncoder = this._device.createCommandEncoder();
            this.encoder = this._commandEncoder.beginRenderPass(renderPassDesc);
            this.renderPassDesc = renderPassDesc;
        }
        setViewport(x, y, width, height, minDepth, maxDepth) {
            this.encoder.setViewport(x, y, width, height, minDepth, maxDepth);
        }
        setScissorRect(x, y, width, height) {
            this.encoder.setScissorRect(x, y, width, height);
        }
        setStencilReference(ref) {
            this.encoder.setStencilReference(ref);
        }
        end() {
            this.encoder.end();
        }
        finish() {
            this.onFinish();
            this.renderPassDesc = null;
            return this._commandEncoder.finish();
        }
        excuteBundle(bundles) {
            this.currentBindGroups.forEach((info, index) => {
                info.clear();
            });
            this.currentPipeline = null;
            this.encoder.executeBundles(bundles);
        }
        destroy() {
        }
    }

    class WebGPURenderPassHelper {
        static getDescriptor(rt, clearflag, clearColor = null, clearDepthValue = 1, clearStencilValue = 0) {
            clearColor = clearColor || Laya.Color.BLACK;
            let colorAttachments = [];
            let desc = {
                colorAttachments: colorAttachments,
            };
            let isClearColor = clearflag & Laya.RenderClearFlag.Color;
            let isClearDepth = clearflag & Laya.RenderClearFlag.Depth;
            if (rt.colorFormat == Laya.RenderTargetFormat.DEPTH_16 || rt.colorFormat == Laya.RenderTargetFormat.DEPTH_32 || rt.colorFormat == Laya.RenderTargetFormat.DEPTHSTENCIL_24_8 || rt.colorFormat == Laya.RenderTargetFormat.DEPTHSTENCIL_24_Plus || rt.colorFormat == Laya.RenderTargetFormat.STENCIL_8) {
                let tex = rt._textures[0];
                if (tex.multiSamplers > 1) {
                    tex = rt._texturesResolve[0];
                }
                desc.depthStencilAttachment = {
                    view: tex.getTextureView(true),
                    depthClearValue: isClearDepth ? clearDepthValue : 1,
                    depthLoadOp: isClearDepth ? 'clear' : 'load',
                    depthStoreOp: 'store'
                };
                if (rt.colorFormat == Laya.RenderTargetFormat.DEPTHSTENCIL_24_8 || rt.colorFormat == Laya.RenderTargetFormat.DEPTHSTENCIL_24_Plus || rt.colorFormat == Laya.RenderTargetFormat.STENCIL_8) {
                    desc.depthStencilAttachment.stencilClearValue = isClearDepth ? clearStencilValue : 0;
                    desc.depthStencilAttachment.stencilLoadOp = isClearDepth ? 'clear' : 'load';
                    desc.depthStencilAttachment.stencilStoreOp = 'store';
                }
            }
            else {
                for (let index = 0; index < rt._textures.length; index++) {
                    let tex = rt._textures[index];
                    let view = tex.dimension === 3 && rt._arrayLayerIndex >= 0
                        ? tex.getTextureViewForArrayLayer(rt._arrayLayerIndex)
                        : tex.getTextureView(true);
                    let attachment = {
                        view: view,
                        loadOp: isClearColor ? 'clear' : 'load',
                        storeOp: 'store'
                    };
                    if (tex.multiSamplers > 1) {
                        attachment.resolveTarget = rt._texturesResolve[index].getTextureView(true);
                    }
                    if (isClearColor) {
                        attachment.clearValue = {
                            r: clearColor.r,
                            g: clearColor.g,
                            b: clearColor.b,
                            a: clearColor.a
                        };
                    }
                    colorAttachments.push(attachment);
                }
                if (rt._depthTexture) {
                    desc.depthStencilAttachment = {
                        view: rt._depthTexture.getTextureView(true),
                        depthClearValue: isClearDepth ? clearDepthValue : 1,
                        depthLoadOp: isClearDepth ? 'clear' : 'load',
                        depthStoreOp: 'store'
                    };
                    if (rt.depthStencilFormat == Laya.RenderTargetFormat.DEPTHSTENCIL_24_8 || rt.depthStencilFormat == Laya.RenderTargetFormat.DEPTHSTENCIL_24_Plus || rt.depthStencilFormat == Laya.RenderTargetFormat.STENCIL_8) {
                        desc.depthStencilAttachment.stencilClearValue = isClearDepth ? clearStencilValue : 0;
                        desc.depthStencilAttachment.stencilLoadOp = isClearDepth ? 'clear' : 'load';
                        desc.depthStencilAttachment.stencilStoreOp = 'store';
                    }
                }
            }
            rt._renderPassDescriptor = desc;
            return desc;
        }
    }

    class WebGPURenderContext2D {
        get passData() {
            return this._passData;
        }
        set passData(value) {
            if (value == this._passData)
                return;
            this._passData = value;
        }
        constructor() {
            this._globalComkeyCounter = 0;
            this._globalComkeyNameMap = {};
            this._globalRendercacheInfoMap = new Map();
            this._offscreenX = 0;
            this._offscreenY = 0;
            this._needStart = true;
            this.renderCommand = new WebGPURenderCommandEncoder();
            this._cacheGlobalDefines = new WebDefineDatas();
            this.invertY = false;
            this.pipelineMode = 'Forward';
            WebGPURenderContext2D._instance = this;
            WebGPURenderContext2D._globalConfigShaderData = Laya.Shader3D._configDefineValues;
            this.device = WebGPURenderEngine._instance.getDevice();
            this._clearColor = new Laya.Color();
            this._viewport = new Laya.Viewport();
        }
        getOffscreenView(out) {
            out.setValue(this._offscreenX, this._offscreenY, this._offscreenWidth, this._offscreenHeight);
        }
        globalComkeyToID(name) {
            if (this._globalComkeyNameMap[name] !== undefined) {
                return this._globalComkeyNameMap[name];
            }
            else {
                const id = this._globalComkeyCounter++;
                this._globalComkeyNameMap[name] = id;
                return id;
            }
        }
        _getPassCacheKey() {
            let key = `${this.passData ? this.passData._id : -1},+${this._destRT == WebGPURenderEngine._instance._screenRT ? 0 : 1}`;
            this._curRenderGlobalKey = this.globalComkeyToID(key);
            let pipelineLayout = this._getRenderPipeLine();
            if (!this._globalRendercacheInfoMap.has(this._curRenderGlobalKey)) {
                let cacheInfo = new WebGPUGlobalPipeLineCacheInfo();
                this._curRenderCacheInfo = cacheInfo;
                this._cacheGlobalDefines.cloneTo(cacheInfo.globalDefineData);
                this._curRenderCacheInfo.globalDefineChangeFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                cacheInfo.globalPipelineCacheKey = pipelineLayout;
                cacheInfo.pipeLineChangeFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                this._pipelineChange = cacheInfo.pipeLineChangeFlag;
                this._globalRendercacheInfoMap.set(this._curRenderGlobalKey, cacheInfo);
            }
            else {
                this._curRenderCacheInfo = this._globalRendercacheInfoMap.get(this._curRenderGlobalKey);
                if (this._curRenderCacheInfo.globalPipelineCacheKey == pipelineLayout) {
                    this._pipelineChange = this._curRenderCacheInfo.pipeLineChangeFlag;
                }
                else {
                    this._pipelineChange = this._curRenderCacheInfo.pipeLineChangeFlag;
                    this._curRenderCacheInfo.globalPipelineCacheKey = pipelineLayout;
                    this._curRenderCacheInfo.pipeLineChangeFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                }
                if (!this._curRenderCacheInfo.globalDefineData.isEual(this._cacheGlobalDefines)) {
                    this._cacheGlobalDefines.cloneTo(this._curRenderCacheInfo.globalDefineData);
                    this._curRenderCacheInfo.globalDefineChangeFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                }
            }
            this._curDefineChangeFlag = this._curRenderCacheInfo.globalDefineChangeFlag;
        }
        _getRenderPipeLine() {
            if (this.passData) {
                const engine = WebGPURenderEngine._instance;
                let globalCommand = ["Sprite2DPass"];
                let globalResource = WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(0, globalCommand);
                let globalLayoutInfo = engine.bindGroupCache.getLayoutInfo(globalCommand, this.passData, null, globalResource, ~0);
                return `${this._destRT.stateCacheID},(${globalLayoutInfo.id})`;
            }
            else {
                return `${this._destRT.stateCacheID},(null)`;
            }
        }
        _prepareContext() {
            let comDef = this._cacheGlobalDefines;
            if (this._passData) {
                this._passData._defineDatas.cloneTo(comDef);
                let commandArray = ["Sprite2DPass"];
                let resource = WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(0, commandArray);
                let unifcom = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("Sprite2DPass");
                this._passUniformBuffer = this._passData.createUniformBuffer("Sprite2DPass", unifcom);
                this._passUniformBuffer.upload();
                this._passBindGroup = Laya.LayaGL.renderEngine.bindGroupCache.getBindGroup(commandArray, this._passData, null, resource, ~0);
            }
            else {
                WebGPURenderContext2D._globalConfigShaderData.cloneTo(comDef);
                this._passBindGroup = WebGPURenderEngine._instance.bindGroupCache.getBindGroup([], null, null, [], 0);
                this._passUniformBuffer = null;
            }
            let returnGamma = !(this._destRT) || ((this._destRT)._textures[0].gammaCorrection != 1);
            if (this._destRT == WebGPURenderEngine._instance._screenRT) {
                returnGamma = true;
            }
            if (returnGamma) {
                comDef.add(Laya.ShaderDefines2D.GAMMASPACE);
            }
            else {
                comDef.remove(Laya.ShaderDefines2D.GAMMASPACE);
            }
            if (this.invertY) {
                comDef.remove(Laya.ShaderDefines2D.INVERTY);
            }
            else {
                comDef.add(Laya.ShaderDefines2D.INVERTY);
            }
            this._getPassCacheKey();
        }
        _submit() {
            const engine = WebGPURenderEngine._instance;
            this.renderCommand.end();
            engine.upload();
            this.device.queue.submit([this.renderCommand.finish()]);
            this._needStart = true;
        }
        _setScreenRT() {
            if (!this._destRT) {
                this.setRenderTarget(null, this._needClearColor, this._clearColor);
            }
        }
        _start() {
            this._setScreenRT();
            this._destRT = this._destRT || WebGPURenderEngine._instance._screenRT;
            const renderPassDesc = WebGPURenderPassHelper.getDescriptor(this._destRT, this._needClearColor ? Laya.RenderClearFlag.Color : Laya.RenderClearFlag.Nothing, this._clearColor);
            this.renderCommand.startRender(renderPassDesc);
            this.renderCommand.setViewport(this._viewport.x, this._viewport.y, this._viewport.width, this._viewport.height, 0, 1);
            this._needClearColor = false;
        }
        _needGlobalData() {
            return !!this.passData;
        }
        getRenderTarget() {
            return this._destRT;
        }
        drawRenderElementList(list) {
            const len = list.length;
            if (len === 0)
                return 0;
            if (this._needStart) {
                this._start();
                this._needStart = false;
            }
            let time = Laya.Browser.now();
            this._prepareContext();
            const elements = list.elements;
            for (let i = 0, n = list.length; i < n; i++) {
                elements[i]._prepare(this);
            }
            WebGPURenderEngine._instance.gpuBufferMgr.upload();
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_2DContextPre, Laya.Browser.now() - time);
            time = Laya.Browser.now();
            for (let i = 0, n = list.length; i < n; i++) {
                elements[i]._render(this, this.renderCommand);
            }
            this._submit();
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_2DContextRender, Laya.Browser.now() - time);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_2DDrawCall, list.length);
            WebGPURenderEngine._instance._framePassCount++;
            return 0;
        }
        setOffscreenView(width, height, x = 0, y = 0) {
            this._offscreenWidth = width;
            this._offscreenHeight = height;
            this._offscreenX = x;
            this._offscreenY = y;
        }
        setRenderTarget(value, clear, clearColor) {
            const engine = WebGPURenderEngine._instance;
            if (!this._needClearColor) {
                this._needClearColor = clear;
            }
            if (clear) {
                clearColor && clearColor.cloneTo(this._clearColor);
            }
            if (engine.hasScreenCleared) {
                this._needClearColor = false;
            }
            if (!value || this._destRT !== value) {
                this._destRT = value;
                this._needStart = true;
            }
            let rt = value;
            if (!rt) {
                rt = engine._screenRT;
            }
            let tex = rt._textures[0];
            this._viewport.set(0, 0, tex.width, tex.height);
        }
        drawRenderElementOne(node) {
            if (this._needStart) {
                this._start();
                this._needStart = false;
            }
            this._prepareContext();
            node._prepare(this);
            WebGPURenderEngine._instance.gpuBufferMgr.upload();
            node._render(this, this.renderCommand);
            this._submit();
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_2DDrawCall, 1);
            WebGPURenderEngine._instance._framePassCount++;
        }
        runOneCMD(cmd) {
            cmd.apply(this);
        }
        runCMDList(cmds) {
            cmds.forEach(cmd => cmd.apply(this));
        }
    }

    class WebGPUShaderInstance {
        get vertexModule() {
            return this._vsShader;
        }
        get fragmentModule() {
            return this._fsShader;
        }
        constructor(name) {
            this._destroyed = false;
            this._commanMap = [];
            this._id = WebGPUShaderInstance.idCounter++;
            this.complete = false;
            this.uniformSetMap = new Map();
            this.uniformResourcesCacheKey = new Map();
            this.uniformTextureExits = new Map();
            this.name = name;
        }
        _serializeShader() {
            throw new Laya.NotImplementedError();
        }
        _deserialize(buffer) {
            throw new Laya.NotImplementedError();
        }
        _create(shaderProcessInfo, shaderPass) {
            const engine = WebGPURenderEngine._instance;
            const device = engine.getDevice();
            this._shaderPass = shaderPass;
            if (!shaderProcessInfo.is2D) {
                this._create3D();
            }
            else {
                this._create2D();
            }
            let attriLocArray = shaderPass.moduleData.attributeLocations;
            let filteredAttributeMap = {};
            let noUseAttributeMap = {};
            for (const [key, value] of Object.entries(shaderProcessInfo.attributeMap)) {
                if (attriLocArray.has(value[0])) {
                    filteredAttributeMap[key] = value;
                }
                else {
                    noUseAttributeMap[key] = value;
                }
            }
            let useTexSet = new Set();
            let cullTextureSetLayer = shaderProcessInfo.is2D ? 3 : 2;
            let appendSet = shaderProcessInfo.is2D ? 2 : 3;
            const glslObj = GLSLForVulkanGenerator.process(shaderProcessInfo.defineString, [filteredAttributeMap, noUseAttributeMap], this.uniformSetMap, shaderPass.name, shaderPass._owner._uniformMap, shaderProcessInfo.vs, shaderProcessInfo.ps, useTexSet, cullTextureSetLayer, appendSet);
            this._generateMaterialCommandMap();
            this.uniformResourcesCacheKey.set(appendSet, [shaderPass.name]);
            {
                let textureIndices = [];
                for (const texName of useTexSet) {
                    let propertyIDName = texName;
                    if (propertyIDName.endsWith("_Texture")) {
                        textureIndices.push(WebGPURenderEngine._instance.propertyNameToID(propertyIDName.substring(0, propertyIDName.length - 8)));
                    }
                }
                for (const [setIndex, bindInfoArray] of this.uniformSetMap) {
                    if (setIndex < cullTextureSetLayer) {
                        continue;
                    }
                    let filteredBindInfoArray = [];
                    for (const bindInfo of bindInfoArray) {
                        if (bindInfo.sampler || bindInfo.texture) {
                            if (textureIndices.includes(bindInfo.propertyId)) {
                                filteredBindInfoArray.push(bindInfo);
                            }
                        }
                        else {
                            filteredBindInfoArray.push(bindInfo);
                        }
                    }
                    this.uniformSetMap.set(setIndex, filteredBindInfoArray);
                }
            }
            {
                let vertexSpvRes = engine.shaderCompiler.glslang.glsl450_to_spirv(glslObj.vertex, "vertex");
                if (!vertexSpvRes.success) {
                    let subShader = this._shaderPass._owner;
                    let shader = subShader._owner;
                    let subIndex = shader._subShaders.indexOf(subShader);
                    let passIndex = subShader._passes.indexOf(this._shaderPass);
                    console.error(`${shader.name}_sub${subIndex}_pass${passIndex}`);
                    console.error(vertexSpvRes.info_log);
                }
                let vertexSpirv = new Uint8Array(vertexSpvRes.spirv.buffer, vertexSpvRes.spirv.byteOffset, vertexSpvRes.spirv.byteLength);
                let fragmentSpvRes = engine.shaderCompiler.glslang.glsl450_to_spirv(glslObj.fragment, "fragment");
                if (!fragmentSpvRes.success) {
                    let subShader = this._shaderPass._owner;
                    let shader = subShader._owner;
                    let subIndex = shader._subShaders.indexOf(subShader);
                    let passIndex = subShader._passes.indexOf(this._shaderPass);
                    console.error(`${shader.name}_sub${subIndex}_pass${passIndex}`);
                    console.error(fragmentSpvRes.info_log);
                }
                let fragmentSpv = new Uint8Array(fragmentSpvRes.spirv.buffer, fragmentSpvRes.spirv.byteOffset, fragmentSpvRes.spirv.byteLength);
                if (!WebGPURenderEngine._instance.useSPRIV) {
                    let vertexWgsl = engine.shaderCompiler.naga.spirv_to_wgsl(vertexSpirv, false);
                    this._vsShader = device.createShaderModule({ label: this.name, code: vertexWgsl });
                }
                else {
                    this._vsShader = device.createShaderModule({ label: this.name, spv: vertexSpirv.buffer });
                }
                this._vsShader.getCompilationInfo().then(info => {
                    if (info.messages.length > 0) {
                        let subShader = this._shaderPass._owner;
                        let shader = subShader._owner;
                        let subIndex = shader._subShaders.indexOf(subShader);
                        let passIndex = subShader._passes.indexOf(this._shaderPass);
                        console.group(`Vertex shader compilation details for ${shader.name}_s${subIndex}_p${passIndex}:`);
                        for (const msg of info.messages) {
                            const type = msg.type === "error" ? "ERROR" : "WARNING";
                            console.warn(`${type} [${msg.lineNum}:${msg.linePos}]: ${msg.message}`);
                        }
                        console.groupEnd();
                    }
                });
                if (!WebGPURenderEngine._instance.useSPRIV) {
                    let fragmentWgsl = engine.shaderCompiler.naga.spirv_to_wgsl(fragmentSpv, false);
                    this._fsShader = device.createShaderModule({ label: this.name, code: fragmentWgsl });
                }
                else {
                    this._fsShader = device.createShaderModule({ label: this.name, spv: fragmentSpv.buffer });
                }
                this._fsShader.getCompilationInfo().then(info => {
                    if (info.messages.length > 0) {
                        let subShader = this._shaderPass._owner;
                        let shader = subShader._owner;
                        let subIndex = shader._subShaders.indexOf(subShader);
                        let passIndex = subShader._passes.indexOf(this._shaderPass);
                        console.group(`Fragment shader compilation details for ${shader.name}_s${subIndex}_p${passIndex}:`);
                        for (const msg of info.messages) {
                            const type = msg.type === "error" ? "ERROR" : "WARNING";
                            console.warn(`${type} [${msg.lineNum}:${msg.linePos}]: ${msg.message}`);
                        }
                        console.groupEnd();
                    }
                });
            }
            {
                this.uniformResourcesCacheKey.forEach((names, index) => {
                    let bitOffset = 0;
                    let textureExits = 0;
                    let resources = this.uniformSetMap.get(index);
                    names.forEach(name => {
                        let map = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(name);
                        resources.forEach(resource => {
                            let propertyID = resource.propertyId;
                            if (map.hasPtrID(propertyID)) {
                                switch (resource.type) {
                                    case exports.WebGPUBindingInfoType.sampler:
                                        let textureBit = map._textureBits.get(propertyID) + bitOffset;
                                        let posMask = 1 << textureBit;
                                        textureExits |= posMask;
                                        break;
                                }
                            }
                        });
                        bitOffset += map._textureCount;
                    });
                    this.uniformTextureExits.set(index, textureExits);
                });
            }
            this.complete = true;
        }
        _generateMaterialCommandMap() {
            let shaderpass = this._shaderPass;
            let map = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(shaderpass.name);
            if (map._idata.size == 0) {
                for (const [key, value] of shaderpass._owner._uniformMap) {
                    if (value.arrayLength > 0) {
                        map.addShaderUniformArray(value.id, value.propertyName, value.uniformtype, value.arrayLength);
                    }
                    else {
                        map.addShaderUniform(value.id, value.propertyName, value.uniformtype);
                    }
                }
                map._stateID = Laya.LayaGL.renderEngine.propertyNameToID("Material");
            }
        }
        _create2D() {
            let shaderPass = this._shaderPass;
            let context = WebGPURenderContext2D._instance;
            if (context._needGlobalData()) {
                let globalArray = ["Sprite2DPass"];
                this.uniformSetMap.set(0, WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(0, globalArray));
                this.uniformResourcesCacheKey.set(0, globalArray);
            }
            else {
                let globalArray = [];
                this.uniformResourcesCacheKey.set(0, globalArray);
                this.uniformSetMap.set(0, []);
            }
            this._commanMap = this._commanMap.concat(shaderPass.moduleData.nodeCommonMap, shaderPass.moduleData.additionShaderData);
            this.uniformResourcesCacheKey.set(1, this._commanMap);
            this.uniformSetMap.set(1, WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(1, this._commanMap));
            let emptyArray = [];
            this.uniformResourcesCacheKey.set(3, emptyArray);
            this.uniformSetMap.set(3, []);
        }
        _create3D() {
            let shaderPass = this._shaderPass;
            let context = Laya.WebGPURenderContext3D._instance;
            let preDrawUniforms = context.preDrawUniformMaps;
            let preDrawArray = Array.from(preDrawUniforms);
            this.uniformSetMap.set(0, WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(0, preDrawArray));
            this.uniformResourcesCacheKey.set(0, preDrawArray);
            let cameraArray = ["BaseCamera"];
            this.uniformSetMap.set(1, WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(1, cameraArray));
            this.uniformResourcesCacheKey.set(1, cameraArray);
            this._commanMap = this._commanMap.concat(shaderPass.moduleData.nodeCommonMap, shaderPass.moduleData.additionShaderData);
            this.uniformSetMap.set(2, WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(2, this._commanMap));
            this.uniformResourcesCacheKey.set(2, this._commanMap);
        }
        _disposeResource() {
            if (!this._destroyed) {
                this._destroyed = true;
                this.uniformSetMap.clear();
                this.uniformResourcesCacheKey.clear();
                this.uniformTextureExits.clear();
            }
        }
    }
    WebGPUShaderInstance.idCounter = 0;

    class WebGPUVertexBuffer {
        get instanceBuffer() {
            return this._instanceBuffer;
        }
        set instanceBuffer(value) {
            this._instanceBuffer = value;
            if (this._vertexDeclaration) {
                this._getCacheInfo();
            }
        }
        getStorageBuffer() {
            return this._webGPUDeviceBuffer;
        }
        constructor(targetType, bufferUsageType) {
            this.globalId = WebGPUGlobal.getId(this);
            this._instanceBuffer = false;
            this.stateCacheKey = '';
            let usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC;
            if (targetType & Laya.BufferTargetType.TRANSFORM_FEEDBACK_BUFFER) {
                let usage = Laya.EDeviceBufferUsage.VERTEX | Laya.EDeviceBufferUsage.COPY_DST | Laya.EDeviceBufferUsage.COPY_SRC;
                usage |= Laya.EDeviceBufferUsage.STORAGE;
                this._webGPUDeviceBuffer = new WebGPUDeviceBuffer(usage);
                this.source = this._webGPUDeviceBuffer._buffer;
            }
            else {
                this.source = new WebGPUBuffer(usage, 0);
            }
        }
        getNativeBuffer() {
            return this.source;
        }
        get vertexDeclaration() {
            return this._vertexDeclaration;
        }
        set vertexDeclaration(value) {
            this._vertexDeclaration = value;
            this._getCacheInfo();
        }
        _getCacheInfo() {
            this.stateCacheKey = this.instanceBuffer ? "instance" : "vertex";
            const vertexDec = this._vertexDeclaration;
            const vertexAttribute = new Array();
            for (let i in vertexDec._shaderValues) {
                const vertexState = vertexDec._shaderValues[i];
                const format = this._getvertexAttributeFormat(vertexState.elementString);
                vertexAttribute.push({
                    format,
                    offset: vertexState.elementOffset,
                    shaderLocation: parseInt(i)
                });
                this.stateCacheKey += `{${i}_${format},${vertexState.elementOffset}},`;
            }
            if (WebGPUVertexBuffer._bufferLayoutConterMap.has(this.stateCacheKey)) {
                this.stateCacheID = WebGPUVertexBuffer._bufferLayoutConterMap.get(this.stateCacheKey);
            }
            else {
                this.stateCacheID = WebGPUVertexBuffer._bufferLayoutIDConter;
                WebGPUVertexBuffer._bufferLayoutConterMap.set(this.stateCacheKey, this.stateCacheID);
                WebGPUVertexBuffer._bufferLayoutIDConter++;
            }
            this.verteBufferLayout = {
                arrayStride: vertexDec.vertexStride,
                stepMode: this.instanceBuffer ? exports.WebGPUVertexStepMode.instance : exports.WebGPUVertexStepMode.vertex,
                attributes: vertexAttribute
            };
        }
        _getvertexAttributeFormat(elementFormat) {
            switch (elementFormat) {
                case Laya.VertexElementFormat.Single:
                    return "float32";
                case Laya.VertexElementFormat.Vector2:
                    return "float32x2";
                case Laya.VertexElementFormat.Vector3:
                    return "float32x3";
                case Laya.VertexElementFormat.Vector4:
                    return "float32x4";
                case Laya.VertexElementFormat.Color:
                    return "float32x4";
                case Laya.VertexElementFormat.Byte4:
                    return "uint8x4";
                case Laya.VertexElementFormat.Byte2:
                    return "uint8x2";
                case Laya.VertexElementFormat.Short2:
                    return "float16x2";
                case Laya.VertexElementFormat.Short4:
                    return "float16x4";
                case Laya.VertexElementFormat.NormalizedShort2:
                    return "unorm16x2";
                case Laya.VertexElementFormat.NormalizedShort4:
                    return "unorm16x4";
                case Laya.VertexElementFormat.NorByte4:
                    return "unorm8x4";
                default:
                    throw 'no cache has vertex mode';
            }
        }
        setData(buffer, bufferOffset = 0, dataStartIndex = 0, dataCount = Number.MAX_SAFE_INTEGER) {
            const needSubData = dataStartIndex !== 0 || dataCount !== Number.MAX_SAFE_INTEGER;
            if (needSubData) {
                this.source.setDataEx(buffer, dataStartIndex, dataCount, bufferOffset);
                this.buffer = buffer;
            }
            else {
                this.source.setData(buffer, bufferOffset);
                this.buffer = buffer;
            }
        }
        setDataLength(byteLength) {
            if (this._webGPUDeviceBuffer) {
                this._webGPUDeviceBuffer.setDataLength(byteLength);
            }
            else {
                this.source.setDataLength(byteLength);
            }
        }
        destroy() {
            if (this._webGPUDeviceBuffer) {
                this._webGPUDeviceBuffer.destroy();
            }
            else {
                this.source.release();
            }
            this._vertexDeclaration = null;
        }
    }
    WebGPUVertexBuffer._bufferLayoutConterMap = new Map();
    WebGPUVertexBuffer._bufferLayoutIDConter = 0;

    var CommandType;
    (function (CommandType) {
        CommandType[CommandType["Dispatch"] = 0] = "Dispatch";
        CommandType[CommandType["DispatchIndirect"] = 1] = "DispatchIndirect";
        CommandType[CommandType["SetShaderData"] = 2] = "SetShaderData";
        CommandType[CommandType["ClearBuffer"] = 3] = "ClearBuffer";
        CommandType[CommandType["BufferToBuffer"] = 4] = "BufferToBuffer";
        CommandType[CommandType["BufferToTexture"] = 5] = "BufferToTexture";
        CommandType[CommandType["TextureToBuffer"] = 6] = "TextureToBuffer";
        CommandType[CommandType["TextureToTexture"] = 7] = "TextureToTexture";
    })(CommandType || (CommandType = {}));
    class WebGPUComputeContext {
        constructor() {
            this.commands = [];
            this.bindGroupMap = new Map();
            this.device = WebGPURenderEngine._instance.getDevice();
        }
        clearCMDs() {
            this.commands = [];
        }
        addDispatchCommand(cmd) {
            let cmdInfo = {
                type: CommandType.Dispatch,
                cmd
            };
            this.commands.push(cmdInfo);
        }
        addDispatchIndirectCommand(cmd) {
            let cmdInfo = {
                type: CommandType.DispatchIndirect,
                cmd
            };
            this.commands.push(cmdInfo);
        }
        addSetShaderDataCommand(shaderData, propertyID, shaderDataType, value) {
            let cmdInfo = {
                type: CommandType.SetShaderData,
                shaderData,
                propertyID,
                shaderDataType,
                value
            };
            this.commands.push(cmdInfo);
        }
        addBufferToBufferCommand(src, dest, sourceOffset = 0, destinationOffset = 0, size) {
            let cmdInfo = {
                type: CommandType.BufferToBuffer,
                src,
                dest,
                sourceOffset,
                destinationOffset,
                size
            };
            this.commands.push(cmdInfo);
        }
        addBufferToTextureCommand(src, srcTextureInfo, destTextureInfo, copySize) {
            let cmdInfo = {
                type: CommandType.BufferToTexture,
                src,
                srcTextureInfo,
                destTextureInfo,
                copySize
            };
            this.commands.push(cmdInfo);
        }
        addTextureToBufferCommand(srcTextureInfo, dest, destTextureInfo, copySize) {
            let cmdInfo = {
                type: CommandType.TextureToBuffer,
                srcTextureInfo,
                dest,
                destTextureInfo,
                copySize
            };
            this.commands.push(cmdInfo);
        }
        addTextureToTextureCommand(srcTextureInfo, destTextureInfo, copySize) {
            let cmdInfo = {
                type: CommandType.TextureToTexture,
                srcTextureInfo,
                destTextureInfo,
                copySize
            };
            this.commands.push(cmdInfo);
        }
        addClearBufferCommand(dest, destoffset, destCount) {
            let cmdInfo = {
                type: CommandType.ClearBuffer,
                dest: dest,
                destinationOffset: destoffset,
                size: destCount
            };
            this.commands.push(cmdInfo);
        }
        _bindGroup(computeShader, webgpuShaderData) {
            this.bindGroupMap.clear();
            for (let i = 0, n = webgpuShaderData.length; i < n; i++) {
                let shaderdata = webgpuShaderData[i];
                let uniformCommandMap = computeShader.uniformCommandMap[i];
                if (uniformCommandMap._hasUniformBuffer) {
                    let uniform = shaderdata.createSubUniformBuffer(uniformCommandMap._stateName, uniformCommandMap._stateName, uniformCommandMap._idata);
                    if (uniform) {
                        uniform.upload();
                    }
                }
                let resource = computeShader.uniformSetMap.get(i);
                let bindgroup = WebGPURenderEngine._instance.bindGroupCache.getBindGroup([uniformCommandMap._stateName], shaderdata, null, resource, ~0);
                this._computeEncoder.setBindGroup(i, bindgroup.gpuRS);
                this.bindGroupMap.set(i, bindgroup);
            }
            WebGPURenderEngine._instance.gpuBufferMgr.upload();
        }
        _startComputePass() {
            if (!this._computeEncoder) {
                this._computeEncoder = this._commandEncoder.beginComputePass();
            }
        }
        _endComputePass() {
            if (this._computeEncoder) {
                this._computeEncoder.end();
                this._computeEncoder = null;
                this._cacheShader = null;
            }
        }
        executeCMDs() {
            if (this.commands.length === 0) {
                return;
            }
            this._commandEncoder = this.device.createCommandEncoder();
            for (const cmd of this.commands) {
                switch (cmd.type) {
                    case CommandType.Dispatch:
                        const dispatchInfo = cmd.cmd;
                        this._startComputePass();
                        let shader = dispatchInfo.shader;
                        this._bindGroup(shader, dispatchInfo.shaderData);
                        if (this._cacheShader != shader) {
                            let pipeline = WebGPURenderEngine._instance.pipelineCache.getComputePipeline(this.bindGroupMap, shader, "main");
                            this._computeEncoder.setPipeline(pipeline);
                        }
                        let dispatchParams = dispatchInfo.dispatchParams;
                        this._computeEncoder.dispatchWorkgroups(dispatchParams.x, dispatchParams.y || 1, dispatchParams.z || 1);
                        break;
                    case CommandType.DispatchIndirect:
                        const indirectInfo = cmd.cmd;
                        this._startComputePass();
                        let indirectShader = indirectInfo.shader;
                        this._bindGroup(indirectShader, indirectInfo.shaderData);
                        if (this._cacheShader != indirectShader) {
                            let pipeline = WebGPURenderEngine._instance.pipelineCache.getComputePipeline(this.bindGroupMap, indirectShader, "main");
                            this._computeEncoder.setPipeline(pipeline);
                        }
                        this._computeEncoder.dispatchWorkgroupsIndirect(indirectInfo.indirectBuffer.getNativeBuffer()._source, indirectInfo.indirectOffset);
                        break;
                    case CommandType.SetShaderData:
                        const setDataCMD = cmd;
                        switch (setDataCMD.shaderDataType) {
                            case Laya.ShaderDataType.Int:
                                setDataCMD.shaderData.setInt(setDataCMD.propertyID, setDataCMD.value);
                                break;
                            case Laya.ShaderDataType.Float:
                                setDataCMD.shaderData.setNumber(setDataCMD.propertyID, setDataCMD.value);
                                break;
                            case Laya.ShaderDataType.Bool:
                                setDataCMD.shaderData.setBool(setDataCMD.propertyID, setDataCMD.value);
                                break;
                            case Laya.ShaderDataType.Matrix3x3:
                                setDataCMD.shaderData.setMatrix3x3(setDataCMD.propertyID, setDataCMD.value);
                                break;
                            case Laya.ShaderDataType.Matrix4x4:
                                setDataCMD.shaderData.setMatrix4x4(setDataCMD.propertyID, setDataCMD.value);
                                break;
                            case Laya.ShaderDataType.Color:
                                setDataCMD.shaderData.setColor(setDataCMD.propertyID, setDataCMD.value);
                                break;
                            case Laya.ShaderDataType.Texture2D:
                            case Laya.ShaderDataType.StorageTexture2D:
                                setDataCMD.shaderData.setTexture(setDataCMD.propertyID, setDataCMD.value);
                                break;
                            case Laya.ShaderDataType.Vector2:
                                setDataCMD.shaderData.setVector2(setDataCMD.propertyID, setDataCMD.value);
                                break;
                            case Laya.ShaderDataType.Vector3:
                                setDataCMD.shaderData.setVector3(setDataCMD.propertyID, setDataCMD.value);
                                break;
                            case Laya.ShaderDataType.Vector4:
                                setDataCMD.shaderData.setVector(setDataCMD.propertyID, setDataCMD.value);
                                break;
                            case Laya.ShaderDataType.Buffer:
                                setDataCMD.shaderData.setBuffer(setDataCMD.propertyID, setDataCMD.value);
                                break;
                            case Laya.ShaderDataType.DeviceBuffer:
                            case Laya.ShaderDataType.ReadOnlyDeviceBuffer:
                                setDataCMD.shaderData.setDeviceBuffer(setDataCMD.propertyID, setDataCMD.value);
                                break;
                        }
                        break;
                    case CommandType.BufferToBuffer:
                        const btbCmd = cmd;
                        this._endComputePass();
                        this._commandEncoder.copyBufferToBuffer(btbCmd.src.getNativeBuffer()._source, btbCmd.sourceOffset, btbCmd.dest.getNativeBuffer()._source, btbCmd.destinationOffset, btbCmd.size);
                        break;
                    case CommandType.ClearBuffer:
                        const clearBufferCmd = cmd;
                        this._endComputePass();
                        this._commandEncoder.clearBuffer(clearBufferCmd.dest.getNativeBuffer()._source, clearBufferCmd.destinationOffset, clearBufferCmd.size);
                        break;
                    case CommandType.BufferToTexture:
                        break;
                    case CommandType.TextureToBuffer:
                        break;
                    case CommandType.TextureToTexture:
                        const textureCopyCmd = cmd;
                        this._endComputePass();
                        let srcInfo = {
                            texture: textureCopyCmd.srcTextureInfo.texture.resource,
                            mipLevel: textureCopyCmd.srcTextureInfo.mipLevel,
                            origin: textureCopyCmd.srcTextureInfo.origin
                        };
                        let desInfo = {
                            texture: textureCopyCmd.destTextureInfo.texture.resource,
                            mipLevel: textureCopyCmd.destTextureInfo.mipLevel,
                            origin: textureCopyCmd.destTextureInfo.origin
                        };
                        this._commandEncoder.copyTextureToTexture(srcInfo, desInfo, textureCopyCmd.copySize);
                        break;
                }
            }
            this._endComputePass();
            const commandBuffer = this._commandEncoder.finish();
            this.device.queue.submit([commandBuffer]);
        }
        destroy() {
            this.clearCMDs();
            this.bindGroupMap.clear();
        }
    }

    const _defineStrings = [];
    class WebGPUComputeShaderInstance {
        constructor(name) {
            this._shaderModule = null;
            this._pipelineCache = new Map();
            this._entryPoints = [];
            this._id = WebGPUComputeShaderInstance.idCounter++;
            this.uniformSetMap = new Map();
            this.compilete = false;
            this._device = WebGPURenderEngine._instance.getDevice();
            this.name = name;
        }
        _serializeShader() {
            throw new Laya.NotImplementedError();
        }
        _deserialize(buffer) {
            throw new Laya.NotImplementedError();
        }
        compile(info) {
            const engine = WebGPURenderEngine._instance;
            let node = info.node;
            let compileDefine = info.defineData;
            _defineStrings.length = 0;
            Laya.Shader3D._getNamesByDefineData(compileDefine, _defineStrings);
            let other = info.uniformMaps;
            for (let i = 0, n = other.length; i < n; i++) {
                this.uniformSetMap.set(i, WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(i, [other[i]._stateName], true));
            }
            this.uniformCommandMap = other;
            let processResult = GLSLForVulkanGenerator.proccessCompute(_defineStrings, this.uniformCommandMap, this.uniformSetMap, node, info.name);
            let glsl = processResult.code;
            let splitSampler = processResult.hasSampler;
            let spvRes = engine.shaderCompiler.glslang.glsl450_combine_to_spirv(glsl, 'compute', splitSampler);
            if (!spvRes.success) {
                console.error(`WebGPUComputeShaderInstance ${info.name} compile error:`, spvRes.info_log);
                return;
            }
            let spriv = new Uint8Array(spvRes.spirv.buffer, spvRes.spirv.byteOffset, spvRes.spirv.byteLength);
            let wgls = engine.shaderCompiler.naga.spirv_to_wgsl(spriv, false);
            if (engine.wgslLanguageFeatures.has("readonly_and_readwrite_storage_textures")) {
                wgls = "requires readonly_and_readwrite_storage_textures;\n\n" + wgls;
            }
            this._shaderModule = this._device.createShaderModule({
                code: wgls
            });
            this._shaderModule.getCompilationInfo().then((value) => {
                if (value.messages.length > 0) {
                    console.warn("WebGPUComputeShaderInstance compile info:", value.messages);
                }
            });
            this.compilete = true;
        }
        getPipelineDescriptor(entryPoint) {
            let descriptor = {
                label: this.name,
                layout: null,
                compute: {
                    module: this._shaderModule,
                    entryPoint: entryPoint
                }
            };
            return descriptor;
        }
        ;
    }
    WebGPUComputeShaderInstance.idCounter = 0;

    class WebGPUPipelineLayout {
        constructor(layout) {
            this.id = WebGPUPipelineLayout._idCounter++;
            this.layout = layout;
        }
    }
    WebGPUPipelineLayout._idCounter = 0;
    class WebGPUPipelineCache {
        constructor() {
            this.pipelineLayoutCache = new Map();
            this.pipelineCache = new Map();
            this.pipelineDecCache = new Map();
            this.computePipelineCache = new Map();
        }
        clearCache() {
            this.pipelineCache.clear();
            this.computePipelineCache.clear();
            this.pipelineDecCache.clear();
            this.pipelineLayoutCache.clear();
        }
        getPipelineLayoutCacheKey(bindGroups) {
            const sortedKeys = Array.from(bindGroups.keys()).sort((a, b) => a - b);
            let key = '';
            for (const bindingIndex of sortedKeys) {
                const bindGroup = bindGroups.get(bindingIndex);
                key += `${bindingIndex}:${bindGroup.info.id}_`;
            }
            return key;
        }
        getPipelinelayout(bindGroups) {
            const cacheKey = this.getPipelineLayoutCacheKey(bindGroups);
            if (this.pipelineLayoutCache.has(cacheKey)) {
                return this.pipelineLayoutCache.get(cacheKey);
            }
            let bindGroupLayouts = [];
            bindGroups.forEach((bindGroup, index) => {
                bindGroupLayouts[index] = bindGroup.layout;
            });
            let descriptor = {
                label: "pipelineLayout",
                bindGroupLayouts: bindGroupLayouts
            };
            const device = WebGPURenderEngine._instance.getDevice();
            let pipelineLayout = device.createPipelineLayout(descriptor);
            let layout = new WebGPUPipelineLayout(pipelineLayout);
            this.pipelineLayoutCache.set(cacheKey, layout);
            return layout;
        }
        getPipeline(bindGroups, info, shaderInstance, renderTarget) {
            var _a, _b;
            const device = WebGPURenderEngine._instance.getDevice();
            let layout = this.getPipelinelayout(bindGroups);
            const descKey = `${info.geometry.getStateCacheID()}_${info.blendState.key}_${((_a = info.depthStencilState) === null || _a === void 0 ? void 0 : _a.id) || 0}_${info.cullMode}_${info.frontFace}_${shaderInstance._id}_${layout.id}_${renderTarget.stateCacheID}`;
            if (this.pipelineCache.has(descKey)) {
                return this.pipelineCache.get(descKey);
            }
            renderTarget._renderPassDescriptor.colorAttachments;
            const primitive = WebGPUPrimitiveState.getGPUPrimitiveState(info.geometry.mode, info.frontFace, info.cullMode);
            const blendState = info.blendState.state;
            const depthState = (_b = info.depthStencilState) === null || _b === void 0 ? void 0 : _b.state;
            const primitiveState = primitive.state;
            const vertexState = info.geometry.bufferState.vertexState;
            let descriptor = {
                label: descKey,
                layout: layout.layout,
                vertex: {
                    buffers: vertexState,
                    module: shaderInstance.vertexModule,
                    entryPoint: "main"
                },
                primitive: primitiveState,
                depthStencil: null,
                multisample: {
                    count: renderTarget._samples
                },
                fragment: {
                    module: shaderInstance.fragmentModule,
                    entryPoint: "main",
                    targets: [],
                }
            };
            descriptor.vertex.buffers = vertexState;
            const textureNum = renderTarget._textures.length;
            if (renderTarget._textures[0]._webGPUFormat === 'depth16unorm'
                || renderTarget._textures[0]._webGPUFormat === 'depth24plus-stencil8'
                || renderTarget._textures[0]._webGPUFormat === 'depth32float') {
                renderTarget._colorStates.length = 0;
            }
            else {
                if (renderTarget._colorStates.length === textureNum) {
                    for (let i = renderTarget._colorStates.length - 1; i > -1; i--) {
                        delete renderTarget._colorStates[i].blend;
                        renderTarget._colorStates[i].format = renderTarget._textures[i]._webGPUFormat;
                        blendState && (renderTarget._colorStates[i].blend = blendState);
                    }
                }
                else {
                    renderTarget._colorStates.length = textureNum;
                    for (let i = 0; i < textureNum; i++) {
                        renderTarget._colorStates[i] = {
                            format: renderTarget._textures[i]._webGPUFormat,
                            writeMask: GPUColorWrite.ALL,
                        };
                        blendState && (renderTarget._colorStates[i].blend = blendState);
                    }
                }
            }
            descriptor.fragment.targets = renderTarget._colorStates;
            descriptor.primitive = primitiveState;
            if (renderTarget._textures[0]._webGPUFormat === 'depth16unorm'
                || renderTarget._textures[0]._webGPUFormat === 'depth24plus-stencil8'
                || renderTarget._textures[0]._webGPUFormat === 'depth32float') {
                descriptor.depthStencil = {
                    format: renderTarget._textures[0]._webGPUFormat,
                    depthWriteEnabled: true,
                    depthCompare: 'less',
                };
            }
            else {
                if (depthState)
                    descriptor.depthStencil = depthState;
                else
                    delete descriptor.depthStencil;
            }
            descriptor.layout = layout.layout;
            descriptor.multisample.count = renderTarget._samples;
            let pipeline = device.createRenderPipeline(descriptor);
            this.pipelineCache.set(descKey, pipeline);
            this.pipelineDecCache.set(descKey, descriptor);
            return pipeline;
        }
        getComputePipeline(bindGroups, shaderInstance, kernal) {
            const device = WebGPURenderEngine._instance.getDevice();
            let layout = this.getPipelinelayout(bindGroups);
            const descKey = `${shaderInstance._id}_${layout.id}_${kernal}`;
            if (this.computePipelineCache.has(descKey)) {
                return this.computePipelineCache.get(descKey);
            }
            let descriptor = shaderInstance.getPipelineDescriptor(kernal);
            descriptor.layout = layout.layout;
            let pipeline = device.createComputePipeline(descriptor);
            this.computePipelineCache.set(descKey, pipeline);
            return pipeline;
        }
    }

    class WebGPUGlobalPipeLineCacheInfo {
        constructor() {
            this.globalDefineChangeFlag = new Laya.Vector2();
            this.pipeLineChangeFlag = new Laya.Vector2();
            this.globalDefineData = Laya.LayaGL.unitRenderModuleDataFactory.createDefineDatas();
        }
    }
    function compareCahceFlag(changeFlag, cacheFlag) {
        let needUpdate = false;
        if (changeFlag.x > cacheFlag.x)
            needUpdate = true;
        else if (changeFlag.x === cacheFlag.x) {
            needUpdate = changeFlag.y > cacheFlag.y;
        }
        return needUpdate;
    }
    function coverCahceFlag(coverFlag, oldFlag) {
        let needUpdate = false;
        if (coverFlag.x > oldFlag.x)
            needUpdate = true;
        else if (coverFlag.x === oldFlag.x) {
            needUpdate = coverFlag.y > oldFlag.y;
        }
        if (needUpdate) {
            coverFlag.cloneTo(oldFlag);
        }
        return;
    }
    class OneDrawPassCacheInfo {
        constructor() {
            this.matCacheFlag = new Laya.Vector2(-1, -1);
            this.nodeCacheFlag = new Laya.Vector2(-1, -1);
            this.passDefineCacheFlag = new Laya.Vector2(-1, -1);
            this.geometryStateID = -1;
            this.drawInfos = [];
        }
    }
    class OneDrawCacheInfo {
        constructor() {
            this.pipeLineCacheFlag = new Laya.Vector2(-1, -1);
            this.renderNodeBindGroupCacheFlag = new Laya.Vector2(-1, -1);
            this.matBindGroupCacheFlag = new Laya.Vector2(-1, -1);
        }
    }
    class WebGPURenderDeviceFactory {
        createShaderInstance(shaderProcessInfo, shaderPass) {
            const shaderIns = new WebGPUShaderInstance(shaderPass._owner._owner.name);
            shaderIns._create(shaderProcessInfo, shaderPass);
            if (Laya.Shader3D.debugMode) {
                let defineString = shaderProcessInfo.defineString;
                let is2D = shaderProcessInfo.is2D;
                Laya.ShaderVariantCollection.active.add(shaderPass, defineString, is2D);
            }
            return shaderIns;
        }
        createIndexBuffer(bufferUsage) {
            return new WebGPUIndexBuffer(Laya.BufferTargetType.ELEMENT_ARRAY_BUFFER, bufferUsage);
        }
        createVertexBuffer(bufferUsageType) {
            return new WebGPUVertexBuffer(Laya.BufferTargetType.ARRAY_BUFFER, bufferUsageType);
        }
        createDeviceBuffer(type) {
            return new WebGPUDeviceBuffer(type);
        }
        createDeviceVertexBuffer(type) {
            return new WebGPUVertexBuffer(Laya.BufferTargetType.TRANSFORM_FEEDBACK_BUFFER, Laya.BufferUsage.Dynamic);
        }
        createBufferState() {
            return new WebGPUBufferState();
        }
        createRenderGeometryElement(mode, drawType) {
            return new WebGPURenderGeometry(mode, drawType);
        }
        async createEngine(config, canvas) {
            const gpuConfig = new WebGPUConfig();
            gpuConfig.alphaMode = "opaque";
            gpuConfig.colorSpace = "srgb";
            Laya.TextRenderConfig.premultiplyAlpha = true;
            switch (Laya.Config.powerPreference) {
                case "default":
                    gpuConfig.powerPreference = "high-performance";
                    break;
                default:
                    gpuConfig.powerPreference = Laya.Config.powerPreference;
                    break;
            }
            gpuConfig.deviceDescriptor.requiredFeatures = [
                "depth-clip-control",
                "depth32float-stencil8",
                "texture-compression-bc",
                "texture-compression-etc2",
                "texture-compression-astc",
                "timestamp-query",
                "indirect-first-instance",
                "shader-f16",
                "rg11b10ufloat-renderable",
                "bgra8unorm-storage",
                "float32-filterable",
                "texture-formats-tier1",
                "texture-formats-tier2",
            ];
            if (Laya.Config.isAlpha) {
                gpuConfig.alphaMode = "premultiplied";
            }
            else {
                gpuConfig.alphaMode = "opaque";
            }
            const engine = new WebGPURenderEngine(gpuConfig, canvas.source);
            Laya.LayaGL.renderEngine = engine;
            await engine.initRenderEngine();
            engine.useSPRIV = Laya.Config.useSPRIV;
            if (engine.useSPRIV) {
                console.log("shader is spri-v mode");
            }
            engine.bindGroupCache = new WebGPUBindGroupCache();
            WebGPUBindGroupCache.emptyBindGroup = engine.bindGroupCache.getBindGroup([], null, null, [], 0);
            engine.pipelineCache = new WebGPUPipelineCache();
            Laya.LayaGL.textureContext = engine.getTextureContext();
            WebGPUShaderData.__init__();
            WebGPUUniformBufferBase.device = engine.getDevice();
        }
        createGlobalUniformMap(blockName) {
            let comMap = WebGPURenderDeviceFactory.globalBlockMap[blockName];
            if (!comMap)
                comMap = WebGPURenderDeviceFactory.globalBlockMap[blockName] = new WebGPUCommandUniformMap(blockName);
            return comMap;
        }
        createShaderData(ownerResource) {
            return new WebGPUShaderData();
        }
        createComputeContext() {
            return new WebGPUComputeContext();
        }
        createComputeShader(info) {
            let shader = new WebGPUComputeShaderInstance(info.name);
            shader.compile(info);
            return shader;
        }
    }
    WebGPURenderDeviceFactory.globalBlockMap = {};
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.renderDeviceFactory)
            Laya.LayaGL.renderDeviceFactory = new WebGPURenderDeviceFactory();
    });

    const zeroFlag = new Laya.Vector2(0, 0);
    class WebGPURenderElement2D {
        ;
        get materialShaderData() {
            return this._materialShaderData;
        }
        set materialShaderData(value) {
            if (this._materialShaderData != value) {
                this._materialShaderData = value;
                this._matChangeFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
            }
        }
        get subShader() {
            return this._subShader;
        }
        set subShader(value) {
            if (this._subShader != value) {
                this._subShader = value;
                this._matChangeFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
            }
        }
        get value2DShaderData() {
            return this._value2DShaderData;
        }
        set value2DShaderData(value) {
            if (this._value2DShaderData != value) {
                this._valueChangeFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                let oldCommandMap = this._nodeCommonMap.slice();
                if (this._value2DShaderData) {
                    this.nodeCommonMap = [];
                }
                this._value2DShaderData = value;
                this.nodeCommonMap = oldCommandMap;
            }
        }
        get nodeCommonMap() {
            return this._nodeCommonMap;
        }
        set nodeCommonMap(value) {
            this._valueChangeFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
            if (this._nodeCommonMap.length > 0) {
                this._nodeCommonMap.forEach(element => {
                    if (value.indexOf(element) == -1) {
                        let unifomrMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(element);
                        this._value2DShaderData.removeBindGroupChangeLink(element, unifomrMap._idata);
                    }
                });
                this._nodeCommonMap.length = 0;
            }
            value = value ? value : [];
            value.forEach(element => {
                this._nodeCommonMap.push(element);
                if (this._value2DShaderData) {
                    let unifomrMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(element);
                    let uniformBuffer = this._value2DShaderData.createSubUniformBuffer(element, element, unifomrMap._idata);
                    uniformBuffer && this._value2DUBOs.push(uniformBuffer);
                    this._value2DShaderData.addBindGroupChangeLink(element, unifomrMap._idata);
                    this._value2DShaderData.addBindGroupChangeFlag(element, this._value2DBindGroupChangeFlag, this._value2DBindGroupLayoutFlag);
                    this._value2DShaderData._defineDatas.addChangeFlagInfo(this._value2DDefChangeFlag);
                }
            });
        }
        get globalShaderData() {
            return this._globalShaderData;
        }
        set globalShaderData(value) {
            if (this._globalShaderData == value)
                return;
            let key = "Sprite2DGlobal";
            this._globalShaderData = value;
            let oldData = this._additionShaderData.get(key);
            if (oldData) {
                oldData.removeBindGroupChangeFlag(key, this._value2DBindGroupChangeFlag, this._value2DBindGroupLayoutFlag);
                oldData._defineDatas.removeChangeFlagInfo(this._value2DDefChangeFlag);
                this._additionShaderData.delete(key);
                this._globalUboBuffer = null;
                this._additinalArray.delete(key);
            }
            if (value) {
                this._additionShaderData.set(key, value);
                let unifomrMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(key);
                this._globalUboBuffer = value.createSubUniformBuffer(key, key, unifomrMap._idata);
                value.addBindGroupChangeLink(key, unifomrMap._idata);
                value.addBindGroupChangeFlag(key, this._value2DBindGroupChangeFlag, this._value2DBindGroupLayoutFlag);
                value._defineDatas.addChangeFlagInfo(this._value2DDefChangeFlag);
                this._additinalArray.add(key);
            }
        }
        constructor() {
            this._nodeCommonMap = [];
            this.depthStencilParam = new DepthStencilParam();
            this._geometryID = null;
            this._bindGroupMap = new Map();
            this._materialRenderDataChange = false;
            this._value2DRenderDataChange = false;
            this._passRenderInfo = new Map();
            this._matChangeFlag = new Laya.Vector2();
            this._pipelineChangeFlag = new Laya.Vector2();
            this._valueChangeFlag = new Laya.Vector2();
            this._cacheGeometryStateID = -1;
            this._value2DDefChangeFlag = new Laya.Vector2();
            this._value2DBindGroupChangeFlag = new Laya.Vector2();
            this._value2DBindGroupLayoutFlag = new Laya.Vector2();
            this._value2DUBOs = [];
            this._additionShaderData = new Map();
            this._additinalArray = new Set();
            this.type = 0;
            this.renderStateIsBySprite = true;
        }
        _needUpdatePipeline() {
            this._pipelineChangeFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
        }
        getGlobalShaderData() {
            if (this.owner && this.owner.globalRenderData && this.owner.globalRenderData.globalShaderData)
                return this.owner.globalRenderData.globalShaderData;
            else
                return null;
        }
        _getShaderInstanceDefines(context) {
            const comDef = WebGPURenderElement2D._compileDefine;
            const globalShaderDefines = context._cacheGlobalDefines;
            globalShaderDefines.cloneTo(comDef);
            if (this._value2DShaderData)
                comDef.addDefineDatas(this._value2DShaderData.getDefineData());
            if (this._materialShaderData)
                comDef.addDefineDatas(this._materialShaderData._defineDatas);
            let global = this.getGlobalShaderData();
            if (global) {
                comDef.addDefineDatas(global.getDefineData());
            }
            if (this._additionShaderData.size > 0) {
                this._additionShaderData.forEach(element => {
                    comDef.addDefineDatas(element._defineDatas);
                });
            }
            let passData = context.passData;
            if (passData) {
                comDef.addDefineDatas(passData.getDefineData());
            }
            return comDef;
        }
        _compileShader(context) {
            const comDef = this._getShaderInstanceDefines(context);
            var passes = this._subShader._passes;
            let renderCount = 0;
            for (var j = 0, m = passes.length; j < m; j++) {
                var pass = passes[j];
                if (pass.pipelineMode !== context.pipelineMode || !this.geometry)
                    continue;
                if (this._value2DShaderData)
                    pass.nodeCommonMap = this._nodeCommonMap;
                else
                    pass.nodeCommonMap = null;
                let attributeLocations = this.geometry.bufferState._attriLocArray;
                pass.moduleData.attributeLocations = attributeLocations;
                let passData = pass.moduleData;
                passData.additionShaderData = Array.from(this._additinalArray).sort();
                const shaderInstance = pass.withCompile(comDef, true);
                if (this._drawCacheArray[renderCount]) {
                    let oneInfo = this._drawCacheArray[renderCount];
                    if (oneInfo.shaderInstance != shaderInstance) {
                        oneInfo.shaderChange = true;
                        oneInfo.shaderInstance = shaderInstance;
                    }
                }
                else {
                    let oneInfo = new OneDrawCacheInfo();
                    oneInfo.shaderChange = true;
                    oneInfo.shaderInstance = shaderInstance;
                    this._drawCacheArray[renderCount] = oneInfo;
                }
                renderCount++;
            }
            this._drawCacheArray.length = renderCount;
        }
        _getBlendState(shaderInstance) {
            if (this.renderStateIsBySprite || !this._materialShaderData) {
                if (shaderInstance._shaderPass.statefirst)
                    this.blendState = this._getRenderStateBlendByShader(this._value2DShaderData, shaderInstance);
                else
                    this.blendState = this._getRenderStateBlendByMaterial(this._value2DShaderData);
            }
            else {
                if (shaderInstance._shaderPass.statefirst)
                    this.blendState = this._getRenderStateBlendByShader(this._materialShaderData, shaderInstance);
                else
                    this.blendState = this._getRenderStateBlendByMaterial(this._materialShaderData);
            }
        }
        _getRenderStateBlendByShader(shaderData, shaderInstance) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
            const data = shaderData.getData();
            const renderState = shaderInstance._shaderPass.renderState;
            const blend = (_b = ((_a = renderState.blend) !== null && _a !== void 0 ? _a : data[Laya.Shader3D.BLEND])) !== null && _b !== void 0 ? _b : Laya.RenderState.Default.blend;
            let blendState;
            switch (blend) {
                case Laya.RenderState.BLEND_DISABLE:
                    blendState = WebGPUBlendState.getBlendState(blend, Laya.RenderState.BLENDEQUATION_ADD, Laya.RenderState.BLENDPARAM_ONE, Laya.RenderState.BLENDPARAM_ZERO, Laya.RenderState.BLENDEQUATION_ADD, Laya.RenderState.BLENDPARAM_ONE, Laya.RenderState.BLENDPARAM_ZERO);
                    break;
                case Laya.RenderState.BLEND_ENABLE_ALL:
                    const blendEquation = (_d = ((_c = renderState.blendEquation) !== null && _c !== void 0 ? _c : data[Laya.Shader3D.BLEND_EQUATION])) !== null && _d !== void 0 ? _d : Laya.RenderState.Default.blendEquation;
                    const srcBlend = (_f = ((_e = renderState.srcBlend) !== null && _e !== void 0 ? _e : data[Laya.Shader3D.BLEND_SRC])) !== null && _f !== void 0 ? _f : Laya.RenderState.Default.srcBlend;
                    const dstBlend = (_h = ((_g = renderState.dstBlend) !== null && _g !== void 0 ? _g : data[Laya.Shader3D.BLEND_DST])) !== null && _h !== void 0 ? _h : Laya.RenderState.Default.dstBlend;
                    blendState = WebGPUBlendState.getBlendState(blend, blendEquation, srcBlend, dstBlend, blendEquation, srcBlend, dstBlend);
                    break;
                case Laya.RenderState.BLEND_ENABLE_SEPERATE:
                    const blendEquationRGB = (_k = ((_j = renderState.blendEquationRGB) !== null && _j !== void 0 ? _j : data[Laya.Shader3D.BLEND_EQUATION_RGB])) !== null && _k !== void 0 ? _k : Laya.RenderState.Default.blendEquationRGB;
                    const blendEquationAlpha = (_m = ((_l = renderState.blendEquationAlpha) !== null && _l !== void 0 ? _l : data[Laya.Shader3D.BLEND_EQUATION_ALPHA])) !== null && _m !== void 0 ? _m : Laya.RenderState.Default.blendEquationAlpha;
                    const srcRGB = (_p = ((_o = renderState.srcBlendRGB) !== null && _o !== void 0 ? _o : data[Laya.Shader3D.BLEND_SRC_RGB])) !== null && _p !== void 0 ? _p : Laya.RenderState.Default.srcBlendRGB;
                    const dstRGB = (_r = ((_q = renderState.dstBlendRGB) !== null && _q !== void 0 ? _q : data[Laya.Shader3D.BLEND_DST_RGB])) !== null && _r !== void 0 ? _r : Laya.RenderState.Default.dstBlendRGB;
                    const srcAlpha = (_t = ((_s = renderState.srcBlendAlpha) !== null && _s !== void 0 ? _s : data[Laya.Shader3D.BLEND_SRC_ALPHA])) !== null && _t !== void 0 ? _t : Laya.RenderState.Default.srcBlendAlpha;
                    const dstAlpha = (_v = ((_u = renderState.dstBlendAlpha) !== null && _u !== void 0 ? _u : data[Laya.Shader3D.BLEND_DST_ALPHA])) !== null && _v !== void 0 ? _v : Laya.RenderState.Default.dstBlendAlpha;
                    blendState = WebGPUBlendState.getBlendState(blend, blendEquationRGB, srcRGB, dstRGB, blendEquationAlpha, srcAlpha, dstAlpha);
                    break;
                default:
                    throw 'blendState set error';
            }
            return blendState;
        }
        _getRenderStateBlendByMaterial(shaderData) {
            var _a;
            const data = shaderData.getData();
            const blend = (_a = data[Laya.Shader3D.BLEND]) !== null && _a !== void 0 ? _a : Laya.RenderState.Default.blend;
            let blendState;
            switch (blend) {
                case Laya.RenderState.BLEND_DISABLE:
                    blendState = WebGPUBlendState.getBlendState(blend, Laya.RenderState.BLENDEQUATION_ADD, Laya.RenderState.BLENDPARAM_ONE, Laya.RenderState.BLENDPARAM_ZERO, Laya.RenderState.BLENDEQUATION_ADD, Laya.RenderState.BLENDPARAM_ONE, Laya.RenderState.BLENDPARAM_ZERO);
                    break;
                case Laya.RenderState.BLEND_ENABLE_ALL:
                    let blendEquation = data[Laya.Shader3D.BLEND_EQUATION];
                    blendEquation = blendEquation !== null && blendEquation !== void 0 ? blendEquation : Laya.RenderState.Default.blendEquation;
                    let srcBlend = data[Laya.Shader3D.BLEND_SRC];
                    srcBlend = srcBlend !== null && srcBlend !== void 0 ? srcBlend : Laya.RenderState.Default.srcBlend;
                    let dstBlend = data[Laya.Shader3D.BLEND_DST];
                    dstBlend = dstBlend !== null && dstBlend !== void 0 ? dstBlend : Laya.RenderState.Default.dstBlend;
                    blendState = WebGPUBlendState.getBlendState(blend, blendEquation, srcBlend, dstBlend, blendEquation, srcBlend, dstBlend);
                    break;
                case Laya.RenderState.BLEND_ENABLE_SEPERATE:
                    let blendEquationRGB = data[Laya.Shader3D.BLEND_EQUATION_RGB];
                    blendEquationRGB = blendEquationRGB !== null && blendEquationRGB !== void 0 ? blendEquationRGB : Laya.RenderState.Default.blendEquationRGB;
                    let blendEquationAlpha = data[Laya.Shader3D.BLEND_EQUATION_ALPHA];
                    blendEquationAlpha = blendEquationAlpha !== null && blendEquationAlpha !== void 0 ? blendEquationAlpha : Laya.RenderState.Default.blendEquationAlpha;
                    let srcRGB = data[Laya.Shader3D.BLEND_SRC_RGB];
                    srcRGB = srcRGB !== null && srcRGB !== void 0 ? srcRGB : Laya.RenderState.Default.srcBlendRGB;
                    let dstRGB = data[Laya.Shader3D.BLEND_DST_RGB];
                    dstRGB = dstRGB !== null && dstRGB !== void 0 ? dstRGB : Laya.RenderState.Default.dstBlendRGB;
                    let srcAlpha = data[Laya.Shader3D.BLEND_SRC_ALPHA];
                    srcAlpha = srcAlpha !== null && srcAlpha !== void 0 ? srcAlpha : Laya.RenderState.Default.srcBlendAlpha;
                    let dstAlpha = data[Laya.Shader3D.BLEND_DST_ALPHA];
                    dstAlpha = dstAlpha !== null && dstAlpha !== void 0 ? dstAlpha : Laya.RenderState.Default.dstBlendAlpha;
                    blendState = WebGPUBlendState.getBlendState(blend, blendEquationRGB, srcRGB, dstRGB, blendEquationAlpha, srcAlpha, dstAlpha);
                    break;
                default:
                    throw 'blendState set error';
            }
            return blendState;
        }
        _getDepthStencilState(shaderInstance, dest) {
            if (dest._depthTexture) {
                if (this.renderStateIsBySprite || !this._materialShaderData) {
                    if (shaderInstance._shaderPass.statefirst)
                        this.depthStencilState = this._getRenderStateDepthByShader(this._value2DShaderData, shaderInstance, dest);
                    else
                        this.depthStencilState = this._getRenderStateDepthByMaterial(this._value2DShaderData, dest);
                }
                else {
                    if (shaderInstance._shaderPass.statefirst)
                        this.depthStencilState = this._getRenderStateDepthByShader(this._materialShaderData, shaderInstance, dest);
                    else
                        this.depthStencilState = this._getRenderStateDepthByMaterial(this._materialShaderData, dest);
                }
            }
            else
                this.depthStencilState = null;
        }
        _getRenderStateDepthByShader(shaderData, shaderInstance, dest) {
            getDepthStencilParamFromShader(shaderData, shaderInstance, dest, this.depthStencilParam);
            return WebGPUDepthStencilState.getDepthStencilState(dest.depthStencilFormat, this.depthStencilParam);
        }
        _getRenderStateDepthByMaterial(shaderData, dest) {
            getDepthStencilParamFromMaterial(shaderData, dest, this.depthStencilParam);
            return WebGPUDepthStencilState.getDepthStencilState(dest.depthStencilFormat, this.depthStencilParam);
        }
        _getCullFrontMode(shaderData, shaderInstance, isTarget, invertFront) {
            var _a;
            const renderState = shaderInstance._shaderPass.renderState;
            const data = shaderData.getData();
            let cull = data[Laya.Shader3D.CULL];
            if (shaderInstance._shaderPass.statefirst)
                cull = (_a = renderState.cull) !== null && _a !== void 0 ? _a : cull;
            cull = cull !== null && cull !== void 0 ? cull : Laya.RenderState.Default.cull;
            switch (cull) {
                case Laya.RenderState.CULL_NONE:
                    this.cullMode = Laya.CullMode.Off;
                    if (isTarget !== invertFront)
                        this.frontFace = Laya.FrontFace.CCW;
                    else
                        this.frontFace = Laya.FrontFace.CW;
                    break;
                case Laya.RenderState.CULL_FRONT:
                    this.cullMode = Laya.CullMode.Front;
                    if (isTarget !== invertFront)
                        this.frontFace = Laya.FrontFace.CCW;
                    else
                        this.frontFace = Laya.FrontFace.CW;
                    break;
                case Laya.RenderState.CULL_BACK:
                default:
                    this.cullMode = Laya.CullMode.Back;
                    if (isTarget !== invertFront)
                        this.frontFace = Laya.FrontFace.CCW;
                    else
                        this.frontFace = Laya.FrontFace.CW;
                    break;
            }
        }
        _bindGroup(context, info, command) {
            let shaderInstance = info.shaderInstance;
            {
                command.setBindGroup(0, context._passBindGroup);
            }
            {
                if (this._value2DShaderData) {
                    if (info.shaderChange || this._value2DRenderDataChange || compareCahceFlag(this._value2DBindGroupChangeFlag, info.renderNodeBindGroupCacheFlag)) {
                        info.renderNodeBindGroupCacheFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                        let resource = shaderInstance.uniformSetMap.get(1);
                        let textureExitsMask = shaderInstance.uniformTextureExits.get(1);
                        info.nodeBindGroup = WebGPURenderEngine._instance.bindGroupCache.getBindGroup(this._nodeCommonMap, this._value2DShaderData, this._additionShaderData, resource, textureExitsMask);
                        coverCahceFlag(this._value2DBindGroupLayoutFlag, this._pipelineChangeFlag);
                    }
                }
                else {
                    info.nodeBindGroup = WebGPUBindGroupCache.emptyBindGroup;
                }
                command.setBindGroup(1, info.nodeBindGroup);
            }
            {
                if (this._materialShaderData) {
                    if (info.shaderChange || this._materialRenderDataChange || compareCahceFlag(this._matBindGroupChangeFlag, info.matBindGroupCacheFlag)) {
                        info.matBindGroupCacheFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                        let shaderResource = shaderInstance.uniformSetMap.get(2);
                        let textureExitsMask = shaderInstance.uniformTextureExits.get(2);
                        info.matBindGroup = WebGPURenderEngine._instance.bindGroupCache.getBindGroup([this._subShader._owner.name], this._materialShaderData, null, shaderResource, textureExitsMask);
                        coverCahceFlag(this._matBindGroupLayoutFlag, this._pipelineChangeFlag);
                    }
                }
                else {
                    info.matBindGroup = WebGPUBindGroupCache.emptyBindGroup;
                }
                command.setBindGroup(2, info.matBindGroup);
            }
        }
        _uploadGeometry(command) {
            let triangles = 0;
            triangles += command.applyGeometry(this.geometry);
            return triangles;
        }
        _getWebGPURenderPipeline(shaderInstance, dest, context) {
            this._getBlendState(shaderInstance);
            this._getDepthStencilState(shaderInstance, dest);
            if (this.renderStateIsBySprite || !this._materialShaderData)
                this._getCullFrontMode(this._value2DShaderData, shaderInstance, false, context.invertY);
            else
                this._getCullFrontMode(this._materialShaderData, shaderInstance, false, context.invertY);
            let pipeline = WebGPURenderEngine._instance.pipelineCache.getPipeline(this._bindGroupMap, this, shaderInstance, dest);
            return pipeline;
        }
        _updateMatChangeFlag() {
            this._materialRenderDataChange = compareCahceFlag(this._matChangeFlag, this._drawPassInfo.matCacheFlag);
            if (this._value2DShaderData && compareCahceFlag(this._valueChangeFlag, this._drawPassInfo.nodeCacheFlag)) {
                this._drawPassInfo.nodeCacheFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                this._value2DRenderDataChange = true;
            }
            else {
                this._value2DRenderDataChange = false;
            }
        }
        _handleMatChange() {
            this._drawPassInfo.matCacheFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
            if (this._materialShaderData) {
                let shadername = this._subShader._owner.name;
                if (!WebGPURenderElement2D._matChangeFlagMap.has(shadername))
                    WebGPURenderElement2D._matChangeFlagMap.set(shadername, new Map());
                let shadermap = WebGPURenderElement2D._matChangeFlagMap.get(shadername);
                if (!shadermap.has(this._materialShaderData._id)) {
                    let flagArray = [new Laya.Vector2(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount), new Laya.Vector2(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount), new Laya.Vector2(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount)];
                    shadermap.set(this._materialShaderData._id, flagArray);
                    this._materialShaderData.addBindGroupChangeLink(this._subShader._owner.name, this._subShader._uniformMap);
                    this._materialShaderData.addBindGroupChangeFlag(this._subShader._owner.name, flagArray[0], flagArray[1]);
                    this._materialShaderData._defineDatas.addChangeFlagInfo(flagArray[2]);
                }
                let flagArray = shadermap.get(this._materialShaderData._id);
                this._matBindGroupChangeFlag = flagArray[0];
                this._matBindGroupLayoutFlag = flagArray[1];
                this._matDefChangeFlag = flagArray[2];
                let subShader = this._subShader;
                this._materialUBO = this._materialShaderData.createSubUniformBuffer("Material", subShader._owner.name, subShader._uniformMap);
            }
            else {
                this._matBindGroupChangeFlag = zeroFlag;
                this._matBindGroupLayoutFlag = zeroFlag;
                this._matDefChangeFlag = zeroFlag;
                this._materialUBO = null;
            }
        }
        _updateNodeUBO() {
            if (this._value2DUBOs.length == 1) {
                this._value2DUBOs[0].upload();
            }
            else {
                this._value2DUBOs.forEach(ubo => {
                    ubo.upload();
                });
            }
            if (this._globalUboBuffer)
                this._globalUboBuffer.upload();
        }
        _prepare(context) {
            if (!this._passRenderInfo.has(context._curRenderGlobalKey)) {
                this._drawPassInfo = new OneDrawPassCacheInfo();
                this._passRenderInfo.set(context._curRenderGlobalKey, this._drawPassInfo);
            }
            else {
                this._drawPassInfo = this._passRenderInfo.get(context._curRenderGlobalKey);
            }
            this._drawCacheArray = this._drawPassInfo.drawInfos;
            this._updateMatChangeFlag();
            let globalshaderData = this.getGlobalShaderData();
            if (globalshaderData != this._globalShaderData) {
                this.globalShaderData = globalshaderData;
            }
            if (this.geometry.getStateCacheID() != this._cacheGeometryStateID) {
                this._needUpdatePipeline();
                this._cacheGeometryStateID = this.geometry.getStateCacheID();
            }
            let passDefineChangeFlag = this._drawPassInfo.passDefineCacheFlag;
            if (this._materialRenderDataChange ||
                compareCahceFlag(this._matDefChangeFlag, passDefineChangeFlag) ||
                (this.owner && compareCahceFlag(this._value2DDefChangeFlag, passDefineChangeFlag)) ||
                compareCahceFlag(context._curDefineChangeFlag, passDefineChangeFlag) ||
                this._drawPassInfo.geometryStateID != this._cacheGeometryStateID) {
                passDefineChangeFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
                this._compileShader(context);
                this._drawPassInfo.geometryStateID = this._cacheGeometryStateID;
            }
            if (this._materialRenderDataChange) {
                this._handleMatChange();
            }
            let cehckShaderData;
            if (this.renderStateIsBySprite || !this._materialShaderData) {
                cehckShaderData = this._value2DShaderData;
            }
            else {
                cehckShaderData = this._materialShaderData;
            }
            let cullmode = cehckShaderData.getInt(Laya.Shader3D.CULL);
            cullmode = cullmode ? cullmode : Laya.RenderState.CULL_NONE;
            let depthStencilID = cehckShaderData.depthStencilStateKey;
            let blendid = cehckShaderData.blendStateCache ? cehckShaderData.blendStateCache.id : -1;
            if (this._cacheMatCullMode != cullmode ||
                this._cacheMatDepthStencilID != depthStencilID ||
                this._cacheMatBlendStateID != blendid) {
                this._cacheMatBlendStateID = blendid;
                this._cacheMatDepthStencilID = depthStencilID;
                this._cacheMatCullMode = cullmode;
                this._needUpdatePipeline();
            }
            this._updateNodeUBO();
            this._materialUBO && this._materialUBO.upload();
        }
        _render(context, command) {
            if (this._drawCacheArray && this._drawCacheArray.length == 0)
                return 0;
            if (this._drawCacheArray.length == 1) {
                this._renderByShaderInstance(this._drawCacheArray[0], context, command);
            }
            else {
                for (var j = 0, m = this._drawCacheArray.length; j < m; j++) {
                    this._renderByShaderInstance(this._drawCacheArray[j], context, command);
                }
            }
            return 0;
        }
        _renderByShaderInstance(drawInfo, context, command) {
            let shader = drawInfo.shaderInstance;
            if (!shader.complete || !this.geometry)
                return;
            this._bindGroup(context, drawInfo, command);
            let pipelineCache = drawInfo.pipeLineCacheFlag;
            if (drawInfo.shaderChange ||
                compareCahceFlag(context._pipelineChange, pipelineCache) ||
                compareCahceFlag(this._pipelineChangeFlag, pipelineCache)) {
                this._bindGroupMap.clear();
                this._bindGroupMap.set(0, context._passBindGroup);
                this._bindGroupMap.set(1, drawInfo.nodeBindGroup);
                this._bindGroupMap.set(2, drawInfo.matBindGroup);
                drawInfo.shaderChange = false;
                drawInfo.pipeline = this._getWebGPURenderPipeline(drawInfo.shaderInstance, context._destRT, context);
                drawInfo.pipeLineCacheFlag.setValue(Laya.Stat.loopCount, WebGPURenderEngine._instance._framePassCount);
            }
            command.setPipeline(drawInfo.pipeline);
            this.geometry.applyToEncoder(command);
        }
        destroy() {
            this.globalShaderData = null;
        }
    }
    WebGPURenderElement2D._matChangeFlagMap = new Map();
    WebGPURenderElement2D._compileDefine = new WebDefineDatas();

    class WebGPUPrimitiveRenderElement2D extends WebGPURenderElement2D {
        get primitiveShaderData() {
            return this._primitiveShaderData;
        }
        set primitiveShaderData(value) {
            if (this._primitiveShaderData == value)
                return;
            let primitiveAdditionalKey = "Sprite2DGraphics";
            this._primitiveShaderData = value;
            let oldData = this._additionShaderData.get(primitiveAdditionalKey);
            if (oldData) {
                oldData.removeBindGroupChangeFlag(primitiveAdditionalKey, this._value2DBindGroupChangeFlag, this._value2DBindGroupLayoutFlag);
                oldData._defineDatas.removeChangeFlagInfo(this._value2DDefChangeFlag);
                this._additionShaderData.delete(primitiveAdditionalKey);
                this._sprite2DGraphicUBOs = null;
                this._additinalArray.delete(primitiveAdditionalKey);
            }
            if (value) {
                this._additionShaderData.set(primitiveAdditionalKey, value);
                let unifomrMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(primitiveAdditionalKey);
                this._sprite2DGraphicUBOs = value.createSubUniformBuffer(primitiveAdditionalKey, primitiveAdditionalKey, unifomrMap._idata);
                value.addBindGroupChangeLink(primitiveAdditionalKey, unifomrMap._idata);
                value.addBindGroupChangeFlag(primitiveAdditionalKey, this._value2DBindGroupChangeFlag, this._value2DBindGroupLayoutFlag);
                value._defineDatas.addChangeFlagInfo(this._value2DDefChangeFlag);
                this._additinalArray.add(primitiveAdditionalKey);
            }
        }
        _updateNodeUBO() {
            super._updateNodeUBO();
            if (this._sprite2DGraphicUBOs) {
                this._sprite2DGraphicUBOs.upload();
            }
        }
        constructor() {
            super();
            this.typeKey = 0;
            this.textureKey = 0;
        }
    }

    class WebGPUSetRenderData extends Laya.SetRenderDataCMD {
        get dataType() {
            return this._dataType;
        }
        set dataType(value) {
            this._dataType = value;
        }
        get propertyID() {
            return this._propertyID;
        }
        set propertyID(value) {
            this._propertyID = value;
        }
        get dest() {
            return this._dest;
        }
        set dest(value) {
            this._dest = value;
        }
        get value() {
            return this._value;
        }
        set value(value) {
            switch (this.dataType) {
                case Laya.ShaderDataType.Int:
                case Laya.ShaderDataType.Float:
                case Laya.ShaderDataType.Bool:
                    this.data_number = value;
                    this._value = this.data_number;
                    break;
                case Laya.ShaderDataType.Matrix3x3:
                    !this.data_mat3 && (this.data_mat3 = new Laya.Matrix3x3());
                    value.cloneTo(this.data_mat3);
                    this._value = this.data_mat3;
                    break;
                case Laya.ShaderDataType.Matrix4x4:
                    !this.data_mat4 && (this.data_mat4 = new Laya.Matrix4x4());
                    value.cloneTo(this.data_mat4);
                    this._value = this.data_mat4;
                    break;
                case Laya.ShaderDataType.Color:
                    !this.data_color && (this.data_color = new Laya.Color());
                    value.cloneTo(this.data_color);
                    this._value = this.data_color;
                    break;
                case Laya.ShaderDataType.Texture2D:
                    this._value = this.data_texture = value;
                    break;
                case Laya.ShaderDataType.Vector2:
                    !this.data_v2 && (this.data_v2 = new Laya.Vector2());
                    value.cloneTo(this.data_v2);
                    this._value = this.data_v2;
                    break;
                case Laya.ShaderDataType.Vector3:
                    !this.data_v3 && (this.data_v3 = new Laya.Vector3());
                    value.cloneTo(this.data_v3);
                    this._value = this.data_v3;
                    break;
                case Laya.ShaderDataType.Vector4:
                    !this.data_v4 && (this.data_v4 = new Laya.Vector4());
                    value.cloneTo(this.data_v4);
                    this._value = this.data_v4;
                    break;
                case Laya.ShaderDataType.Buffer:
                    this._value = this.data_buffer = value;
                    break;
            }
        }
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ChangeData;
        }
        apply(context) {
            switch (this.dataType) {
                case Laya.ShaderDataType.Int:
                    this.dest.setInt(this.propertyID, this.value);
                    break;
                case Laya.ShaderDataType.Float:
                    this.dest.setNumber(this.propertyID, this.value);
                    break;
                case Laya.ShaderDataType.Bool:
                    this.dest.setBool(this.propertyID, this.value);
                    break;
                case Laya.ShaderDataType.Matrix3x3:
                    this.dest.setMatrix3x3(this.propertyID, this.value);
                    break;
                case Laya.ShaderDataType.Matrix4x4:
                    this.dest.setMatrix4x4(this.propertyID, this.value);
                    break;
                case Laya.ShaderDataType.Color:
                    this.dest.setColor(this.propertyID, this.value);
                    break;
                case Laya.ShaderDataType.Texture2D:
                    this.dest.setTexture(this.propertyID, this.value);
                    break;
                case Laya.ShaderDataType.Vector2:
                    this.dest.setVector2(this.propertyID, this.value);
                    break;
                case Laya.ShaderDataType.Vector3:
                    this.dest.setVector3(this.propertyID, this.value);
                    break;
                case Laya.ShaderDataType.Vector4:
                    this.dest.setVector(this.propertyID, this.value);
                    break;
                case Laya.ShaderDataType.Buffer:
                    this.dest.setBuffer(this.propertyID, this.value);
                    break;
            }
        }
    }

    class WebGPUSetShaderDefine extends Laya.SetShaderDefineCMD {
        get define() {
            return this._define;
        }
        set define(value) {
            this._define = value;
        }
        get dest() {
            return this._dest;
        }
        set dest(value) {
            this._dest = value;
        }
        get add() {
            return this._add;
        }
        set add(value) {
            this._add = value;
        }
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ChangeShaderDefine;
        }
        apply(context) {
            if (this.add)
                this._dest.addDefine(this.define);
            else
                this._dest.removeDefine(this.define);
        }
    }
    class WebGPUComputeCommandAppatchCMD extends Laya.ComputeCommandAppatchCMD {
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ComputeCommandAppatch;
        }
        apply(context) {
            this.computeContext.executeCMDs();
        }
    }

    class WebGPURender2DProcess {
        createEmptyRenderDataHandle() {
            return new WebEmptyRender2DDataHandle();
        }
        createGraphic2DBufferBlock() {
            return new WebGraphics2DBufferBlock();
        }
        createGraphic2DVertexBlock() {
            return new WebGraphics2DVertexBlock();
        }
        create2DGraphicVertexDataView(wholeBuffer, elementOffset, elementSize, stride) {
            return new Web2DGraphic2DVertexDataView(wholeBuffer, elementOffset, elementSize, stride);
        }
        create2DGraphicIndexDataView(wholeBuffer, elementSize) {
            return new Web2DGraphic2DIndexDataView(wholeBuffer, elementSize);
        }
        create2DGraphicVertexBuffer() {
            return new Web2DGraphicsVertexBuffer();
        }
        create2DGraphicIndexBuffer() {
            return new Web2DGraphicsIndexBuffer();
        }
        createPrimitiveRenderElement2D() {
            return new WebGPUPrimitiveRenderElement2D();
        }
        createRender2DPassManager() {
            return new WebRender2DPassManager();
        }
        create2DGlobalRenderDataHandle() {
            return new WebGlobalRenderData();
        }
        createSpineRenderDataHandle() {
            return new WebSpineRenderDataHandle();
        }
        createRender2DPass() {
            return new WebRender2DPass();
        }
        createRenderStruct2D() {
            return new WebRenderStruct2D();
        }
        create2D2DPrimitiveDataHandle() {
            return new WebPrimitiveDataHandle();
        }
        create2DBaseRenderDataHandle() {
            return new Web2DBaseRenderDataHandle();
        }
        createMesh2DRenderDataHandle() {
            return new WebMesh2DRenderDataHandle();
        }
        createSetRenderDataCMD() {
            return new WebGPUSetRenderData();
        }
        createSetShaderDefineCMD() {
            return new WebGPUSetShaderDefine();
        }
        createBlit2DQuadCMDData() {
            return new WebGPUBlit2DQuadCMD();
        }
        createDraw2DElementCMDData() {
            return new WebGPUDraw2DElementCMD();
        }
        createSetRendertarget2DCMD() {
            return new WebGPUSetRendertarget2DCMD();
        }
        createRenderElement2D() {
            return new WebGPURenderElement2D();
        }
        createRenderContext2D() {
            return new WebGPURenderContext2D();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.render2DRenderPassFactory)
            Laya.LayaGL.render2DRenderPassFactory = new WebGPURender2DProcess();
    });

    class WebGPU_GLSLCommon {
        static replaceStringPart(str, replace, start, end) {
            const beforePart = str.substring(0, start);
            const afterPart = str.substring(end);
            return beforePart + replace + afterPart;
        }
        static findParamInBracket(input, start, bracket = '()') {
            let depth = 0;
            let firstParentIndex = 0;
            const beginBracket = bracket[0];
            const endBracket = bracket[1];
            const length = input.length;
            for (let i = start; i < length; i++) {
                if (input[i] === beginBracket) {
                    firstParentIndex = i;
                    break;
                }
                if (input[i] !== ' ' && input[i] !== '\t' && input[i] !== '\n' && input[i] !== '\r')
                    return null;
            }
            let element;
            let elements = [];
            start = firstParentIndex;
            let currentElementStart = firstParentIndex + 1;
            for (let i = firstParentIndex; i < length; i++) {
                const char = input[i];
                if (char === beginBracket)
                    depth++;
                else if (char === endBracket) {
                    depth--;
                    if (depth === 0) {
                        start = i + 1;
                        element = input.substring(currentElementStart, i).trim();
                        if (element.length > 0)
                            elements.push(element);
                        break;
                    }
                }
                else if (char === ',' && depth === 1) {
                    element = input.substring(currentElementStart, i).trim();
                    if (element.length > 0)
                        elements.push(element);
                    currentElementStart = i + 1;
                }
            }
            const full = input.substring(firstParentIndex, start);
            return {
                full,
                elements,
                index: start
            };
        }
        static replaceArgumentByFunctionCategory(code, variableName, functionNames, replacementInCategory, replacementOutOfCategory) {
            const functionRegex = new RegExp('([\\w]+)\\s*\\(([^)]*)\\)', 'g');
            const updatedCode = code.replace(functionRegex, (match, functionName, argsList) => {
                let args = argsList.split(',').map((arg) => arg.trim());
                const replacement = functionNames.includes(functionName) ? replacementInCategory : replacementOutOfCategory;
                args = args.map((arg) => arg === variableName ? (replacement ? replacement : arg) : arg);
                return `${functionName}(${args.join(', ')})`;
            });
            return updatedCode;
        }
        static removeSpacesInBracket(str, bracket = '()') {
            const length = str.length;
            const beginBracket = bracket[0];
            const endBracket = bracket[1];
            const _process = (index) => {
                let result = '', i = index;
                while (i < length) {
                    const char = str[i];
                    if (char === beginBracket) {
                        const [inner, newIndex] = _process(i + 1);
                        result += beginBracket + inner;
                        i = newIndex;
                    }
                    else if (char === endBracket) {
                        return [result, i - 1];
                    }
                    else {
                        result += char === ' ' && str[i - 1] !== beginBracket && str[i + 1] !== endBracket ? '' : char;
                    }
                    i++;
                }
                return [result, i];
            };
            let result = '', i = 0;
            while (i < length) {
                if (str[i] === beginBracket) {
                    const [inner, newIndex] = _process(i + 1);
                    result += beginBracket + inner;
                    i = newIndex;
                }
                else {
                    result += str[i];
                }
                i++;
            }
            return result;
        }
    }

    const notPutToFuncCall = [
        "int", "float", "bool", "vec2", "vec3", "vec4",
        "bvec2", "bvec3", "bvec4", "ivec2", "ivec3", "ivec4",
        "hvec2", "hvec3", "hvec4", "fvec2", "fvec3", "fvec4",
        "mat2", "mat3", "mat4", "layout",
        "if", "else", "for", "while", "do", "switch",
        "radians", "degrees", "sin", "cos", "tan",
        "asin", "acos", "atan", "sinh", "cosh",
        "tanh", "asinh", "acosh", "atanh",
        "pow", "exp", "log", "exp2", "log2",
        "sqrt", "inversesqrt",
        "abs", "sign", "floor", "trunc", "round",
        "roundEven", "ceil", "fract", "mod", "modf",
        "min", "max", "clamp", "mix", "step",
        "smoothstep", "isnan", "isinf", "floatBitsToInt",
        "floatBitsToUint", "intBitsToFloat", "uintBitsToFloat",
        "length", "distance", "dot", "cross",
        "normalize", "faceforward", "reflect",
        "refract",
        "matrixCompMult", "outerProduct", "determinant",
        "lessThan", "lessThanEqual", "greaterThan",
        "greaterThanEqual", "equal", "notEqual",
        "any", "all", "not",
        "texture", "texture2D", "textureSize", "textureProj",
        "textureLod", "textureOffset", "texelFetch",
        "texelFetchOffset", "textureProjOffset",
        "textureLodOffset", "textureProjLod",
        "textureProjLodOffset", "textureGrad",
        "textureGradOffset", "textureProjGrad",
        "textureProjGradOffset"
    ];
    class WebGPU_GLSLFunction {
        constructor(all) {
            this.params = [];
            this.calls = [];
            this.samplerProcessed = false;
            this.all = all;
            this._getHeadAndBody();
            this._parse();
        }
        _getHeadAndBody() {
            const all = this.all;
            for (let i = 0, len = all.length; i < len; i++) {
                if (all[i] !== '{')
                    continue;
                this.head = all.substring(0, i);
                this.body = all.substring(i);
                break;
            }
            this.head = this.head.replace(/\n/g, '').trim();
            this.body = this.body.replace(/^\s*[\r\n]/gm, '');
        }
        _parse() {
            const headRegex = /((lowp|mediump|highp)\s+)?(\w+)\s+(\w+)\s*\((.*?)\)/;
            const paramRegex = /((lowp|mediump|highp)\s+)?(((?:in|out|inout|const)\s+)+)?([\w]+)\s+([\w]+)\s*(\[\d*\])?/g;
            const headMatch = this.head.match(headRegex);
            if (headMatch) {
                this.precision = headMatch[1] ? headMatch[1].trim() : undefined;
                this.return = headMatch[3].trim();
                this.name = headMatch[4].trim();
                const paramsStr = headMatch[5];
                let paramMatch;
                while ((paramMatch = paramRegex.exec(paramsStr)) !== null) {
                    const [, precision, , inoutFull, , type, name, array] = paramMatch;
                    const inout = inoutFull ? inoutFull.trim() : undefined;
                    const isStruct = !WebGPU_GLSLFunction.variableType.includes(type);
                    const isArray = array !== undefined;
                    let arrayLength = undefined;
                    if (isArray)
                        arrayLength = parseInt(array.replace(/\D/g, ''));
                    this.params.push({
                        name,
                        type,
                        inout,
                        precision,
                        isArray,
                        arrayLength,
                        isStruct
                    });
                }
            }
            this._findFunctionCalls(this.body);
            this.head = `${this.return} ${this.name}(`;
            this.head += this.params.map(param => {
                let str = '';
                if (param.inout)
                    str += `${param.inout} `;
                str += `${param.type} ${param.name}`;
                if (param.isArray)
                    str += `[${param.arrayLength}]`;
                return str;
            }).join(', ');
            this.head += ')';
        }
        _findFunctionCalls(glslCode) {
            const regex = /(\b\w+\b)\s*\(([^()]*\([^()]*\)[^()]*)*([^()]*)\)/gs;
            let matches;
            while ((matches = regex.exec(glslCode)) !== null) {
                const name = matches[1];
                const args = matches[0].slice(name.length).trim();
                if (!notPutToFuncCall.includes(name)) {
                    const param = WebGPU_GLSLCommon.findParamInBracket(args, 0);
                    if (param) {
                        this.calls.push({
                            name,
                            params: param.elements
                        });
                    }
                }
                if (args.includes('('))
                    this._findFunctionCalls(args);
            }
        }
        processSampler(textureNames) {
            if (!this.samplerProcessed) {
                this.samplerProcessed = true;
                this.samplerParams = [];
                this.samplerBody = this.body;
                for (let i = 0, len = this.params.length; i < len; i++) {
                    const param = this.params[i];
                    if (param.type.includes('sampler')) {
                        let samplerType = 'sampler';
                        let textureType = param.type.replace('sampler', 'texture');
                        if (textureType === 'texture2DShadow') {
                            textureType = 'texture2D';
                            samplerType = 'samplerShadow';
                        }
                        const textureName = param.name + '_texture';
                        const samplerName = param.name + '_sampler';
                        const textureParam = {
                            name: textureName,
                            type: textureType,
                            inout: param.inout,
                            precision: param.precision,
                            isArray: param.isArray,
                            arrayLength: param.arrayLength,
                            isStruct: param.isStruct
                        };
                        const samplerParam = {
                            name: samplerName,
                            type: samplerType,
                            inout: param.inout,
                            precision: param.precision,
                            isArray: param.isArray,
                            arrayLength: param.arrayLength,
                            isStruct: param.isStruct
                        };
                        this.samplerParams.push(textureParam, samplerParam);
                        let functionNames;
                        let replacementInCategory;
                        let replacementOutOfCategory;
                        if (param.type === 'sampler2D') {
                            functionNames = ['texture', 'texture2D'];
                            replacementInCategory = `sampler2D(${textureName}, ${samplerName})`;
                        }
                        else if (param.type === 'samplerCube') {
                            functionNames = ['texture', 'textureCube'];
                            replacementInCategory = `samplerCube(${textureName}, ${samplerName})`;
                        }
                        else if (param.type === 'sampler2DShadow') {
                            functionNames = ['textureLod', 'texture'];
                            replacementInCategory = `sampler2DShadow(${textureName}, ${samplerName})`;
                        }
                        replacementOutOfCategory = `${textureName}, ${samplerName}`;
                        this.samplerBody = WebGPU_GLSLCommon.replaceArgumentByFunctionCategory(this.samplerBody, param.name, functionNames, replacementInCategory, replacementOutOfCategory);
                    }
                    else {
                        this.samplerParams.push(param);
                    }
                }
                const functionNames = ['texture', 'texture2D', 'textureCube', 'textureLod'];
                for (let i = 0; i < textureNames.length; i++) {
                    const replacementInCategory = null;
                    const replacementOutOfCategory = `${textureNames[i]}Texture, ${textureNames[i]}Sampler`;
                    this.samplerBody = WebGPU_GLSLCommon.replaceArgumentByFunctionCategory(this.samplerBody, textureNames[i], functionNames, replacementInCategory, replacementOutOfCategory);
                }
                this.samplerOutput = `${this.return} ${this.name}(`;
                this.samplerOutput += this.samplerParams.map(param => {
                    let str = '';
                    if (param.inout)
                        str += `${param.inout} `;
                    str += `${param.type} ${param.name}`;
                    if (param.isArray)
                        str += `[${param.arrayLength}]`;
                    return str;
                }).join(', ');
                this.samplerOutput += ')\n';
                this.samplerOutput += this.samplerBody;
            }
        }
    }
    WebGPU_GLSLFunction.variableType = ['float', 'int', 'void', 'bool', 'vec2', 'vec3', 'vec4', 'mat2', 'mat3', 'mat4'];

    class WebGPU_GLSLMacro {
        constructor(all) {
            this.all = all;
            this._parse();
        }
        _parse() {
            let macro = this.all.replace(/^#\s*define\s+/, '').trim();
            macro = WebGPU_GLSLCommon.removeSpacesInBracket(macro);
            const index = macro.indexOf(' ');
            if (index === -1) {
                this.name = macro;
            }
            else {
                const firstPart = macro.slice(0, index);
                let lastPart = macro.slice(index + 1).trim();
                if (lastPart.length === 0)
                    lastPart = undefined;
                const paramStartIndex = firstPart.indexOf('(');
                if (paramStartIndex !== -1) {
                    const paramEndIndex = firstPart.indexOf(')', paramStartIndex);
                    this.name = firstPart.slice(0, paramStartIndex).trim();
                    this.params = firstPart.slice(paramStartIndex + 1, paramEndIndex).split(',').map(param => param.trim());
                    this.replace = lastPart;
                }
                else {
                    this.name = firstPart;
                    this.replace = lastPart;
                }
            }
        }
        replaceMacros(glslCode) {
            let match, outCode = glslCode;
            const regex = new RegExp(`\\b${this.name}\\b`, 'g');
            if (this.params && this.params.length > 0) {
                while ((match = regex.exec(outCode)) !== null) {
                    const param = WebGPU_GLSLCommon.findParamInBracket(outCode, match.index + this.name.length);
                    if (param) {
                        let replace = this.replace;
                        for (let i = 0; i < this.params.length; i++)
                            replace = replace.replace(new RegExp(this.params[i], 'g'), param.elements[i]);
                        outCode = WebGPU_GLSLCommon.replaceStringPart(outCode, replace, match.index, param.index);
                    }
                }
            }
            else
                outCode = outCode.replace(regex, this.replace);
            return outCode;
        }
    }

    class WebGPU_GLSLStruct {
        constructor(all) {
            this.fields = [];
            this.all = all;
            this._parse(all);
        }
        _parse(all) {
            const headRegex = /struct\s+(\w+)\s*\{/;
            const fieldRegex = /((lowp|mediump|highp)\s+)?([\w]+)\s+([\w]+)\s*(\[\d*\])?;/g;
            const headerMatch = headRegex.exec(all);
            this.name = headerMatch[1];
            let match;
            while ((match = fieldRegex.exec(all)) !== null) {
                const [, precision, , type, name, array] = match;
                const isArray = array !== undefined;
                let arrayLength = undefined;
                if (isArray)
                    arrayLength = parseInt(array.replace(/\D/g, ''));
                this.fields.push({
                    name,
                    type,
                    precision,
                    isArray,
                    arrayLength
                });
            }
        }
        getArrayField(name, isArray = false) {
            for (let i = this.fields.length - 1; i > -1; i--)
                if (this.fields[i].name === name && this.fields[i].isArray === isArray)
                    return this.fields[i];
            return undefined;
        }
    }

    class WebGPU_GLSLUniform {
        constructor(all) {
            this.all = all;
            this._parse(all);
        }
        _parse(all) {
            const fieldRegex = /((lowp|mediump|highp)\s+)?(\w+)\s+(\w+)\s*(\[(\d+)\])?;/g;
            let fieldMatch;
            if ((fieldMatch = fieldRegex.exec(all)) !== null) {
                const [, precision, , type, name, , array] = fieldMatch;
                const isArray = array !== undefined;
                let arrayLength = undefined;
                if (isArray)
                    arrayLength = parseInt(array.replace(/\D/g, ''));
                this.fields = {
                    type,
                    name,
                    precision,
                    isArray,
                    arrayLength
                };
                this.name = name;
            }
        }
    }

    class WebGPU_GLSLProcess {
        constructor() {
            this.glInter = [];
            this.globals = [];
            this.macros = [];
            this.structs = [];
            this.uniforms = [];
            this.functions = [];
            this.textureNames = [];
            this.glslCode = '';
            this.haveVertexID = false;
        }
        process(glslCode, textureNames) {
            this.textureNames = textureNames;
            this._removeComments(glslCode);
            this._extractMacros(this.glslCode);
            this._extractInternals(this.glslCode);
            this._extractFunctions(this.glslCode);
            this._extractStructs(this.glslCode);
            this._extractGlobals(this.glslCode);
            this._findUsedFunctions();
            for (let i = 0; i < this.functions.length; i++)
                this.functions[i].processSampler(textureNames);
            {
                const paramIsSampler = (param) => {
                    return param.type.indexOf('sampler') !== -1 || param.type.indexOf('texture') !== -1;
                };
                const functionHasSamplerParams = (fn) => {
                    for (let i = 0, len = fn.params.length; i < len; i++) {
                        if (paramIsSampler(fn.params[i])) {
                            return true;
                        }
                    }
                    return false;
                };
                this.functions.forEach(fn => {
                    if (functionHasSamplerParams(fn)) {
                        this.functions.forEach(fn2 => {
                            fn2.calls.forEach(call => {
                                if (call.name == fn.name) {
                                    let body = fn2.samplerProcessed ? fn2.samplerOutput : fn2.body;
                                    const regex = /(\b\w+\b)\s*\(([^()]*\([^()]*\)[^()]*)*([^()]*)\)/gs;
                                    const rep = (match, p0, p1, p2) => {
                                        if (p0 == call.name) {
                                            fn.params.forEach((p, i) => {
                                                if (paramIsSampler(p)) {
                                                    p2 = p2.replace(call.params[i], `${call.params[i]}_Texture, ${call.params[i]}_Sampler`);
                                                }
                                            });
                                            return `${p0}(${p2})`;
                                        }
                                        else {
                                            return match;
                                        }
                                    };
                                    if (fn2.samplerProcessed) {
                                        fn2.samplerOutput = body.replace(regex, rep);
                                    }
                                    else {
                                        fn2.body = body.replace(regex, rep);
                                    }
                                }
                            });
                        });
                    }
                });
            }
            this._outputGLSL();
        }
        getUniforms(glslCode) {
            this._extractMacros(glslCode);
            for (let i = 0; i < 3; i++)
                this._replaceMacros(this.glslCode);
            this._extractUniforms(this.glslCode);
            return this.uniforms;
        }
        _removeComments(glslCode) {
            let result = '';
            let isInSingleLineComment = false;
            let isInMultiLineComment = false;
            let char;
            let next;
            for (let i = 0, len = glslCode.length; i < len; i++) {
                char = glslCode[i];
                next = glslCode[i + 1];
                if (!isInSingleLineComment && char === '/' && next === '*') {
                    isInMultiLineComment = true;
                    i++;
                    continue;
                }
                if (isInMultiLineComment && char === '*' && next === '/') {
                    isInMultiLineComment = false;
                    i++;
                    continue;
                }
                if (!isInMultiLineComment && char === '/' && next === '/') {
                    isInSingleLineComment = true;
                    i++;
                    continue;
                }
                if (isInSingleLineComment && (char === '\n' || char === '\r'))
                    isInSingleLineComment = false;
                if (!isInSingleLineComment && !isInMultiLineComment)
                    result += char;
            }
            this.glslCode = result;
        }
        _removeSpaces(glslCode) {
            let result = '';
            let inString = false;
            let isSpace = false;
            let stringDelimiter = '';
            let prev = '';
            let next = '';
            let char;
            for (let i = 0, len = glslCode.length; i < len; i++) {
                char = glslCode[i];
                if ((char === '"' || char === '\'') && prev !== '\\') {
                    if (!inString) {
                        inString = true;
                        stringDelimiter = char;
                    }
                    else if (char === stringDelimiter)
                        inString = false;
                }
                if (inString)
                    result += char;
                else {
                    isSpace = char === ' ' || char === '\t';
                    if (isSpace) {
                        next = glslCode[i + 1];
                        if (!/[a-zA-Z0-9_]/.test(prev))
                            continue;
                        if (!/[a-zA-Z0-9_]/.test(next))
                            continue;
                    }
                    result += char;
                }
                if (char !== ' ' || inString)
                    prev = char;
            }
            this.glslCode = result.replace(/^\s*[\r\n]/gm, '');
        }
        _extractMacros(glslCode) {
            const regex = /^\s*#\s*define\s+/;
            const lines = glslCode.split('\n');
            const remove = [];
            let currentMacro = '';
            for (let i = 0, len = lines.length; i < len; i++) {
                const line = lines[i].trim();
                if (line.length === 0)
                    continue;
                if (currentMacro.length > 0 || regex.test(line)) {
                    if (line.endsWith('\\')) {
                        currentMacro += line.slice(0, -1) + ' ';
                        remove.push(i);
                    }
                    else {
                        currentMacro += line;
                        this.macros.push(new WebGPU_GLSLMacro(currentMacro));
                        currentMacro = '';
                        remove.push(i);
                    }
                }
            }
            for (let i = remove.length - 1; i > -1; i--)
                lines.splice(remove[i], 1);
            this.glslCode = lines.join('\n');
        }
        _replaceMacros(glslCode) {
            for (let i = 0, len = this.macros.length; i < len; i++)
                glslCode = this.macros[i].replaceMacros(glslCode);
            this.glslCode = glslCode;
        }
        _extractInternals(glslCode) {
            const regex = /\b(gl_VertexID|gl_FragColor|gl_Position)/g;
            let match;
            while ((match = regex.exec(glslCode)) !== null) {
                const res = match[0].trim();
                if (this.glInter.indexOf(res) === -1)
                    this.glInter.push(res);
            }
            if (this.glInter.indexOf('gl_VertexID') !== -1) {
                this.globals.push('int gl_VertexID;');
                this.haveVertexID = true;
            }
        }
        _extractGlobals(glslCode) {
            const regex = /\b(?:const\s+)?(float|int|bool|vec[234]|mat[234]x?[234]?)(\s+\w+)(\[(\d+)\])?(\s*=\s*[^;]+)?;/g;
            let match;
            while ((match = regex.exec(glslCode)) !== null)
                this.globals.push(match[0].trim());
            this.glslCode = glslCode.replace(regex, '');
        }
        _extractStructs(glslCode) {
            const regex = /struct\s+(\w+)\s*\{\s*([^}]+)\s*\}\s*;/gm;
            let match;
            while ((match = regex.exec(glslCode)) !== null)
                this.structs.push(new WebGPU_GLSLStruct(match[0].trim()));
            this.glslCode = glslCode.replace(regex, '');
        }
        _extractUniforms(glslCode) {
            const regex = /\buniform\s+(lowp|mediump|highp)?\s+(\w+)\s+(\w+)\s*;/gm;
            let match;
            while ((match = regex.exec(glslCode)) !== null)
                this.uniforms.push(new WebGPU_GLSLUniform(match[0].trim()));
            this.glslCode = glslCode.replace(regex, '');
        }
        _extractFunctions(glslCode) {
            const functions = this.functions;
            let depth = 0;
            let lineStart = -1;
            let commentMode = '';
            for (let i = 0, len = glslCode.length; i < len; i++) {
                const char = glslCode[i];
                const nextChar = glslCode[i + 1];
                if (commentMode === '') {
                    if (char === '/' && nextChar === '/') {
                        commentMode = '//';
                        i++;
                        continue;
                    }
                    else if (char === '/' && nextChar === '*') {
                        commentMode = '/*';
                        i++;
                        continue;
                    }
                }
                if (commentMode === '//') {
                    if (char === '\n')
                        commentMode = '';
                    continue;
                }
                else if (commentMode === '/*') {
                    if (char === '*' && nextChar === '/') {
                        commentMode = '';
                        i++;
                    }
                    continue;
                }
                if (commentMode !== '')
                    continue;
                if (char === '{' && depth === 0) {
                    let j = i - 1;
                    while (j >= 0 && /\s/.test(glslCode[j]))
                        j--;
                    if (glslCode[j] === ')') {
                        while (j >= 0 && glslCode[j] !== '(')
                            j--;
                        if (j > 0)
                            j--;
                        while (j >= 0 && /\s/.test(glslCode[j]))
                            j--;
                        let k = j;
                        while (k >= 0 && !/\s/.test(glslCode[k]))
                            k--;
                        let returnTypeStart = k;
                        while (returnTypeStart >= 0 && /\s/.test(glslCode[returnTypeStart]))
                            returnTypeStart--;
                        let returnTypeEnd = returnTypeStart;
                        while (returnTypeEnd >= 0 && !/\s/.test(glslCode[returnTypeEnd]))
                            returnTypeEnd--;
                        lineStart = returnTypeEnd + 1;
                    }
                }
                if (char === '{')
                    depth++;
                else if (char === '}' && depth > 0) {
                    depth--;
                    if (depth === 0 && lineStart >= 0) {
                        functions.push(new WebGPU_GLSLFunction(glslCode.substring(lineStart, i + 1).trim()));
                        lineStart = -1;
                    }
                }
            }
            for (let i = 0, len = this.functions.length; i < len; i++)
                glslCode = glslCode.replace(this.functions[i].all, '');
            this.glslCode = glslCode;
        }
        _findUsedFunctions() {
            const funcUsedNew = [];
            const funcUsedSet = new Set();
            const _findFunc = (func) => {
                for (let i = 0, len = func.calls.length; i < len; i++) {
                    const call = func.calls[i];
                    for (let j = 0, len = this.functions.length; j < len; j++) {
                        const func = this.functions[j];
                        if (func.name === call.name) {
                            const params = call.params;
                            const funcParams = func.params;
                            if (funcParams.length !== params.length)
                                continue;
                            if (!funcUsedSet.has(j)) {
                                funcUsedNew.push(j);
                                funcUsedSet.add(j);
                            }
                        }
                    }
                }
            };
            funcUsedSet.add(this.functions.length - 1);
            _findFunc(this.functions[this.functions.length - 1]);
            while (funcUsedNew.length > 0) {
                const fn = funcUsedNew.slice();
                funcUsedNew.length = 0;
                for (let i = 0, len = fn.length; i < len; i++)
                    _findFunc(this.functions[fn[i]]);
            }
            for (let i = this.functions.length - 1; i > -1; i--)
                if (!funcUsedSet.has(i))
                    this.functions.splice(i, 1);
        }
        _outputGLSL() {
            let output = '';
            for (let i = 0, len = this.globals.length; i < len; i++)
                output += this.globals[i] + '\n';
            output += '\n';
            for (let i = 0, len = this.structs.length; i < len; i++)
                output += this.structs[i].all + '\n\n';
            for (let i = 0, len = this.functions.length; i < len; i++) {
                if (!this.functions[i].samplerProcessed) {
                    output += this.functions[i].head + '\n';
                    output += this.functions[i].body + '\n\n';
                }
                else {
                    output += this.functions[i].samplerOutput + '\n\n';
                }
            }
            this.glslCode = output;
        }
        _getVariable(name, isArray = false) {
            for (let i = this.structs.length - 1; i > -1; i--) {
                const ret = this.structs[i].getArrayField(name, isArray);
                if (ret !== undefined)
                    return ret;
            }
            return undefined;
        }
        debugInfo() {
            for (let i = 0, len = this.functions.length; i < len; i++)
                console.log(this.functions[i]);
        }
    }

    class WebGPURenderBundle extends WebGPURenderEncoder {
        static getBundleDescriptor(rt) {
            if (WebGPURenderBundle.bundleDescriptorMap.has(rt.stateCacheID)) {
                return WebGPURenderBundle.bundleDescriptorMap.get(rt.stateCacheID);
            }
            else {
                rt._textures;
                let desc = {
                    colorFormats: []
                };
                const colorFormats = desc.colorFormats;
                colorFormats.length = rt._textures.length;
                for (let i = 0, len = rt._textures.length; i < len; i++) {
                    if (rt._textures[0]._webGPUFormat === 'depth16unorm'
                        || rt._textures[0]._webGPUFormat === 'depth24plus-stencil8'
                        || rt._textures[0]._webGPUFormat === 'depth32float') {
                        colorFormats[i] = rt._depthTexture._webGPUFormat;
                    }
                    else
                        colorFormats[i] = rt._textures[i]._webGPUFormat;
                }
                if (rt._textures[0]._webGPUFormat === 'depth16unorm'
                    || rt._textures[0]._webGPUFormat === 'depth24plus-stencil8'
                    || rt._textures[0]._webGPUFormat === 'depth32float') {
                    desc.depthStencilFormat = rt._textures[0]._webGPUFormat;
                }
                else
                    desc.depthStencilFormat = rt._depthTexture ? rt._depthTexture._webGPUFormat : undefined;
                desc.sampleCount = rt._samples;
                WebGPURenderBundle.bundleDescriptorMap.set(rt.stateCacheID, desc);
                return desc;
            }
        }
        constructor() {
            super(true);
            this.createMask = -1;
            this._engine = WebGPURenderEngine._instance;
            this._device = this._engine.getDevice();
        }
        isNeedReCreate(resourceUpdateMask) {
            return resourceUpdateMask >= this.createMask;
        }
        startRender(destRT, lable, depthReadOnly, stencilReadOnly) {
            let descriptor = WebGPURenderBundle.getBundleDescriptor(destRT);
            descriptor.label = lable;
            this.encoder = this._device.createRenderBundleEncoder(descriptor);
        }
        finish(lable) {
            this.onFinish();
            this._gpuBundle = this.encoder.finish({ label: lable });
        }
        destroy() {
            this.encoder = null;
            this.createMask = -1;
        }
    }
    WebGPURenderBundle.bundleDescriptorMap = new Map();

    class WebGPURenderBundleManager {
        constructor() {
            this.elementsMaxPerBundleStatic = 100;
            this.elementsMaxPerBundleDynamic = 30;
            this.bundles = [];
            this._triangles = 0;
            this._elementsMap = new Map();
            this._renderBundles = [];
            this._needUpdateRenderBundles = false;
        }
        renderBundles(passEncoder) {
        }
        has(elementId) {
        }
        getBundle(elementId) {
        }
        createBundle(context, elements, shotRateSet) {
        }
        removeBundle(bundle) {
        }
        removeBundleByElement(elementId) {
        }
        clearBundle() {
            this.bundles.forEach(bundle => bundle.destroy());
            this.bundles.length = 0;
            this._elementsMap.clear();
            this._needUpdateRenderBundles = true;
        }
        clearShot() {
        }
        removeLowShotBundle() {
        }
        destroy() {
            this.clearBundle();
        }
    }

    class WebGPURenderBundleManagerSet {
        constructor() {
            this.bundleManager = new WebGPURenderBundleManager();
            this.elementsToBundleStatic = [];
            this.elementsToBundleDynamic = [];
        }
        clearBundle() {
            this.bundleManager.clearBundle();
            this.elementsToBundleStatic.length = 0;
            this.elementsToBundleDynamic.length = 0;
        }
    }

    class WebGPUResourceRecover {
        constructor() {
            this._recoverList = [];
        }
        needRecover(res) {
            this._recoverList.push(res);
            this._frameCount = Laya.Laya.timer.currFrame;
        }
        recover() {
            if (this._frameCount < Laya.Laya.timer.currFrame) {
                for (let i = this._recoverList.length - 1; i > -1; i--)
                    this._recoverList[i]._source.destroy();
                this._recoverList.length = 0;
            }
        }
    }

    class WebGPUTimingHelper {
        constructor(device) {
            this._resultBufferPool = [];
            this._state = 'free';
            this._device = device;
            this._canTimestamp = device.features.has('timestamp-query');
            if (this._canTimestamp) {
                this._querySet = device.createQuerySet({
                    type: 'timestamp',
                    count: 2,
                });
                this._resolveBuffer = device.createBuffer({
                    label: 'queryResolve',
                    size: this._querySet.count * 8,
                    usage: GPUBufferUsage.QUERY_RESOLVE | GPUBufferUsage.COPY_SRC,
                });
            }
        }
        _beginTimestampPass(encoder, fnName, descriptor) {
            if (this._canTimestamp && this._state === 'free') {
                this._state = 'need resolve';
                const pass = encoder[fnName](Object.assign(Object.assign({}, descriptor), { timestampWrites: {
                        querySet: this._querySet,
                        beginningOfPassWriteIndex: 0,
                        endOfPassWriteIndex: 1,
                    } }));
                const resolve = () => this._resolveTiming(encoder);
                const origEnd = pass.end;
                pass.end = function () {
                    origEnd.call(this);
                    resolve();
                    return undefined;
                };
                return pass;
            }
            else {
                return encoder[fnName](descriptor);
            }
        }
        beginRenderPass(encoder, descriptor) {
            return this._beginTimestampPass(encoder, 'beginRenderPass', descriptor);
        }
        beginComputePass(encoder, descriptor) {
            return this._beginTimestampPass(encoder, 'beginComputePass', descriptor);
        }
        _resolveTiming(encoder) {
            if (this._canTimestamp && this._state === 'need resolve') {
                this._state = 'wait for result';
                this._resultBuffer = this._resultBufferPool.pop() || this._device.createBuffer({
                    label: 'queryResult',
                    size: this._resolveBuffer.size,
                    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
                });
                encoder.resolveQuerySet(this._querySet, 0, this._querySet.count, this._resolveBuffer, 0);
                encoder.copyBufferToBuffer(this._resolveBuffer, 0, this._resultBuffer, 0, this._resultBuffer.size);
            }
        }
        async getResult() {
            if (this._canTimestamp && this._state === 'wait for result') {
                this._state = 'mapped';
                const resultBuffer = this._resultBuffer;
                await resultBuffer.mapAsync(GPUMapMode.READ);
                const times = new BigInt64Array(resultBuffer.getMappedRange());
                const duration = Number(times[1] - times[0]);
                resultBuffer.unmap();
                this._state = 'free';
                this._resultBufferPool.push(resultBuffer);
                return duration;
            }
            return -1;
        }
        isFree() {
            return this._state === 'free';
        }
    }

    class WebGPUShaderDefine {
        static findNumberDefine(code, map) {
            const pattern = /^\s*#define\s+(\w+)\s+([1-9]\d*)(?=\s*($|\/\/))/gm;
            if (!map)
                map = new Map();
            let match;
            while ((match = pattern.exec(code)) !== null) {
                map.set(match[1], match[2]);
            }
            return map;
        }
    }

    class WebGPUShaderCompileUtil {
        static checkDef(node, _defs) {
            if (null == _defs)
                return;
            let arr = node.defParam;
            if (arr) {
                for (let i = 0, len = arr.length; i < len; i++) {
                    let str = arr[i];
                    if ("#ifdef" == node.name || '#ifndef' == node.name) {
                        _defs.add(str);
                    }
                    else {
                        while (true) {
                            let ofs = str.indexOf("defined");
                            if (0 <= ofs) {
                                ofs = str.indexOf("(");
                                if (0 < ofs) {
                                    let ofs2 = str.indexOf(")");
                                    _defs.add(str.substring(ofs + 1, ofs2).trim());
                                    str = str.substring(ofs2 + 1);
                                }
                                else {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
            }
        }
        static extractMacros(code) {
            const regex = /^\s*#\s*define\s+/;
            const lines = code.split('\n');
            const macros = [];
            let currentMacro = '';
            for (let i = 0, len = lines.length; i < len; i++) {
                const line = lines[i].trim();
                if (line.length === 0)
                    continue;
                if (currentMacro.length > 0 || regex.test(line)) {
                    if (line.endsWith('\\')) {
                        currentMacro += line.slice(0, -1) + ' ';
                    }
                    else {
                        currentMacro += line;
                        macros.push(new WebGPU_GLSLMacro(currentMacro));
                        currentMacro = '';
                    }
                }
            }
            return macros;
        }
        static macrosToVariable(macros) {
            const regex = /^([_a-zA-Z][_a-zA-Z0-9]*)$/;
            const variable = new Set();
            for (let i = macros.length - 1; i > -1; i--) {
                let name = macros[i].replace;
                if (name) {
                    const ofs = name.indexOf('.');
                    if (ofs >= 0) {
                        name = name.substring(0, ofs).trim();
                        if (name.match(regex))
                            variable.add(name);
                    }
                    else if (name.match(regex))
                        variable.add(name);
                }
            }
            return variable;
        }
        static toScript(root, def, outData) {
            if (null == def)
                def = {};
            let out = this._parseChilds(root, def);
            const macros = this.extractMacros(out);
            const mvariable = this.macrosToVariable(macros);
            if (outData) {
                let st = WebGPUShaderCompileCode.compile(out);
                let uniform = st.uniform;
                let varying = st.varying;
                let attribute = st.attribute;
                let variable = st.variable;
                if (variable) {
                    if (uniform) {
                        for (let k in uniform) {
                            if (variable.has(k) || mvariable.has(k)) {
                                if (null == outData.uniform)
                                    outData.uniform = {};
                                outData.uniform[k] = uniform[k];
                            }
                        }
                    }
                    if (varying) {
                        for (let k in varying) {
                            if (variable.has(k) || mvariable.has(k)) {
                                if (null == outData.varying)
                                    outData.varying = {};
                                outData.varying[k] = varying[k];
                            }
                        }
                    }
                    if (attribute) {
                        for (let k in attribute) {
                            if (variable.has(k) || mvariable.has(k)) {
                                if (null == outData.attribute)
                                    outData.attribute = {};
                                outData.attribute[k] = attribute[k];
                            }
                        }
                    }
                }
                outData.variable = variable;
            }
            out = this.removeUniform(out);
            out = this.removeVarying(out);
            return out;
        }
        static removeUniform(code) {
            let arr = code.split("\n");
            let isParentRemove = false;
            let isUniformStruct = false;
            let isModify = false;
            for (let i = 0, len = arr.length; i < len; i++) {
                let cstr = arr[i].trim();
                if ('' == cstr) {
                    arr.splice(i, 1);
                    len -= 1;
                    i -= 1;
                }
                else if (0 == cstr.indexOf("uniform ")) {
                    isParentRemove = true;
                    arr.splice(i, 1);
                    len -= 1;
                    i -= 1;
                    isModify = true;
                    if (0 < cstr.indexOf("{")) {
                        isUniformStruct = true;
                    }
                }
                else {
                    if (isParentRemove && !isUniformStruct) {
                        if (0 == cstr.indexOf("{")) {
                            isUniformStruct = true;
                            arr.splice(i, 1);
                            len -= 1;
                            i -= 1;
                        }
                    }
                    else if (isUniformStruct) {
                        if (0 <= cstr.indexOf("}")) {
                            isUniformStruct = false;
                        }
                        arr.splice(i, 1);
                        len -= 1;
                        i -= 1;
                    }
                    isParentRemove = false;
                }
            }
            if (isModify)
                code = arr.join('\n');
            return code;
        }
        static removeVarying(code) {
            let arr = code.split("\n");
            let isModify = false;
            for (let i = 0, len = arr.length; i < len; i++) {
                let cstr = arr[i].trim();
                if ('' == cstr) {
                    arr.splice(i, 1);
                    len -= 1;
                    i -= 1;
                }
                else if (0 == cstr.indexOf("varying ")) {
                    arr.splice(i, 1);
                    len -= 1;
                    i -= 1;
                    isModify = true;
                }
            }
            if (isModify)
                code = arr.join('\n');
            return code;
        }
        static checkCondition(st, def) {
            let childs = st.childs;
            let ret = false;
            if (null == childs) {
                return ret;
            }
            for (let i = 0, len = childs.length; i < len; i++) {
                let o = childs[i];
                if (exports.enumOperator["&&"] == o.operator) {
                    if (!ret) {
                        continue;
                    }
                }
                else if (exports.enumOperator["||"] == o.operator) {
                    if (ret) {
                        continue;
                    }
                }
                if ('defined' == o.name) {
                    try {
                        let defName = o.parameter.childs[0].name;
                        let b = !!def[defName];
                        if (o.operator == exports.enumOperator["!"])
                            b = !b;
                        ret = b;
                    }
                    catch (err) { }
                }
                else {
                    if (null != o.name || null == o.operator || null != o.parameter) {
                        if (('' == o.name || null == o.name) && null != o.parameter) {
                            ret = this.checkCondition(o.parameter, def);
                        }
                        else {
                            console.log("TODO:待处理判断", o);
                        }
                    }
                }
            }
            return ret;
        }
        static _parseChilds(parent, def) {
            let childs = parent.childs;
            let checkConditionType = 0;
            let out = '';
            if (null == childs)
                return out;
            for (let i = 0, len = childs.length; i < len; i++) {
                let t = childs[i];
                if ("#ifdef" == t.name || "#ifndef" == t.name || "#if" == t.name || "#elif" == t.name || "#else" == t.name) {
                    if (1 == checkConditionType && ("#elif" == t.name || "#else" == t.name)) {
                        continue;
                    }
                    if (t.condition(def)) {
                        if ("#else" != t.name) {
                            checkConditionType = 1;
                        }
                        else {
                            checkConditionType = 0;
                        }
                        out += this._parseChilds(t, def);
                    }
                    else {
                        checkConditionType = 0;
                    }
                }
                else if (null != t.defParam) {
                    if ('#define' == t.name) {
                        if (Array.isArray(t.defParam)) {
                            let arr = t.defParam;
                            if (1 == arr.length) {
                                def[arr[0]] = true;
                            }
                        }
                        else {
                            console.log('TODO');
                        }
                    }
                    else if ('#undefine' == t.name) {
                        if (Array.isArray(t.defParam)) {
                            let arr = t.defParam;
                            if (1 == arr.length) {
                                delete def[arr[0]];
                            }
                        }
                        else {
                            console.log('TODO');
                        }
                    }
                    if (t.code)
                        out += t.code + "\n";
                }
                else {
                    if (t.code && null == t.root) {
                        out += t.code + "\n";
                    }
                }
            }
            return out;
        }
    }

    class WebGPUShaderToken {
        constructor(includefiles) {
            this.z = 0;
            if (includefiles) {
                this.includefiles = includefiles;
            }
            else {
                this.includefiles = [];
            }
        }
        condition(def) {
            if ('#else' == this.name)
                return true;
            if (null != def) {
                if ("#ifdef" == this.name || "#ifndef" == this.name) {
                    try {
                        let check = this.defParam[0];
                        return ("#ifdef" == this.name) == !!def[check];
                    }
                    catch (err) { }
                }
                else {
                    if (!(this.defParam instanceof WebGPUShaderToken)) {
                        let defParm = this.defParam.join(" ");
                        let parmRoot = WebGPUShaderCompileCode.compile(defParm);
                        this.defParam = parmRoot;
                    }
                    return WebGPUShaderCompileUtil.checkCondition(this.defParam, def);
                }
            }
            else if ("#ifndef" == this.name) {
                return true;
            }
            return false;
        }
        addParameterArr(param, parent) {
            if (null == this.parameterArr) {
                this.parameterArr = [];
            }
            this.parameterArr.push(param);
            param.owner = this;
            if (parent) {
                param.parent = parent;
            }
        }
        setParameter(param, parent) {
            this.parameter = param;
            param.owner = this;
            if (parent)
                param.parent = parent;
        }
        addBody(body) {
            body.setParent(this);
        }
        setParent(parent) {
            if (null == parent.childs) {
                parent.childs = [];
            }
            parent.childs.push(this);
            this.z = parent.z + 1;
            this.parent = parent;
        }
        _parseShaderNode(sn) {
            let ret = '';
            let operator = null;
            if (null != sn.operator) {
                operator = exports.enumOperator[sn.operator];
                if (!sn.operatorRight) {
                    ret += operator;
                    operator = null;
                }
            }
            if (sn.type) {
                if (null != sn.describe) {
                    ret += exports.enumDescribe[sn.describe] + " ";
                }
                if (null != sn.inOrOut) {
                    ret += exports.enumInOut[sn.inOrOut] + " ";
                }
                if (null != sn.type) {
                    ret += sn.type + " ";
                }
                if (null != sn.name) {
                    ret += sn.name;
                }
                if (null != sn.parameter) {
                    let childs = sn.parameter.childs;
                    if (childs) {
                        ret += '(';
                        for (let i = 0, len = childs.length; i < len; i++) {
                            ret += this._parseShaderNode(childs[i]);
                        }
                        ret += ')';
                    }
                }
            }
            else if (sn.parameter) {
                if (null != sn.name) {
                    ret += sn.name;
                }
                if (null != operator) {
                    ret += operator;
                    operator = null;
                }
                ret += '(' + this._getParameter(sn.parameter) + ")";
            }
            else if (sn.parameterArr) {
                ret += this._getParameterArr(sn, '');
            }
            else if (sn.name) {
                ret += sn.name;
            }
            if (null != operator) {
                ret += operator;
            }
            if (null != sn.childs) {
                for (let i = 0, len = sn.childs.length; i < len; i++) {
                    ret += this._parseShaderNode(sn.childs[i]);
                }
            }
            return ret;
        }
        _getParameter(param, isFor = false) {
            let ret = '';
            if (null == param) {
                param = this.parameter;
            }
            if (param) {
                if (param.childs) {
                    let arr = param.childs;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let sn = arr[i];
                        ret += this._parseShaderNode(sn);
                        if (isFor && i < len - 1) {
                            ret += ';';
                        }
                    }
                }
                else {
                    ret += this._parseShaderNode(param);
                }
            }
            return ret;
        }
        _getParameterArr(st, end = ';') {
            let outStr = '';
            if (null != st.type) {
                outStr += st.type + " ";
            }
            let operator;
            if (null != st.operator && '' != end) {
                operator = exports.enumOperator[st.operator];
                if (!st.operatorRight) {
                    outStr += operator;
                    operator = null;
                }
            }
            let arr = st.parameterArr;
            if (null != st.name) {
                outStr += st.name;
            }
            for (let i = 0, len = arr.length; i < len; i++) {
                outStr += "[" + st._getParameter(arr[i]) + "]";
            }
            if (null != operator) {
                outStr += operator;
            }
            if (st.assign) {
                if (null != st.assignLeft) {
                    outStr += exports.enumOperator[st.assignLeft];
                }
                outStr += "=";
            }
            if (st.childs) {
                outStr += st._getParameter(st);
            }
            return outStr + end;
        }
        toscript(def, out) {
            if (null == out) {
                out = [];
            }
            if (this.type) {
                if ("return" == this.type) {
                    let outStr = this.type + " ";
                    if (this.name) {
                        outStr += this.name;
                    }
                    if (this.parameter) {
                        outStr += "(" + this._getParameter() + ")";
                    }
                    if (null != this.childs) {
                        outStr += this._getParameter(this);
                    }
                    outStr += ";";
                    out.push(outStr);
                }
                else if (this.parameter) {
                    let outStr = this.type + " " + this.name + "(" + this._getParameter() + "){";
                    if (null != this.describe) {
                        outStr = exports.enumDescribe[this.describe] + " " + outStr;
                    }
                    out.push(outStr);
                    if (this.childs) {
                        for (let i = 0, len = this.childs.length; i < len; i++) {
                            this.childs[i].toscript(def, out);
                        }
                    }
                    out.push('}');
                }
                else if (this.parameterArr) {
                    out.push(this._getParameterArr(this));
                }
                else if (this.assign) {
                    let outStr = this.type + " " + this.name;
                    if (null != this.assignLeft) {
                        outStr += exports.enumOperator[this.assignLeft];
                    }
                    outStr += '=';
                    if (this.childs) {
                        outStr += this._getParameter(this);
                        outStr += ';';
                        out.push(outStr);
                    }
                    else {
                        console.log("理论上不存在这种情况！");
                    }
                }
                else if (null != this.name) {
                    let outStr = '';
                    if (null != this.describe) {
                        outStr += exports.enumDescribe[this.describe] + " ";
                    }
                    outStr += this.type + " " + this.name;
                    if (null != this.operator) {
                        outStr += exports.enumOperator[this.operator];
                    }
                    if ('struct' == this.type) {
                        outStr += '{';
                        out.push(outStr);
                        outStr = '';
                        if (null != this.childs) {
                            let arr = this.childs;
                            for (let i = 0, len = arr.length; i < len; i++) {
                                let sn = arr[i];
                                let outStr = this._parseShaderNode(sn);
                                if ('' != outStr) {
                                    out.push(outStr + ";");
                                }
                            }
                        }
                        outStr += '}';
                        if (this.varNames) {
                            outStr += " " + this.varNames.join(",");
                        }
                    }
                    else {
                        if (null != this.childs)
                            outStr += this._getParameter(this);
                    }
                    outStr += ';';
                    out.push(outStr);
                }
                else {
                    out.push(this.type + ";");
                }
            }
            else if (this.parameterArr) {
                out.push(this._getParameterArr(this));
            }
            else if (this.parameter) {
                if (null != this.name) {
                    let outStr = '';
                    if (null != this.operator) {
                        outStr += exports.enumOperator[this.operator];
                    }
                    outStr += this.name + "(" + this._getParameter(null, 'for' == this.name) + ")";
                    if ("layout" == this.name) {
                        if (this.childs) {
                            for (let i = 0, len = this.childs.length; i < len; i++) {
                                let sn = this.childs[i];
                                if (sn.describe == exports.enumDescribe.uniform) {
                                    outStr += ' uniform';
                                }
                                else {
                                    console.log("TODO待处理:", sn);
                                }
                            }
                        }
                        outStr += ';';
                        out.push(outStr);
                    }
                    else {
                        out.push(outStr);
                        if (this.childs) {
                            out.push("{");
                            for (let i = 0, len = this.childs.length; i < len; i++) {
                                let sn = this.childs[i];
                                sn.toscript(def, out);
                            }
                            out.push("}");
                        }
                    }
                }
            }
            else if (this.name) {
                if (this.describe == exports.enumDescribe.uniform) {
                    out.push("uniform " + this.name + "{");
                    for (let i = 0, len = this.childs.length; i < len; i++) {
                        let sn = this.childs[i];
                        sn.toscript(def, out);
                    }
                    let outstr = '}';
                    if (this.varNames) {
                        outstr += " " + this.varNames.join(",");
                    }
                    outstr += ';';
                    out.push(outstr);
                }
                else if (this.assign) {
                    let outStr = this.name;
                    if (null != this.assignLeft) {
                        outStr += exports.enumOperator[this.assignLeft];
                    }
                    outStr += '=';
                    if (this.childs) {
                        outStr += this._getParameter(this);
                        outStr += ';';
                        out.push(outStr);
                    }
                    else {
                        console.log("理论上不存在这种情况！");
                    }
                }
                else {
                    if (this.childs) {
                        out.push(this.name + "{");
                        for (let i = 0, len = this.childs.length; i < len; i++) {
                            let sn = this.childs[i];
                            sn.toscript(def, out);
                        }
                        out.push("}");
                    }
                    else {
                        if (0 > this.name.indexOf("#")) {
                            out.push(this.name + ";");
                        }
                        else {
                            out.push(this.name);
                        }
                    }
                }
            }
            else if (null != this.operator) ;
            else if (this.childs) {
                if (null != this.parent) {
                    out.push("{");
                    for (let i = 0, len = this.childs.length; i < len; i++) {
                        let sn = this.childs[i];
                        sn.toscript(def, out);
                    }
                    out.push("}");
                }
                else {
                    for (let i = 0, len = this.childs.length; i < len; i++) {
                        let sn = this.childs[i];
                        sn.toscript(def, out);
                    }
                }
            }
            else ;
            return out;
        }
    }

    exports.enumInOut = void 0;
    (function (enumInOut) {
        enumInOut[enumInOut["in"] = 0] = "in";
        enumInOut[enumInOut["out"] = 1] = "out";
        enumInOut[enumInOut["inout"] = 2] = "inout";
    })(exports.enumInOut || (exports.enumInOut = {}));
    exports.enumDescribe = void 0;
    (function (enumDescribe) {
        enumDescribe[enumDescribe["uniform"] = 0] = "uniform";
        enumDescribe[enumDescribe["varying"] = 1] = "varying";
        enumDescribe[enumDescribe["const"] = 2] = "const";
        enumDescribe[enumDescribe["mediump"] = 3] = "mediump";
        enumDescribe[enumDescribe["highp"] = 4] = "highp";
        enumDescribe[enumDescribe["lowp"] = 5] = "lowp";
        enumDescribe[enumDescribe["attribute"] = 6] = "attribute";
    })(exports.enumDescribe || (exports.enumDescribe = {}));
    exports.enumOperator = void 0;
    (function (enumOperator) {
        enumOperator[enumOperator["!="] = 0] = "!=";
        enumOperator[enumOperator["=="] = 1] = "==";
        enumOperator[enumOperator["<="] = 2] = "<=";
        enumOperator[enumOperator[">="] = 3] = ">=";
        enumOperator[enumOperator["||"] = 4] = "||";
        enumOperator[enumOperator["&&"] = 5] = "&&";
        enumOperator[enumOperator[">>"] = 6] = ">>";
        enumOperator[enumOperator["<<"] = 7] = "<<";
        enumOperator[enumOperator["++"] = 8] = "++";
        enumOperator[enumOperator["^^"] = 9] = "^^";
        enumOperator[enumOperator["--"] = 10] = "--";
        enumOperator[enumOperator["!"] = 11] = "!";
        enumOperator[enumOperator["+"] = 12] = "+";
        enumOperator[enumOperator["-"] = 13] = "-";
        enumOperator[enumOperator["*"] = 14] = "*";
        enumOperator[enumOperator["/"] = 15] = "/";
        enumOperator[enumOperator["="] = 16] = "=";
        enumOperator[enumOperator["<"] = 17] = "<";
        enumOperator[enumOperator[">"] = 18] = ">";
        enumOperator[enumOperator["&"] = 19] = "&";
        enumOperator[enumOperator["|"] = 20] = "|";
        enumOperator[enumOperator["^"] = 21] = "^";
        enumOperator[enumOperator["%"] = 22] = "%";
    })(exports.enumOperator || (exports.enumOperator = {}));
    const boolCheck = ['<=', '>=', '!=', '==', "&&", "||", '>', '<', '!'];
    const checkBodyName = ['if', 'for', 'while', 'layout'];
    const _clearCR = new RegExp("\r", "g");
    class WebGPUShaderCompileCode {
        static compile(code) {
            let ret = new WebGPUShaderToken();
            code = code.replace(_clearCR, "");
            code = this.removeAnnotation(code).trim();
            this._define.clear();
            WebGPUShaderDefine.findNumberDefine(code, this._define);
            this._compileToTree(ret, code);
            this._parameterNode = null;
            this._parentNode = null;
            this._currNode = null;
            this._currNameNode = null;
            this._currParame = null;
            this._isCheckType = false;
            this._currTmpBody = null;
            ret.uniform = this._uniform;
            ret.variable = this._variable;
            ret.structs = this._struct;
            ret.varying = this._varying;
            ret.attribute = this._attribute;
            if (this._struct) {
                if (this._uniform) {
                    for (let k in this._uniform) {
                        if (this._struct[this._uniform[k].type]) {
                            this._uniform[k].struct = this._struct[this._uniform[k].type];
                        }
                    }
                }
                if (this._varying) {
                    for (let k in this._varying) {
                        if (this._struct[this._varying[k].type]) {
                            this._varying[k].struct = this._struct[this._varying[k].type];
                        }
                    }
                }
                if (this._attribute) {
                    for (let k in this._attribute) {
                        if (this._struct[this._attribute[k].type]) {
                            this._attribute[k].struct = this._struct[this._attribute[k].type];
                        }
                    }
                }
            }
            this._uniform = null;
            this._variable = null;
            this._struct = null;
            this._varying = null;
            this._attribute = null;
            this._varUniform = null;
            return ret;
        }
        static get _currNode() {
            return this.__currNode;
        }
        static set _currNode(value) {
            if (value == this.__currNode)
                return;
            if (null != this.__currNode) {
                if (null != this.__currNode.name && (null == this.__currNode.type || 'return' == this.__currNode.type)) {
                    if (null == this.__currNode.parameter && this.__currNode.describe != exports.enumDescribe.uniform) {
                        let name = this.__currNode.name;
                        if ('' != name && isNaN(Number(name))) {
                            let ofs = name.indexOf(".");
                            if (0 <= ofs) {
                                name = name.substring(0, ofs).trim();
                                if (this._varUniform && this._varUniform[name]) {
                                    name = this.__currNode.name.substring(ofs + 1).trim();
                                }
                            }
                            if ('' != name) {
                                if (null == this._variable)
                                    this._variable = new Set();
                                this._variable.add(name);
                            }
                        }
                    }
                }
            }
            this.__currNode = value;
        }
        static get isCheckType() {
            return this._isCheckType;
        }
        static set isCheckType(value) {
            if (value != this._isCheckType) {
                if (null == this._parameterNode && value) {
                    if (this._parentNode.assign) {
                        this._parentNode = this._parentNode.parent;
                    }
                    if ('return' == this._parentNode.type) {
                        this._parentNode = this._parentNode.parent;
                    }
                }
                this._isCheckType = value;
            }
        }
        static get currNode() {
            if (null == this._currNode) {
                if (null == this._parentNode) {
                    console.log("异常啦！！！");
                }
                this._currNode = new WebGPUShaderToken(this._parentNode.includefiles);
                if (this._parameterNode) {
                    this._currNode.owner = this._parameterNode.owner;
                    this._parameterNode.addBody(this._currNode);
                }
                else {
                    this._parentNode.addBody(this._currNode);
                }
            }
            return this._currNode;
        }
        static updateCurrNode() {
            if (this._parameterNode) {
                if (this._parameterNode.childs) {
                    this._currNode = this._parameterNode.childs[this._parameterNode.childs.length - 1];
                }
                else
                    this._currNode = null;
            }
            else {
                if (this._parentNode.childs) {
                    this._currNode = this._parentNode.childs[this._parentNode.childs.length - 1];
                }
                else {
                    console.log("这里应该有点问题！");
                    this._currNode = null;
                }
            }
        }
        static newParameterNode(parameterType = 0) {
            let sn = new WebGPUShaderToken(this._parentNode.includefiles);
            if (null == this._currNameNode) {
                if (1 == parameterType) {
                    let childs = this._parentNode.childs;
                    let pNode = childs[childs.length - 1];
                    if (pNode.parameterArr) {
                        this._currNameNode = pNode;
                    }
                }
                if (null == this._currNameNode) {
                    this._currNameNode = this.nextCurrNode(true);
                    this._currNameNode.name = '';
                }
            }
            if (1 == parameterType) {
                this._currNameNode.addParameterArr(sn, this._parameterNode);
            }
            else {
                this._currNameNode.setParameter(sn, this._parameterNode);
            }
            this._currNameNode = null;
            this._parameterNode = sn;
            this.updateCurrNode();
        }
        static isEmptyNode(node, isCheckParent = false) {
            for (let name in node) {
                if ('includefiles' == name || 'owner' == name || 'z' == name) {
                    continue;
                }
                if (isCheckParent && 'parent' == name) {
                    continue;
                }
                return false;
            }
            return true;
        }
        static nextCurrNode(isForceCreate = false) {
            if (isForceCreate) {
                this._currNode = null;
                return this.currNode;
            }
            else {
                if (null != this._currNode) {
                    if (this.isEmptyNode(this._currNode)) {
                        return null;
                    }
                    this._currNode = null;
                }
                return null;
            }
        }
        static _compileToTree(root, script) {
            let lines = script.split(";");
            this._parentNode = root;
            for (let i = 0, len = lines.length; i < len; i++) {
                let text = lines[i].trim();
                if (text.length < 1)
                    continue;
                this._parseNode(text);
                this._checkStructDef();
                if (null != this._currParame) {
                    this._parseParameter();
                }
                this._body3Fin();
            }
        }
        static _checkStructDef() {
            let childs = this._parentNode.childs;
            if (childs) {
                let len = childs.length;
                if (2 <= len) {
                    let index = len - 1;
                    let o1 = childs[index];
                    let o2 = childs[len - 2];
                    if (('struct' == o2.type || (o2.describe == exports.enumDescribe.uniform && o2.childs)) && null == o1.name && null != o1.type) {
                        let arr = o1.type.split(',');
                        o2.varNames = arr;
                        childs.splice(index, 1);
                        if (o2.describe == exports.enumDescribe.uniform) {
                            if (null == this._varUniform)
                                this._varUniform = {};
                            for (let i = arr.length - 1; i >= 0; i--) {
                                this._varUniform[arr[i]] = o2.name;
                            }
                        }
                    }
                }
            }
        }
        static _checkTypeByString(text) {
            let sn = this.nextCurrNode(true);
            this.isCheckType = true;
            let arr = text.split(" ");
            for (let i = 0, len = arr.length; i < len; i++) {
                if (this.isCheckType) {
                    this._checkType(arr[i]);
                }
                else {
                    sn.name = arr[i];
                }
            }
            this.isCheckType = false;
        }
        static get _isFor() {
            if (this._parameterNode) {
                let node = this._parameterNode.owner;
                if ("for" == node.name) {
                    return true;
                }
            }
            return false;
        }
        static _parseParameter() {
            if (null != this._currParame) {
                let node = this._parameterNode.owner;
                if (this._isFor) {
                    let _parentNode = this._parentNode;
                    let _parameterNode = this._parameterNode;
                    if (null == _parameterNode.childs || 0 == _parameterNode.childs.length) {
                        this.isCheckType = true;
                    }
                    let sn = this.nextCurrNode(true);
                    this._parameterNode = null;
                    this._parentNode = sn;
                    this._currNode = null;
                    let arr = this._currParame.split(" ");
                    for (let i = 0, len = arr.length; i < len; i++) {
                        this._checkBody(arr[i]);
                    }
                    this._parameterNode = _parameterNode;
                    this._parentNode = _parentNode;
                }
                else {
                    let isFun = false;
                    if (null != node.type && 'return' != node.type && 'else' != node.type)
                        isFun = true;
                    let arr = this._currParame.split(',');
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let str = arr[i];
                        if (isFun) {
                            this._checkTypeByString(str);
                        }
                        else {
                            this._checkBody2(str, false);
                        }
                        if (i < len - 1) {
                            let sn = this.nextCurrNode(true);
                            sn.type = ',';
                            this._currNode = null;
                        }
                    }
                }
            }
            this._currParame = null;
        }
        static _addParam(text) {
            if (null == this._currParame) {
                this._currParame = text;
            }
            else {
                this._currParame += ' ' + text;
            }
        }
        static _checkParameter(text) {
            text = text.trim();
            if ('' == text) {
                if (this._isFor)
                    this._addParam(text);
                return;
            }
            if (this.isCheckType) {
                this._checkType(text);
                return;
            }
            let ofs = text.indexOf("(");
            if (0 <= ofs) {
                this._checkParameter(text.substring(0, ofs));
                this._parseParameter();
                this.newParameterNode();
                text = text.substring(ofs + 1);
                this._checkParameter(text);
            }
            else {
                let ofs = text.indexOf("[");
                if (0 <= ofs) {
                    this._checkParameter(text.substring(0, ofs));
                    this._parseParameter();
                    this.newParameterNode(1);
                    text = text.substring(ofs + 1);
                    this._checkParameter(text);
                }
                else {
                    ofs = text.indexOf(")");
                    if (0 > ofs) {
                        ofs = text.indexOf("]");
                    }
                    if (0 <= ofs) {
                        this._checkParameter(text.substring(0, ofs));
                        this._parseParameter();
                        let owner = this._parameterNode.owner;
                        if (owner) {
                            let obj = null;
                            if (owner.describe == exports.enumDescribe.uniform) {
                                obj = this._uniform;
                            }
                            else if (owner.describe == exports.enumDescribe.attribute) {
                                obj = this._attribute;
                            }
                            else if (owner.describe == exports.enumDescribe.varying) {
                                obj = this._varying;
                            }
                            if (null != obj) {
                                try {
                                    let str = this._parameterNode.childs[0].type;
                                    if (this._define.has(str))
                                        str = this._define.get(str);
                                    const num = Number(str);
                                    if (!isNaN(num) && obj[owner.name]) {
                                        if (null == obj[owner.name].length)
                                            obj[owner.name].length = [];
                                        obj[owner.name].length.push(num);
                                    }
                                }
                                catch (err) { }
                            }
                        }
                        this._parameterNode = this._parameterNode.parent;
                        this.updateCurrNode();
                        text = text.substring(ofs + 1);
                        this._currNameNode = null;
                        if (this.currNode && null != this.currNode.parameter && null == this._parameterNode && 0 <= checkBodyName.indexOf(this.currNode.name)) {
                            this._isCheckBody3 = true;
                        }
                        this._checkBody(text);
                    }
                    else {
                        this._addParam(text);
                    }
                }
            }
        }
        static _body3Fin() {
            let arr = this._currTmpBody;
            this._currTmpBody = null;
            this._isCheckBody3 = false;
            if (arr) {
                if (this._currNode && 0 <= checkBodyName.indexOf(this._currNode.name)) {
                    this._parentNode = this._currNode;
                    this._currNode = null;
                }
                else if (this._parentNode && 0 <= checkBodyName.indexOf(this._parentNode.name)) {
                    this._currNode = null;
                }
                else {
                    console.log("理论上不应该进入这里，待查！");
                    this._currNode = null;
                    this._parentNode = this.currNode;
                    this._currNode = null;
                }
                this.isCheckType = true;
                for (let i = 0, len = arr.length; i < len; i++) {
                    this._checkBody(arr[i]);
                }
                this._parentNode = this._parentNode.parent;
                this.nextCurrNode();
                this.isCheckType = true;
            }
        }
        static _checkBody3(text) {
            if (this._isCheckBody3) {
                if (0 > text.indexOf("{")) {
                    if (null == this._currTmpBody) {
                        this._currTmpBody = [];
                    }
                    this._currTmpBody.push(text);
                    return true;
                }
                else if (null != this._currTmpBody) {
                    console.log("理论上不应该会走到这里，如果到这里，待检查！", this._currTmpBody);
                    this._isCheckBody3 = false;
                    let arr = this._currTmpBody;
                    this._currTmpBody = null;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        this._checkBody(arr[i]);
                    }
                }
                else {
                    this._isCheckBody3 = false;
                }
            }
            return false;
        }
        static _checkBody(text) {
            text = text.trim();
            if ('' == text)
                return;
            if (this._checkBody3(text)) {
                return;
            }
            if (this.isCheckType) {
                this._checkType(text);
                return;
            }
            if (null != this._parameterNode) {
                this._checkParameter(text);
                return;
            }
            if (this._checkOperator(text))
                return;
            let ofs = text.indexOf("=");
            if (0 > ofs) {
                ofs = text.indexOf("(");
                if (0 > ofs) {
                    ofs = text.indexOf("[");
                    if (0 > ofs) {
                        ofs = text.indexOf("{");
                        if (0 <= ofs) {
                            let cstr = text.substring(0, ofs);
                            if ('' != cstr) {
                                this._setNodeName(cstr);
                            }
                            else if (null != this._currNode.type && null == this._currNode.name) {
                                this._currNode.name = this._currNode.type;
                                delete this._currNode.type;
                            }
                            this._parentNode = this.currNode;
                            text = text.substring(ofs + 1);
                            this.isCheckType = true;
                            this._currNode = null;
                            this._checkBody(text);
                        }
                        else {
                            ofs = text.indexOf("}");
                            if (0 <= ofs) {
                                this._childFin(ofs, text);
                            }
                            else {
                                ofs = text.indexOf(",");
                                if (0 <= ofs) {
                                    this._checkBody(text.substring(0, ofs));
                                    this.isCheckType = true;
                                    this.updateCurrNode();
                                    let typeNode = this._currNode;
                                    if (null == typeNode.type) {
                                        console.log("理论上不应该出现这个情况！", text);
                                    }
                                    else {
                                        let sn = this.nextCurrNode(true);
                                        sn.type = typeNode.type;
                                        if (null != typeNode.describe) {
                                            sn.describe = typeNode.describe;
                                        }
                                    }
                                    this.isCheckType = false;
                                    this._checkBody(text.substring(ofs + 1));
                                }
                                else {
                                    if (!this._splitTextCheck(text, "?")) {
                                        if (!this._splitTextCheck(text, ":")) {
                                            this._checkBody2(text);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        let cstr = text.substring(0, ofs);
                        this._setNodeName(cstr);
                        this.newParameterNode(1);
                        this._checkParameter(text.substring(ofs + 1));
                    }
                }
                else {
                    let cstr = text.substring(0, ofs).trim();
                    if (null == this._currNode || null == this._currNode.name || '' != cstr) {
                        this._setNodeName(cstr);
                    }
                    else if (null != this._currNode && this._currNode.assign) {
                        this._setNodeName(cstr);
                    }
                    this.newParameterNode();
                    this._checkParameter(text.substring(ofs + 1));
                    return;
                }
            }
            else {
                this._checkEqual(text, ofs);
            }
        }
        static _splitTextCheck(text, cstr, fun) {
            if (null == fun)
                fun = this._checkBody;
            let ofs = text.indexOf(cstr);
            if (0 <= ofs) {
                fun.call(this, text.substring(0, ofs));
                let sn = this.nextCurrNode(true);
                sn.type = cstr;
                this._currNameNode = sn;
                this._currNode = null;
                fun.call(this, text.substring(ofs + cstr.length));
                return true;
            }
            return false;
        }
        static _childFin(ofs, text) {
            let cstr = text.substring(0, ofs);
            this._checkBody(cstr);
            if ("struct" == this._parentNode.type) {
                if (!this._struct)
                    this._struct = {};
                this._struct[this._parentNode.name] = this._parentNode;
            }
            let childs = this._parentNode.childs;
            if (childs) {
                for (let i = childs.length - 1; i >= 0; i--) {
                    let o = childs[i];
                    if (this.isEmptyNode(o, true)) {
                        childs.splice(i, 1);
                    }
                }
            }
            this._parentNode = this._parentNode.parent;
            this.nextCurrNode();
            text = text.substring(ofs + 1);
            this.isCheckType = true;
            if ('' != text) {
                this.nextCurrNode();
                this._checkBody(text);
            }
        }
        static _checkType(text) {
            if ('' == text)
                return;
            let node = this.currNode;
            let inout = exports.enumInOut[text];
            if (undefined != inout && isNaN(Number(text))) {
                node.inOrOut = inout;
            }
            else {
                let describe = exports.enumDescribe[text];
                if (undefined != describe && isNaN(Number(text))) {
                    node.describe = describe;
                }
                else {
                    let ofs = text.indexOf("}");
                    if (0 <= ofs) {
                        this._childFin(ofs, text);
                        return;
                    }
                    ofs = text.indexOf("(");
                    if (0 > ofs) {
                        ofs = text.indexOf("[");
                    }
                    if (0 <= ofs) {
                        this.isCheckType = false;
                        this._checkBody(text);
                    }
                    else {
                        ofs = text.indexOf("=");
                        if (0 <= ofs) {
                            this._checkEqual(text, ofs);
                        }
                        else {
                            ofs = text.indexOf("{");
                            if (0 <= ofs) {
                                this.isCheckType = false;
                                this._checkBody(text);
                            }
                            else {
                                node.type = text;
                                if ('return' == text) {
                                    this._parentNode = node;
                                    this.nextCurrNode();
                                }
                                this.isCheckType = false;
                            }
                        }
                    }
                }
            }
        }
        static _checkEqual(text, ofs) {
            this.isCheckType = false;
            if (0 == ofs) {
                let cstr = text.substring(0, 2);
                if (this._checkOperator(cstr)) {
                    this._checkBody(text.substring(2));
                    return;
                }
            }
            let cstr = text.substring(0, ofs);
            let len = cstr.length;
            if (0 < len) {
                let cstr2 = cstr.substring(len - 2);
                let operator = exports.enumOperator[cstr2];
                if (null != operator && isNaN(Number(cstr2))) {
                    cstr2 = cstr.substring(0, cstr.length - 2).trim();
                    if ('' != cstr2) {
                        this._setNodeName(cstr2);
                    }
                    this._checkOperator("=");
                    this.currNode.assignLeft = operator;
                    this._checkBody(text.substring(ofs + 1));
                    return;
                }
                cstr2 = cstr.substring(len - 1);
                let cstr3 = cstr2 + "=";
                operator = exports.enumOperator[cstr3];
                if (null != operator && isNaN(Number(cstr3))) {
                    this._checkBody(cstr.substring(0, cstr.length - 1).trim());
                    this._checkBody(cstr3);
                    this._checkBody(text.substring(ofs + 1));
                    return;
                }
                operator = exports.enumOperator[cstr2];
                if (null != operator && isNaN(Number(cstr2))) {
                    cstr2 = cstr.substring(0, cstr.length - 1).trim();
                    if ('' != cstr2) {
                        this._setNodeName(cstr2);
                    }
                    this._checkOperator("=");
                    this.currNode.assignLeft = operator;
                    this._checkBody(text.substring(ofs + 1));
                    return;
                }
            }
            this._setNodeName(cstr);
            cstr = text.substring(ofs, ofs + 2);
            if (this._checkOperator(cstr)) {
                ofs += 1;
            }
            else {
                this._checkOperator("=");
            }
            this._checkBody(text.substring(ofs + 1));
        }
        static _setNodeName(value) {
            value = value.trim();
            let node = this.currNode;
            if (null != node.name) {
                this._checkBody2(value, false);
                return;
            }
            if ('' == value && null != node.type) {
                this._checkBody2(node.type, false);
                delete node.type;
            }
            else {
                this._checkBody2(value);
            }
        }
        static _checkBody2(text, isCheckEmpty = true) {
            text = text.trim();
            if ('' == text && isCheckEmpty)
                return;
            let ofs;
            let pstr;
            if ('' != text) {
                for (let k in exports.enumOperator) {
                    if (isNaN(Number(k))) {
                        let num = text.indexOf(k);
                        if (0 <= num) {
                            if (null == ofs || ofs > num) {
                                ofs = num;
                                pstr = k;
                            }
                        }
                    }
                }
            }
            if (null != ofs) {
                this._checkBody2(text.substring(0, ofs));
                this._checkOperator(text.substring(ofs, ofs + pstr.length));
                this._checkBody2(text.substring(ofs + pstr.length));
            }
            else {
                if (!this._splitTextCheck(text, "?", this._checkBody2)) {
                    if (!this._splitTextCheck(text, ":", this._checkBody2)) {
                        let sn = this.currNode;
                        if (null != sn.name) {
                            sn = this.nextCurrNode(true);
                        }
                        sn.name = text;
                        this._currNameNode = sn;
                        if (this._parentNode) {
                            let obj = null;
                            if (this._parentNode.describe == exports.enumDescribe.uniform) {
                                if (null == this._uniform)
                                    this._uniform = {};
                                obj = this._uniform;
                            }
                            else if (this._parentNode.describe == exports.enumDescribe.varying) {
                                if (null == this._varying)
                                    this._varying = {};
                                obj = this._varying;
                            }
                            else if (this._parentNode.describe == exports.enumDescribe.attribute) {
                                if (null == this._attribute)
                                    this._attribute = {};
                                obj = this._attribute;
                            }
                            if (null != obj) {
                                obj[sn.name] = {
                                    type: sn.type,
                                    struct: this._parentNode,
                                    blockName: this._parentNode.name
                                };
                            }
                        }
                        if (sn.describe == exports.enumDescribe.uniform) {
                            if (null == this._uniform)
                                this._uniform = {};
                            this._uniform[sn.name] = { type: sn.type };
                        }
                        else if (sn.describe == exports.enumDescribe.attribute) {
                            if (null == this._attribute)
                                this._attribute = {};
                            this._attribute[sn.name] = { type: sn.type };
                        }
                        else if (sn.describe == exports.enumDescribe.varying) {
                            if (null == this._varying)
                                this._varying = {};
                            this._varying[sn.name] = { type: sn.type };
                        }
                    }
                }
            }
        }
        static _checkOperator(text) {
            let operator = exports.enumOperator[text];
            if (undefined != operator && isNaN(Number(text))) {
                let sn = this.currNode;
                if ('=' == text) {
                    sn.assign = true;
                    if (null == sn.name && null != sn.type) {
                        this._checkBody2(sn.type, false);
                        delete sn.type;
                    }
                    this._parentNode = sn;
                }
                else {
                    if (null != sn.name || null != sn.operator) {
                        sn = this.nextCurrNode(true);
                    }
                    sn.operator = operator;
                    this._currNameNode = sn;
                    if (null != sn.name) {
                        sn.operatorRight = true;
                    }
                }
                return true;
            }
            return false;
        }
        static _parseNode(text) {
            if ('' == text)
                return;
            let ofs = text.indexOf("#");
            if (0 > ofs) {
                text = text.split("\n").join(" ").split("\t").join(" ");
                if (0 == text.indexOf('precision')) {
                    let sn = new WebGPUShaderToken(this._parentNode.includefiles);
                    sn.name = text;
                    this._parentNode.addBody(sn);
                    return;
                }
                let arr = text.split(" ");
                if (!this._isFor)
                    this.isCheckType = true;
                this.nextCurrNode();
                for (let i = 0, len = arr.length; i < len; i++) {
                    text = arr[i];
                    if ('' == text)
                        continue;
                    this._checkBody(text);
                }
            }
            else {
                this._parseNode(text.substring(0, ofs));
                let def = text.substring(ofs);
                ofs = def.indexOf("\n");
                text = null;
                if (0 < ofs) {
                    text = def.substring(ofs + 1);
                    def = def.substring(0, ofs);
                }
                let sn = new WebGPUShaderToken(this._parentNode.includefiles);
                sn.name = def;
                this._parentNode.addBody(sn);
                if (null != text) {
                    this._parseNode(text);
                }
            }
        }
        static removeAnnotation(text) {
            while (true) {
                let i = text.indexOf("//");
                if (0 > i) {
                    break;
                }
                else {
                    let num = text.indexOf('\n', i);
                    if (0 < num) {
                        text = text.substring(0, i) + text.substring(num);
                    }
                    else {
                        text = text.substring(0, i);
                    }
                }
            }
            while (true) {
                let i = text.indexOf("/*");
                if (0 > i) {
                    break;
                }
                else {
                    let num = text.indexOf("*/", i);
                    if (0 < num) {
                        text = text.substring(0, i) + text.substring(num + 2);
                    }
                    else {
                        text = text.substring(0, i);
                    }
                }
            }
            return text;
        }
    }
    WebGPUShaderCompileCode._isCheckType = false;
    WebGPUShaderCompileCode._define = new Map();

    class WebGPUShaderCompileDef {
        static compile(code, defs) {
            code = code.replace(_clearCR, "");
            this._defs = defs;
            let st = new WebGPUShaderToken();
            this._compileToTree(st, code);
            this._parentNode = null;
            this._defs = null;
            this._currNode = null;
            return st;
        }
        static isEmptyNode(node) {
            for (let name in node) {
                if ('includefiles' == name || 'owner' == name || 'z' == name) {
                    continue;
                }
                return false;
            }
            return true;
        }
        static nextCurrNode(isForceCreate = false) {
            if (isForceCreate) {
                this._currNode = null;
                return this.currNode;
            }
            else {
                if (null != this._currNode) {
                    if (this.isEmptyNode(this._currNode)) {
                        return null;
                    }
                    this._currNode = null;
                }
                return null;
            }
        }
        static get currNode() {
            if (null == this._currNode) {
                this._currNode = new WebGPUShaderToken(this._parentNode.includefiles);
                this._parentNode.addBody(this._currNode);
            }
            return this._currNode;
        }
        static _compileToTree(parent, code) {
            this._parentNode = parent;
            let lines = code.split("\n");
            for (let i = 0, len = lines.length; i < len; i++) {
                let text = lines[i];
                if (text.length < 1)
                    continue;
                let ofs = text.indexOf("//");
                if (0 < ofs) {
                    this._parseNode(text.substring(0, ofs));
                    this._parseNode(text.substring(ofs));
                }
                else {
                    this._parseNode(text);
                }
            }
        }
        static _parseNode(text) {
            text = text.split("\t").join(" ").trim();
            if (text.indexOf("#") != 0) {
                if (null == this.currNode.code) {
                    this.currNode.code = text;
                }
                else {
                    this.currNode.code += '\n' + text;
                }
            }
            else {
                let arr = text.split(" ");
                let name = arr.shift();
                if ("#endif" == name) {
                    this._parentNode = this._parentNode.parent;
                    this._currNode = null;
                    return;
                }
                let node;
                switch (name) {
                    case '#ifdef':
                    case "#ifndef":
                    case "#if":
                        node = this.nextCurrNode(true);
                        node.code = text;
                        node.name = name;
                        node.defParam = arr;
                        this._parentNode = node;
                        this._currNode = null;
                        WebGPUShaderCompileUtil.checkDef(node, this._defs);
                        break;
                    case "#elif":
                    case "#else":
                        this._parentNode = this._parentNode.parent;
                        node = this.nextCurrNode(true);
                        node.code = text;
                        node.name = name;
                        node.defParam = arr;
                        this._parentNode = node;
                        this._currNode = null;
                        if ('#elif' == name)
                            WebGPUShaderCompileUtil.checkDef(node, this._defs);
                        break;
                    case "#include":
                        break;
                    default:
                        node = this.nextCurrNode(true);
                        node.code = text;
                        node.name = name;
                        node.defParam = arr;
                        this._currNode = null;
                        break;
                }
            }
        }
    }

    exports.BatchManager = BatchManager;
    exports.DepthStencilParam = DepthStencilParam;
    exports.GLSLForVulkanGenerator = GLSLForVulkanGenerator;
    exports.IRenderPipelineInfo = IRenderPipelineInfo;
    exports.OneDrawCacheInfo = OneDrawCacheInfo;
    exports.OneDrawPassCacheInfo = OneDrawPassCacheInfo;
    exports.SequenceFrame2DInstanceBatch = SequenceFrame2DInstanceBatch;
    exports.SequenceFrame2DInstanceBatchTool = SequenceFrame2DInstanceBatchTool;
    exports.Web2DBaseRenderDataHandle = Web2DBaseRenderDataHandle;
    exports.Web2DGraphic2DIndexCloneDataView = Web2DGraphic2DIndexCloneDataView;
    exports.Web2DGraphic2DIndexDataView = Web2DGraphic2DIndexDataView;
    exports.Web2DGraphic2DVertexDataView = Web2DGraphic2DVertexDataView;
    exports.Web2DGraphicWholeBuffer = Web2DGraphicWholeBuffer;
    exports.Web2DGraphicsBufferDataView = Web2DGraphicsBufferDataView;
    exports.Web2DGraphicsIndexBatchBuffer = Web2DGraphicsIndexBatchBuffer;
    exports.Web2DGraphicsIndexBuffer = Web2DGraphicsIndexBuffer;
    exports.Web2DGraphicsVertexBuffer = Web2DGraphicsVertexBuffer;
    exports.WebDefineDatas = WebDefineDatas;
    exports.WebEmptyRender2DDataHandle = WebEmptyRender2DDataHandle;
    exports.WebGLShaderData = WebGLShaderData;
    exports.WebGPUBindGroup = WebGPUBindGroup;
    exports.WebGPUBindGroupCache = WebGPUBindGroupCache;
    exports.WebGPUBindGroupHelper = WebGPUBindGroupHelper;
    exports.WebGPUBindGroupLayoutInfo = WebGPUBindGroupLayoutInfo;
    exports.WebGPUBlendState = WebGPUBlendState;
    exports.WebGPUBlit2DQuadCMD = WebGPUBlit2DQuadCMD;
    exports.WebGPUBuffer = WebGPUBuffer;
    exports.WebGPUBufferManager = WebGPUBufferManager;
    exports.WebGPUBufferState = WebGPUBufferState;
    exports.WebGPUCapable = WebGPUCapable;
    exports.WebGPUCommandUniformMap = WebGPUCommandUniformMap;
    exports.WebGPUComputeCommandAppatchCMD = WebGPUComputeCommandAppatchCMD;
    exports.WebGPUComputeContext = WebGPUComputeContext;
    exports.WebGPUComputeShaderInstance = WebGPUComputeShaderInstance;
    exports.WebGPUConfig = WebGPUConfig;
    exports.WebGPUDepthStencilState = WebGPUDepthStencilState;
    exports.WebGPUDeviceBuffer = WebGPUDeviceBuffer;
    exports.WebGPUDraw2DElementCMD = WebGPUDraw2DElementCMD;
    exports.WebGPUGlobal = WebGPUGlobal;
    exports.WebGPUGlobalPipeLineCacheInfo = WebGPUGlobalPipeLineCacheInfo;
    exports.WebGPUIndexBuffer = WebGPUIndexBuffer;
    exports.WebGPUInternalRT = WebGPUInternalRT;
    exports.WebGPUInternalTex = WebGPUInternalTex;
    exports.WebGPUPipelineCache = WebGPUPipelineCache;
    exports.WebGPUPrimitiveRenderElement2D = WebGPUPrimitiveRenderElement2D;
    exports.WebGPUPrimitiveState = WebGPUPrimitiveState;
    exports.WebGPURender2DProcess = WebGPURender2DProcess;
    exports.WebGPURenderBundle = WebGPURenderBundle;
    exports.WebGPURenderBundleManager = WebGPURenderBundleManager;
    exports.WebGPURenderBundleManagerSet = WebGPURenderBundleManagerSet;
    exports.WebGPURenderCommandEncoder = WebGPURenderCommandEncoder;
    exports.WebGPURenderContext2D = WebGPURenderContext2D;
    exports.WebGPURenderDeviceFactory = WebGPURenderDeviceFactory;
    exports.WebGPURenderElement2D = WebGPURenderElement2D;
    exports.WebGPURenderEncoder = WebGPURenderEncoder;
    exports.WebGPURenderEngine = WebGPURenderEngine;
    exports.WebGPURenderGeometry = WebGPURenderGeometry;
    exports.WebGPURenderPassHelper = WebGPURenderPassHelper;
    exports.WebGPUResourceRecover = WebGPUResourceRecover;
    exports.WebGPUSampler = WebGPUSampler;
    exports.WebGPUSetRenderData = WebGPUSetRenderData;
    exports.WebGPUSetRendertarget2DCMD = WebGPUSetRendertarget2DCMD;
    exports.WebGPUSetShaderDefine = WebGPUSetShaderDefine;
    exports.WebGPUShaderCompileCode = WebGPUShaderCompileCode;
    exports.WebGPUShaderCompileDef = WebGPUShaderCompileDef;
    exports.WebGPUShaderCompileUtil = WebGPUShaderCompileUtil;
    exports.WebGPUShaderCompiler = WebGPUShaderCompiler;
    exports.WebGPUShaderData = WebGPUShaderData;
    exports.WebGPUShaderDefine = WebGPUShaderDefine;
    exports.WebGPUShaderInstance = WebGPUShaderInstance;
    exports.WebGPUShaderToken = WebGPUShaderToken;
    exports.WebGPUSubUniformBuffer = WebGPUSubUniformBuffer;
    exports.WebGPUTextureContext = WebGPUTextureContext;
    exports.WebGPUTimingHelper = WebGPUTimingHelper;
    exports.WebGPUUniformBuffer = WebGPUUniformBuffer;
    exports.WebGPUUniformBufferBase = WebGPUUniformBufferBase;
    exports.WebGPUUniformBufferDescriptor = WebGPUUniformBufferDescriptor;
    exports.WebGPUVertexBuffer = WebGPUVertexBuffer;
    exports.WebGPU_GLSLCommon = WebGPU_GLSLCommon;
    exports.WebGPU_GLSLFunction = WebGPU_GLSLFunction;
    exports.WebGPU_GLSLMacro = WebGPU_GLSLMacro;
    exports.WebGPU_GLSLProcess = WebGPU_GLSLProcess;
    exports.WebGPU_GLSLStruct = WebGPU_GLSLStruct;
    exports.WebGPU_GLSLUniform = WebGPU_GLSLUniform;
    exports.WebGlobalRenderData = WebGlobalRenderData;
    exports.WebGraphics2DBufferBlock = WebGraphics2DBufferBlock;
    exports.WebGraphics2DVertexBlock = WebGraphics2DVertexBlock;
    exports.WebGraphicsBatch = WebGraphicsBatch;
    exports.WebMesh2DRenderDataHandle = WebMesh2DRenderDataHandle;
    exports.WebPrimitiveDataHandle = WebPrimitiveDataHandle;
    exports.WebRender2DDataHandle = WebRender2DDataHandle;
    exports.WebRender2DPass = WebRender2DPass;
    exports.WebRender2DPassManager = WebRender2DPassManager;
    exports.WebRenderStruct2D = WebRenderStruct2D;
    exports.WebShaderPass = WebShaderPass;
    exports.WebSpineRenderDataHandle = WebSpineRenderDataHandle;
    exports.WebSubShader = WebSubShader;
    exports.WebUnitRenderModuleDataFactory = WebUnitRenderModuleDataFactory;
    exports._clearCR = _clearCR;
    exports.blitFramebuffer = blitFramebuffer;
    exports.boolCheck = boolCheck;
    exports.compareCahceFlag = compareCahceFlag;
    exports.coverCahceFlag = coverCahceFlag;
    exports.doPremultiplyAlpha = doPremultiplyAlpha;
    exports.genMipmap = genMipmap;
    exports.getDepthStencilParamFromMaterial = getDepthStencilParamFromMaterial;
    exports.getDepthStencilParamFromShader = getDepthStencilParamFromShader;
    exports.getTypeDefaultString = getTypeDefaultString;
    exports.getTypeString = getTypeString;
    exports.isSamplerType = isSamplerType;
    exports.normalizeGPUExtent3D = normalizeGPUExtent3D;
    exports.numMipLevels = numMipLevels;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.webgpu_2D.js.map
