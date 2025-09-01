(function (exports, Laya) {
    'use strict';

    class Physics2DOption {
    }
    Physics2DOption.allowSleeping = false;
    Physics2DOption.gravity = { x: 0, y: 9.8 };
    Physics2DOption.customUpdate = false;
    Physics2DOption.velocityIterations = 8;
    Physics2DOption.positionIterations = 3;
    Physics2DOption.pixelRatio = 50;
    Physics2DOption.debugDraw = true;
    Physics2DOption.drawShape = true;
    Physics2DOption.drawJoint = true;
    Physics2DOption.drawAABB = false;
    Physics2DOption.drawCenterOfMass = false;
    Physics2DOption.subStep = 1;

    class Physics2D extends Laya.EventDispatcher {
        static get I() {
            return Physics2D._I || (Physics2D._I = new Physics2D());
        }
        _addRigidBody(body) {
            this._rigiBodyList.add(body);
        }
        _removeRigidBody(body) {
            this._rigiBodyList.remove(body);
        }
        _update() {
            var delta = Math.min(Laya.ILaya.timer.delta / 1000, 0.033);
            this._factory.update(delta);
            this._updatePhysicsTransformToRender();
        }
        _updatePhysicsTransformToRender() {
            for (var i = 0, n = this._rigiBodyList.length; i < n; i++) {
                this._rigiBodyList.elements[i]._updatePhysicsTransformToRender();
            }
        }
        enable() {
            if (this._factory) {
                if (Laya.PlayerConfig.physics2D != null)
                    Object.assign(Physics2DOption, Laya.PlayerConfig.physics2D);
                return this._factory.initialize().then(() => {
                    this.start();
                    return Promise.resolve();
                });
            }
            else
                return Promise.resolve();
        }
        start() {
            if (!this._enabled) {
                this._enabled = true;
            }
            if (!this._rigiBodyList)
                this._rigiBodyList = new Laya.SingletonList();
            else
                this._rigiBodyList.clear();
            if (!Physics2DOption.customUpdate && Laya.LayaEnv.isPlaying)
                Laya.ILaya.physicsTimer.frameLoop(1, this, this._update);
        }
        destroyWorld() {
            this._enabled = false;
            Laya.ILaya.physicsTimer.clear(this, this._update);
        }
        stop() {
            this._rigiBodyList.clear();
            Laya.ILaya.physicsTimer.clear(this, this._update);
        }
    }
    Laya.Laya.addInitCallback(() => Physics2D.I.enable());

    exports.EPhycis2DBlit = void 0;
    (function (EPhycis2DBlit) {
        EPhycis2DBlit[EPhycis2DBlit["None"] = 0] = "None";
        EPhycis2DBlit[EPhycis2DBlit["Shape"] = 1] = "Shape";
        EPhycis2DBlit[EPhycis2DBlit["Joint"] = 2] = "Joint";
        EPhycis2DBlit[EPhycis2DBlit["AABB"] = 4] = "AABB";
        EPhycis2DBlit[EPhycis2DBlit["Pair"] = 8] = "Pair";
        EPhycis2DBlit[EPhycis2DBlit["CenterOfMass"] = 16] = "CenterOfMass";
        EPhycis2DBlit[EPhycis2DBlit["All"] = 31] = "All";
    })(exports.EPhycis2DBlit || (exports.EPhycis2DBlit = {}));
    exports.EPhysics2DJoint = void 0;
    (function (EPhysics2DJoint) {
        EPhysics2DJoint[EPhysics2DJoint["DistanceJoint"] = 0] = "DistanceJoint";
        EPhysics2DJoint[EPhysics2DJoint["RevoluteJoint"] = 1] = "RevoluteJoint";
        EPhysics2DJoint[EPhysics2DJoint["GearJoint"] = 2] = "GearJoint";
        EPhysics2DJoint[EPhysics2DJoint["PulleyJoint"] = 3] = "PulleyJoint";
        EPhysics2DJoint[EPhysics2DJoint["WheelJoint"] = 4] = "WheelJoint";
        EPhysics2DJoint[EPhysics2DJoint["WeldJoint"] = 5] = "WeldJoint";
        EPhysics2DJoint[EPhysics2DJoint["MouseJoint"] = 6] = "MouseJoint";
        EPhysics2DJoint[EPhysics2DJoint["MotorJoint"] = 7] = "MotorJoint";
        EPhysics2DJoint[EPhysics2DJoint["PrismaticJoint"] = 8] = "PrismaticJoint";
    })(exports.EPhysics2DJoint || (exports.EPhysics2DJoint = {}));
    exports.EPhysics2DShape = void 0;
    (function (EPhysics2DShape) {
        EPhysics2DShape[EPhysics2DShape["BoxShape"] = 0] = "BoxShape";
        EPhysics2DShape[EPhysics2DShape["CircleShape"] = 1] = "CircleShape";
        EPhysics2DShape[EPhysics2DShape["PolygonShape"] = 2] = "PolygonShape";
        EPhysics2DShape[EPhysics2DShape["ChainShape"] = 3] = "ChainShape";
        EPhysics2DShape[EPhysics2DShape["EdgeShape"] = 4] = "EdgeShape";
    })(exports.EPhysics2DShape || (exports.EPhysics2DShape = {}));
    class Physics2DHitResult {
        constructor() {
            this.hitPoint = new Laya.Vector2();
            this.hitNormal = new Laya.Vector2();
            this.fraction = 0;
        }
    }
    class FilterData {
        constructor() {
            this.group = 0;
            this.category = 1;
            this.mask = -1;
        }
    }
    class Box2DShapeDef {
        constructor() {
            this.density = 1;
            this.friction = 0.2;
            this.isSensor = false;
            this.restitution = 0;
            this.restitutionThreshold = 1.0;
            this.filter = new FilterData();
        }
    }
    class RigidBody2DInfo {
        constructor() {
            this.position = new Laya.Vector2();
            this.linearVelocity = new Laya.Vector2();
            this.type = "static";
        }
    }
    class physics2D_BaseJointDef {
    }
    class physics2D_DistancJointDef extends physics2D_BaseJointDef {
        constructor() {
            super(...arguments);
            this.localAnchorA = new Laya.Vector2();
            this.localAnchorB = new Laya.Vector2();
        }
    }
    class physics2D_GearJointDef extends physics2D_BaseJointDef {
    }
    class physics2D_MotorJointDef extends physics2D_BaseJointDef {
        constructor() {
            super(...arguments);
            this.linearOffset = new Laya.Vector2();
        }
    }
    class physics2D_MouseJointJointDef extends physics2D_BaseJointDef {
        constructor() {
            super(...arguments);
            this.target = new Laya.Vector2();
        }
    }
    class physics2D_PrismaticJointDef extends physics2D_BaseJointDef {
        constructor() {
            super(...arguments);
            this.anchor = new Laya.Vector2();
            this.axis = new Laya.Vector2();
        }
    }
    class physics2D_PulleyJointDef extends physics2D_BaseJointDef {
        constructor() {
            super(...arguments);
            this.groundAnchorA = new Laya.Vector2();
            this.groundAnchorB = new Laya.Vector2();
            this.localAnchorA = new Laya.Vector2();
            this.localAnchorB = new Laya.Vector2();
        }
    }
    class physics2D_RevoluteJointDef extends physics2D_BaseJointDef {
        constructor() {
            super(...arguments);
            this.anchor = new Laya.Vector2();
        }
    }
    class physics2D_WeldJointDef extends physics2D_BaseJointDef {
        constructor() {
            super(...arguments);
            this.anchor = new Laya.Vector2();
        }
    }
    class physics2D_WheelJointDef extends physics2D_BaseJointDef {
        constructor() {
            super(...arguments);
            this.anchor = new Laya.Vector2();
            this.axis = new Laya.Vector2();
        }
    }
    class box2DWorldDef {
        constructor() {
            this.gravity = new Laya.Vector2(0, -9.8);
            this.pixelRatio = 50;
            this.subStep = 1;
            this.velocityIterations = 8;
            this.positionIterations = 3;
        }
    }
    exports.Ebox2DType = void 0;
    (function (Ebox2DType) {
        Ebox2DType[Ebox2DType["b2Color"] = 0] = "b2Color";
        Ebox2DType[Ebox2DType["b2Vec2"] = 1] = "b2Vec2";
        Ebox2DType[Ebox2DType["b2Transform"] = 2] = "b2Transform";
        Ebox2DType[Ebox2DType["b2Contact"] = 3] = "b2Contact";
        Ebox2DType[Ebox2DType["b2Joint"] = 4] = "b2Joint";
        Ebox2DType[Ebox2DType["b2Fixture"] = 5] = "b2Fixture";
        Ebox2DType[Ebox2DType["b2Filter"] = 6] = "b2Filter";
        Ebox2DType[Ebox2DType["b2QueryCallback"] = 7] = "b2QueryCallback";
        Ebox2DType[Ebox2DType["b2RayCastCallback"] = 8] = "b2RayCastCallback";
    })(exports.Ebox2DType || (exports.Ebox2DType = {}));

    class Physics2DDebugDraw extends Laya.Sprite {
        get mG() {
            return this._mG;
        }
        get textG() {
            return this._textG;
        }
        get lineWidth() {
            return this._lineWidth;
        }
        get camera() {
            return this._camera;
        }
        set physics2DWorld(world) {
            this._physics2DWorld = world;
        }
        constructor() {
            super();
            this._lineWidth = 3;
            this._matrix = new Laya.Matrix();
            this._cmdDrawLineList = [];
            this._linePointsList = [];
            this._cmdDrawMeshList = [];
            this._meshList = [];
            this.DrawString_color = "#E69999";
            this.Red = "#ff0000";
            this.Green = "#00ff00";
            this._camera = {};
            this._camera.m_center = new Laya.Vector2(0, 0);
            this._camera.m_extent = 25;
            this._camera.m_zoom = 1;
            this._camera.m_width = 1280;
            this._camera.m_height = 800;
            this._mG = new Laya.Graphics();
            this.graphics = this._mG;
            this._textSp = new Laya.Sprite();
            this._textG = this._textSp.graphics;
            this.addChild(this._textSp);
            this._cmdBuffer = new Laya.CommandBuffer2D("Physics2DDebugDraw");
            this.material = new Laya.Material();
            this.material.setShaderName("baseRender2D");
        }
        _renderToGraphic() {
            if (!this._physics2DWorld)
                return;
            this._textG.clear();
            this._mG.clear();
            this._mG.save();
            this._mG.scale(this._physics2DWorld.getPixel_Ratio(), this._physics2DWorld.getPixel_Ratio());
            if (this._scene._area2Ds.length != 0) {
                for (let i = 0; i < this._scene._area2Ds.length; i++) {
                    let area = this._scene._area2Ds[i];
                    if (area && area.mainCamera) {
                        let shaderData = this._scene.sceneShaderData;
                        if (shaderData) {
                            shaderData.addDefine(Laya.Camera2D.SHADERDEFINE_CAMERA2D);
                        }
                        break;
                    }
                }
            }
            this._cmdBuffer.setRenderTarget(null, false);
            for (let i = 0; i < this._cmdDrawMeshList.length; i++) {
                let cmd = this._cmdDrawMeshList[i];
                this._cmdBuffer.addCacheCommand(cmd);
            }
            for (let i = 0; i < this._cmdDrawLineList.length; i++) {
                let cmd = this._cmdDrawLineList[i];
                this._cmdBuffer.addCacheCommand(cmd);
            }
            this._cmdBuffer.apply(true);
            this._cmdBuffer.clear(false);
            for (let i = 0; i < this._cmdDrawMeshList.length; i++) {
                let cmd = this._cmdDrawMeshList[i];
                cmd.recover();
            }
            for (let i = 0; i < this._meshList.length; i++) {
                let mesh = this._meshList[i];
                mesh.destroy();
            }
            for (let i = 0; i < this._cmdDrawLineList.length; i++) {
                let cmd = this._cmdDrawLineList[i];
                cmd.recover();
            }
            for (let i = 0; i < this._linePointsList.length; i++) {
                this._linePointsList[i];
            }
            this._cmdDrawLineList.length = 0;
            this._cmdDrawMeshList.length = 0;
            if (this._scene._area2Ds.length != 0) {
                for (let i = 0; i < this._scene._area2Ds.length; i++) {
                    let area = this._scene._area2Ds[i];
                    if (area && area.mainCamera) {
                        let shaderData = this._scene.sceneShaderData;
                        if (shaderData) {
                            shaderData.removeDefine(Laya.Camera2D.SHADERDEFINE_CAMERA2D);
                        }
                        break;
                    }
                }
            }
            this._mG.restore();
        }
        render(ctx, x, y) {
            if (!Laya.LayaEnv.isPlaying)
                return;
            this._renderToGraphic();
            super.render(ctx, x, y);
        }
        PushTransform(tx, ty, angle) {
            this._mG.save();
            this._mG.translate(tx, ty);
            this._mG.rotate(angle);
        }
        PopTransform() {
            this._mG.restore();
        }
        createMesh2DByVertices(vertices) {
            const pointCount = vertices.length / 2;
            if (pointCount < 3)
                return null;
            let vertexs = new Float32Array(pointCount * 5);
            let minX = Number.MAX_VALUE, minY = Number.MAX_VALUE;
            let maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE;
            for (let i = 0; i < vertices.length; i += 2) {
                minX = Math.min(minX, vertices[i]);
                maxX = Math.max(maxX, vertices[i]);
                minY = Math.min(minY, vertices[i + 1]);
                maxY = Math.max(maxY, vertices[i + 1]);
            }
            const width = maxX - minX;
            const height = maxY - minY;
            let pos = 0;
            for (let i = 0; i < pointCount; i++, pos += 5) {
                const x = vertices[i * 2];
                const y = vertices[i * 2 + 1];
                vertexs[pos + 0] = x;
                vertexs[pos + 1] = y;
                vertexs[pos + 2] = 0;
                vertexs[pos + 3] = (x - minX) / width;
                vertexs[pos + 4] = (y - minY) / height;
            }
            let index = new Uint16Array((pointCount - 2) * 3);
            let ibIndex = 0;
            for (let i = 1; i < pointCount - 1; i++) {
                index[ibIndex++] = 0;
                index[ibIndex++] = i;
                index[ibIndex++] = i + 1;
            }
            const declaration = Laya.VertexMesh2D.getVertexDeclaration(["POSITION,UV"], false)[0];
            let mesh2D = Laya.Mesh2D.createMesh2DByPrimitive([vertexs], [declaration], index, Laya.IndexFormat.UInt16, [{ length: index.length, start: 0 }]);
            return mesh2D;
        }
        createCircleMeshByVertices(center, radius, numSegments) {
            const twoPi = Math.PI * 2;
            let vertices = new Float32Array((numSegments + 1) * 5);
            let indices = new Uint16Array(numSegments * 3);
            let pos = 0;
            for (let i = 0; i < numSegments; i++, pos += 5) {
                const angle = twoPi * i / numSegments;
                const x = center.x + radius * Math.cos(angle);
                const y = center.y + radius * Math.sin(angle);
                vertices[pos] = x;
                vertices[pos + 1] = y;
                vertices[pos + 2] = 0;
                vertices[pos + 3] = 0.5 + (x - center.x) / (2 * radius);
                vertices[pos + 4] = 0.5 + (y - center.y) / (2 * radius);
            }
            vertices[pos] = center.x;
            vertices[pos + 1] = center.y;
            vertices[pos + 2] = 0;
            vertices[pos + 3] = 0.5;
            vertices[pos + 4] = 0.5;
            let ibIndex = 0;
            for (let i = 1; i < numSegments; i++, ibIndex += 3) {
                indices[ibIndex] = i;
                indices[ibIndex + 1] = i - 1;
                indices[ibIndex + 2] = numSegments;
            }
            indices[ibIndex] = 0;
            indices[ibIndex + 1] = numSegments - 1;
            indices[ibIndex + 2] = numSegments;
            var declaration = Laya.VertexMesh2D.getVertexDeclaration(["POSITION,UV"], false)[0];
            let mesh2D = Laya.Mesh2D.createMesh2DByPrimitive([vertices], [declaration], indices, Laya.IndexFormat.UInt16, [{ length: indices.length, start: 0 }]);
            return mesh2D;
        }
        addMeshDebugDrawCMD(mesh2D, color, matrix) {
            if (!matrix)
                matrix = this._matrix;
            let cmd = Laya.DrawMesh2DCMD.create(mesh2D, matrix, Laya.Texture2D.whiteTexture, color, this._material);
            cmd && this._cmdDrawMeshList.push(cmd);
            this._meshList.push(mesh2D);
        }
        addLineDebugDrawCMD(points, color, lineWidth, matrix) {
            if (!matrix)
                matrix = this._matrix;
            let cmd = Laya.Draw2DLineCMD.create(points, matrix, color, lineWidth);
            cmd && this._cmdDrawLineList.push(cmd);
            this._linePointsList.push(points);
        }
        destroy() {
            super.destroy();
            this._cmdBuffer && this._cmdBuffer.clear(false);
            this._material && this._material.destroy();
            this._material && (this._material = null);
            this._cmdBuffer && (this._cmdBuffer = null);
            this._cmdDrawLineList && (this._cmdDrawLineList.length = 0);
            this._cmdDrawMeshList && (this._cmdDrawMeshList.length = 0);
        }
    }

    class Physics2DWorldManager {
        get box2DWorld() {
            return this._box2DWorld;
        }
        get gravity() {
            return this._gravity;
        }
        Init(data) {
            var _a;
            let layerIndex = parseInt(data);
            let configlayer = (_a = Laya.PlayerConfig.physics2D) === null || _a === void 0 ? void 0 : _a.addConfig[layerIndex];
            if (!configlayer)
                return;
            this._worldDef.pixelRatio = this._pixelRatio = configlayer.pixelRatio ? configlayer.pixelRatio : Physics2DOption.pixelRatio;
            this._RePixelRatio = 1 / this._pixelRatio;
            this._worldDef.subStep = this._subStep = configlayer.subStep ? configlayer.subStep : Physics2DOption.subStep;
            this._worldDef.velocityIterations = this._velocityIterations = configlayer.velocityIterations ? configlayer.velocityIterations : Physics2DOption.velocityIterations;
            this._worldDef.positionIterations = this._positionIterations = configlayer.positionIterations ? configlayer.positionIterations : Physics2DOption.positionIterations;
            this._worldDef.gravity = this._gravity.setValue(configlayer.gravity.x ? configlayer.gravity.x : Physics2DOption.gravity.x, configlayer.gravity.y ? configlayer.gravity.y : Physics2DOption.gravity.x);
            this._allowWorldSleep = configlayer.allowSleeping;
            if (this._box2DWorld) {
                this.destroy();
                this._eventList = [];
            }
            this.setRootSprite(this._scene);
            if (configlayer.debugDraw && Laya.LayaEnv.isPlaying) {
                this.enableDebugDraw(configlayer.drawShape, exports.EPhycis2DBlit.Shape);
                this.enableDebugDraw(configlayer.drawJoint, exports.EPhycis2DBlit.Joint);
                this.enableDebugDraw(configlayer.drawAABB, exports.EPhycis2DBlit.AABB);
                this.enableDebugDraw(configlayer.drawCenterOfMass, exports.EPhycis2DBlit.CenterOfMass);
            }
        }
        constructor(scene) {
            this._pixelRatio = 50;
            this._RePixelRatio = 1 / this._pixelRatio;
            this._subStep = 1;
            this._velocityIterations = 8;
            this._positionIterations = 8;
            this._gravity = new Laya.Vector2(0, -9.8);
            this._worldDef = new box2DWorldDef();
            this._eventList = [];
            this._enableDraw = false;
            this._allowWorldSleep = false;
            this._worldDef.pixelRatio = this._pixelRatio = Physics2DOption.pixelRatio;
            this._RePixelRatio = 1 / this._pixelRatio;
            this._worldDef.subStep = this._subStep = Physics2DOption.subStep;
            this._worldDef.velocityIterations = this._velocityIterations = Physics2DOption.velocityIterations;
            this._worldDef.positionIterations = this._positionIterations = Physics2DOption.positionIterations;
            this._worldDef.gravity = this._gravity.setValue(Physics2DOption.gravity.x, Physics2DOption.gravity.y);
            this._allowWorldSleep = Physics2DOption.allowSleeping;
            this._scene = scene;
            this.setRootSprite(this._scene);
        }
        update(dt) {
        }
        setRootSprite(scene) {
            this._scene = scene;
            this._box2DWorld = Physics2D.I._factory.createWorld(this._worldDef);
            Physics2D.I._factory.allowWorldSleep(this._box2DWorld, this._allowWorldSleep);
            this._box2DWorld._pixelRatio = this._pixelRatio;
            this._box2DWorld._indexInMap = Physics2D.I._factory.worldCount;
            Physics2D.I._factory.worldMap.set(Physics2D.I._factory.worldCount, this);
            Physics2D.I._factory.worldCount++;
            this._contactListener = Physics2D.I._factory.createContactListener();
            this._contactListener = this._worldContactCallback(this._contactListener);
            Physics2D.I._factory.setContactListener(this._box2DWorld, this._contactListener);
            this._JSRayCastcallback = Physics2D.I._factory.createJSRayCastCallback();
            this._JSQuerycallback = Physics2D.I._factory.createJSQueryCallback();
            if (Physics2DOption.debugDraw && Laya.LayaEnv.isPlaying) {
                this.enableDebugDraw(Physics2DOption.drawShape, exports.EPhycis2DBlit.Shape);
                this.enableDebugDraw(Physics2DOption.drawJoint, exports.EPhycis2DBlit.Joint);
                this.enableDebugDraw(Physics2DOption.drawAABB, exports.EPhycis2DBlit.AABB);
                this.enableDebugDraw(Physics2DOption.drawCenterOfMass, exports.EPhycis2DBlit.CenterOfMass);
            }
        }
        setGravity(gravity) {
            this._gravity = gravity;
        }
        getRootSprite() {
            return this._scene;
        }
        shiftOrigin(newOrigin) {
            Physics2D.I._factory.shiftOrigin(this._box2DWorld, newOrigin);
        }
        enableDebugDraw(enable, bli) {
            if (!this._debugDraw) {
                this._debugDraw = new Physics2DDebugDraw();
                this._debugDraw.physics2DWorld = this;
                this._scene.addChild(this._debugDraw);
                this._debugDraw.zOrder = 1000;
            }
            this._enableDraw = enable;
            this._enableBox2DDraw(bli);
        }
        setPixel_Ratio(pixelRatio) {
            this._pixelRatio = pixelRatio;
        }
        getPixel_Ratio() {
            return this._pixelRatio;
        }
        setSubStep(subStep) {
            this._subStep = subStep;
        }
        getSubStep() {
            return this._subStep;
        }
        sendEvent() {
            let length = this._eventList.length;
            if (length > 0) {
                for (let i = 0; i < length; i += 2) {
                    this._dispatchEvent(this._eventList[i], this._eventList[i + 1]);
                }
                this._eventList.length = 0;
            }
        }
        setVelocityIterations(velocityIterations) {
            this._velocityIterations = velocityIterations;
        }
        getVelocityIterations() {
            return this._velocityIterations;
        }
        setPositionIterations(positionIterations) {
            this._positionIterations = positionIterations;
        }
        getPositionIterations() {
            return this._positionIterations;
        }
        getBodyCount() {
            return Physics2D.I._factory.getBodyCount(this._box2DWorld);
        }
        getJointCount() {
            return Physics2D.I._factory.getJointCount(this._box2DWorld);
        }
        getContactCount() {
            return Physics2D.I._factory.getContactCount(this._box2DWorld);
        }
        layaToPhysics2D(value) {
            return value * this._RePixelRatio;
        }
        physics2DToLaya(value) {
            return value * this._pixelRatio;
        }
        clearAllForces() {
            this._box2DWorld && Physics2D.I._factory.clearForces(this._box2DWorld);
        }
        QueryAABB(res, bounds) {
            this._JSQuerycallback.ReportFixture = function _callback(warp) {
                let fixture = Physics2D.I._factory.warpPoint(warp, exports.Ebox2DType.b2Fixture);
                if (fixture) {
                    let collider = fixture.collider;
                    collider && res.push(collider);
                    return true;
                }
                else {
                    return false;
                }
            };
            Physics2D.I._factory.QueryAABB(this._box2DWorld, this._JSQuerycallback, bounds);
        }
        RayCast(res, startPos, endPos) {
            let callback = (warp, point, normal, fraction) => {
                let fixture = Physics2D.I._factory.warpPoint(warp, exports.Ebox2DType.b2Fixture);
                point = Physics2D.I._factory.warpPoint(point, exports.Ebox2DType.b2Vec2);
                normal = Physics2D.I._factory.warpPoint(normal, exports.Ebox2DType.b2Vec2);
                if (!fixture)
                    return 1;
                let hitRes = new Physics2DHitResult();
                let collider = fixture.collider;
                hitRes.collider = collider;
                hitRes.hitPoint.x = this.physics2DToLaya(point.x);
                hitRes.hitPoint.y = this.physics2DToLaya(point.y);
                hitRes.hitNormal.x = this.physics2DToLaya(normal.x);
                hitRes.hitNormal.y = this.physics2DToLaya(normal.y);
                hitRes.fraction = fraction;
                res.push(hitRes);
                if (collider) {
                    return 1;
                }
                else {
                    return 0;
                }
            };
            this._JSRayCastcallback.ReportFixture = callback.bind(this);
            Physics2D.I._factory.RayCast(this._box2DWorld, this._JSRayCastcallback, startPos, endPos);
        }
        destroy() {
            Physics2D.I._factory.removeBody(this._box2DWorld, Physics2D.I._emptyBody);
            Physics2D.I._emptyBody = null;
            Laya.Laya.timer.callLater(this, () => {
                Physics2D.I._factory.destroyWorld(this._box2DWorld);
            });
            if (this._enableDraw || this._debugDraw) {
                this._debugDraw.removeSelf();
                this._debugDraw.destroy();
                this._debugDraw = null;
            }
            Physics2D.I._factory.worldMap.delete(this._box2DWorld._indexInMap);
            this._box2DWorld = null;
            this._eventList = null;
        }
        _worldBeginContactCallback(contact) {
            let contactInfo = Physics2D.I._factory.warpPoint(contact, exports.Ebox2DType.b2Contact);
            this._eventList.push("triggerenter", contactInfo);
        }
        _worldEndContactCallback(contact) {
            let contactInfo = Physics2D.I._factory.warpPoint(contact, exports.Ebox2DType.b2Contact);
            this._eventList.push("triggerexit", contactInfo);
        }
        _worldPreSolveCallback(contact, oldManifold) {
            let contactInfo = Physics2D.I._factory.warpPoint(contact, exports.Ebox2DType.b2Contact);
            this._eventList.push("triggerstay", contactInfo);
        }
        _worldPostSolveCallback(contact, impulse) {
        }
        _worldBeginTriggerCallback(contact) {
        }
        _worldEndTriggerCallback(contact) {
        }
        _worldPreTriggerCallback(contact, oldManifold) {
        }
        _worldPostTriggerCallback(contact, impulse) {
        }
        _worldContactCallback(contactListener) {
            contactListener.BeginContact = this._worldBeginContactCallback.bind(this);
            contactListener.EndContact = this._worldEndContactCallback.bind(this);
            contactListener.PreSolve = this._worldPreSolveCallback.bind(this);
            contactListener.PostSolve = this._worldPostSolveCallback.bind(this);
            return contactListener;
        }
        _makeStyleString(color, alpha = -1) {
            let outColor = new Laya.Color();
            let colorData = Physics2D.I._factory.warpPoint(color, exports.Ebox2DType.b2Color);
            let r = colorData.r;
            let g = colorData.g;
            let b = colorData.b;
            outColor.r = r;
            outColor.g = g;
            outColor.b = b;
            outColor.a = alpha;
            return outColor;
        }
        _enableBox2DDraw(flag) {
            if (!this._jsDraw) {
                this._jsDraw = Physics2D.I._factory.createBox2DDraw(this._box2DWorld, flag);
                this._jsDraw.DrawSegment = this._debugDrawSegment.bind(this);
                this._jsDraw.DrawPolygon = this._debugDrawPolygon.bind(this);
                this._jsDraw.DrawSolidPolygon = this._debugDrawSolidPolygon.bind(this);
                this._jsDraw.DrawCircle = this._debugDrawCircle.bind(this);
                this._jsDraw.DrawSolidCircle = this._debugDrawSolidCircle.bind(this);
                this._jsDraw.DrawTransform = this._debugDrawTransform.bind(this);
                this._jsDraw.DrawPoint = this._debugDrawPoint.bind(this);
                this._jsDraw.DrawAABB = this._debugDrawAABB.bind(this);
            }
            if (this._enableDraw) {
                Physics2D.I._factory.appendFlags(this._jsDraw, flag);
            }
            else {
                Physics2D.I._factory.clearFlags(this._jsDraw, flag);
            }
        }
        _scaleSizeXByScaleMode(x) {
            let value = x;
            value *= Laya.ILaya.stage.clientScaleX;
            return value;
        }
        _scaleSizeYByScaleMode(y) {
            let value = y;
            value *= Laya.ILaya.stage.clientScaleY;
            return value;
        }
        _debugDrawSegment(p1, p2, color) {
            p1 = Physics2D.I._factory.warpPoint(p1, exports.Ebox2DType.b2Vec2);
            p2 = Physics2D.I._factory.warpPoint(p2, exports.Ebox2DType.b2Vec2);
            let p1x = this.physics2DToLaya(this._scaleSizeXByScaleMode(p1.x));
            let p1y = this.physics2DToLaya(this._scaleSizeYByScaleMode(p1.y));
            let p2x = this.physics2DToLaya(this._scaleSizeXByScaleMode(p2.x));
            let p2y = this.physics2DToLaya(this._scaleSizeYByScaleMode(p2.y));
            let points = [];
            points.push(p1x);
            points.push(p1y);
            points.push(p2x);
            points.push(p2y);
            let outColor = this._makeStyleString(color, 1);
            this._debugDraw.addLineDebugDrawCMD(points, outColor, this._debugDraw.lineWidth);
        }
        _debugDrawPolygon(vertices, vertexCount, color) {
            let points = [];
            for (let i = 0; i < vertexCount; i++) {
                let vert = Physics2D.I._factory.warpPoint(vertices + (i * 8), exports.Ebox2DType.b2Vec2);
                vert.x = this.physics2DToLaya(this._scaleSizeXByScaleMode(vert.x));
                vert.y = this.physics2DToLaya(this._scaleSizeYByScaleMode(vert.y));
                points.push(vert.x, vert.y);
            }
            let outColor = this._makeStyleString(color, 1);
            let mesh2d = this._debugDraw.createMesh2DByVertices(points);
            this._debugDraw.addMeshDebugDrawCMD(mesh2d, outColor);
        }
        _debugDrawSolidPolygon(vertices, vertexCount, color) {
            let points = [];
            for (let i = 0; i < vertexCount; i++) {
                let vert = Physics2D.I._factory.warpPoint(vertices + (i * 8), exports.Ebox2DType.b2Vec2);
                vert.x = this.physics2DToLaya(this._scaleSizeXByScaleMode(vert.x));
                vert.y = this.physics2DToLaya(this._scaleSizeYByScaleMode(vert.y));
                points.push(vert.x, vert.y);
            }
            let outColor = this._makeStyleString(color, 0.5);
            let mesh2D = this._debugDraw.createMesh2DByVertices(points);
            this._debugDraw.addMeshDebugDrawCMD(mesh2D, outColor);
        }
        _debugDrawCircle(center, radius, color) {
            let centerV = Physics2D.I._factory.warpPoint(center, exports.Ebox2DType.b2Vec2);
            let x = this.physics2DToLaya(this._scaleSizeXByScaleMode(centerV.x));
            let y = this.physics2DToLaya(this._scaleSizeYByScaleMode(centerV.y));
            radius = this.physics2DToLaya(this._scaleSizeYByScaleMode(radius));
            let outColor = this._makeStyleString(color, 1);
            let mesh2D = this._debugDraw.createCircleMeshByVertices({ x: x, y: y }, radius, 100);
            this._debugDraw.addMeshDebugDrawCMD(mesh2D, outColor);
        }
        _debugDrawSolidCircle(center, radius, axis, color) {
            center = Physics2D.I._factory.warpPoint(center, exports.Ebox2DType.b2Vec2);
            axis = Physics2D.I._factory.warpPoint(axis, exports.Ebox2DType.b2Vec2);
            let cx = this.physics2DToLaya(this._scaleSizeXByScaleMode(center.x));
            let cy = this.physics2DToLaya(this._scaleSizeYByScaleMode(center.y));
            radius = this.physics2DToLaya(this._scaleSizeYByScaleMode(radius));
            let outColor = this._makeStyleString(color, 0.5);
            let mesh2d = this._debugDraw.createCircleMeshByVertices({ x: cx, y: cy }, radius, 100);
            this._debugDraw.addMeshDebugDrawCMD(mesh2d, outColor);
        }
        _debugDrawTransform(xf) {
            xf = Physics2D.I._factory.warpPoint(xf, exports.Ebox2DType.b2Transform);
            this._debugDraw.PushTransform(xf.x, xf.y, xf.angle);
            const length = 1 / Laya.Browser.pixelRatio;
            let x = this.physics2DToLaya(this._scaleSizeXByScaleMode(xf.x));
            let y = this.physics2DToLaya(this._scaleSizeYByScaleMode(xf.y));
            let point0 = [];
            point0.push(x);
            point0.push(y);
            point0.push(x + this.physics2DToLaya(length));
            point0.push(y);
            this._debugDraw.addLineDebugDrawCMD(point0, Laya.Color.RED, this._debugDraw.lineWidth);
            let point1 = [];
            point1.push(x);
            point1.push(y);
            point1.push(x);
            point1.push(y + this.physics2DToLaya(length));
            this._debugDraw.addLineDebugDrawCMD(point1, Laya.Color.GREEN, this._debugDraw.lineWidth);
            this._debugDraw.PopTransform();
        }
        _debugDrawPoint(p, size, color) {
            p = Physics2D.I._factory.warpPoint(p, exports.Ebox2DType.b2Vec2);
            size *= this._debugDraw.camera.m_zoom;
            size /= this._debugDraw.camera.m_extent;
            var hsize = size / 2;
            let outColor = this._makeStyleString(color, 1);
            let point = [];
            point.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(p.x - hsize)));
            point.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(p.y - hsize)));
            point.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(p.x + hsize)));
            point.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(p.y - hsize)));
            point.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(p.x + hsize)));
            point.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(p.y + hsize)));
            point.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(p.x - hsize)));
            point.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(p.y + hsize)));
            this._debugDraw.addLineDebugDrawCMD(point, outColor, this._debugDraw.lineWidth);
        }
        _debugDrawAABB(min, max, color) {
            min = Physics2D.I._factory.warpPoint(min, exports.Ebox2DType.b2Vec2);
            max = Physics2D.I._factory.warpPoint(max, exports.Ebox2DType.b2Vec2);
            var cx = (max.x + min.x) * 0.5;
            var cy = (max.y + min.y) * 0.5;
            var hw = (max.x - min.x) * 0.5;
            var hh = (max.y - min.y) * 0.5;
            let outColor = this._makeStyleString(color, 1);
            this._debugDraw.lineWidth;
            let point0 = [];
            point0.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(cx - hw)));
            point0.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(cy - hh)));
            point0.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(cx + hw)));
            point0.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(cy - hh)));
            this._debugDraw.addLineDebugDrawCMD(point0, outColor, this._debugDraw.lineWidth);
            let point1 = [];
            point1.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(cx - hw)));
            point1.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(cy + hh)));
            point1.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(cx + hw)));
            point1.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(cy + hh)));
            this._debugDraw.addLineDebugDrawCMD(point1, outColor, this._debugDraw.lineWidth);
            let point2 = [];
            point2.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(cx - hw)));
            point2.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(cy - hh)));
            point2.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(cx - hw)));
            point2.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(cy + hh)));
            this._debugDraw.addLineDebugDrawCMD(point2, outColor, this._debugDraw.lineWidth);
            let point3 = [];
            point3.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(cx + hw)));
            point3.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(cy - hh)));
            point3.push(this.physics2DToLaya(this._scaleSizeXByScaleMode(cx + hw)));
            point3.push(this.physics2DToLaya(this._scaleSizeYByScaleMode(cy + hh)));
            this._debugDraw.addLineDebugDrawCMD(point3, outColor, this._debugDraw.lineWidth);
        }
        _dispatchEvent(type, contact) {
            let contactShapeA = Physics2D.I._factory.getContactShapeA(contact);
            let contactShapeB = Physics2D.I._factory.getContactShapeB(contact);
            if (contactShapeA == null || contactShapeB == null) {
                return;
            }
            let colliderA = contactShapeA.collider;
            let colliderB = contactShapeB.collider;
            if (colliderA == null || colliderB == null) {
                return;
            }
            if (colliderA.destroyed || colliderB.destroyed) {
                return;
            }
            let ownerA = colliderA.owner;
            let ownerB = colliderB.owner;
            contact.getHitInfo = function () {
            };
            if (ownerA) {
                var args = [colliderB, colliderA, contact];
                ownerA.event(type, args);
            }
            if (ownerB) {
                args = [colliderA, colliderB, contact];
                ownerB.event(type, args);
            }
        }
    }
    Physics2DWorldManager.__managerName = "Physics2DWorldManager";
    Laya.Scene.regManager(Physics2DWorldManager.__managerName, Physics2DWorldManager);

    class ColliderBase extends Laya.Component {
        get isConnectedJoint() {
            return this._isConnectedJoint;
        }
        set isConnectedJoint(value) {
            this._isConnectedJoint = value;
        }
        get inertia() {
            let inertia;
            if (this._useAutoMass) {
                inertia = this.getInertia();
            }
            else {
                inertia = this._inertia;
            }
            return inertia;
        }
        set inertia(value) {
            this._inertia = value;
            if (!this._useAutoMass) {
                this._box2DBody && Physics2D.I._factory.set_rigidBody_Mass(this._box2DBody, this._mass, this._centerOfMass, this._inertia, this._massData);
            }
        }
        get centerOfMass() {
            let center;
            if (this._useAutoMass && this._box2DBody) {
                center = Physics2D.I._factory.get_rigidBody_Center(this._box2DBody);
                this._centerOfMass.x = center.x;
                this._centerOfMass.y = center.y;
            }
            else {
                center = this._centerOfMass;
            }
            return center;
        }
        set centerOfMass(value) {
            if (value instanceof Laya.Vector2) {
                this._centerOfMass = value;
            }
            else {
                this._centerOfMass.x = value.x;
                this._centerOfMass.y = value.y;
            }
            if (!this._useAutoMass) {
                this._box2DBody && Physics2D.I._factory.set_rigidBody_Mass(this._box2DBody, this._mass, this._centerOfMass, this._inertia, this._massData);
            }
        }
        get mass() {
            let mass;
            if (this._useAutoMass && this._box2DBody) {
                mass = Physics2D.I._factory.get_rigidBody_Mass(this._box2DBody);
            }
            else {
                mass = this._mass;
            }
            return mass;
        }
        set mass(value) {
            this._mass = value;
            if (!this._useAutoMass) {
                this._box2DBody && Physics2D.I._factory.set_rigidBody_Mass(this._box2DBody, this._mass, this._centerOfMass, this._inertia, this._massData);
            }
        }
        get useAutoMass() {
            return this._useAutoMass;
        }
        set useAutoMass(value) {
            this._useAutoMass = value;
            this._box2DBody && Physics2D.I._factory.set_rigidBody_Mass(this._box2DBody, this._mass, this._centerOfMass, this._inertia, this._massData);
        }
        get isAwake() {
            if (this._box2DBody) {
                this._isAwake = Physics2D.I._factory.get_rigidBody_IsAwake(this._box2DBody);
            }
            return this.isAwake;
        }
        set isAwake(value) {
            this._isAwake = value;
            this._box2DBody && Physics2D.I._factory.set_rigidBody_Awake(this._box2DBody, value);
        }
        get scaleX() {
            return this.owner.globalTrans.scaleX;
        }
        get scaleY() {
            return this.owner.globalTrans.scaleY;
        }
        get pivotoffx() {
            return this._x - this.owner.pivotX;
        }
        get pivotoffy() {
            return this._y - this.owner.pivotY;
        }
        get x() {
            return this._x;
        }
        set x(value) {
            if (this._x == value)
                return;
            this._x = value;
            this._needupdataShapeAttribute();
        }
        get y() {
            return this._y;
        }
        set y(value) {
            if (this._y == value)
                return;
            this._y = value;
            this._needupdataShapeAttribute();
        }
        constructor() {
            super();
            this._isAwake = true;
            this._useAutoMass = true;
            this._mass = 1;
            this._inertia = 10;
            this._centerOfMass = new Laya.Vector2(0.5, 0.5);
            this._bodyDef = new RigidBody2DInfo();
            this._x = 0;
            this._y = 0;
            this._isConnectedJoint = false;
            this._shapeDef = new Box2DShapeDef();
            this._isSensor = false;
            this._density = 10;
            this._friction = 0.2;
            this._restitution = 0;
            this._singleton = false;
        }
        getBox2DBody() {
            if (this._box2DBody) {
                return this._box2DBody;
            }
        }
        getInertia() {
            if (!this._box2DBody)
                return this._inertia;
            return Physics2D.I._factory.get_rigidBody_Inertia(this._box2DBody);
        }
        _onEnable() {
            this._getPhysicsManager();
            this._box2DBodyDef = Physics2D.I._factory.createBodyDef(this._physics2DManager.box2DWorld, this._bodyDef);
            this._box2DBody = Physics2D.I._factory.createBody(this._physics2DManager.box2DWorld, this._box2DBodyDef);
            this.owner.on(Laya.SpriteGlobalTransform.CHANGED, this, this._needupdataShapeAttribute);
        }
        _getPhysicsManager() {
            var _a, _b;
            this._physics2DManager = (_b = (_a = this.owner) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.getComponentElementManager(Physics2DWorldManager.__managerName);
        }
        getWorldPoint(x, y) {
            return this.owner.globalTrans.localToGlobal(x, y);
        }
        _needupdataShapeAttribute() {
            if (this._rigidbody && this._rigidbody.applyOwnerColliderComponent) {
                this.createShape(this._rigidbody);
            }
            if (this._type != "dynamic") {
                var sp = this.owner;
                this._box2DBody && Physics2D.I._factory.set_RigibBody_Transform(this._box2DBody, sp.globalTrans.x, sp.globalTrans.y, Laya.Utils.toRadian(this.owner.globalTrans.rotation));
                this._box2DBody && Physics2D.I._factory.set_rigidBody_Awake(this._box2DBody, true);
            }
            this.owner.event("shapeChange");
        }
        _onDisable() {
            this._box2DBody && Physics2D.I._factory.removeBody(this._physics2DManager.box2DWorld, this._box2DBody);
            this._box2DBody = null;
            this._box2DBodyDef = null;
            this.owner.off(Laya.SpriteGlobalTransform.CHANGED, this, this._needupdataShapeAttribute);
        }
        _onDestroy() {
            this._box2DBody && Physics2D.I._factory.removeBody(this._physics2DManager.box2DWorld, this._box2DBody);
            this._box2DBodyDef && Physics2D.I._factory.destroyData(this._box2DBodyDef);
            this._box2DBody = null;
            this._box2DBodyDef = null;
        }
        get isSensor() {
            return this._isSensor;
        }
        set isSensor(value) {
            if (this._isSensor == value)
                return;
            this._isSensor = value;
            this._needupdataShapeAttribute();
        }
        get density() {
            return this._density;
        }
        set density(value) {
            if (this._density == value)
                return;
            this._density = value;
            this._needupdataShapeAttribute();
        }
        get friction() {
            return this._friction;
        }
        set friction(value) {
            if (this._friction == value)
                return;
            this._friction = value;
            this._needupdataShapeAttribute();
        }
        get restitution() {
            return this._restitution;
        }
        set restitution(value) {
            if (this._restitution == value)
                return;
            this._restitution = value;
            this._needupdataShapeAttribute();
        }
        createShape(collider) {
        }
        _setRigidbodyValue(collider) {
        }
    }

    const _tempV0$1 = new Laya.Vector2();
    const _tempP0 = new Laya.Point();
    class RigidBody extends ColliderBase {
        get body() {
            return this._box2DBody;
        }
        get type() {
            return this._type;
        }
        set type(value) {
            if (value !== "dynamic" && value !== "kinematic") {
                console.warn("Rigidbody only can set as dynamic or kinematic.");
            }
            this._type = value;
            this._updateBodyType();
        }
        get gravityScale() {
            return this._gravityScale;
        }
        set gravityScale(value) {
            this._gravityScale = value;
            if (this._box2DBody)
                Physics2D.I._factory.set_rigidBody_gravityScale(this._box2DBody, value);
        }
        get allowRotation() {
            return this._allowRotation;
        }
        set allowRotation(value) {
            this._allowRotation = value;
            if (this._box2DBody)
                Physics2D.I._factory.set_rigidBody_allowRotation(this._box2DBody, !value);
        }
        get allowSleep() {
            return this._allowSleep;
        }
        set allowSleep(value) {
            this._allowSleep = value;
            if (this._box2DBody)
                Physics2D.I._factory.set_rigidBody_allowSleep(this._box2DBody, value);
        }
        get angularDamping() {
            return this._angularDamping;
        }
        set angularDamping(value) {
            this._angularDamping = value;
            if (this._box2DBody)
                Physics2D.I._factory.set_rigidBody_angularDamping(this._box2DBody, value);
        }
        get angularVelocity() {
            if (this._box2DBody)
                return Physics2D.I._factory.get_rigidBody_angularVelocity(this._box2DBody);
            return this._angularVelocity;
        }
        set angularVelocity(value) {
            this._angularVelocity = value;
            if (this._type == "static") {
                return;
            }
            if (this._box2DBody)
                Physics2D.I._factory.set_rigidBody_angularVelocity(this._box2DBody, value);
        }
        get linearDamping() {
            return this._linearDamping;
        }
        set linearDamping(value) {
            this._linearDamping = value;
            if (this._box2DBody)
                Physics2D.I._factory.set_rigidBody_linearDamping(this._box2DBody, value);
        }
        get linearVelocity() {
            if (this._box2DBody) {
                var vec = Physics2D.I._factory.get_rigidBody_linearVelocity(this._box2DBody);
                vec.x = vec.x;
                vec.y = vec.y;
                return { x: vec.x, y: vec.y };
            }
            return this._linearVelocity;
        }
        set linearVelocity(value) {
            if (!value)
                return;
            if (value instanceof Array) {
                throw new Error('set linearVelocity: value is not implement IV2');
            }
            this._linearVelocity = value;
            if (this._type == "static") {
                return;
            }
            if (this._box2DBody)
                Physics2D.I._factory.set_rigidBody_linearVelocity(this._box2DBody, value);
        }
        get bullet() {
            return this._bullet;
        }
        set bullet(value) {
            this._bullet = value;
            if (this._box2DBody)
                Physics2D.I._factory.set_rigidBody_bullet(this._box2DBody, value);
        }
        get shapes() {
            return this._shapes;
        }
        set shapes(shapes) {
            if (!shapes || shapes.length == 0)
                return;
            this._shapes = shapes;
            shapes.forEach((shape) => {
                shape.setCollider(this);
            });
            if (this._useAutoMass) {
                this._box2DBody && Physics2D.I._factory.retSet_rigidBody_MassData(this._box2DBody);
            }
            else {
                this._box2DBody && Physics2D.I._factory.set_rigidBody_Mass(this._box2DBody, this._mass, this._centerOfMass, this._inertia, this._massData);
            }
        }
        get applyOwnerColliderComponent() {
            return this._applyOwnerColliderComponent;
        }
        set applyOwnerColliderComponent(value) {
            this._applyOwnerColliderComponent = value;
        }
        set position(pos) {
            if (!this._box2DBody)
                return;
            var factory = Physics2D.I._factory;
            let rotateValue = Laya.Utils.toAngle(factory.get_RigidBody_Angle(this._box2DBody));
            _tempP0.x = pos.x;
            _tempP0.y = pos.y;
            let globalPos = this.owner.parent.localToGlobal(_tempP0);
            factory.set_RigibBody_Transform(this._box2DBody, globalPos.x, globalPos.y, rotateValue);
            factory.set_rigidBody_Awake(this._box2DBody, true);
            Physics2D.I._addRigidBody(this);
        }
        get position() {
            if (!this._box2DBody) {
                _tempP0.x = this.owner.globalTrans.x;
                _tempP0.y = this.owner.globalTrans.y;
                return _tempP0;
            }
            var pos = Laya.Vector2.TEMP;
            Physics2D.I._factory.get_RigidBody_Position(this._box2DBody, pos);
            _tempP0.x = pos.x;
            _tempP0.y = pos.y;
            let localPos = this.owner.parent.globalToLocal(_tempP0);
            _tempP0.x = localPos.x;
            _tempP0.y = localPos.y;
            return _tempP0;
        }
        set rotation(number) {
            if (!this._box2DBody)
                return;
            var factory = Physics2D.I._factory;
            var pos = Laya.Vector2.TEMP;
            factory.get_RigidBody_Position(this._box2DBody, pos);
            pos.setValue(pos.x, pos.y);
            factory.set_RigibBody_Transform(this._box2DBody, pos.x, pos.y, number);
            factory.set_rigidBody_Awake(this._box2DBody, true);
            Physics2D.I._addRigidBody(this);
        }
        get rotation() {
            if (!this._box2DBody)
                return this.owner.rotation;
            return Laya.Utils.toAngle(Physics2D.I._factory.get_RigidBody_Angle(this._box2DBody));
        }
        constructor() {
            super();
            this._allowSleep = true;
            this._angularVelocity = 0;
            this._angularDamping = 0;
            this._linearVelocity = { x: 0, y: 0 };
            this._linearDamping = 0;
            this._bullet = false;
            this._allowRotation = true;
            this._gravityScale = 1;
            this._colliders = [];
            this.group = 0;
            this.category = 1;
            this.mask = -1;
            this.label = "RigidBody";
            this._applyOwnerColliderComponent = true;
            this._type = "dynamic";
            this._massData = Physics2D.I._factory.createMassData();
        }
        _updateBodyType() {
            if (!this._box2DBody)
                return;
            Physics2D.I._factory.set_rigidBody_type(this._box2DBody, this._type);
            if (this.type == "static") {
                Physics2D.I._removeRigidBody(this);
            }
            else {
                Physics2D.I._addRigidBody(this);
            }
        }
        _globalChangeHandler(flag) {
            this._updatePhysicsTransformToRender();
        }
        _onAwake() {
            this.owner.globalTrans.cache = true;
        }
        _setBodyDefValue() {
            if (this._type == "static") {
                let owner = this.owner;
                this._bodyDef.position.setValue(owner.globalTrans.x, owner.globalTrans.y);
                this._bodyDef.angle = Laya.Utils.toRadian(owner.globalTrans.rotation);
                this._bodyDef.allowSleep = false;
                this._bodyDef.angularVelocity = 0;
                this._bodyDef.angularDamping = 0;
                this._bodyDef.linearDamping = 0;
                this._bodyDef.linearVelocity.setValue(0, 0);
                this._bodyDef.bullet = false;
                this._bodyDef.fixedRotation = false;
                this._bodyDef.gravityScale = 0;
                return;
            }
            let owner = this.owner;
            this._bodyDef.position.setValue(owner.globalTrans.x, owner.globalTrans.y);
            this._bodyDef.angle = Laya.Utils.toRadian(owner.globalTrans.rotation);
            this._bodyDef.fixedRotation = !this._allowRotation;
            this._bodyDef.allowSleep = this._allowSleep;
            this._bodyDef.angularVelocity = this._angularVelocity;
            this._bodyDef.angularDamping = this._angularDamping;
            this._bodyDef.linearDamping = this._linearDamping;
            if (this._linearVelocity.x != 0 || this._linearVelocity.y != 0) {
                this._bodyDef.linearVelocity.setValue(this._linearVelocity.x, this._linearVelocity.y);
            }
            this._bodyDef.type = this._type;
            this._bodyDef.bullet = this._bullet;
            this._bodyDef.gravityScale = this._gravityScale;
            this._bodyDef.group = this.group;
        }
        _onEnable() {
            this.owner.globalTrans.cache = true;
            this._setBodyDefValue();
            super._onEnable();
            this._updateBodyType();
            if (this.applyOwnerColliderComponent) {
                this._colliders = this.owner.getComponents(ColliderBase);
                this._colliders.forEach((collider) => {
                    collider.createShape(this);
                });
            }
            else {
                this.shapes = this._shapes;
            }
            if (this.isConnectedJoint) {
                this.owner.event("bodyCreated");
                this.isConnectedJoint = false;
            }
        }
        getBody() {
            if (!this._box2DBody)
                this._onAwake();
            return this._box2DBody;
        }
        _updatePhysicsTransformToRender() {
            if (this.type == "static") {
                return;
            }
            var factory = Physics2D.I._factory;
            if (Physics2D.I._factory.get_rigidBody_IsAwake(this._box2DBody)) {
                var pos = Laya.Vector2.TEMP;
                factory.get_RigidBody_Position(this._box2DBody, pos);
                pos.setValue(pos.x, pos.y);
                this.owner.globalTrans.setPos(pos.x, pos.y);
                this.owner.globalTrans.rotation = Laya.Utils.toAngle(factory.get_RigidBody_Angle(this._box2DBody));
            }
        }
        _destroyAllShape() {
            if (!this._shapes)
                return;
            for (let i = 0; i < this._shapes.length; i++) {
                let shape = this._shapes[i];
                shape.destroy();
            }
        }
        _onDisable() {
            Physics2D.I._removeRigidBody(this);
            this._destroyAllShape();
            super._onDisable();
        }
        _onDestroy() {
            this._destroyAllShape();
            Physics2D.I._removeRigidBody(this);
            this._box2DBody && Physics2D.I._factory.removeBody(this._physics2DManager.box2DWorld, this._box2DBody);
            super._onDestroy();
            Physics2D.I._factory.destroyData(this._massData);
            this._massData = null;
        }
        getUserData() {
            if (!this._box2DBody)
                return;
            return Physics2D.I._factory.get_rigidBody_userData(this._box2DBody);
        }
        getLinearVelocityFromWorldPoint(worldPoint) {
            if (!this._box2DBody)
                return _tempV0$1;
            let velocity = Physics2D.I._factory.get_rigidBody_linearVelocityFromWorldPoint(this._box2DBody, worldPoint);
            _tempV0$1.x = velocity.x;
            _tempV0$1.y = velocity.y;
            return _tempV0$1;
        }
        getLinearVelocityFromLocalPoint(localPoint) {
            if (!this._box2DBody)
                return _tempV0$1;
            let velocity = Physics2D.I._factory.get_rigidBody_linearVelocityFromLocalPoint(this._box2DBody, localPoint);
            _tempV0$1.x = velocity.x;
            _tempV0$1.y = velocity.y;
            return _tempV0$1;
        }
        applyForce(position, force) {
            if (!this._box2DBody)
                return;
            Physics2D.I._factory.rigidBody_applyForce(this._box2DBody, force, position);
        }
        applyForceToCenter(force) {
            if (!this._box2DBody)
                return;
            Physics2D.I._factory.rigidBody_applyForceToCenter(this._box2DBody, force);
        }
        applyLinearImpulse(position, impulse) {
            if (!this._box2DBody)
                return;
            Physics2D.I._factory.rigidbody_ApplyLinearImpulse(this._box2DBody, impulse, position);
        }
        applyLinearImpulseToCenter(impulse) {
            if (!this._box2DBody)
                return;
            Physics2D.I._factory.rigidbody_ApplyLinearImpulseToCenter(this._box2DBody, impulse);
        }
        applyAngularImpulse(impulse) {
            if (!this._box2DBody)
                return;
            Physics2D.I._factory.rigidbody_ApplyAngularImpulse(this._box2DBody, impulse);
        }
        applyTorque(torque) {
            if (!this._box2DBody)
                return;
            Physics2D.I._factory.rigidbody_applyTorque(this._box2DBody, torque);
        }
        setVelocity(velocity) {
            if (!this._box2DBody)
                return;
            Physics2D.I._factory.set_rigidBody_linearVelocity(this._box2DBody, velocity);
        }
        setAngle(value) {
            if (!this._box2DBody)
                return;
            var factory = Physics2D.I._factory;
            factory.set_RigibBody_Transform(this._box2DBody, this.owner.globalTrans.x, this.owner.globalTrans.y, value);
            factory.set_rigidBody_Awake(this._box2DBody, true);
        }
        getMass() {
            return this._box2DBody ? Physics2D.I._factory.get_rigidBody_Mass(this._box2DBody) : 0;
        }
        getCenter() {
            let center = this._box2DBody ? Physics2D.I._factory.get_rigidBody_Center(this._box2DBody) : null;
            center.x = center.x;
            center.y = center.y;
            return center;
        }
        getInertia() {
            if (!this._box2DBody)
                return this._inertia;
            return Physics2D.I._factory.get_rigidBody_Inertia(this._box2DBody);
        }
        getWorldCenter() {
            let center = this._box2DBody ? Physics2D.I._factory.get_rigidBody_WorldCenter(this._box2DBody) : null;
            center.x = center.x;
            center.y = center.y;
            return center;
        }
        getWorldPoint(x, y) {
            return this.owner.globalTrans.localToGlobal(x, y);
        }
        getLocalPoint(x, y) {
            return this.owner.globalTrans.globalToLocal(x, y);
        }
    }

    class StaticCollider extends ColliderBase {
        get type() {
            return this._type;
        }
        set type(value) {
            if (value != "static") {
                console.warn("StaticCollider only can set as static.");
                value = "static";
            }
            this._type = value;
        }
        get shapes() {
            return this._shapes;
        }
        set shapes(value) {
            value.forEach((shape) => {
                shape.setCollider(this);
            });
            this._shapes = value;
        }
        constructor() {
            super();
            this._shapes = [];
        }
        _setBodyDefValue() {
            let owner = this.owner;
            this._bodyDef.position.setValue(owner.globalTrans.x, owner.globalTrans.y);
            this._bodyDef.angle = Laya.Utils.toRadian(owner.globalTrans.rotation);
            this._bodyDef.allowSleep = false;
            this._bodyDef.angularVelocity = 0;
            this._bodyDef.angularDamping = 0;
            this._bodyDef.linearDamping = 0;
            this._bodyDef.linearVelocity.setValue(0, 0);
            this._bodyDef.bullet = false;
            this._bodyDef.fixedRotation = false;
            this._bodyDef.gravityScale = 0;
        }
        _onAwake() {
            this.owner.globalTrans.cache = true;
        }
        _onEnable() {
            this._getPhysicsManager();
            this.owner.globalTrans.cache = true;
            let rig = this.owner.getComponent(RigidBody);
            if (rig && rig.applyOwnerColliderComponent) {
                this._setRigidbodyValue(rig);
                this.createShape(rig);
            }
            else {
                this._setBodyDefValue();
                super._onEnable();
                this.shapes = this._shapes;
            }
            if (this.isConnectedJoint) {
                this.owner.event("bodyCreated");
                this.isConnectedJoint = false;
            }
        }
        _removeShapeAndDestroyData() {
            if (!this._rigidbody) {
                if (!this._shapes)
                    return;
                for (let i = 0; i < this.shapes.length; i++) {
                    let shape = this._shapes[i];
                    shape.destroy();
                }
            }
            this._rigidbody && (this._box2DBody = this._rigidbody.getBox2DBody());
            this._box2DBody && (Physics2D.I._factory.removeBody(this._physics2DManager.box2DWorld, this._box2DBody));
            this._box2DFilter && Physics2D.I._factory.destroyData(this._box2DFilter);
            this._box2DShapeDef && Physics2D.I._factory.destroyData(this._box2DShapeDef);
            this._box2DShape && Physics2D.I._factory.destroyData(this._box2DShape);
            this._box2DBody = null;
            this._box2DFilter = null;
            this._box2DShape = null;
            this._box2DShapeDef = null;
        }
        _onDisable() {
            this._removeShapeAndDestroyData();
        }
        _onDestroy() {
            this._shapeDef = null;
            this._removeShapeAndDestroyData();
        }
        createShape(collider) {
            if (!collider)
                return;
            this._getPhysicsManager();
            this._setRigidbodyValue(collider);
            this._rigidbody = collider;
            this._box2DBody = collider.getBox2DBody();
            if (this._box2DShape) {
                Physics2D.I._factory.destroyShape(this._physics2DManager.box2DWorld, this._box2DBody, this._box2DShape);
                Physics2D.I._factory.destroyData(this._box2DShapeDef);
                this._box2DShape = null;
                this._box2DShapeDef = null;
            }
            if (!this._box2DFilter) {
                this._box2DFilter = Physics2D.I._factory.createFilter();
                this._box2DFilter.groupIndex = collider.group;
                this._box2DFilter.categoryBits = collider.category;
                this._box2DFilter.maskBits = collider.mask;
            }
            else {
                this._box2DFilter.groupIndex = collider.group;
                this._box2DFilter.categoryBits = collider.category;
                this._box2DFilter.maskBits = collider.mask;
            }
            this._box2DShapeDef = Physics2D.I._factory.createShapeDef(this._physics2DManager.box2DWorld, this._shapeDef, this._box2DFilter);
            this._setShapeData(this._box2DShapeDef._shape);
            this._box2DShape = Physics2D.I._factory.createShape(this._physics2DManager.box2DWorld, this._box2DBody, this._shapeDef.shapeType, this._box2DShapeDef);
            Physics2D.I._factory.set_shape_collider(this._box2DShape, this);
        }
        _setShapeData(shape) {
        }
        _setRigidbodyValue(collider) {
            this._shapeDef.density = this.density;
            this._shapeDef.friction = this.friction;
            this._shapeDef.isSensor = this.isSensor;
            this._shapeDef.restitution = this.restitution;
            this._shapeDef.filter.group = collider.group;
            this._shapeDef.filter.category = collider.category;
            this._shapeDef.filter.mask = collider.mask;
        }
    }

    class BoxCollider extends StaticCollider {
        get width() {
            return this._width;
        }
        set width(value) {
            if (value <= 0)
                throw "BoxCollider size cannot be less than 0";
            if (this._width == value)
                return;
            this._width = value;
            this._rigidbody && this.createShape(this._rigidbody);
        }
        get height() {
            return this._height;
        }
        set height(value) {
            if (value <= 0)
                throw "BoxCollider size cannot be less than 0";
            if (this._height == value)
                return;
            this._height = value;
            this._rigidbody && this.createShape(this._rigidbody);
        }
        constructor() {
            super();
            this._width = 100;
            this._height = 100;
            this._shapeDef.shapeType = exports.EPhysics2DShape.BoxShape;
        }
        _setShapeData(shape) {
            if (!shape)
                return;
            let helfW = this._width * 0.5;
            let helfH = this._height * 0.5;
            var center = {
                x: helfW + this.pivotoffx,
                y: helfH + this.pivotoffy
            };
            Physics2D.I._factory.set_collider_SetAsBox(shape, helfW, helfH, center, Math.abs(this.scaleX), Math.abs(this.scaleY));
        }
    }

    class ChainCollider extends StaticCollider {
        get points() {
            return this._points;
        }
        set points(value) {
            if (!value)
                throw "ChainCollider points cannot be empty";
            this._points = value;
            var arr = this._points.split(",");
            let length = arr.length;
            this._datas = [];
            for (var i = 0, n = length; i < n; i++) {
                this._datas.push(parseInt(arr[i]));
            }
            this._rigidbody && this.createShape(this._rigidbody);
        }
        get datas() {
            return this._datas;
        }
        set datas(value) {
            if (!value)
                throw "ChainCollider datas cannot be empty";
            this._datas = value;
            this._rigidbody && this.createShape(this._rigidbody);
        }
        get loop() {
            return this._loop;
        }
        set loop(value) {
            if (this._loop == value)
                return;
            this._loop = value;
            if (this._datas.length <= 4) {
                console.warn("To loop Chain, the length of points must be greater than 4");
                return;
            }
            this._rigidbody && this.createShape(this._rigidbody);
        }
        constructor() {
            super();
            this._points = "0,0,100,0";
            this._datas = [0, 0, 100, 0];
            this._loop = false;
            this._shapeDef.shapeType = exports.EPhysics2DShape.ChainShape;
        }
        _setShapeData(shape) {
            if (!shape)
                return;
            var len = this._datas.length;
            if (len % 2 == 1)
                throw "ChainCollider datas lenth must a multiplier of 2";
            Physics2D.I._factory.set_ChainShape_data(shape, this.pivotoffx, this.pivotoffy, this._datas, this._loop, this.scaleX, this.scaleY);
        }
        onAdded() {
            super.onAdded();
            if (this._datas.length == 0) {
                let sp = this.owner;
                this._datas.push(0, 0, sp.width, 0, 0, sp.height, sp.width, sp.height);
            }
        }
    }

    class CircleCollider extends StaticCollider {
        get radius() {
            return this._radius;
        }
        set radius(value) {
            if (value <= 0)
                throw "CircleCollider radius cannot be less than 0";
            if (this._radius == value)
                return;
            this._radius = value;
            this._rigidbody && this.createShape(this._rigidbody);
        }
        constructor() {
            super();
            this._radius = 50;
            this._shapeDef.shapeType = exports.EPhysics2DShape.CircleShape;
        }
        _setShapeData(shape) {
            if (!shape)
                return;
            var scale = Math.max(Math.abs(this.scaleX), Math.abs(this.scaleY));
            let radius = this.radius;
            Physics2D.I._factory.set_CircleShape_radius(shape, radius, scale);
            Physics2D.I._factory.set_CircleShape_pos(shape, this.x, this.y, scale);
        }
    }

    class EdgeCollider extends StaticCollider {
        get points() {
            return this._points;
        }
        set points(value) {
            if (!value)
                throw "EdgeCollider points cannot be empty";
            this._points = value;
            var arr = this._points.split(",");
            let length = arr.length;
            this._datas = [];
            for (var i = 0, n = length; i < n; i++) {
                this._datas.push(parseInt(arr[i]));
            }
            this._rigidbody && this.createShape(this._rigidbody);
        }
        get datas() {
            return this._datas;
        }
        set datas(value) {
            if (!value)
                throw "EdgeCollider points cannot be empty";
            this._datas = value;
            this._rigidbody && this.createShape(this._rigidbody);
        }
        constructor() {
            super();
            this._points = "0,0,100,0";
            this._datas = [0, 0, 100, 0];
            this._shapeDef.shapeType = exports.EPhysics2DShape.EdgeShape;
        }
        _setShapeData(shape) {
            if (!shape)
                return;
            var len = this._datas.length;
            if (len % 2 == 1)
                throw "EdgeCollider points lenth must a multiplier of 2";
            Physics2D.I._factory.set_EdgeShape_data(shape, this.pivotoffx, this.pivotoffy, this._datas, this.scaleX, this.scaleY);
        }
    }

    class PolygonCollider extends StaticCollider {
        get points() {
            return this._points;
        }
        set points(value) {
            if (!value)
                throw "PolygonCollider points cannot be empty";
            this._points = value;
            var arr = this._points.split(",");
            let length = arr.length;
            this._datas = [];
            for (var i = 0, n = length; i < n; i++) {
                this._datas.push(parseInt(arr[i]));
            }
            this._rigidbody && this.createShape(this._rigidbody);
        }
        get datas() {
            return this._datas;
        }
        set datas(value) {
            if (!value)
                throw "PolygonCollider points cannot be empty";
            this._datas = value;
            this._rigidbody && this.createShape(this._rigidbody);
        }
        constructor() {
            super();
            this._points = "50,0,100,100,0,100";
            this._datas = [50, 0, 100, 100, 0, 100];
            this._shapeDef.shapeType = exports.EPhysics2DShape.PolygonShape;
        }
        _setShapeData(shape) {
            if (!shape)
                return;
            var len = this.datas.length;
            if (len < 6)
                throw "PolygonCollider points must be greater than 3";
            if (len % 2 == 1)
                throw "PolygonCollider points lenth must a multiplier of 2";
            Physics2D.I._factory.set_PolygonShape_data(shape, this.pivotoffx, this.pivotoffy, this.datas, this.scaleX, this.scaleY);
        }
    }

    const _tempV0 = new Laya.Vector2();
    class JointBase extends Laya.Component {
        get joint() {
            if (!this._joint)
                this._createJoint();
            return this._joint;
        }
        constructor() {
            super();
            this._factory = Physics2D.I._factory;
            this._singleton = false;
        }
        getJointRecationForce() {
            let force;
            if (this._joint) {
                force = Physics2D.I._factory.get_joint_recationForce(this._joint);
            }
            _tempV0.x = force.x;
            _tempV0.y = force.y;
            return _tempV0;
        }
        getJointRecationTorque() {
            let torque;
            if (this._joint) {
                torque = Physics2D.I._factory.get_joint_reactionTorque(this._joint);
            }
            return torque;
        }
        isValid() {
            let isvalid = false;
            if (this._joint) {
                isvalid = Physics2D.I._factory.isValidJoint(this._joint);
            }
            return isvalid;
        }
        getBodyAnchor(body, anchorx, anchory) {
            Laya.Point.TEMP.setTo(anchorx, anchory);
            let node = body.owner;
            if (node) {
                if (node.transform) {
                    node.transform.transformPointN(Laya.Point.TEMP);
                }
                else {
                    Laya.Point.TEMP.x *= node.scaleX;
                    Laya.Point.TEMP.y *= node.scaleY;
                }
            }
            return Laya.Point.TEMP;
        }
        _onAdded() {
        }
        _onEnable() {
            this._createJoint();
        }
        _onAwake() {
        }
        _createJoint() {
        }
        _onDisable() {
            if (this._joint && this._factory.getJoint_userData(this._joint) && !this._factory.getJoint_userData_destroy(this._joint)) {
                Physics2D.I._factory.removeJoint(this._physics2DManager.box2DWorld, this._joint);
            }
            this._joint = null;
        }
    }

    class DistanceJoint extends JointBase {
        constructor() {
            super(...arguments);
            this._length = 0;
            this._maxLength = -1;
            this._minLength = -1;
            this._frequency = 1;
            this._dampingRatio = 0;
            this.selfAnchor = [0, 0];
            this.otherAnchor = [0, 0];
            this.collideConnected = false;
        }
        get length() {
            return this._length;
        }
        set length(value) {
            this._length = value;
            if (this._joint)
                this._factory.set_DistanceJoint_length(this._joint, value);
        }
        get minLength() {
            return this._minLength;
        }
        set minLength(value) {
            this._minLength = value;
            if (this._joint)
                this._factory.set_DistanceJoint_MinLength(this._joint, value);
        }
        get maxLength() {
            return this._maxLength;
        }
        set maxLength(value) {
            this._maxLength = value;
            if (this._joint)
                this._factory.set_DistanceJoint_MaxLength(this._joint, value);
        }
        get frequency() {
            return this._frequency;
        }
        set frequency(value) {
            this._frequency = value;
            if (this._joint) {
                this._factory.set_DistanceJointStiffnessDamping(this._joint, this._frequency, this._dampingRatio);
            }
        }
        get damping() {
            return this._dampingRatio;
        }
        set damping(value) {
            this._dampingRatio = value;
            if (this._joint) {
                this._factory.set_DistanceJointStiffnessDamping(this._joint, this._frequency, this._dampingRatio);
            }
        }
        get jointLength() {
            if (this._joint) {
                return Physics2D.I._factory.get_DistanceJoint_length(this._joint);
            }
            else {
                return 0;
            }
        }
        _createJoint() {
            var _a, _b;
            this._physics2DManager = (_b = (_a = this.owner) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.getComponentElementManager(Physics2DWorldManager.__managerName);
            if (!this._joint) {
                this.selfBody = this.selfBody || this.owner.getComponent(RigidBody);
                if (!this.selfBody)
                    throw "selfBody can not be empty";
                let point = this.getBodyAnchor(this.selfBody, this.selfAnchor[0], this.selfAnchor[1]);
                var def = DistanceJoint._temp || (DistanceJoint._temp = new physics2D_DistancJointDef());
                def.bodyB = this.selfBody.getBox2DBody();
                if (!def.bodyB) {
                    this.selfBody.isConnectedJoint = true;
                    this.selfBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                def.localAnchorB.setValue(point.x, point.y);
                this.selfBody.owner.on("shapeChange", this, this._refeahJoint);
                if (this.otherBody) {
                    def.bodyA = this.otherBody.getBox2DBody();
                    if (!def.bodyA) {
                        this.otherBody.isConnectedJoint = true;
                        this.otherBody.owner.on("bodyCreated", this, this._createJoint);
                        return;
                    }
                    point = this.getBodyAnchor(this.otherBody, this.otherAnchor[0], this.otherAnchor[1]);
                    def.localAnchorA.setValue(point.x, point.y);
                    this.otherBody.owner.on("shapeChange", this, this._refeahJoint);
                }
                else {
                    if (!Physics2D.I._emptyBody) {
                        Physics2D.I._emptyBody = Physics2D.I._factory.createBody(this._physics2DManager.box2DWorld, null);
                    }
                    def.bodyA = Physics2D.I._emptyBody;
                    def.localAnchorA.setValue(this.otherAnchor[0], this.otherAnchor[1]);
                }
                def.dampingRatio = this._dampingRatio;
                def.frequency = this._frequency;
                def.collideConnected = this.collideConnected;
                def.length = this._length;
                def.maxLength = this._maxLength;
                def.minLength = this._minLength;
                this._box2DJointDef = Physics2D.I._factory.createJointDef(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.DistanceJoint, def);
                this._joint = this._factory.createJoint(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.DistanceJoint, this._box2DJointDef);
                this.selfBody.owner.off("bodyCreated", this._createJoint);
                if (this.otherBody)
                    this.otherBody.owner.off("bodyCreated", this._createJoint);
            }
        }
        _refeahJoint() {
            if (this._joint) {
                this._factory.set_DistanceJointStiffnessDamping(this._joint, this._frequency, this._dampingRatio);
            }
        }
        onDestroy() {
            super.onDestroy();
            this.selfBody.owner.off("shapeChange", this._refeahJoint);
            if (this.otherBody)
                this.otherBody.owner.off("shapeChange", this._refeahJoint);
        }
    }

    class PrismaticJoint extends JointBase {
        constructor() {
            super(...arguments);
            this._enableMotor = false;
            this._motorSpeed = 0;
            this._maxMotorForce = 10000;
            this._enableLimit = false;
            this._lowerTranslation = 0;
            this._upperTranslation = 0;
            this._axis = [1, 0];
            this.anchor = [0, 0];
            this.angle = 0;
            this.collideConnected = false;
        }
        get enableMotor() {
            return this._enableMotor;
        }
        set enableMotor(value) {
            this._enableMotor = value;
            if (this._joint)
                this._factory.set_Joint_EnableMotor(this._joint, value);
        }
        get motorSpeed() {
            return this._motorSpeed;
        }
        set motorSpeed(value) {
            this._motorSpeed = value;
            if (this._joint)
                this._factory.set_Joint_SetMotorSpeed(this._joint, value);
        }
        get maxMotorForce() {
            return this._maxMotorForce;
        }
        set maxMotorForce(value) {
            this._maxMotorForce = value;
            if (this._joint)
                this._factory.set_Joint_SetMaxMotorTorque(this._joint, value);
        }
        get enableLimit() {
            return this._enableLimit;
        }
        set enableLimit(value) {
            this._enableLimit = value;
            if (this._joint)
                this._factory.set_Joint_EnableLimit(this._joint, value);
        }
        get lowerTranslation() {
            return this._lowerTranslation;
        }
        set lowerTranslation(value) {
            this._lowerTranslation = value;
            if (this._joint)
                this._factory.set_Joint_SetLimits(this._joint, value, this._upperTranslation);
        }
        get upperTranslation() {
            return this._upperTranslation;
        }
        set upperTranslation(value) {
            this._upperTranslation = value;
            if (this._joint)
                this._factory.set_Joint_SetLimits(this._joint, this._lowerTranslation, value);
        }
        get axis() {
            return this._axis;
        }
        set axis(value) {
            this._axis = value;
            this.angle = Laya.Utils.toAngle(Math.atan2(value[1], value[0]));
        }
        _createJoint() {
            var _a, _b;
            this._physics2DManager = (_b = (_a = this.owner) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.getComponentElementManager(Physics2DWorldManager.__managerName);
            if (!this._joint) {
                this.selfBody = this.selfBody || this.owner.getComponent(ColliderBase);
                if (!this.selfBody)
                    throw "selfBody can not be empty";
                var def = PrismaticJoint._temp || (PrismaticJoint._temp = new physics2D_PrismaticJointDef());
                def.bodyB = this.selfBody.getBox2DBody();
                if (!def.bodyB) {
                    this.selfBody.isConnectedJoint = true;
                    this.selfBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                if (!Physics2D.I._emptyBody) {
                    Physics2D.I._emptyBody = Physics2D.I._factory.createBody(this._physics2DManager.box2DWorld, null);
                }
                def.bodyA = this.otherBody ? this.otherBody.getBox2DBody() : Physics2D.I._emptyBody;
                if (!def.bodyA) {
                    this.otherBody.isConnectedJoint = true;
                    this.otherBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                let p = this.selfBody.getWorldPoint(this.anchor[0], this.anchor[1]);
                def.anchor.setValue(p.x, p.y);
                let radian = Laya.Utils.toRadian(this.angle);
                def.axis.setValue(Math.cos(radian), Math.sin(radian));
                def.enableMotor = this._enableMotor;
                def.motorSpeed = this._motorSpeed;
                def.maxMotorForce = this._maxMotorForce;
                def.enableLimit = this._enableLimit;
                def.lowerTranslation = this._lowerTranslation;
                def.upperTranslation = this._upperTranslation;
                def.collideConnected = this.collideConnected;
                this._box2DJointDef = this._factory.createJointDef(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.PrismaticJoint, def);
                this._joint = this._factory.createJoint(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.PrismaticJoint, this._box2DJointDef);
                this.selfBody.owner.off("bodyCreated", this, this._createJoint);
                this.otherBody && this.otherBody.owner.off("bodyCreated", this, this._createJoint);
            }
        }
    }

    class RevoluteJoint extends JointBase {
        constructor() {
            super(...arguments);
            this._enableMotor = false;
            this._motorSpeed = 0;
            this._maxMotorTorque = 10000;
            this._enableLimit = false;
            this._lowerAngle = 0;
            this._upperAngle = 0;
            this.anchor = [0, 0];
            this.collideConnected = false;
        }
        get enableMotor() {
            return this._enableMotor;
        }
        set enableMotor(value) {
            this._enableMotor = value;
            if (this._joint)
                this._factory.set_Joint_EnableMotor(this._joint, value);
        }
        get motorSpeed() {
            return this._motorSpeed;
        }
        set motorSpeed(value) {
            this._motorSpeed = value;
            if (this._joint)
                this._factory.set_Joint_SetMotorSpeed(this._joint, value);
        }
        get maxMotorTorque() {
            return this._maxMotorTorque;
        }
        set maxMotorTorque(value) {
            this._maxMotorTorque = value;
            if (this._joint)
                this._factory.set_Joint_SetMaxMotorTorque(this._joint, value);
        }
        get enableLimit() {
            return this._enableLimit;
        }
        set enableLimit(value) {
            this._enableLimit = value;
            if (this._joint)
                this._factory.set_Joint_EnableLimit(this._joint, value);
        }
        get lowerAngle() {
            return this._lowerAngle;
        }
        set lowerAngle(value) {
            this._lowerAngle = value;
            if (this._joint)
                this._factory.set_Joint_SetLimits(this._joint, Laya.Utils.toRadian(value), Laya.Utils.toRadian(this._upperAngle));
        }
        get upperAngle() {
            return this._upperAngle;
        }
        set upperAngle(value) {
            this._upperAngle = value;
            if (this._joint)
                this._factory.set_Joint_SetLimits(this._joint, Laya.Utils.toRadian(this._lowerAngle), Laya.Utils.toRadian(value));
        }
        _createJoint() {
            var _a, _b;
            this._physics2DManager = (_b = (_a = this.owner) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.getComponentElementManager(Physics2DWorldManager.__managerName);
            if (!this._joint) {
                this.selfBody = this.selfBody || this.owner.getComponent(ColliderBase);
                if (!this.selfBody)
                    throw "selfBody can not be empty";
                var def = RevoluteJoint._temp || (RevoluteJoint._temp = new physics2D_RevoluteJointDef());
                def.bodyB = this.selfBody.getBox2DBody();
                if (!def.bodyB) {
                    this.selfBody.isConnectedJoint = true;
                    this.selfBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                if (!Physics2D.I._emptyBody) {
                    Physics2D.I._emptyBody = Physics2D.I._factory.createBody(this._physics2DManager.box2DWorld, null);
                }
                def.bodyA = this.otherBody ? this.otherBody.getBox2DBody() : Physics2D.I._emptyBody;
                if (!def.bodyA) {
                    this.otherBody.isConnectedJoint = true;
                    this.otherBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                let global = this.selfBody.getWorldPoint(this.anchor[0], this.anchor[1]);
                def.anchor.setValue(global.x, global.y);
                def.enableMotor = this._enableMotor;
                def.motorSpeed = this._motorSpeed;
                def.maxMotorTorque = this._maxMotorTorque;
                def.enableLimit = this._enableLimit;
                def.lowerAngle = Laya.Utils.toRadian(this._lowerAngle);
                def.upperAngle = Laya.Utils.toRadian(this._upperAngle);
                def.collideConnected = this.collideConnected;
                this._box2DJointDef = this._factory.createJointDef(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.RevoluteJoint, def);
                this._joint = this._factory.createJoint(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.RevoluteJoint, this._box2DJointDef);
                this.selfBody.owner.off("bodyCreated", this, this._createJoint);
                this.otherBody && this.otherBody.owner.off("bodyCreated", this, this._createJoint);
            }
        }
    }

    class GearJoint extends JointBase {
        constructor() {
            super(...arguments);
            this._ratio = 1;
            this.collideConnected = false;
        }
        set joint1(value) {
            if (value instanceof RevoluteJoint || value instanceof PrismaticJoint) {
                this._joint1 = value;
            }
            else {
                console.warn("joint1 must be a RevoluteJoint or PrismaticJoint");
                this._joint1 = null;
            }
        }
        get joint1() {
            return this._joint1;
        }
        set joint2(value) {
            if (value instanceof RevoluteJoint || value instanceof PrismaticJoint) {
                this._joint2 = value;
            }
            else {
                console.warn("joint2 must be a RevoluteJoint or PrismaticJoint");
                this._joint2 = null;
            }
        }
        get joint2() {
            return this._joint2;
        }
        get ratio() {
            return this._ratio;
        }
        set ratio(value) {
            this._ratio = value;
            if (this._joint)
                this._factory.set_GearJoint_SetRatio(this._joint, value);
        }
        _createJoint() {
            var _a, _b;
            this._physics2DManager = (_b = (_a = this.owner) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.getComponentElementManager(Physics2DWorldManager.__managerName);
            if (!this._joint) {
                if (!this.joint1)
                    throw "Joint1 can not be empty";
                if (!this.joint2)
                    throw "Joint2 can not be empty";
                var def = GearJoint._temp || (GearJoint._temp = new physics2D_GearJointDef());
                def.bodyA = this.joint1.owner.getComponent(ColliderBase).getBox2DBody();
                if (!def.bodyA) {
                    this.joint1.owner.getComponent(ColliderBase).isConnectedJoint = true;
                    this.joint1.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                def.bodyB = this.joint2.owner.getComponent(ColliderBase).getBox2DBody();
                if (!def.bodyB) {
                    this.joint2.owner.getComponent(ColliderBase).isConnectedJoint = true;
                    this.joint2.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                def.joint1 = this.joint1.joint;
                def.joint2 = this.joint2.joint;
                def.ratio = -this._ratio;
                def.collideConnected = this.collideConnected;
                this._box2DJointDef = Physics2D.I._factory.createJointDef(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.GearJoint, def);
                this._joint = this._factory.createJoint(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.GearJoint, this._box2DJointDef);
                this.joint1.owner.off("bodyCreated", this, this._createJoint);
                this.joint2.owner.off("bodyCreated", this, this._createJoint);
            }
        }
    }

    class MotorJoint extends JointBase {
        constructor() {
            super(...arguments);
            this._linearOffset = [0, 0];
            this._angularOffset = 0;
            this._maxForce = 1000;
            this._maxTorque = 1000;
            this._correctionFactor = 0.3;
            this.collideConnected = false;
        }
        get linearOffset() {
            return this._linearOffset;
        }
        set linearOffset(value) {
            this._linearOffset = value;
            if (this._joint) {
                this._factory.set_MotorJoint_linearOffset(this._joint, value[0], value[1]);
            }
        }
        get angularOffset() {
            return this._angularOffset;
        }
        set angularOffset(value) {
            this._angularOffset = value;
            if (this._joint)
                this._factory.set_MotorJoint_SetAngularOffset(this._joint, Laya.Utils.toRadian(-value));
        }
        get maxForce() {
            return this._maxForce;
        }
        set maxForce(value) {
            this._maxForce = value;
            if (this._joint)
                this._factory.set_MotorJoint_SetMaxForce(this._joint, value);
        }
        get maxTorque() {
            return this._maxTorque;
        }
        set maxTorque(value) {
            this._maxTorque = value;
            if (this._joint)
                this._factory.set_MotorJoint_SetMaxTorque(this._joint, value);
        }
        get correctionFactor() {
            return this._correctionFactor;
        }
        set correctionFactor(value) {
            this._correctionFactor = value;
            if (this._joint)
                this._factory.set_MotorJoint_SetCorrectionFactor(this._joint, value);
        }
        _createJoint() {
            var _a, _b;
            this._physics2DManager = (_b = (_a = this.owner) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.getComponentElementManager(Physics2DWorldManager.__managerName);
            if (!this._joint) {
                if (!this.otherBody)
                    throw "otherBody can not be empty";
                this.selfBody = this.selfBody || this.owner.getComponent(ColliderBase);
                if (!this.selfBody)
                    throw "selfBody can not be empty";
                var def = MotorJoint._temp || (MotorJoint._temp = new physics2D_MotorJointDef());
                def.bodyA = this.selfBody.getBox2DBody();
                if (!def.bodyA) {
                    this.selfBody.isConnectedJoint = true;
                    this.selfBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                def.bodyB = this.otherBody.getBox2DBody();
                if (!def.bodyB) {
                    this.otherBody.isConnectedJoint = true;
                    this.otherBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                def.linearOffset.setValue(this._linearOffset[0], this._linearOffset[1]);
                def.angularOffset = Laya.Utils.toRadian(-this._angularOffset);
                def.maxForce = this._maxForce;
                def.maxTorque = this._maxTorque;
                def.correctionFactor = this._correctionFactor;
                def.collideConnected = this.collideConnected;
                this._box2DJointDef = Physics2D.I._factory.createJointDef(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.MotorJoint, def);
                this._joint = this._factory.createJoint(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.MotorJoint, this._box2DJointDef);
                this.selfBody.owner.off("bodyCreated", this, this._createJoint);
                this.otherBody.owner.off("bodyCreated", this, this._createJoint);
            }
        }
    }

    class MouseJoint extends JointBase {
        constructor() {
            super(...arguments);
            this._maxForce = 1000;
            this._frequency = 5;
            this._dampingRatio = 0.7;
        }
        get maxForce() {
            return this._maxForce;
        }
        set maxForce(value) {
            this._maxForce = value;
            if (this._joint)
                this._factory.set_MotorJoint_SetMaxForce(this._joint, value);
        }
        get frequency() {
            return this._frequency;
        }
        set frequency(value) {
            this._frequency = value;
            if (this._joint) {
                this._factory.set_MouseJoint_frequencyAndDampingRatio(this._joint, this._frequency, this._dampingRatio);
            }
        }
        get damping() {
            return this._dampingRatio;
        }
        set damping(value) {
            this._dampingRatio = value;
            if (this._joint) {
                this._factory.set_MouseJoint_frequencyAndDampingRatio(this._joint, this._frequency, this._dampingRatio);
            }
        }
        _onEnable() {
            this.owner.on(Laya.Event.MOUSE_DOWN, this, this._onMouseDown);
        }
        _createJoint() {
            var _a, _b;
            this._physics2DManager = (_b = (_a = this.owner) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.getComponentElementManager(Physics2DWorldManager.__managerName);
            if (!this._joint) {
                this.selfBody = this.selfBody || this.owner.getComponent(ColliderBase);
                if (!this.selfBody)
                    throw "selfBody can not be empty";
                var def = MouseJoint._temp || (MouseJoint._temp = new physics2D_MouseJointJointDef());
                if (this.anchor) {
                    var anchorPos = this.selfBody.owner.localToGlobal(Laya.Point.TEMP.setTo(this.anchor[0], this.anchor[1]), false, this._physics2DManager.getRootSprite());
                }
                else {
                    anchorPos = this._physics2DManager.getRootSprite().globalToLocal(Laya.Point.TEMP.setTo(Laya.ILaya.stage.mouseX, Laya.ILaya.stage.mouseY));
                }
                if (!Physics2D.I._emptyBody)
                    Physics2D.I._emptyBody = Physics2D.I._factory.createBody(this._physics2DManager.box2DWorld, null);
                def.bodyA = Physics2D.I._emptyBody;
                def.bodyB = this.selfBody.getBox2DBody();
                if (!def.bodyB) {
                    this.selfBody.isConnectedJoint = true;
                    this.selfBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                def.target.setValue(anchorPos.x, anchorPos.y);
                def.maxForce = this._maxForce;
                def.dampingRatio = this._dampingRatio;
                def.frequency = this._frequency;
                this._box2DJointDef = Physics2D.I._factory.createJointDef(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.MouseJoint, def);
                this._factory.set_rigidBody_Awake(def.bodyB, true);
                this._joint = this._factory.createJoint(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.MouseJoint, this._box2DJointDef);
                this.selfBody.owner.off("bodyCreated", this, this._createJoint);
            }
        }
        _onMouseDown() {
            this._createJoint();
            Laya.ILaya.stage.on(Laya.Event.MOUSE_MOVE, this, this._onMouseMove);
            Laya.ILaya.stage.once(Laya.Event.MOUSE_UP, this, this._onStageMouseUp);
            Laya.ILaya.stage.once(Laya.Event.MOUSE_OUT, this, this._onStageMouseUp);
        }
        _onStageMouseUp() {
            Laya.ILaya.stage.off(Laya.Event.MOUSE_MOVE, this, this._onMouseMove);
            Laya.ILaya.stage.off(Laya.Event.MOUSE_UP, this, this._onStageMouseUp);
            Laya.ILaya.stage.off(Laya.Event.MOUSE_OUT, this, this._onStageMouseUp);
            this._factory.removeJoint(this._physics2DManager.box2DWorld, this._joint);
            this._joint = null;
        }
        _onMouseMove() {
            if (this._joint)
                this._factory.set_MouseJoint_target(this._joint, this._physics2DManager.getRootSprite().mouseX, this._physics2DManager.getRootSprite().mouseY);
        }
        _onDisable() {
            super._onDisable();
            this.owner.off(Laya.Event.MOUSE_DOWN, this, this._onMouseDown);
        }
    }

    class PulleyJoint extends JointBase {
        constructor() {
            super(...arguments);
            this.selfAnchor = [0, 0];
            this.otherAnchor = [0, 0];
            this.selfGroundPoint = [0, -100];
            this.otherGroundPoint = [0, -100];
            this.ratio = 1;
            this.collideConnected = false;
        }
        _createJoint() {
            var _a, _b;
            this._physics2DManager = (_b = (_a = this.owner) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.getComponentElementManager(Physics2DWorldManager.__managerName);
            if (!this._joint) {
                if (!this.otherBody)
                    throw "otherBody can not be empty";
                this.selfBody = this.selfBody || this.owner.getComponent(ColliderBase);
                if (!this.selfBody)
                    throw "selfBody can not be empty";
                var def = PulleyJoint._temp || (PulleyJoint._temp = new physics2D_PulleyJointDef);
                def.bodyA = this.otherBody.getBox2DBody();
                if (!def.bodyA) {
                    this.otherBody.isConnectedJoint = true;
                    this.otherBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                def.bodyB = this.selfBody.getBox2DBody();
                if (!def.bodyB) {
                    this.selfBody.isConnectedJoint = true;
                    this.selfBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                var posA = this.otherBody.getWorldPoint(this.otherAnchor[0], this.otherAnchor[1]);
                def.localAnchorA.setValue(posA.x, posA.y);
                var posB = this.selfBody.getWorldPoint(this.selfAnchor[0], this.selfAnchor[1]);
                def.localAnchorB.setValue(posB.x, posB.y);
                var groundA = this.otherBody.getWorldPoint(this.otherGroundPoint[0], this.otherGroundPoint[1]);
                def.groundAnchorA.setValue(groundA.x, groundA.y);
                var groundB = this.selfBody.getWorldPoint(this.selfGroundPoint[0], this.selfGroundPoint[1]);
                def.groundAnchorB.setValue(groundB.x, groundB.y);
                def.ratio = this.ratio;
                def.collideConnected = this.collideConnected;
                this._box2DJointDef = Physics2D.I._factory.createJointDef(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.PulleyJoint, def);
                this._joint = Physics2D.I._factory.createJoint(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.PulleyJoint, this._box2DJointDef);
                this.otherBody.owner.off("bodyCreated", this, this._createJoint);
                this.selfBody.owner.off("bodyCreated", this, this._createJoint);
            }
        }
    }

    class WeldJoint extends JointBase {
        constructor() {
            super(...arguments);
            this._frequency = 5;
            this._dampingRatio = 0.7;
            this.anchor = [0, 0];
            this.collideConnected = false;
        }
        get frequency() {
            return this._frequency;
        }
        set frequency(value) {
            this._frequency = value;
            if (this._joint) {
                this._factory.set_Joint_frequencyAndDampingRatio(this._joint, this._frequency, this._dampingRatio, false);
            }
        }
        get damping() {
            return this._dampingRatio;
        }
        set damping(value) {
            this._dampingRatio = value;
            if (this._joint) {
                this._factory.set_Joint_frequencyAndDampingRatio(this._joint, this._frequency, this._dampingRatio, true);
            }
        }
        _createJoint() {
            var _a, _b;
            this._physics2DManager = (_b = (_a = this.owner) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.getComponentElementManager(Physics2DWorldManager.__managerName);
            if (!this._joint) {
                if (!this.otherBody)
                    throw "otherBody can not be empty";
                this.selfBody = this.selfBody || this.owner.getComponent(ColliderBase);
                if (!this.selfBody)
                    throw "selfBody can not be empty";
                var def = WeldJoint._temp || (WeldJoint._temp = new physics2D_WeldJointDef());
                var anchorPos = this.selfBody.getWorldPoint(this.anchor[0], this.anchor[1]);
                def.bodyA = this.otherBody.getBox2DBody();
                if (!def.bodyA) {
                    this.otherBody.isConnectedJoint = true;
                    this.otherBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                def.bodyB = this.selfBody.getBox2DBody();
                if (!def.bodyB) {
                    this.selfBody.isConnectedJoint = true;
                    this.selfBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                def.anchor.setValue(anchorPos.x, anchorPos.y);
                def.frequency = this._frequency;
                def.dampingRatio = this._dampingRatio;
                def.collideConnected = this.collideConnected;
                this._box2DJointDef = Physics2D.I._factory.createJointDef(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.WeldJoint, def);
                this._joint = this._factory.createJoint(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.WeldJoint, this._box2DJointDef);
                this.otherBody.owner.off("bodyCreated", this, this._createJoint);
                this.selfBody.owner.off("bodyCreated", this, this._createJoint);
            }
        }
    }

    class WheelJoint extends JointBase {
        constructor() {
            super(...arguments);
            this._frequency = 1;
            this._dampingRatio = 0.7;
            this._enableMotor = false;
            this._motorSpeed = 0;
            this._maxMotorTorque = 10000;
            this._enableLimit = true;
            this._lowerTranslation = 0;
            this._upperTranslation = 0;
            this.anchor = [0, 0];
            this.collideConnected = false;
            this._axis = [0, 1];
            this.angle = 90;
        }
        get frequency() {
            return this._frequency;
        }
        set frequency(value) {
            this._frequency = value;
            if (this._joint) {
                this._factory.set_Joint_frequencyAndDampingRatio(this._joint, this._frequency, this._dampingRatio, false);
            }
        }
        get damping() {
            return this._dampingRatio;
        }
        set damping(value) {
            this._dampingRatio = value;
            if (this._joint) {
                this._factory.set_Joint_frequencyAndDampingRatio(this._joint, this._frequency, this._dampingRatio, true);
            }
        }
        get enableMotor() {
            return this._enableMotor;
        }
        set enableMotor(value) {
            this._enableMotor = value;
            if (this._joint)
                this._factory.set_Joint_EnableMotor(this._joint, value);
        }
        get motorSpeed() {
            return this._motorSpeed;
        }
        set motorSpeed(value) {
            this._motorSpeed = value;
            if (this._joint)
                this._factory.set_Joint_SetMotorSpeed(this._joint, value);
        }
        get maxMotorTorque() {
            return this._maxMotorTorque;
        }
        set maxMotorTorque(value) {
            this._maxMotorTorque = value;
            if (this._joint)
                this._factory.set_Joint_SetMaxMotorTorque(this._joint, value);
        }
        get enableLimit() {
            return this._enableLimit;
        }
        set enableLimit(value) {
            this._enableLimit = value;
            if (this._joint)
                this._factory.set_Joint_EnableLimit(this._joint, value);
        }
        get lowerTranslation() {
            return this._lowerTranslation;
        }
        set lowerTranslation(value) {
            this._lowerTranslation = value;
            if (this._joint)
                this._factory.set_Joint_SetLimits(this._joint, value, this._upperTranslation);
        }
        get upperTranslation() {
            return this._upperTranslation;
        }
        set upperTranslation(value) {
            this._upperTranslation = value;
            if (this._joint)
                this._factory.set_Joint_SetLimits(this._joint, this._lowerTranslation, value);
        }
        get axis() {
            return this._axis;
        }
        set axis(value) {
            this._axis = value;
            this.angle = Laya.Utils.toAngle(Math.atan2(value[1], value[0]));
        }
        _createJoint() {
            var _a, _b;
            this._physics2DManager = (_b = (_a = this.owner) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.getComponentElementManager(Physics2DWorldManager.__managerName);
            if (!this._joint) {
                if (!this.otherBody)
                    throw "otherBody can not be empty";
                this.selfBody = this.selfBody || this.owner.getComponent(ColliderBase);
                if (!this.selfBody)
                    throw "selfBody can not be empty";
                var def = WheelJoint._temp || (WheelJoint._temp = new physics2D_WheelJointDef());
                var anchorPos = this.selfBody.getWorldPoint(this.anchor[0], this.anchor[1]);
                def.anchor.setValue(anchorPos.x, anchorPos.y);
                let radian = Laya.Utils.toRadian(this.angle);
                def.axis.setValue(Math.cos(radian), Math.sin(radian));
                def.bodyA = this.otherBody.getBox2DBody();
                if (!def.bodyA) {
                    this.otherBody.isConnectedJoint = true;
                    this.otherBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                def.bodyB = this.selfBody.getBox2DBody();
                if (!def.bodyB) {
                    this.selfBody.isConnectedJoint = true;
                    this.selfBody.owner.on("bodyCreated", this, this._createJoint);
                    return;
                }
                def.enableMotor = this._enableMotor;
                def.motorSpeed = this._motorSpeed;
                def.maxMotorTorque = this._maxMotorTorque;
                def.collideConnected = this.collideConnected;
                def.enableLimit = this._enableLimit;
                def.lowerTranslation = this._lowerTranslation;
                def.upperTranslation = this._upperTranslation;
                def.frequency = this._frequency;
                def.dampingRatio = this._dampingRatio;
                this._box2DJointDef = this._factory.createJointDef(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.WheelJoint, def);
                this._joint = this._factory.createJoint(this._physics2DManager.box2DWorld, exports.EPhysics2DJoint.WheelJoint, this._box2DJointDef);
                this.otherBody.owner.off("bodyCreated", this, this._createJoint);
                this.selfBody.owner.off("bodyCreated", this, this._createJoint);
            }
        }
    }

    class Physics2DShapeBase {
        get x() {
            return this._x;
        }
        set x(value) {
            if (this._x == value)
                return;
            this._x = value;
            this._updateShapeData();
        }
        get y() {
            return this._y;
        }
        set y(value) {
            if (this._y == value)
                return;
            this._y = value;
            this._updateShapeData();
        }
        get filterData() {
            return this._filterData;
        }
        set filterData(value) {
            this._filterData = value;
            this._updateFilterData();
        }
        get density() {
            return this._density;
        }
        set density(value) {
            this._density = value;
            this._shapeDef.density = value;
            this._box2DShape && Physics2D.I._factory.set_shape_density(this._box2DShape, value);
        }
        get restitution() {
            return this._restitution;
        }
        set restitution(value) {
            this._restitution = value;
            this._shapeDef.restitution = value;
            this._box2DShape && Physics2D.I._factory.set_shape_restitution(this._box2DShape, value);
        }
        get restitutionThreshold() {
            return this._restitutionThreshold;
        }
        set restitutionThreshold(value) {
            this._restitutionThreshold = value;
            this._shapeDef.restitutionThreshold = value;
            this._box2DShape && Physics2D.I._factory.set_shape_restitutionThreshold(this._box2DShape, value);
        }
        get friction() {
            return this._friction;
        }
        set friction(value) {
            this._friction = value;
            this._shapeDef.friction = value;
            this._box2DShape && Physics2D.I._factory.set_shape_friction(this._box2DShape, value);
        }
        get isSensor() {
            return this._isSensor;
        }
        set isSensor(value) {
            this._isSensor = value;
            this._shapeDef.isSensor = value;
            this._box2DShape && Physics2D.I._factory.set_shape_isSensor(this._box2DShape, value);
        }
        get scaleX() {
            return this._body.owner.globalScaleX;
        }
        get scaleY() {
            return this._body.owner.globalScaleY;
        }
        get pivotoffx() {
            return this._x - this._body.owner.pivotX;
        }
        get pivotoffy() {
            return this._y - this._body.owner.pivotY;
        }
        constructor() {
            this._shapeDef = new Box2DShapeDef();
            this._filterData = new FilterData();
            this._isSensor = false;
            this._density = 10;
            this._friction = 0.2;
            this._restitution = 0;
            this._restitutionThreshold = 1.0;
            this._x = 0;
            this._y = 0;
            this._box2DFilter = Physics2D.I._factory.createFilter();
        }
        _updateFilterData() {
            if (!this._box2DShape || !this._box2DFilter)
                return;
            this._box2DFilter.groupIndex = this._filterData.group;
            this._box2DFilter.categoryBits = this._filterData.category;
            this._box2DFilter.maskBits = this._filterData.mask;
            this._shapeDef.filter = this._filterData;
            Physics2D.I._factory.setfilterData(this._box2DShape, this._box2DFilter);
            Physics2D.I._factory.set_shape_reFilter(this._box2DShape);
        }
        setCollider(body) {
            var _a, _b;
            this._body = body;
            this._box2DBody = body.getBox2DBody();
            if (!this._box2DBody)
                return;
            if (this._box2DShape) {
                Physics2D.I._factory.destroyShape(this._physics2DManager.box2DWorld, this._box2DBody, this._box2DShape);
                Physics2D.I._factory.destroyData(this._box2DShapeDef);
                this._box2DShape = null;
                this._box2DShapeDef = null;
            }
            if (!this._box2DFilter) {
                this._box2DFilter = Physics2D.I._factory.createFilter();
            }
            this._physics2DManager = (_b = (_a = this._body.owner) === null || _a === void 0 ? void 0 : _a.scene) === null || _b === void 0 ? void 0 : _b.getComponentElementManager(Physics2DWorldManager.__managerName);
            this.filterData = this._filterData;
            this._box2DShapeDef = Physics2D.I._factory.createShapeDef(this._physics2DManager.box2DWorld, this._shapeDef, this._box2DFilter);
            Physics2D.I._factory.set_shape_collider(this._box2DShapeDef, this._body);
            this._updateShapeData();
            this._initShape();
        }
        _initShape() {
            if (!Laya.LayaEnv.isPlaying)
                return;
            this._createShape();
            Physics2D.I._factory.set_shape_collider(this._box2DShape, this._body);
            this._updateFilterData();
            this.x = this._x;
            this.y = this._y;
            this.density = this._density;
            this.friction = this._friction;
            this.isSensor = this._isSensor;
            this.restitution = this._restitution;
            this.restitutionThreshold = this._restitutionThreshold;
        }
        _createShape() {
        }
        _updateShapeData() {
        }
        getAABB() {
            return Physics2D.I._factory.get_shape_AABB(this._box2DShape);
        }
        rayCast(index = 0) {
            return Physics2D.I._factory.shape_rayCast(this._box2DShape, null, null, index);
        }
        destroy() {
            Physics2D.I._factory.destroyShape(this._physics2DManager.box2DWorld, this._box2DBody, this._box2DShape);
            Physics2D.I._factory.destroyData(this._box2DFilter);
            Physics2D.I._factory.destroyData(this._box2DShapeDef);
            this._box2DShape = null;
            this._box2DFilter = null;
            this._box2DShapeDef = null;
        }
        clone() {
        }
        cloneTo(destObject) {
            destObject.density = this.density;
            destObject.filterData = this.filterData;
            destObject.friction = this.friction;
            destObject.isSensor = this.isSensor;
            destObject.restitution = this.restitution;
            destObject.restitutionThreshold = this.restitutionThreshold;
            destObject.x = this.x;
            destObject.y = this.y;
        }
    }

    class BoxShape2D extends Physics2DShapeBase {
        get height() {
            return this._height;
        }
        set height(value) {
            if (value < 0)
                console.warn("BoxCollider size cannot be less than 0");
            if (this._height == value)
                return;
            this._height = value;
            this._updateShapeData();
        }
        get width() {
            return this._width;
        }
        set width(value) {
            if (value < 0)
                console.warn("BoxCollider size cannot be less than 0");
            if (this._width == value)
                return;
            this._width = value;
            this._updateShapeData();
        }
        constructor() {
            super();
            this._width = 100;
            this._height = 100;
            this._shapeDef.shapeType = exports.EPhysics2DShape.BoxShape;
        }
        _createShape() {
            this._box2DShape = Physics2D.I._factory.createShape(this._physics2DManager.box2DWorld, this._box2DBody, exports.EPhysics2DShape.BoxShape, this._box2DShapeDef);
            this._updateShapeData();
        }
        _updateShapeData() {
            if (!Laya.LayaEnv.isPlaying || !this._body)
                return;
            let helfW = this._width * 0.5;
            let helfH = this._height * 0.5;
            var center = {
                x: helfW + this.pivotoffx,
                y: helfH + this.pivotoffy
            };
            let shape = this._box2DShape ? Physics2D.I._factory.getShape(this._box2DShape, this._shapeDef.shapeType) : Physics2D.I._factory.getShapeByDef(this._box2DShapeDef, this._shapeDef.shapeType);
            Physics2D.I._factory.set_collider_SetAsBox(shape, helfW, helfH, center, Math.abs(this.scaleX), Math.abs(this.scaleY));
        }
        clone() {
            let dest = new BoxShape2D();
            this.cloneTo(dest);
            return dest;
        }
        cloneTo(destObject) {
            super.cloneTo(destObject);
            destObject.width = this.width;
            destObject.height = this.height;
        }
    }

    class ChainShape2D extends Physics2DShapeBase {
        get datas() {
            return this._datas;
        }
        set datas(value) {
            if (!value)
                throw "ChainCollider datas cannot be empty";
            this._datas = value;
            this._updateShapeData();
        }
        get loop() {
            return this._loop;
        }
        set loop(value) {
            if (this._loop == value)
                return;
            this._loop = value;
            this._updateShapeData();
        }
        constructor() {
            super();
            this._datas = [0, 0, 100, 0];
            this._loop = false;
            this._shapeDef.shapeType = exports.EPhysics2DShape.ChainShape;
        }
        _createShape() {
            this._box2DShape = Physics2D.I._factory.createShape(this._physics2DManager.box2DWorld, this._box2DBody, exports.EPhysics2DShape.ChainShape, this._box2DShapeDef);
            this._updateShapeData();
        }
        _updateShapeData() {
            if (!Laya.LayaEnv.isPlaying || !this._body)
                return;
            var len = this._datas.length;
            if (len % 2 == 1)
                throw "ChainCollider datas lenth must a multiplier of 2";
            let shape = this._box2DShape ? Physics2D.I._factory.getShape(this._box2DShape, this._shapeDef.shapeType) : Physics2D.I._factory.getShapeByDef(this._box2DShapeDef, this._shapeDef.shapeType);
            Physics2D.I._factory.set_ChainShape_data(shape, this.pivotoffx, this.pivotoffy, this._datas, this._loop, this.scaleX, this.scaleY);
        }
        clone() {
            let dest = new ChainShape2D();
            this.cloneTo(dest);
            return dest;
        }
        cloneTo(destObject) {
            super.cloneTo(destObject);
            destObject.datas = this.datas;
            destObject.loop = this.loop;
        }
    }

    class EdgeShape2D extends Physics2DShapeBase {
        get datas() {
            return this._datas;
        }
        set datas(value) {
            if (!value)
                throw "EdgeCollider points cannot be empty";
            this._datas = value;
            this._updateShapeData();
        }
        constructor() {
            super();
            this._datas = [0, 0, 100, 0];
            this._shapeDef.shapeType = exports.EPhysics2DShape.EdgeShape;
        }
        _createShape() {
            this._box2DShape = Physics2D.I._factory.createShape(this._physics2DManager.box2DWorld, this._box2DBody, exports.EPhysics2DShape.EdgeShape, this._box2DShapeDef);
            this._updateShapeData();
        }
        _updateShapeData() {
            if (!Laya.LayaEnv.isPlaying || !this._body)
                return;
            var len = this._datas.length;
            if (len % 2 == 1)
                throw "EdgeCollider points lenth must a multiplier of 2";
            let shape = this._box2DShape ? Physics2D.I._factory.getShape(this._box2DShape, this._shapeDef.shapeType) : Physics2D.I._factory.getShapeByDef(this._box2DShapeDef, this._shapeDef.shapeType);
            Physics2D.I._factory.set_EdgeShape_data(shape, this.pivotoffx, this.pivotoffy, this._datas, this.scaleX, this.scaleY);
        }
        clone() {
            let dest = new EdgeShape2D();
            this.cloneTo(dest);
            return dest;
        }
        cloneTo(destObject) {
            super.cloneTo(destObject);
            destObject.datas = this.datas;
        }
    }

    class PolygonShape2D extends Physics2DShapeBase {
        get datas() {
            return this._datas;
        }
        set datas(value) {
            if (!value)
                throw "PolygonCollider points cannot be empty";
            this._datas = value;
            this._updateShapeData();
        }
        constructor() {
            super();
            this._datas = [50, 0, 100, 100, 0, 100];
            this._shapeDef.shapeType = exports.EPhysics2DShape.PolygonShape;
        }
        _createShape() {
            this._box2DShape = Physics2D.I._factory.createShape(this._physics2DManager.box2DWorld, this._box2DBody, exports.EPhysics2DShape.PolygonShape, this._box2DShapeDef);
            this._updateShapeData();
        }
        _updateShapeData() {
            if (!Laya.LayaEnv.isPlaying || !this._body)
                return;
            var len = this.datas.length;
            if (len < 6)
                throw "PolygonCollider points must be greater than 3";
            if (len % 2 == 1)
                throw "PolygonCollider points lenth must a multiplier of 2";
            let shape = this._box2DShape ? Physics2D.I._factory.getShape(this._box2DShape, this._shapeDef.shapeType) : Physics2D.I._factory.getShapeByDef(this._box2DShapeDef, this._shapeDef.shapeType);
            Physics2D.I._factory.set_PolygonShape_data(shape, this.pivotoffx, this.pivotoffy, this.datas, this.scaleX, this.scaleY);
        }
        clone() {
            let dest = new PolygonShape2D();
            this.cloneTo(dest);
            return dest;
        }
        cloneTo(destObject) {
            super.cloneTo(destObject);
            destObject.datas = this.datas;
        }
    }

    class CircleShape2D extends Physics2DShapeBase {
        get radius() {
            return this._radius;
        }
        set radius(value) {
            this._radius = value;
            this._updateShapeData();
        }
        constructor() {
            super();
            this._radius = 50;
            this._shapeDef.shapeType = exports.EPhysics2DShape.CircleShape;
        }
        _createShape() {
            this._box2DShape = Physics2D.I._factory.createShape(this._physics2DManager.box2DWorld, this._box2DBody, exports.EPhysics2DShape.CircleShape, this._box2DShapeDef);
            this._updateShapeData();
        }
        _updateShapeData() {
            if (!Laya.LayaEnv.isPlaying || !this._body)
                return;
            var scale = Math.max(Math.abs(this.scaleX), Math.abs(this.scaleY));
            let radius = this.radius;
            let shape = this._box2DShape ? Physics2D.I._factory.getShape(this._box2DShape, this._shapeDef.shapeType) : Physics2D.I._factory.getShapeByDef(this._box2DShapeDef, this._shapeDef.shapeType);
            Physics2D.I._factory.set_CircleShape_radius(shape, radius, scale);
            Physics2D.I._factory.set_CircleShape_pos(shape, this.x, this.y, scale);
        }
        clone() {
            let dest = new CircleShape2D();
            this.cloneTo(dest);
            return dest;
        }
        cloneTo(destObject) {
            super.cloneTo(destObject);
            destObject.radius = this.radius;
        }
    }

    let c = Laya.ClassUtils.regClass;
    c("Physics2D", Physics2D);
    c("Physics2DDebugDraw", Physics2DDebugDraw);
    c("Physics2DWorldManager", Physics2DWorldManager);
    c("FilterData", FilterData);
    c("ColliderBase", ColliderBase);
    c("RigidBody", RigidBody);
    c("StaticCollider", StaticCollider);
    c("JointBase", JointBase);
    c("DistanceJoint", DistanceJoint);
    c("GearJoint", GearJoint);
    c("MotorJoint", MotorJoint);
    c("MouseJoint", MouseJoint);
    c("PrismaticJoint", PrismaticJoint);
    c("PulleyJoint", PulleyJoint);
    c("RevoluteJoint", RevoluteJoint);
    c("WeldJoint", WeldJoint);
    c("WheelJoint", WheelJoint);
    c("BoxCollider", BoxCollider);
    c("ChainCollider", ChainCollider);
    c("CircleCollider", CircleCollider);
    c("EdgeCollider", EdgeCollider);
    c("PolygonCollider", PolygonCollider);
    c("Physics2DShapeBase", Physics2DShapeBase);
    c("BoxShape2D", BoxShape2D);
    c("CircleShape2D", CircleShape2D);
    c("ChainShape2D", ChainShape2D);
    c("EdgeShape2D", EdgeShape2D);
    c("PolygonShape2D", PolygonShape2D);

    const b2_maxFloat = 1E+37;
    class physics2DwasmFactory {
        constructor() {
            this.worldMap = new Map();
            this.worldCount = 0;
        }
        get box2d() {
            return this._box2d;
        }
        createPhyVec2(x, y) {
            return new this.box2d.b2Vec2(x, y);
        }
        createPhyFromLayaVec2(world, x, y) {
            return new this.box2d.b2Vec2(this.convertLayaValueToPhysics(world, x), this.convertLayaValueToPhysics(world, y));
        }
        convertLayaValueToPhysics(world, value) {
            let _rePixelRatio = 1 / world._pixelRatio;
            value = value * _rePixelRatio;
            return value;
        }
        convertPhysicsValueToLaya(world, value) {
            let _pixelRatio = world._pixelRatio;
            value = value * _pixelRatio;
            return value;
        }
        createBox2DDraw(world, flag) {
            let jsDraw = new this.box2d.JSDraw();
            jsDraw.SetFlags(flag);
            world.SetDebugDraw(jsDraw);
            return jsDraw;
        }
        shiftOrigin(world, newOrigin) {
            if (!world)
                console.warn("shiftOrigin world is null");
            world.ShiftOrigin({ x: newOrigin.x, y: newOrigin.y });
        }
        appendFlags(jsDraw, flags) {
            if (jsDraw)
                jsDraw.AppendFlags(flags);
        }
        clearFlags(jsDraw, flags) {
            if (jsDraw)
                jsDraw.ClearFlags(flags);
        }
        initialize() {
            return window.Box2D().then((box2d) => {
                this._box2d = box2d;
                this._box2d.b2LinearStiffness = this.b2LinearStiffness;
                this._tempVe21 = new this.box2d.b2Vec2();
                this._tempVe22 = new this.box2d.b2Vec2();
                return Promise.resolve();
            });
        }
        createWorld(worldDef) {
            let gravity = this.createPhyVec2(worldDef.gravity.x, worldDef.gravity.y);
            let world = new this._box2d.b2World(gravity);
            world.destroyed = false;
            return world;
        }
        allowWorldSleep(world, allowSleep) {
            world.SetAllowSleeping(allowSleep);
        }
        clearForces(world) {
            world.ClearForces();
        }
        QueryAABB(world, jsquerycallback, bounds) {
            world.QueryAABB(jsquerycallback, bounds);
        }
        RayCast(world, jsraycastcallback, startPoint, endPoint) {
            this._tempVe21.x = this.convertLayaValueToPhysics(world, startPoint.x);
            this._tempVe21.y = this.convertLayaValueToPhysics(world, startPoint.y);
            this._tempVe22.x = this.convertLayaValueToPhysics(world, endPoint.x);
            this._tempVe22.y = this.convertLayaValueToPhysics(world, endPoint.y);
            world.RayCast(jsraycastcallback, this._tempVe21, this._tempVe22);
        }
        shapeCast() {
        }
        getBodyList(world) {
            let bodyList = world.GetBodyList();
            return bodyList;
        }
        getBodyCount(world) {
            return world.GetBodyCount();
        }
        getJointList(world) {
            let jointList = world.GetJointList();
            return jointList;
        }
        getJointCount(world) {
            return world.GetJointCount();
        }
        getContactList(world) {
            let contactList = world.GetContactList();
            return contactList;
        }
        getContactCount(world) {
            return world.GetContactCount();
        }
        start() {
        }
        destroyWorld(world) {
            if (world) {
                if (this.getBodyCount(world) != 0) {
                    console.warn("There's still have body in box2DWorld, can not destroy");
                    return;
                }
                if (this.getJointCount(world) != 0) {
                    console.warn("There's still have joint in box2DWorld, can not destroy");
                    return;
                }
                this.box2d.destroy(world);
                world.destroyed = true;
            }
        }
        update(delta) {
            for (let i = 0; i <= Physics2D.I._factory.worldCount; i++) {
                let world = this.worldMap.get(i);
                if (!world)
                    continue;
                let bodyCount = this.getBodyCount(world.box2DWorld);
                if (bodyCount <= 0)
                    continue;
                let velocityIterations = world.getVelocityIterations();
                let positionIterations = world.getPositionIterations();
                world.box2DWorld.Step(delta, velocityIterations, positionIterations);
                if (world.enableDebugDraw) {
                    world.box2DWorld.DebugDraw();
                }
                world.sendEvent();
            }
        }
        createJointDef(world, type, def) {
            if (!world)
                console.warn("createJointDef world is null");
            var jointDef;
            switch (type) {
                case exports.EPhysics2DJoint.DistanceJoint:
                    jointDef = new this.box2d.b2DistanceJointDef();
                    jointDef.bodyA = def.bodyA;
                    jointDef.bodyB = def.bodyB;
                    jointDef.localAnchorA.Set(this.convertLayaValueToPhysics(world, def.localAnchorA.x), this.convertLayaValueToPhysics(world, def.localAnchorA.y));
                    jointDef.localAnchorB.Set(this.convertLayaValueToPhysics(world, def.localAnchorB.x), this.convertLayaValueToPhysics(world, def.localAnchorB.y));
                    this.b2LinearStiffness(jointDef, def.frequency, def.dampingRatio, jointDef.bodyA, jointDef.bodyB);
                    jointDef.set_collideConnected(def.collideConnected);
                    if (def.length > 0) {
                        jointDef.length = this.convertLayaValueToPhysics(world, def.length);
                    }
                    else {
                        var p1 = jointDef.bodyA.GetWorldPoint(jointDef.localAnchorA);
                        let data = { x: p1.x, y: p1.y };
                        var p2 = jointDef.bodyB.GetWorldPoint(jointDef.localAnchorB);
                        jointDef.length = this.getVec2Length(data, p2);
                    }
                    if (def.maxLength > 0)
                        jointDef.maxLength = this.convertLayaValueToPhysics(world, def.maxLength);
                    else
                        jointDef.maxLength = b2_maxFloat;
                    if (def.minLength > 0)
                        jointDef.minLength = this.convertLayaValueToPhysics(world, def.minLength);
                    else
                        jointDef.minLength = 0;
                    break;
                case exports.EPhysics2DJoint.RevoluteJoint:
                    jointDef = new this.box2d.b2RevoluteJointDef();
                    let revoluteAnchorVec = this.createPhyFromLayaVec2(world, def.anchor.x, def.anchor.y);
                    jointDef.Initialize(def.bodyA, def.bodyB, revoluteAnchorVec);
                    jointDef.enableMotor = def.enableMotor;
                    jointDef.motorSpeed = def.motorSpeed;
                    jointDef.maxMotorTorque = def.maxMotorTorque;
                    jointDef.enableLimit = def.enableLimit;
                    jointDef.lowerAngle = def.lowerAngle;
                    jointDef.upperAngle = def.upperAngle;
                    jointDef.collideConnected = def.collideConnected;
                    break;
                case exports.EPhysics2DJoint.GearJoint:
                    jointDef = new this.box2d.b2GearJointDef();
                    jointDef.bodyA = def.bodyA;
                    jointDef.bodyB = def.bodyB;
                    jointDef.joint1 = def.joint1;
                    jointDef.joint2 = def.joint2;
                    jointDef.ratio = def.ratio;
                    jointDef.collideConnected = def.collideConnected;
                    break;
                case exports.EPhysics2DJoint.PulleyJoint:
                    jointDef = new this.box2d.b2PulleyJointDef();
                    let groundVecA = this.createPhyFromLayaVec2(world, def.groundAnchorA.x, def.groundAnchorA.y);
                    let groundVecB = this.createPhyFromLayaVec2(world, def.groundAnchorB.x, def.groundAnchorB.y);
                    let anchorVecA = this.createPhyFromLayaVec2(world, def.localAnchorA.x, def.localAnchorA.y);
                    let anchorVecB = this.createPhyFromLayaVec2(world, def.localAnchorB.x, def.localAnchorB.y);
                    jointDef.Initialize(def.bodyA, def.bodyB, groundVecA, groundVecB, anchorVecA, anchorVecB, def.ratio);
                    jointDef.collideConnected = def.collideConnected;
                    break;
                case exports.EPhysics2DJoint.WheelJoint:
                    jointDef = new this.box2d.b2WheelJointDef();
                    let anchorVec = this.createPhyFromLayaVec2(world, def.anchor.x, def.anchor.y);
                    let wheelAxis = this.createPhyVec2(def.axis.x, def.axis.y);
                    jointDef.Initialize(def.bodyA, def.bodyB, anchorVec, wheelAxis);
                    jointDef.enableMotor = def.enableMotor;
                    jointDef.motorSpeed = def.motorSpeed;
                    jointDef.maxMotorTorque = def.maxMotorTorque;
                    this.b2LinearStiffness(jointDef, def.frequency, def.dampingRatio, jointDef.bodyA, jointDef.bodyB);
                    jointDef.collideConnected = def.collideConnected;
                    jointDef.enableLimit = def.enableLimit;
                    jointDef.lowerTranslation = this.convertLayaValueToPhysics(world, def.lowerTranslation);
                    jointDef.upperTranslation = this.convertLayaValueToPhysics(world, def.upperTranslation);
                    break;
                case exports.EPhysics2DJoint.WeldJoint:
                    jointDef = new this.box2d.b2WeldJointDef();
                    let weldAnchorVec = this.createPhyFromLayaVec2(world, def.anchor.x, def.anchor.y);
                    jointDef.Initialize(def.bodyA, def.bodyB, weldAnchorVec);
                    this.b2AngularStiffness(jointDef, def.frequency, def.dampingRatio, def.bodyA, def.bodyB);
                    jointDef.collideConnected = def.collideConnected;
                    break;
                case exports.EPhysics2DJoint.MouseJoint:
                    jointDef = new this.box2d.b2MouseJointDef();
                    jointDef.bodyA = def.bodyA;
                    jointDef.bodyB = def.bodyB;
                    jointDef.target = this.createPhyFromLayaVec2(world, def.target.x, def.target.y);
                    jointDef.maxForce = def.maxForce * def.bodyB.GetMass();
                    jointDef.collideConnected = true;
                    this.b2LinearStiffness(jointDef, def.frequency, def.dampingRatio, def.bodyA, def.bodyB);
                    break;
                case exports.EPhysics2DJoint.MotorJoint:
                    jointDef = new this.box2d.b2MotorJointDef();
                    jointDef.Initialize(def.bodyA, def.bodyB);
                    jointDef.linearOffset = this.createPhyFromLayaVec2(world, def.linearOffset.x, def.linearOffset.y);
                    jointDef.angularOffset = def.angularOffset;
                    jointDef.maxForce = def.maxForce;
                    jointDef.maxTorque = def.maxTorque;
                    jointDef.correctionFactor = def.correctionFactor;
                    jointDef.collideConnected = def.collideConnected;
                    break;
                case exports.EPhysics2DJoint.PrismaticJoint:
                    jointDef = new this.box2d.b2PrismaticJointDef();
                    let prismaticAnchorVec = this.createPhyFromLayaVec2(world, def.anchor.x, def.anchor.y);
                    let axis = this.createPhyVec2(def.axis.x, def.axis.y);
                    jointDef.Initialize(def.bodyA, def.bodyB, prismaticAnchorVec, axis);
                    jointDef.enableMotor = def.enableMotor;
                    jointDef.motorSpeed = def.motorSpeed;
                    jointDef.maxMotorForce = def.maxMotorForce;
                    jointDef.enableLimit = def.enableLimit;
                    jointDef.lowerTranslation = this.convertLayaValueToPhysics(world, def.lowerTranslation);
                    jointDef.upperTranslation = this.convertLayaValueToPhysics(world, def.upperTranslation);
                    jointDef.collideConnected = def.collideConnected;
                    break;
            }
            return jointDef;
        }
        createJoint(world, type, def) {
            if (!world)
                console.warn("createJoint world is null");
            let joint;
            switch (type) {
                case exports.EPhysics2DJoint.DistanceJoint:
                    joint = this._createBox2DJoint(world, def, this._box2d.b2DistanceJoint);
                    break;
                case exports.EPhysics2DJoint.RevoluteJoint:
                    joint = this._createBox2DJoint(world, def, this._box2d.b2RevoluteJoint);
                    break;
                case exports.EPhysics2DJoint.GearJoint:
                    joint = this._createBox2DJoint(world, def, this._box2d.b2GearJoint);
                    break;
                case exports.EPhysics2DJoint.PulleyJoint:
                    joint = this._createBox2DJoint(world, def, this._box2d.b2PulleyJoint);
                    break;
                case exports.EPhysics2DJoint.WheelJoint:
                    joint = this._createBox2DJoint(world, def, this._box2d.b2WheelJoint);
                    break;
                case exports.EPhysics2DJoint.WeldJoint:
                    joint = this._createBox2DJoint(world, def, this._box2d.b2WeldJoint);
                    break;
                case exports.EPhysics2DJoint.MouseJoint:
                    joint = this._createBox2DJoint(world, def, this._box2d.b2MouseJoint);
                    break;
                case exports.EPhysics2DJoint.MotorJoint:
                    joint = this._createBox2DJoint(world, def, this._box2d.b2MotorJoint);
                    break;
                case exports.EPhysics2DJoint.PrismaticJoint:
                    joint = this._createBox2DJoint(world, def, this._box2d.b2PrismaticJoint);
                    break;
            }
            joint.bodyA = def.bodyA;
            joint.bodyB = def.bodyB;
            return joint;
        }
        removeJoint(world, joint) {
            if (joint && world && !world.destroyed && !joint.bodyA.destroyed && !joint.bodyB.destroyed)
                world.DestroyJoint(joint);
        }
        _createBox2DJoint(world, def, cls) {
            if (!world)
                console.warn("createJoint world is null");
            let joint = world.CreateJoint(def);
            if (cls != null) {
                joint = this.castObject(joint, cls);
            }
            joint.m_userData = {};
            joint.world = world;
            return joint;
        }
        setJoint_userData(joint, data) {
        }
        getJoint_userData(joint) {
            return joint.GetUserData();
        }
        getJoint_userData_destroy(joint) {
            return joint.GetUserData().pointer == -1;
        }
        set_Joint_EnableMotor(joint, enableMotor) {
            joint.EnableMotor(enableMotor);
        }
        set_Joint_SetMotorSpeed(joint, motorSpeed) {
            joint.SetMotorSpeed(motorSpeed);
        }
        set_Joint_SetMaxMotorTorque(joint, maxTorque) {
            joint.SetMaxMotorTorque(maxTorque);
        }
        set_Joint_EnableLimit(joint, enableLimit) {
            joint.EnableLimit(enableLimit);
        }
        set_Joint_SetLimits(joint, lowerAngle, upperAngle) {
            joint.SetLimits(lowerAngle, upperAngle);
        }
        set_Joint_frequencyAndDampingRatio(joint, frequency, dampingRatio, isdamping) {
            let out = {};
            this.box2d.b2AngularStiffness(out, frequency, dampingRatio, joint.GetBodyA(), joint.GetBodyB());
            if (!isdamping) {
                joint.SetStiffness(out.stiffness);
            }
            joint.SetDamping(out.damping);
        }
        set_DistanceJoint_length(joint, length) {
            let world = joint.world;
            joint.SetLength(this.convertLayaValueToPhysics(world, (length)));
        }
        get_DistanceJoint_length(joint) {
            let world = joint.world;
            let len = joint.GetLength();
            this.convertPhysicsValueToLaya(world, len);
            return len;
        }
        set_DistanceJoint_MaxLength(joint, length) {
            let world = joint.world;
            joint.SetMaxLength(this.convertLayaValueToPhysics(world, (length)));
        }
        set_DistanceJoint_MinLength(joint, length) {
            let world = joint.world;
            joint.SetMinLength(this.convertLayaValueToPhysics(world, length));
        }
        set_DistanceJointStiffnessDamping(joint, stiffness, damping) {
            let out = {};
            let bodyA = joint.GetBodyA();
            let bodyB = joint.GetBodyB();
            this.box2d.b2LinearStiffness(out, stiffness, damping, bodyA, bodyB);
            joint.SetStiffness(out.stiffness);
            joint.SetDamping(out.damping);
        }
        set_GearJoint_SetRatio(joint, radio) {
            joint.SetRatio(radio);
        }
        set_MouseJoint_target(joint, x, y) {
            let world = joint.world;
            this._tempVe21.x = this.convertLayaValueToPhysics(world, x);
            this._tempVe21.y = this.convertLayaValueToPhysics(world, y);
            joint.SetTarget(this._tempVe21);
        }
        set_MouseJoint_frequencyAndDampingRatio(Joint, frequency, dampingRatio) {
            this.set_DistanceJointStiffnessDamping(Joint, frequency, dampingRatio);
        }
        set_MotorJoint_linearOffset(joint, x, y) {
            let world = joint.world;
            joint.SetLinearOffset(this.createPhyFromLayaVec2(world, x, y));
        }
        set_MotorJoint_SetAngularOffset(joint, angular) {
            joint.SetAngularOffset(angular);
        }
        set_MotorJoint_SetMaxForce(joint, maxForce) {
            joint.SetMaxForce(maxForce);
        }
        set_MotorJoint_SetMaxTorque(joint, maxTorque) {
            joint.SetMaxTorque(maxTorque);
        }
        set_MotorJoint_SetCorrectionFactor(joint, correctionFactor) {
            joint.SetCorrectionFactor(correctionFactor);
        }
        get_joint_recationForce(joint) {
            let force = joint.GetReactionForce(60);
            return force;
        }
        get_joint_reactionTorque(joint) {
            let torque = joint.GetReactionTorque(60);
            return torque;
        }
        isValidJoint(joint) {
            let isConnected = joint.GetCollideConnected();
            return isConnected;
        }
        createShapeDef(world, shapeDef, filter) {
            let def = new this.box2d.b2FixtureDef();
            def.density = shapeDef.density;
            def.friction = shapeDef.friction;
            def.isSensor = shapeDef.isSensor;
            def.restitution = shapeDef.restitution;
            def.restitutionThreshold = shapeDef.restitutionThreshold;
            filter.groupIndex = shapeDef.filter.group;
            filter.categoryBits = shapeDef.filter.category;
            filter.maskBits = shapeDef.filter.mask;
            def.filter = filter;
            switch (shapeDef.shapeType) {
                case exports.EPhysics2DShape.BoxShape:
                case exports.EPhysics2DShape.PolygonShape:
                    let polygonShape = new this.box2d.b2PolygonShape();
                    def.set_shape(polygonShape);
                    break;
                case exports.EPhysics2DShape.ChainShape:
                    let chainShape = new this.box2d.b2ChainShape();
                    def.set_shape(chainShape);
                    break;
                case exports.EPhysics2DShape.CircleShape:
                    let circleShape = new this.box2d.b2CircleShape();
                    def.set_shape(circleShape);
                    break;
                case exports.EPhysics2DShape.EdgeShape:
                    let edgeShape = new this.box2d.b2EdgeShape();
                    def.set_shape(edgeShape);
                    break;
            }
            def._shape = this.get_fixtureshape(def.shape, shapeDef.shapeType);
            def._shape.world = world;
            def.world = world;
            return def;
        }
        getShapeByDef(shapeDef, shapeType) {
            let world = shapeDef.world;
            let shape = this.get_fixtureshape(shapeDef.shape, shapeType);
            shape.world = world;
            return shape;
        }
        createFilter() {
            return new this._box2d.b2Filter();
        }
        createShape(world, body, shapeType, shapdeDef) {
            let data = body.CreateFixture(shapdeDef);
            shapdeDef.world = world;
            shapdeDef.shapeType = shapeType;
            data = this.castObject(data, this.box2d.b2Fixture);
            data.world = world;
            data.shape = this.get_fixtureshape(data.GetShape(), shapeType);
            data.shape.world = world;
            data.filter = data.GetFilterData();
            return data;
        }
        set_collider_SetAsBox(shape, width, height, pos, scaleX, scaleY) {
            let world = shape.world;
            width = this.convertLayaValueToPhysics(world, width * scaleX);
            height = this.convertLayaValueToPhysics(world, height * scaleY);
            let centroid = shape.m_centroid;
            centroid.x = this.convertLayaValueToPhysics(world, pos.x * scaleX);
            centroid.y = this.convertLayaValueToPhysics(world, pos.y * scaleY);
            shape.SetAsBox(width, height, centroid, 0);
        }
        set_ChainShape_data(shape, x, y, arr, loop, scaleX, scaleY) {
            let world = shape.world;
            let len = arr.length;
            shape.Clear();
            var ptr_wrapped = this.createVec2Pointer(world, arr, x, y, scaleX, scaleY);
            if (loop) {
                shape.CreateLoop(ptr_wrapped, len >> 1);
            }
            else {
                shape.CreateChain(ptr_wrapped, len >> 1);
            }
            this._box2d._free(ptr_wrapped.ptr);
        }
        set_CircleShape_radius(shape, radius, scale) {
            let world = shape.world;
            shape.m_radius = this.convertLayaValueToPhysics(world, radius * scale);
        }
        set_CircleShape_pos(shape, x, y, scale) {
            let world = shape.world;
            shape.m_p.Set(this.convertLayaValueToPhysics(world, x * scale), this.convertLayaValueToPhysics(world, y * scale));
        }
        set_EdgeShape_data(shape, x, y, arr, scaleX, scaleY) {
            let world = shape.world;
            let len = arr.length;
            var ps = [];
            for (var i = 0, n = len; i < n; i += 2) {
                ps.push(this.createPhyFromLayaVec2(world, (x + arr[i]) * scaleX, (y + arr[i + 1]) * scaleY));
            }
            shape.SetTwoSided(ps[0], ps[1]);
        }
        set_PolygonShape_data(shape, x, y, arr, scaleX, scaleY) {
            let world = shape.world;
            let ptr_wrapped = this.createVec2Pointer(world, arr, x, y, scaleX, scaleY);
            shape.Set(ptr_wrapped, arr.length / 2);
            this._box2d._free(ptr_wrapped.ptr);
        }
        destroyShape(world, body, shape) {
            body.DestroyFixture(shape);
        }
        set_shapeDef_GroupIndex(def, groupIndex) {
            def.filter.groupIndex = groupIndex;
        }
        set_shapeDef_CategoryBits(def, categoryBits) {
            def.filter.categoryBits = categoryBits;
        }
        set_shapeDef_maskBits(def, maskbits) {
            def.filter.maskBits = maskbits;
        }
        resetShapeData(shape, shapeDef) {
            shape.SetDensity(shapeDef.density);
            shape.SetFriction(shapeDef.friction);
            shape.SetSensor(shapeDef.isSensor);
            shape.SetRestitution(shapeDef.restitution);
        }
        set_shape_collider(shape, instance) {
            shape.collider = instance;
        }
        get_shape_body(shape) {
            return shape.GetBody();
        }
        set_shape_isSensor(shape, sensor) {
            shape.SetSensor(sensor);
        }
        get_shape_isSensor(shape) {
            let isSensor = shape.IsSensor();
            return isSensor;
        }
        getShape(shape, type) {
            let world = shape.world;
            let fixtureShape = shape.GetShape();
            fixtureShape = this.get_fixtureshape(fixtureShape, type);
            fixtureShape.world = world;
            return fixtureShape;
        }
        setfilterData(shape, filterData) {
            shape.SetFilterData(filterData);
        }
        getfilterData(shape) {
            let shapeFilterData = shape.GetFilterData();
            return shapeFilterData;
        }
        set_shape_reFilter(shape) {
            shape.Refilter();
        }
        shape_rayCast(shape, output, input, childIndex) {
            return false;
        }
        get_shape_massData(shape, massData) {
            massData = shape.GetMassData(massData);
            return massData;
        }
        set_shape_density(shape, density) {
            shape.SetDensity(density);
        }
        set_shape_friction(shape, friction) {
            shape.SetFriction(friction);
        }
        set_shape_restitution(shape, restitution) {
            shape.SetRestitution(restitution);
        }
        set_shape_restitutionThreshold(shape, restitutionThreshold) {
            shape.SetRestitutionThreshold(restitutionThreshold);
        }
        get_shape_AABB(shape) {
            let AABB = shape.GetAABB(0);
            return AABB;
        }
        createMassData() {
            let massData = new this.box2d.b2MassData();
            return massData;
        }
        createBody(world, def) {
            if (!def) {
                def = new this.box2d.b2BodyDef();
            }
            if (!world)
                return;
            def.userData = { pointer: 0 };
            let body = world.CreateBody(def);
            body.world = world;
            body.destroyed = false;
            return body;
        }
        removeBody(world, body) {
            if (!body || !world)
                return;
            if (body.world._indexInMap != world._indexInMap)
                return;
            if (!world.destroyed)
                world.DestroyBody(body);
            body.destroyed = true;
        }
        rigidBody_DestroyShape(body, shape) {
            if (body.world && !body.world.destroyed)
                body.DestroyFixture(shape);
        }
        createBodyDef(world, rigidbodyDef) {
            var def = new this.box2d.b2BodyDef();
            def.position.Set(this.convertLayaValueToPhysics(world, rigidbodyDef.position.x), this.convertLayaValueToPhysics(world, rigidbodyDef.position.y));
            def.angle = rigidbodyDef.angle;
            def.allowSleep = rigidbodyDef.allowSleep;
            def.angularDamping = rigidbodyDef.angularDamping;
            def.angularVelocity = rigidbodyDef.angularVelocity;
            def.bullet = rigidbodyDef.bullet;
            def.fixedRotation = rigidbodyDef.fixedRotation;
            def.gravityScale = rigidbodyDef.gravityScale;
            def.linearDamping = rigidbodyDef.linearDamping;
            def.linearVelocity = new this.box2d.b2Vec2(this.convertLayaValueToPhysics(world, rigidbodyDef.linearVelocity.x), this.convertLayaValueToPhysics(world, rigidbodyDef.linearVelocity.y));
            def.type = this.getbodyType(rigidbodyDef.type);
            return def;
        }
        get_RigidBody_Position(body, v2) {
            let world = body.world;
            var pos = body.GetPosition();
            v2.setValue(this.convertPhysicsValueToLaya(world, pos.x), this.convertPhysicsValueToLaya(world, pos.y));
        }
        get_RigidBody_Angle(body) {
            return body.GetAngle();
        }
        set_RigibBody_Enable(body, enable) {
            body.SetEnabled(enable);
        }
        set_RigibBody_Transform(body, x, y, angle) {
            let pos = body.GetPosition();
            let world = body.world;
            pos.x = this.convertLayaValueToPhysics(world, x);
            pos.y = this.convertLayaValueToPhysics(world, y);
            body.SetTransform(pos, angle);
        }
        get_rigidBody_WorldPoint(body, x, y) {
            let world = body.world;
            let data = body.GetWorldPoint(this.createPhyFromLayaVec2(world, x, y));
            return {
                x: this.convertPhysicsValueToLaya(world, data.x),
                y: this.convertPhysicsValueToLaya(world, data.y)
            };
        }
        get_rigidBody_LocalPoint(body, x, y) {
            let world = body.world;
            let data = body.GetLocalPoint(this.createPhyFromLayaVec2(world, x, y));
            return {
                x: this.convertPhysicsValueToLaya(world, data.x),
                y: this.convertPhysicsValueToLaya(world, data.y)
            };
        }
        rigidBody_applyForce(body, force, position) {
            let world = body.world;
            this._tempVe21.x = this.convertLayaValueToPhysics(world, position.x);
            this._tempVe21.y = this.convertLayaValueToPhysics(world, position.y);
            this._tempVe22.x = force.x;
            this._tempVe22.y = force.y;
            body.ApplyForce(this._tempVe22, this._tempVe21, false);
        }
        rigidBody_applyForceToCenter(body, force) {
            this._tempVe21.x = force.x;
            this._tempVe21.y = force.y;
            body.ApplyForceToCenter(this._tempVe21);
        }
        rigidbody_ApplyLinearImpulse(body, impulse, position) {
            let world = body.world;
            this._tempVe21.x = impulse.x;
            this._tempVe21.y = impulse.y;
            this._tempVe22.x = this.convertLayaValueToPhysics(world, position.x);
            this._tempVe22.y = this.convertLayaValueToPhysics(world, position.y);
            body.ApplyLinearImpulse(this._tempVe21, this._tempVe22);
        }
        rigidbody_ApplyLinearImpulseToCenter(body, impulse) {
            this._tempVe21.x = impulse.x;
            this._tempVe21.y = impulse.y;
            body.ApplyLinearImpulseToCenter(this._tempVe21);
        }
        rigidbody_applyTorque(body, torque) {
            body.ApplyTorque(torque);
        }
        set_rigidbody_Velocity(body, velocity) {
            let world = body.world;
            this._tempVe21.x = this.convertLayaValueToPhysics(world, velocity.x);
            this._tempVe21.y = this.convertLayaValueToPhysics(world, velocity.y);
            body.SetLinearVelocity(this._tempVe21);
        }
        set_rigidbody_Awake(body, awake) {
            body.SetAwake(awake);
        }
        get_rigidbody_Mass(body) {
            return body.GetMass();
        }
        set_rigidBody_Mass(body, massValue, centerofMass, inertiaValue, massData) {
            massData.mass = massValue;
            massData.center.x = centerofMass.x;
            massData.center.y = centerofMass.y;
            massData.I = inertiaValue;
            body.SetMassData(massData);
        }
        get_rigidBody_Center(body) {
            let world = body.world;
            let value = body.GetLocalCenter();
            let point = { x: 0, y: 0 };
            point.x = this.convertPhysicsValueToLaya(world, value.x);
            point.y = this.convertPhysicsValueToLaya(world, value.y);
            return point;
        }
        get_rigidbody_Inertia(body) {
            return body.GetInertia();
        }
        get_rigidBody_IsAwake(body) {
            return body.IsAwake();
        }
        get_rigidBody_WorldCenter(body) {
            let world = body.world;
            let value = body.GetWorldCenter();
            let point = { x: 0, y: 0 };
            point.x = this.convertPhysicsValueToLaya(world, value.x);
            point.y = this.convertPhysicsValueToLaya(world, value.y);
            return point;
        }
        set_rigidBody_type(body, value) {
            body.SetType(this.getbodyType(value));
        }
        set_rigidBody_gravityScale(body, value) {
            body.SetGravityScale(value);
        }
        set_rigidBody_allowRotation(body, value) {
            body.SetFixedRotation(!value);
        }
        set_rigidBody_allowSleep(body, value) {
            body.SetSleepingAllowed(value);
        }
        set_rigidBody_angularDamping(body, value) {
            body.SetAngularDamping(value);
        }
        get_rigidBody_angularVelocity(body) {
            return body.GetAngularVelocity();
        }
        set_rigidBody_angularVelocity(body, value) {
            body.SetAngularVelocity(value);
        }
        set_rigidBody_linearDamping(body, value) {
            body.SetLinearDamping(value);
        }
        get_rigidBody_linearVelocity(body) {
            let world = body.world;
            let value = body.GetLinearVelocity();
            this._tempVe21.x = this.convertPhysicsValueToLaya(world, value.x);
            this._tempVe21.y = this.convertPhysicsValueToLaya(world, value.y);
            return this._tempVe21;
        }
        set_rigidBody_linearVelocity(body, value) {
            let world = body.world;
            this._tempVe21.x = this.convertLayaValueToPhysics(world, value.x);
            this._tempVe21.y = this.convertLayaValueToPhysics(world, value.y);
            body.SetLinearVelocity(this._tempVe21);
        }
        set_rigidBody_bullet(body, value) {
            body.SetBullet(value);
        }
        retSet_rigidBody_MassData(body) {
            body.ResetMassData();
        }
        get_rigidBody_isEnable(body) {
            let isBodyEnable = body.IsEnabled();
            return isBodyEnable;
        }
        get_rigidBody_fixedRotation(body) {
            let isFixedRotation = body.IsFixedRotation();
            return isFixedRotation;
        }
        get_rigidBody_next(body) {
            return body.GetNext();
        }
        set_rigidBody_userData(body, data) {
        }
        get_rigidBody_userData(body) {
            return body.GetUserData();
        }
        get_RigibBody_Transform(body) {
            return body.GetTransform();
        }
        get_rigidBody_WorldVector(body, value) {
            return body.GetWorldVector(value);
        }
        get_rigidBody_LocalVector(body, value) {
            return body.GetLocalVector(value);
        }
        rigidbody_ApplyAngularImpulse(body, impulse) {
            body.ApplyAngularImpulse(impulse, true);
        }
        set_rigidBody_Awake(body, awake) {
            body.SetAwake(awake);
        }
        get_rigidBody_Mass(body) {
            return body.GetMass();
        }
        get_rigidBody_Inertia(body) {
            return body.GetInertia();
        }
        get_rigidBody_type(body) {
            let type = body.GetType();
            switch (type) {
                case "b2_staticBody":
                    type = "static";
                    break;
                case "b2_kinematicBody":
                    type = "kinematic";
                    break;
                case "b2_dynamicBody":
                    type = "dynamic";
                    break;
            }
            return type;
        }
        get_rigidBody_gravityScale(body) {
            return body.GetGravityScale();
        }
        get_rigidBody_allowSleep(body) {
            return body.IsSleepingAllowed();
        }
        get_rigidBody_angularDamping(body) {
            return body.GetAngularDamping();
        }
        get_rigidBody_linearDamping(body) {
            return body.GetLinearDamping();
        }
        get_rigidBody_linearVelocityFromWorldPoint(body, worldPoint) {
            let world = body.world;
            this._tempVe21.x = this.convertLayaValueToPhysics(world, worldPoint.x);
            this._tempVe21.y = this.convertLayaValueToPhysics(world, worldPoint.y);
            let velocity = body.GetLinearVelocityFromWorldPoint(worldPoint);
            velocity.x = this.convertPhysicsValueToLaya(world, velocity.x);
            velocity.y = this.convertPhysicsValueToLaya(world, velocity.y);
            return velocity;
        }
        get_rigidBody_linearVelocityFromLocalPoint(body, localPoint) {
            let world = body.world;
            this._tempVe21.x = this.convertLayaValueToPhysics(world, localPoint.x);
            this._tempVe21.y = this.convertLayaValueToPhysics(world, localPoint.y);
            let velocity = body.GetLinearVelocityFromLocalPoint(localPoint);
            velocity.x = this.convertPhysicsValueToLaya(world, velocity.x);
            velocity.y = this.convertPhysicsValueToLaya(world, velocity.y);
            return velocity;
        }
        get_rigidBody_bullet(body) {
            return body.IsBullet();
        }
        getbodyType(type) {
            if (type == "dynamic") {
                return this.box2d.b2_dynamicBody;
            }
            else if (type == "static") {
                return this.box2d.b2_staticBody;
            }
            else if (type == "kinematic") {
                return this.box2d.b2_kinematicBody;
            }
        }
        setDestructionListener(world, destroyFun) {
        }
        setContactListener(world, listener) {
            if (!world)
                console.warn("setContactListener world is null");
            world.SetContactListener(listener);
        }
        warpPoint(ins, type) {
            let res;
            switch (type) {
                case exports.Ebox2DType.b2Color:
                    res = this._box2d.wrapPointer(ins, this._box2d.b2Color);
                    break;
                case exports.Ebox2DType.b2Contact:
                    res = this._box2d.wrapPointer(ins, this._box2d.b2Contact);
                    break;
                case exports.Ebox2DType.b2Fixture:
                    res = this._box2d.wrapPointer(ins, this._box2d.b2Fixture);
                    break;
                case exports.Ebox2DType.b2Joint:
                    res = this._box2d.wrapPointer(ins, this._box2d.b2Joint);
                    break;
                case exports.Ebox2DType.b2Transform:
                    res = this._box2d.wrapPointer(ins, this._box2d.b2Transform);
                    res.x = res.p.x;
                    res.y = res.p.y;
                    res.angle = res.q.GetAngle();
                    break;
                case exports.Ebox2DType.b2Vec2:
                    res = this._box2d.wrapPointer(ins, this._box2d.b2Vec2);
                    res.x = res.get_x();
                    res.y = res.get_y();
                    break;
                case exports.Ebox2DType.b2Filter:
                    res = this._box2d.wrapPointer(ins, this._box2d.b2Filter);
                    break;
            }
            return res;
        }
        getContactShapeA(contact) {
            return contact.GetFixtureA();
        }
        getContactShapeB(contact) {
            return contact.GetFixtureB();
        }
        createContactListener() {
            let listener = new this._box2d.JSContactListener();
            return listener;
        }
        createJSQueryCallback() {
            let jsQuerycallback = new this._box2d.JSQueryCallback();
            return jsQuerycallback;
        }
        createJSRayCastCallback() {
            let jsRayCastcallback = new this._box2d.JSRayCastCallback();
            return jsRayCastcallback;
        }
        getDestructionListener() {
            var listner = new this.box2d.JSDestructionListener();
            let box2d = this.box2d;
            listner.SayGoodbyeJoint = function (joint) {
                joint = box2d.wrapPointer(joint, box2d.b2Joint);
                joint.GetUserData().pointer = -1;
            };
            listner.SayGoodbyeFixture = function (fixture) {
                fixture = box2d.wrapPointer(fixture, box2d.b2Fixture);
                fixture.GetUserData().pointer = -1;
            };
            return listner;
        }
        castObject(pointer, cls) {
            return this.box2d.castObject(pointer, cls);
        }
        createWrapPointer(world, points) {
            var len = points.length;
            var buffer = this.box2d._malloc(len * 4);
            var offset = 0;
            for (var i = 0; i < len; i++) {
                this.box2d.HEAPF32[buffer + offset >> 2] = this.convertLayaValueToPhysics(world, points[i]);
                offset += 4;
            }
            return buffer;
        }
        createVec2Pointer(world, points, x, y, scaleX, scaleY) {
            var len = points.length >> 1;
            var buffer = this.box2d._malloc(len * 8);
            var offset = 0;
            for (var i = 0; i < len; i++) {
                this.box2d.HEAPF32[buffer + offset >> 2] = this.convertLayaValueToPhysics(world, (points[2 * i] + x) * scaleX);
                this.box2d.HEAPF32[buffer + (offset + 4) >> 2] = this.convertLayaValueToPhysics(world, (points[2 * i + 1] + y) * scaleY);
                offset += 8;
            }
            return this.box2d.wrapPointer(buffer, this.box2d.b2Vec2);
        }
        b2LinearStiffness(def, frequencyHertz, dampingRatio, bodyA, bodyB) {
            if (bodyA == undefined || bodyB == undefined) {
                def.stiffness = 0;
                def.damping = 0;
                return;
            }
            const massA = bodyA.GetMass();
            const massB = bodyB.GetMass();
            let mass;
            if (massA > 0.0 && massB > 0.0) {
                mass = massA * massB / (massA + massB);
            }
            else if (massA > 0.0) {
                mass = massA;
            }
            else {
                mass = massB;
            }
            const omega = 2.0 * Math.PI * frequencyHertz;
            def.stiffness = mass * omega * omega;
            def.damping = 2.0 * mass * dampingRatio * omega;
        }
        b2AngularStiffness(def, frequencyHertz, dampingRatio, bodyA, bodyB) {
            const IA = bodyA.GetInertia();
            const IB = bodyB.GetInertia();
            let I;
            if (IA > 0.0 && IB > 0.0) {
                I = IA * IB / (IA + IB);
            }
            else if (IA > 0.0) {
                I = IA;
            }
            else {
                I = IB;
            }
            const omega = 2.0 * Math.PI * frequencyHertz;
            def.stiffness = I * omega * omega;
            def.damping = 2.0 * I * dampingRatio * omega;
        }
        getVec2Length(p1, p2) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        }
        isNullData(data) {
            return this.box2d.compare(data, this.box2d.NULL);
        }
        destroyData(data) {
            data && data.__destroy__();
        }
        get_fixtureshape(shape, physicShape) {
            let obj;
            switch (physicShape) {
                case exports.EPhysics2DShape.BoxShape:
                case exports.EPhysics2DShape.PolygonShape:
                    obj = this.castObject(shape, this.box2d.b2PolygonShape);
                    break;
                case exports.EPhysics2DShape.ChainShape:
                    obj = this.castObject(shape, this.box2d.b2ChainShape);
                    break;
                case exports.EPhysics2DShape.CircleShape:
                    obj = this.castObject(shape, this.box2d.b2CircleShape);
                    break;
                case exports.EPhysics2DShape.EdgeShape:
                    obj = this.castObject(shape, this.box2d.b2EdgeShape);
                    break;
                default:
                    obj = null;
                    break;
            }
            return obj;
        }
    }
    Physics2D.I._factory = Laya.Laya.physics2D = new physics2DwasmFactory();

    exports.Box2DShapeDef = Box2DShapeDef;
    exports.BoxCollider = BoxCollider;
    exports.BoxShape2D = BoxShape2D;
    exports.ChainCollider = ChainCollider;
    exports.ChainShape2D = ChainShape2D;
    exports.CircleCollider = CircleCollider;
    exports.CircleShape2D = CircleShape2D;
    exports.ColliderBase = ColliderBase;
    exports.DistanceJoint = DistanceJoint;
    exports.EdgeCollider = EdgeCollider;
    exports.EdgeShape2D = EdgeShape2D;
    exports.FilterData = FilterData;
    exports.GearJoint = GearJoint;
    exports.JointBase = JointBase;
    exports.MotorJoint = MotorJoint;
    exports.MouseJoint = MouseJoint;
    exports.Physics2D = Physics2D;
    exports.Physics2DDebugDraw = Physics2DDebugDraw;
    exports.Physics2DHitResult = Physics2DHitResult;
    exports.Physics2DOption = Physics2DOption;
    exports.Physics2DShapeBase = Physics2DShapeBase;
    exports.Physics2DWorldManager = Physics2DWorldManager;
    exports.PolygonCollider = PolygonCollider;
    exports.PolygonShape2D = PolygonShape2D;
    exports.PrismaticJoint = PrismaticJoint;
    exports.PulleyJoint = PulleyJoint;
    exports.RevoluteJoint = RevoluteJoint;
    exports.RigidBody = RigidBody;
    exports.RigidBody2DInfo = RigidBody2DInfo;
    exports.StaticCollider = StaticCollider;
    exports.WeldJoint = WeldJoint;
    exports.WheelJoint = WheelJoint;
    exports.box2DWorldDef = box2DWorldDef;
    exports.physics2D_BaseJointDef = physics2D_BaseJointDef;
    exports.physics2D_DistancJointDef = physics2D_DistancJointDef;
    exports.physics2D_GearJointDef = physics2D_GearJointDef;
    exports.physics2D_MotorJointDef = physics2D_MotorJointDef;
    exports.physics2D_MouseJointJointDef = physics2D_MouseJointJointDef;
    exports.physics2D_PrismaticJointDef = physics2D_PrismaticJointDef;
    exports.physics2D_PulleyJointDef = physics2D_PulleyJointDef;
    exports.physics2D_RevoluteJointDef = physics2D_RevoluteJointDef;
    exports.physics2D_WeldJointDef = physics2D_WeldJointDef;
    exports.physics2D_WheelJointDef = physics2D_WheelJointDef;
    exports.physics2DwasmFactory = physics2DwasmFactory;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.physics2D.js.map
