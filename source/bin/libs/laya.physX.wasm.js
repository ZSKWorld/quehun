(function (exports, Laya) {
    'use strict';

    class pxStatics {
        static createFloat32Array(length) {
            let ptr = pxStatics._physX._malloc(4 * length);
            const buffer = new Float32Array(pxStatics._physX.HEAPF32.buffer, ptr, length);
            return { ptr: ptr, buffer: buffer };
        }
        static createUint32Array(length) {
            let ptr = pxStatics._physX._malloc(4 * length);
            const buffer = new Uint32Array(pxStatics._physX.HEAPU32.buffer, ptr, length);
            return { ptr: ptr, buffer: buffer };
        }
        static createUint16Array(length) {
            let ptr = pxStatics._physX._malloc(2 * length);
            const buffer = new Uint16Array(pxStatics._physX.HEAPU16.buffer, ptr, length);
            return { ptr: ptr, buffer: buffer };
        }
        static createUint8Array(length) {
            let ptr = pxStatics._physX._malloc(length);
            const buffer = new Uint8Array(pxStatics._physX.HEAPU8.buffer, ptr, length);
            return { ptr: ptr, buffer: buffer };
        }
        static freeBuffer(data) {
            pxStatics._physX._free(data.ptr);
        }
    }
    pxStatics._physXPVD = false;
    pxStatics._PxPvdPort = 5425;
    exports.partFlag = void 0;
    (function (partFlag) {
        partFlag[partFlag["eSOLVE_CONTACT"] = 1] = "eSOLVE_CONTACT";
        partFlag[partFlag["eMODIFY_CONTACTS"] = 2] = "eMODIFY_CONTACTS";
        partFlag[partFlag["eNOTIFY_TOUCH_FOUND"] = 4] = "eNOTIFY_TOUCH_FOUND";
        partFlag[partFlag["eNOTIFY_TOUCH_PERSISTS"] = 8] = "eNOTIFY_TOUCH_PERSISTS";
        partFlag[partFlag["eNOTIFY_TOUCH_LOST"] = 16] = "eNOTIFY_TOUCH_LOST";
        partFlag[partFlag["eNOTIFY_TOUCH_CCD"] = 32] = "eNOTIFY_TOUCH_CCD";
        partFlag[partFlag["eNOTIFY_THRESHOLD_FORCE_FOUND"] = 64] = "eNOTIFY_THRESHOLD_FORCE_FOUND";
        partFlag[partFlag["eNOTIFY_THRESHOLD_FORCE_PERSISTS"] = 128] = "eNOTIFY_THRESHOLD_FORCE_PERSISTS";
        partFlag[partFlag["eNOTIFY_THRESHOLD_FORCE_LOST"] = 256] = "eNOTIFY_THRESHOLD_FORCE_LOST";
        partFlag[partFlag["eNOTIFY_CONTACT_POINTS"] = 512] = "eNOTIFY_CONTACT_POINTS";
        partFlag[partFlag["eDETECT_DISCRETE_CONTACT"] = 1024] = "eDETECT_DISCRETE_CONTACT";
        partFlag[partFlag["eDETECT_CCD_CONTACT"] = 2048] = "eDETECT_CCD_CONTACT";
        partFlag[partFlag["ePRE_SOLVER_VELOCITY"] = 4096] = "ePRE_SOLVER_VELOCITY";
        partFlag[partFlag["ePOST_SOLVER_VELOCITY"] = 8192] = "ePOST_SOLVER_VELOCITY";
        partFlag[partFlag["eCONTACT_EVENT_POSE"] = 16384] = "eCONTACT_EVENT_POSE";
        partFlag[partFlag["eNEXT_FREE"] = 32768] = "eNEXT_FREE";
        partFlag[partFlag["eCONTACT_DEFAULT"] = 1025] = "eCONTACT_DEFAULT";
        partFlag[partFlag["eTRIGGER_DEFAULT"] = 1044] = "eTRIGGER_DEFAULT";
    })(exports.partFlag || (exports.partFlag = {}));

    class pxPhysicsMaterial {
        constructor() {
            this._bounciness = 0.1;
            this._dynamicFriction = 0.1;
            this._staticFriction = 0.1;
            this._bounceCombine = Laya.PhysicsCombineMode.Average;
            this._frictionCombine = Laya.PhysicsCombineMode.Average;
            this._pxMaterial = pxStatics._physics.createMaterial(this._staticFriction, this._dynamicFriction, this._bounciness);
        }
        setBounciness(value) {
            this._pxMaterial.setRestitution(value);
        }
        setDynamicFriction(value) {
            this._pxMaterial.setDynamicFriction(value);
        }
        setStaticFriction(value) {
            this._pxMaterial.setStaticFriction(value);
        }
        setBounceCombine(value) {
            this._pxMaterial.setRestitutionCombineMode(value);
        }
        setFrictionCombine(value) {
            this._pxMaterial.setFrictionCombineMode(value);
        }
        destroy() {
            this._pxMaterial.release();
        }
    }

    exports.ShapeFlag = void 0;
    (function (ShapeFlag) {
        ShapeFlag[ShapeFlag["SIMULATION_SHAPE"] = 1] = "SIMULATION_SHAPE";
        ShapeFlag[ShapeFlag["SCENE_QUERY_SHAPE"] = 2] = "SCENE_QUERY_SHAPE";
        ShapeFlag[ShapeFlag["TRIGGER_SHAPE"] = 4] = "TRIGGER_SHAPE";
    })(exports.ShapeFlag || (exports.ShapeFlag = {}));
    class pxColliderShape {
        constructor() {
            this._offset = new Laya.Vector3(0, 0, 0);
            this._scale = new Laya.Vector3(1, 1, 1);
            this._shapeFlags = exports.ShapeFlag.SCENE_QUERY_SHAPE;
            this._pxMaterials = new Array(1);
            this._destroyed = false;
            this.filterData = { word0: Laya.Physics3DUtils.PHYSXDEFAULTMASKVALUE, word1: Laya.Physics3DUtils.PHYSXDEFAULTMASKVALUE, word2: 0, word3: 0 };
        }
        _createShape() {
            this._id = pxColliderShape._pxShapeID++;
            this._pxMaterials[0] = new pxPhysicsMaterial();
            this._pxShape = pxStatics._physics.createShape(this._pxGeometry, this._pxMaterials[0]._pxMaterial, true, new pxStatics._physX.PxShapeFlags(this._shapeFlags));
            this._pxShape && this._pxShape.setUUID(this._id);
            pxColliderShape._shapePool.set(this._id, this);
        }
        _modifyFlag(flag, value) {
            this._shapeFlags = value ? this._shapeFlags | flag : this._shapeFlags & ~flag;
        }
        getPhysicsShape() {
            return this._pxShape;
        }
        addToActor(collider) {
            if (this._pxCollider != collider) {
                if (this._pxShape)
                    collider._pxActor.attachShape(this._pxShape);
                this._pxCollider = collider;
                this.setOffset(this._offset);
            }
        }
        removeFromActor(collider) {
            if (this._pxCollider == collider) {
                if (this._pxShape)
                    collider._pxActor.detachShape(this._pxShape, true);
                this._pxCollider = null;
            }
        }
        setOffset(position) {
            position.cloneTo(this._offset);
            if (!this._pxCollider)
                return;
            if (this._pxShape) {
                const transform = pxColliderShape.transform;
                this._pxCollider.owner.transform.getWorldLossyScale().cloneTo(this._scale);
                if (this._pxCollider.owner)
                    Laya.Vector3.multiply(position, this._scale, transform.translation);
                this._pxShape.setLocalPose(transform);
            }
        }
        getOffset() {
            return this._offset;
        }
        setIsTrigger(value) {
            this._modifyFlag(exports.ShapeFlag.SIMULATION_SHAPE, !value);
            this._modifyFlag(exports.ShapeFlag.TRIGGER_SHAPE, value);
            this._setShapeFlags(this._shapeFlags);
        }
        _setShapeFlags(flags) {
            this._shapeFlags = flags;
            if (this._pxShape)
                this._pxShape.setFlags(new pxStatics._physX.PxShapeFlags(this._shapeFlags));
        }
        setSimulationFilterData(colliderGroup, colliderMask) {
            this.filterData.word0 = colliderGroup;
            this.filterData.word1 = colliderMask;
            this.filterData.word2 = exports.partFlag.eCONTACT_DEFAULT;
            if (this._pxShape) {
                this._pxShape.setSimulationFilterData(this.filterData);
                this._pxShape.setQueryFilterData(this.filterData);
            }
        }
        setEventFilterData(filterWorld2Number) {
            this.filterData.word2 = filterWorld2Number;
            if (this._pxShape) {
                this._pxShape.setSimulationFilterData(this.filterData);
                this._pxShape.setQueryFilterData(this.filterData);
            }
        }
        destroy() {
            if (this._pxShape) {
                if (this._pxCollider && this._pxCollider._physicsManager) {
                    this._pxCollider._physicsManager.removeCollider(this._pxCollider);
                }
                this._pxShape.release();
                this._pxShape = undefined;
            }
            pxColliderShape._shapePool.delete(this._id);
            this._pxMaterials.forEach(element => {
                element.destroy();
            });
            this._pxMaterials.length = 0;
            this._destroyed = true;
        }
    }
    pxColliderShape._shapePool = new Map();
    pxColliderShape._pxShapeID = 0;
    pxColliderShape.transform = {
        translation: new Laya.Vector3(),
        rotation: new Laya.Quaternion()
    };

    var ColliderShapeUpAxis;
    (function (ColliderShapeUpAxis) {
        ColliderShapeUpAxis[ColliderShapeUpAxis["X"] = 0] = "X";
        ColliderShapeUpAxis[ColliderShapeUpAxis["Y"] = 1] = "Y";
        ColliderShapeUpAxis[ColliderShapeUpAxis["Z"] = 2] = "Z";
    })(ColliderShapeUpAxis || (ColliderShapeUpAxis = {}));
    class pxCapsuleColliderShape extends pxColliderShape {
        constructor() {
            super();
            this._radius = 0.25;
            this._halfHeight = 0.5;
            this._rotation = new Laya.Quaternion(0, 0, 0.7071068, 0.7071068);
            this._upAxis = ColliderShapeUpAxis.Y;
            this._pxGeometry = new pxStatics._physX.PxCapsuleGeometry(this._radius, this._halfHeight);
            this._createShape();
        }
        _setCapsuleRotation() {
            pxColliderShape.transform.rotation.setValue(this._rotation.x, this._rotation.y, this._rotation.z, this._rotation.w);
            this._pxShape.setLocalPose(pxColliderShape.transform);
        }
        addToActor(collider) {
            super.addToActor(collider);
            this._setCapsuleRotation();
        }
        setRadius(radius) {
            this._radius = radius;
            switch (this._upAxis) {
                case ColliderShapeUpAxis.X:
                    this._pxGeometry.radius = this._radius * Math.max(this._scale.y, this._scale.z);
                    break;
                case ColliderShapeUpAxis.Y:
                    this._pxGeometry.radius = this._radius * Math.max(this._scale.x, this._scale.z);
                    break;
                case ColliderShapeUpAxis.Z:
                    this._pxGeometry.radius = this._radius * Math.max(this._scale.x, this._scale.y);
                    break;
            }
            this._pxShape.setGeometry(this._pxGeometry);
        }
        setHeight(height) {
            this._halfHeight = (height - this._radius * 2) * 0.5;
            switch (this._upAxis) {
                case ColliderShapeUpAxis.X:
                    this._pxGeometry.halfHeight = this._halfHeight * this._scale.x;
                    break;
                case ColliderShapeUpAxis.Y:
                    this._pxGeometry.halfHeight = this._halfHeight * this._scale.y;
                    break;
                case ColliderShapeUpAxis.Z:
                    this._pxGeometry.halfHeight = this._halfHeight * this._scale.z;
                    break;
            }
            this._pxShape.setGeometry(this._pxGeometry);
        }
        setUpAxis(upAxis) {
            if (this._pxShape && this._upAxis == upAxis)
                return;
            this._upAxis = upAxis;
            this.setHeight((this._halfHeight + this._radius) * 2);
            this.setRadius(this._radius);
        }
        setOffset(position) {
            super.setOffset(position);
            this.setHeight((this._halfHeight + this._radius) * 2);
            this.setRadius(this._radius);
        }
        destroy() {
            super.destroy();
            this._radius = null;
            this._halfHeight = null;
            this._upAxis = null;
        }
    }

    class pxCompoundColliderShape extends pxColliderShape {
        constructor() {
            super();
            this.pxShapes = [];
            this._pxGeometry = new pxStatics._physX.PxBoxGeometry(0.1, 0.1, 0.1);
            this._createShape();
        }
        addChildShape(shape) {
            this.pxShapes.push(shape);
            let trigger = false;
            if (this._physicsComponent instanceof Laya.Rigidbody3D) {
                trigger = this._physicsComponent.trigger;
            }
            if (this._physicsComponent instanceof Laya.PhysicsCollider) {
                trigger = this._physicsComponent.isTrigger;
            }
            shape.setIsTrigger(trigger);
            shape.setSimulationFilterData((this._physicsComponent && this._physicsComponent.collisionGroup != Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) ? this._physicsComponent.collisionGroup : Laya.Physics3DUtils.PHYSXDEFAULTMASKVALUE, (this._physicsComponent && this._physicsComponent.canCollideWith != Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) ? this._physicsComponent.canCollideWith : Laya.Physics3DUtils.PHYSXDEFAULTMASKVALUE);
            this._pxCollider && this._pxCollider.setColliderShape(shape);
        }
        removeChildShape(shape, index) {
            this.pxShapes.splice(index, 1);
            this._pxCollider && shape.removeFromActor(this._pxCollider);
        }
        setShapeData(component) {
            this._physicsComponent = component;
        }
        refreshShapes() {
            this.pxShapes.forEach(shape => {
                let trigger = false;
                if (this._physicsComponent instanceof Laya.Rigidbody3D) {
                    trigger = this._physicsComponent.trigger;
                }
                if (this._physicsComponent instanceof Laya.PhysicsCollider) {
                    trigger = this._physicsComponent.isTrigger;
                }
                shape.setIsTrigger(trigger);
                shape.setSimulationFilterData((this._physicsComponent && this._physicsComponent.collisionGroup != Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) ? this._physicsComponent.collisionGroup : Laya.Physics3DUtils.PHYSXDEFAULTMASKVALUE, (this._physicsComponent && this._physicsComponent.canCollideWith != Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) ? this._physicsComponent.canCollideWith : Laya.Physics3DUtils.PHYSXDEFAULTMASKVALUE);
                this._pxCollider && shape.addToActor(this._pxCollider);
            });
        }
    }

    exports.pxColliderType = void 0;
    (function (pxColliderType) {
        pxColliderType[pxColliderType["RigidbodyCollider"] = 0] = "RigidbodyCollider";
        pxColliderType[pxColliderType["CharactorCollider"] = 1] = "CharactorCollider";
        pxColliderType[pxColliderType["StaticCollider"] = 2] = "StaticCollider";
    })(exports.pxColliderType || (exports.pxColliderType = {}));
    exports.pxActorFlag = void 0;
    (function (pxActorFlag) {
        pxActorFlag[pxActorFlag["eVISUALIZATION"] = 1] = "eVISUALIZATION";
        pxActorFlag[pxActorFlag["eDISABLE_GRAVITY"] = 2] = "eDISABLE_GRAVITY";
        pxActorFlag[pxActorFlag["eSEND_SLEEP_NOTIFIES"] = 4] = "eSEND_SLEEP_NOTIFIES";
        pxActorFlag[pxActorFlag["eDISABLE_SIMULATION"] = 8] = "eDISABLE_SIMULATION";
    })(exports.pxActorFlag || (exports.pxActorFlag = {}));
    class pxCollider {
        constructor(manager) {
            this._type = exports.pxColliderType.StaticCollider;
            this._isSimulate = false;
            this._destroyed = false;
            this.inPhysicUpdateListIndex = -1;
            this._enableProcessCollisions = false;
            this._transformFlag = 2147483647;
            this._bounciness = 0.1;
            this._dynamicFriction = 0.1;
            this._staticFriction = 0.1;
            this._bounceCombine = Laya.PhysicsCombineMode.Average;
            this._frictionCombine = Laya.PhysicsCombineMode.Average;
            this._collisionGroup = Laya.Physics3DUtils.PHYSXDEFAULTMASKVALUE;
            this._canCollisionWith = Laya.Physics3DUtils.PHYSXDEFAULTMASKVALUE;
            this._physicsManager = manager;
            this._id = pxCollider._pxActorID++;
        }
        setfriction(value) {
            throw new Laya.NotImplementedError();
        }
        setRollingFriction(value) {
            throw new Laya.NotImplementedError();
        }
        setActorFlag(flag, value) {
            this._pxActor.setCustomFlag(flag, value);
        }
        getCapable(value) {
            return null;
        }
        setColliderShape(shape) {
            if (shape == this._shape)
                return;
            if (shape instanceof pxCompoundColliderShape) {
                shape._pxCollider = this;
                shape.refreshShapes();
            }
            var lastColliderShape = this._shape;
            this._shape = shape;
            if (shape) {
                if (this._pxActor) {
                    if (lastColliderShape)
                        lastColliderShape.removeFromActor(this);
                    this._shape.addToActor(this);
                    let simulate = this._isSimulate;
                    simulate && this._physicsManager.removeCollider(this);
                    this._initColliderShapeByCollider();
                    if ((simulate || !lastColliderShape || (lastColliderShape && lastColliderShape._destroyed)) && this.componentEnable) {
                        this._physicsManager.addCollider(this);
                    }
                }
                else {
                    this._shape = null;
                }
            }
            else {
                if (this._isSimulate) {
                    this._physicsManager.removeCollider(this);
                }
            }
            lastColliderShape && lastColliderShape.destroy();
        }
        _initColliderShapeByCollider() {
            this.setBounceCombine(this._bounceCombine);
            this.setFrictionCombine(this._frictionCombine);
            this.setStaticFriction(this._staticFriction);
            this.setBounciness(this._bounciness);
            this.setDynamicFriction(this._dynamicFriction);
            this.setCollisionGroup(this._collisionGroup);
            this.setCanCollideWith(this._canCollisionWith);
        }
        destroy() {
            this._pxActor.release();
            this._destroyed = true;
        }
        setCollisionGroup(value) {
            if (value == Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
                value = Laya.Physics3DUtils.PHYSXDEFAULTMASKVALUE;
            }
            this._collisionGroup = value;
            this._shape.setSimulationFilterData(this._collisionGroup, this._canCollisionWith);
        }
        setCanCollideWith(value) {
            if (value == Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
                value = Laya.Physics3DUtils.PHYSXDEFAULTMASKVALUE;
            }
            this._canCollisionWith = value;
            this._shape.setSimulationFilterData(this._collisionGroup, this._canCollisionWith);
        }
        setEventFilter(events) {
            if (!this._shape)
                return;
            let flag = exports.partFlag.eCONTACT_DEFAULT | exports.partFlag.eTRIGGER_DEFAULT;
            for (let i = 0, j = events.length; i < j; i++) {
                let value = events[i];
                if (value == Laya.Event.TRIGGER_ENTER) {
                    flag = flag | exports.partFlag.eTRIGGER_DEFAULT | exports.partFlag.eNOTIFY_TOUCH_FOUND;
                }
                if (value == Laya.Event.TRIGGER_STAY) ;
                if (value == Laya.Event.TRIGGER_EXIT) {
                    flag = flag | exports.partFlag.eTRIGGER_DEFAULT | exports.partFlag.eNOTIFY_TOUCH_LOST;
                }
                if (value == Laya.Event.COLLISION_ENTER) {
                    flag = flag | exports.partFlag.eNOTIFY_TOUCH_PERSISTS | exports.partFlag.eNOTIFY_CONTACT_POINTS;
                }
                if (value == Laya.Event.COLLISION_STAY) {
                    flag = flag | exports.partFlag.eNOTIFY_TOUCH_PERSISTS;
                }
                if (value == Laya.Event.COLLISION_EXIT) {
                    flag = flag | exports.partFlag.eNOTIFY_TOUCH_PERSISTS | exports.partFlag.eNOTIFY_TOUCH_LOST;
                }
            }
            this._shape && this._shape.setEventFilterData(flag);
        }
        allowSleep(value) {
        }
        setOwner(node) {
            this.owner = node;
            this._transform = node.transform;
            this._initCollider();
            pxCollider._ActorPool.set(this._id, this);
            this._pxActor.setUUID(this._id);
            this.setActorFlag(exports.pxActorFlag.eSEND_SLEEP_NOTIFIES, true);
        }
        _initCollider() {
        }
        transformChanged(flag) {
            this._transformFlag = flag;
            if (this.inPhysicUpdateListIndex == -1 && !this._enableProcessCollisions) {
                this._physicsManager._physicsUpdateList.add(this);
            }
        }
        setWorldTransform(focus) {
            if (this.owner) {
                if (focus || this._getTransformFlag(Laya.Transform3D.TRANSFORM_WORLDPOSITION) || this._getTransformFlag(Laya.Transform3D.TRANSFORM_WORLDQUATERNION)) {
                    this._pxActor.setGlobalPose(this._transformTo(this.owner.transform.position, this.owner.transform.rotation), true);
                    this._setTransformFlag(Laya.Transform3D.TRANSFORM_WORLDPOSITION, false);
                    this._setTransformFlag(Laya.Transform3D.TRANSFORM_WORLDQUATERNION, false);
                }
                if (focus || this._getTransformFlag(Laya.Transform3D.TRANSFORM_WORLDSCALE) && this._shape) {
                    this._shape && this._shape.setOffset(this._shape._offset);
                    this._setTransformFlag(Laya.Transform3D.TRANSFORM_WORLDSCALE, false);
                }
            }
        }
        setBounciness(value) {
            this._bounciness = value;
            this._shape && this._shape._pxMaterials[0].setBounciness(value);
        }
        setDynamicFriction(value) {
            this._dynamicFriction = value;
            this._shape && this._shape._pxMaterials[0].setDynamicFriction(value);
        }
        setStaticFriction(value) {
            this._staticFriction = value;
            this._shape && this._shape._pxMaterials[0].setStaticFriction(value);
        }
        setFrictionCombine(value) {
            this._frictionCombine = value;
            this._shape && this._shape._pxMaterials[0].setFrictionCombine(value);
        }
        setBounceCombine(value) {
            this._bounceCombine = value;
            this._shape && this._shape._pxMaterials[0].setBounceCombine(value);
        }
        _getTransformFlag(type) {
            return (this._transformFlag & type) != 0;
        }
        _setTransformFlag(type, value) {
            if (value)
                this._transformFlag |= type;
            else
                this._transformFlag &= ~type;
        }
        _transformTo(pos, rot) {
            const transform = pxCollider._tempTransform;
            pos.cloneTo(transform.translation);
            rot.normalize(transform.rotation);
            return transform;
        }
    }
    pxCollider._ActorPool = new Map();
    pxCollider._pxActorID = 0;
    pxCollider._tempTransform = { translation: new Laya.Vector3(), rotation: new Laya.Quaternion() };

    exports.ControllerNonWalkableMode = void 0;
    (function (ControllerNonWalkableMode) {
        ControllerNonWalkableMode[ControllerNonWalkableMode["ePREVENT_CLIMBING"] = 0] = "ePREVENT_CLIMBING";
        ControllerNonWalkableMode[ControllerNonWalkableMode["ePREVENT_CLIMBING_AND_FORCE_SLIDING"] = 1] = "ePREVENT_CLIMBING_AND_FORCE_SLIDING";
    })(exports.ControllerNonWalkableMode || (exports.ControllerNonWalkableMode = {}));
    exports.ECharacterCollisionFlag = void 0;
    (function (ECharacterCollisionFlag) {
        ECharacterCollisionFlag[ECharacterCollisionFlag["eCOLLISION_SIDES"] = 1] = "eCOLLISION_SIDES";
        ECharacterCollisionFlag[ECharacterCollisionFlag["eCOLLISION_UP"] = 2] = "eCOLLISION_UP";
        ECharacterCollisionFlag[ECharacterCollisionFlag["eCOLLISION_DOWN"] = 4] = "eCOLLISION_DOWN";
    })(exports.ECharacterCollisionFlag || (exports.ECharacterCollisionFlag = {}));
    class pxCharactorCollider extends pxCollider {
        constructor(manager) {
            super(manager);
            this._radius = 0.5;
            this._height = 2;
            this._localOffset = new Laya.Vector3();
            this._upDirection = new Laya.Vector3(0, 1, 0);
            this._stepOffset = 0;
            this._slopeLimit = 0;
            this._contactOffset = 0;
            this._minDistance = 0;
            this._nonWalkableMode = exports.ControllerNonWalkableMode.ePREVENT_CLIMBING_AND_FORCE_SLIDING;
            this._gravity = new Laya.Vector3(0, -9.81, 0);
            this._characterCollisionFlags = 0;
            this._pushForce = 10;
            this._characterEvents = [];
            this._type = exports.pxColliderType.CharactorCollider;
            Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicaCharacterController, 1);
        }
        setColliderShape(shape) {
            if (shape == this._shape)
                return;
            this._shape = shape;
            if (shape) {
                if (this._pxActor) {
                    if (this.componentEnable) {
                        this._physicsManager.addCollider(this);
                    }
                }
                else {
                    this._shape = null;
                }
            }
            else {
                if (this._isSimulate) {
                    this._physicsManager.removeCollider(this);
                }
            }
        }
        _getNodeScale() {
            return this.owner ? this.owner.transform.getWorldLossyScale() : Laya.Vector3.ONE;
        }
        _initCollider() {
            this._pxActor = pxStatics._physics.createRigidDynamic(this._transformTo(new Laya.Vector3(), new Laya.Quaternion()));
        }
        getCapable(value) {
            return pxCharactorCollider.getCharacterCapable(value);
        }
        static getCharacterCapable(value) {
            return pxCharactorCollider._characterCapableMap.get(value);
        }
        static initCapable() {
            this._characterCapableMap = new Map();
            this._characterCapableMap.set(Laya.ECharacterCapable.Charcater_Gravity, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Charcater_CollisionGroup, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Charcater_WorldPosition, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Charcater_Move, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Charcater_Jump, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Charcater_StepOffset, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_UpDirection, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_FallSpeed, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_SlopeLimit, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_PushForce, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_Radius, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_Height, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_offset, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_Skin, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_minDistance, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_EventFilter, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_SimulateGravity, true);
            this._characterCapableMap.set(Laya.ECharacterCapable.Character_IsOnGround, true);
        }
        _createController() {
            let desc;
            const pxPhysics = pxStatics._physX;
            desc = new pxPhysics.PxCapsuleControllerDesc();
            this._characterCollisionFlags = new pxPhysics.PxControllerCollisionFlags(exports.ECharacterCollisionFlag.eCOLLISION_DOWN);
            let scale = this._getNodeScale();
            desc.radius = this._radius * Math.max(scale.x, scale.z);
            desc.height = this._height * scale.y;
            desc.climbingMode = 1;
            desc.setreportCallBackBehavior();
            this._pxNullShape = this._pxNullShape ? this._pxNullShape : new pxCapsuleColliderShape();
            desc.setMaterial(this._pxNullShape._pxMaterials[0]._pxMaterial);
            this._pxNullShape._pxCollider = this;
            this._pxController = this._physicsManager._pxcontrollerManager.createController(desc);
            this._pxController.setShapeID(this._pxNullShape._id);
            this.setRadius(this._radius);
            this.setHeight(this._height * 2);
            this.setPosition(this.owner.transform.position);
            this.setStepOffset(this._stepOffset);
            this.setUpDirection(this._upDirection);
            this.setSlopeLimit(this._slopeLimit);
            this.setGravity(this._gravity);
            this.setPushForce(this._pushForce);
            this.setSkinWidth(this._contactOffset);
            this.setNonWalkableMode(this._nonWalkableMode);
            this.setEventFilter(this._characterEvents);
            this._setCharacterCollisonFlag(exports.ECharacterCollisionFlag.eCOLLISION_SIDES);
        }
        _setCharacterCollisonFlag(value) {
            this._pxController && this._pxController.isSetControllerCollisionFlag(this._characterCollisionFlags, value);
        }
        _releaseController() {
            if (this._pxController) {
                this._pxController.release();
                this._pxController = null;
            }
        }
        move(disp) {
            return this._pxController && this._pxController.move(disp, this._minDistance, 1 / 60);
        }
        jump(velocity) {
            return this._pxController && this._pxController.move(velocity, this._minDistance, 1 / 60);
        }
        isGrounded() {
            let flag = this._pxController && this._pxController.move(new Laya.Vector3(0, -0.1, 0), this._minDistance, 1 / 60);
            return (flag & exports.ECharacterCollisionFlag.eCOLLISION_DOWN) != 0;
        }
        setStepOffset(offset) {
            this._stepOffset = offset;
            this._pxController && this._pxController.setStepOffset(this._stepOffset);
        }
        setUpDirection(up) {
            up.cloneTo(this._upDirection);
            this._pxController && this._pxController.setUpDirection(up);
        }
        setSlopeLimit(value) {
            this._slopeLimit = value;
            this._pxController && this._pxController.setSlopeLimit(Math.cos(this._slopeLimit));
        }
        setGravity(value) {
            value.cloneTo(this._gravity);
        }
        setPushForce(value) {
            this._pushForce = value;
            this._pxController && this._pxController.setPushForce(this._pushForce);
        }
        getWorldTransform() {
            const v3 = this._pxController.getPosition();
            _tempTranslation$1.set(v3.x + this._localOffset.x, v3.y - this._height + this._localOffset.y, v3.z + this._localOffset.z);
            this.owner.transform.position = _tempTranslation$1;
        }
        setSkinWidth(width) {
            this._contactOffset = width;
            this._pxController && this._pxController.setContactOffset(this._contactOffset);
        }
        destroy() {
            this._releaseController();
        }
        setPosition(value) {
            this._pxController && this._pxController.setPosition(value);
        }
        getPosition() {
            const v3 = this._pxController.getPosition();
            pxCharactorCollider.tempV3.set(v3.x, v3.y, v3.z);
            return pxCharactorCollider.tempV3;
        }
        setShapelocalOffset(value) {
            this._localOffset = value;
        }
        setHeight(value) {
            this._height = value * 0.5;
            let scale = this._getNodeScale();
            this._pxController && this._pxController.resize(this._height * scale.y);
        }
        setRadius(value) {
            this._radius = value;
            let scale = this._getNodeScale();
            this._pxController && this._pxController.setRadius(this._radius * Math.max(scale.x, scale.z));
        }
        setminDistance(value) {
            this._minDistance = value;
        }
        setNonWalkableMode(value) {
            this._nonWalkableMode = value;
            this._pxController && this._pxController.setNonWalkableMode(this._nonWalkableMode);
        }
        setEventFilter(events) {
            this._characterEvents = events;
            if (!this._pxController)
                return;
            let flag = exports.partFlag.eCONTACT_DEFAULT;
            for (let i = 0, j = events.length; i < j; i++) {
                let value = events[i];
                if (value == Laya.Event.COLLISION_ENTER) {
                    flag = flag | exports.partFlag.eNOTIFY_TOUCH_PERSISTS | exports.partFlag.eNOTIFY_CONTACT_POINTS;
                }
                if (value == Laya.Event.COLLISION_STAY) {
                    flag = flag | exports.partFlag.eNOTIFY_TOUCH_PERSISTS;
                }
                if (value == Laya.Event.COLLISION_EXIT) {
                    flag = flag | exports.partFlag.eNOTIFY_TOUCH_PERSISTS | exports.partFlag.eNOTIFY_TOUCH_LOST;
                }
            }
            this._pxController && this._pxController.setEventFilter(flag);
        }
        release() {
            if (this._pxController) {
                this._pxController.release();
                this._pxController = null;
            }
        }
    }
    pxCharactorCollider.tempV3 = new Laya.Vector3();
    const _tempTranslation$1 = new Laya.Vector3();

    exports.CollisionDetectionMode = void 0;
    (function (CollisionDetectionMode) {
        CollisionDetectionMode[CollisionDetectionMode["Discrete"] = 0] = "Discrete";
        CollisionDetectionMode[CollisionDetectionMode["Continuous"] = 1] = "Continuous";
        CollisionDetectionMode[CollisionDetectionMode["ContinuousDynamic"] = 2] = "ContinuousDynamic";
        CollisionDetectionMode[CollisionDetectionMode["ContinuousSpeculative"] = 3] = "ContinuousSpeculative";
    })(exports.CollisionDetectionMode || (exports.CollisionDetectionMode = {}));
    exports.DynamicColliderConstraints = void 0;
    (function (DynamicColliderConstraints) {
        DynamicColliderConstraints[DynamicColliderConstraints["None"] = 0] = "None";
        DynamicColliderConstraints[DynamicColliderConstraints["FreezePositionX"] = 1] = "FreezePositionX";
        DynamicColliderConstraints[DynamicColliderConstraints["FreezePositionY"] = 2] = "FreezePositionY";
        DynamicColliderConstraints[DynamicColliderConstraints["FreezePositionZ"] = 4] = "FreezePositionZ";
        DynamicColliderConstraints[DynamicColliderConstraints["FreezeRotationX"] = 8] = "FreezeRotationX";
        DynamicColliderConstraints[DynamicColliderConstraints["FreezeRotationY"] = 16] = "FreezeRotationY";
        DynamicColliderConstraints[DynamicColliderConstraints["FreezeRotationZ"] = 32] = "FreezeRotationZ";
    })(exports.DynamicColliderConstraints || (exports.DynamicColliderConstraints = {}));
    class pxDynamicCollider extends pxCollider {
        static getStaticColliderCapable(value) {
            return pxDynamicCollider._dynamicCapableMap.get(value);
        }
        static initCapable() {
            this._dynamicCapableMap = new Map();
            this._dynamicCapableMap.set(Laya.EColliderCapable.Collider_AllowTrigger, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.Collider_CollisionGroup, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.Collider_Restitution, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.Collider_Friction, false);
            this._dynamicCapableMap.set(Laya.EColliderCapable.Collider_RollingFriction, false);
            this._dynamicCapableMap.set(Laya.EColliderCapable.Collider_DynamicFriction, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.Collider_StaticFriction, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.Collider_BounceCombine, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.Collider_FrictionCombine, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.Collider_EventFilter, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.Collider_CollisionDetectionMode, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_AllowSleep, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_Gravity, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_LinearDamp, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_AngularDamp, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_LinearVelocity, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_AngularVelocity, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_Mass, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_InertiaTensor, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_MassCenter, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_SleepThreshold, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_SleepAngularVelocity, false);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_SolverIterations, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_AllowDetectionMode, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_AllowKinematic, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_LinearFactor, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_AngularFactor, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_ApplyForce, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_ApplyTorque, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_ApplyImpulse, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_ApplyTorqueImpulse, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_WorldPosition, true);
            this._dynamicCapableMap.set(Laya.EColliderCapable.RigidBody_WorldOrientation, true);
        }
        constructor(manager) {
            super(manager);
            this.IsKinematic = false;
            this._mass = 1.0;
            this._linearDamping = 0.0;
            this._angularDamping = 0.0;
            this._linearVelocity = new Laya.Vector3();
            this._angularVelocity = new Laya.Vector3();
            this._centerOfMass = new Laya.Vector3(0, 0, 0);
            this._inertiaTensor = new Laya.Vector3(1, 1, 1);
            this._sleepThreshold = 5e-3;
            this._collisionDetectionMode = exports.CollisionDetectionMode.Discrete;
            this._solverIterations = 4.0;
            this._enableProcessCollisions = true;
            this._type = exports.pxColliderType.RigidbodyCollider;
            Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicaDynamicRigidBody, 1);
        }
        getCapable(value) {
            return pxDynamicCollider.getStaticColliderCapable(value);
        }
        _initCollider() {
            this._pxActor = pxStatics._physics.createRigidDynamic(this._transformTo(new Laya.Vector3(), new Laya.Quaternion()));
        }
        _initColliderShapeByCollider() {
            super._initColliderShapeByCollider();
            this.setWorldTransform(true);
            this.setTrigger(this._isTrigger);
            this.setInertiaTensor(this._inertiaTensor);
            this.setMass(this._mass);
            this.setIsKinematic(this.IsKinematic);
            this.setAngularDamping(this._angularDamping);
            this.setAngularVelocity(this._angularVelocity);
            this.setLinearDamping(this._linearDamping);
            this.setLinearVelocity(this._linearVelocity);
            this.setCenterOfMass(this._centerOfMass);
            this.setCollisionDetectionMode(this._collisionDetectionMode);
            this.setSolverIterations(this._solverIterations);
            this.setSleepThreshold(this._sleepThreshold);
            this.setWorldPosition(this.owner.transform.position);
        }
        setWorldPosition(value) {
            const transform = this._pxActor.getGlobalPose();
            _tempTranslation.setValue(value.x, value.y, value.z);
            _tempRotation.setValue(transform.rotation.x, transform.rotation.y, transform.rotation.z, transform.rotation.w);
            this._pxActor.setGlobalPose(this._transformTo(_tempTranslation, _tempRotation), true);
        }
        setWorldRotation(value) {
            const transform = this._pxActor.getGlobalPose();
            _tempTranslation.setValue(transform.translation.x, transform.translation.y, transform.translation.z);
            _tempRotation.setValue(value.x, value.y, value.z, value.w);
            this._pxActor.setGlobalPose(this._transformTo(_tempTranslation, _tempRotation), true);
        }
        getWorldTransform() {
            const transform = this._pxActor.getGlobalPose();
            _tempTranslation.set(transform.translation.x, transform.translation.y, transform.translation.z);
            _tempRotation.set(transform.rotation.x, transform.rotation.y, transform.rotation.z, transform.rotation.w);
            this.owner.transform.position = _tempTranslation;
            this.owner.transform.rotation = _tempRotation;
        }
        setTrigger(value) {
            this._isTrigger = value;
            this._shape && this._shape.setIsTrigger(value);
        }
        setLinearDamping(value) {
            this._linearDamping = value;
            this._pxActor.setLinearDamping(value);
        }
        setAngularDamping(value) {
            this._angularDamping = value;
            this._pxActor.setAngularDamping(value);
        }
        setLinearVelocity(value) {
            this._linearVelocity = value;
            this._pxActor.setLinearVelocity(value, true);
        }
        getLinearVelocity() {
            let velocity = this._pxActor.getLinearVelocity();
            _tempTranslation.set(velocity.x, velocity.y, velocity.z);
            return _tempTranslation;
        }
        setAngularVelocity(value) {
            this._angularVelocity = value;
            this._pxActor.setAngularVelocity(value, true);
        }
        getAngularVelocity() {
            let angVelocity = this._pxActor.getAngularVelocity();
            _tempTranslation.set(angVelocity.x, angVelocity.y, angVelocity.z);
            this._angularVelocity.setValue(angVelocity.x, angVelocity.y, angVelocity.z);
            return _tempTranslation;
        }
        setMass(value) {
            value = Math.max(value, 1e-07);
            this._mass = value;
            this._pxActor.setMassAndUpdateInertia(value);
        }
        setCenterOfMass(value) {
            this._centerOfMass = value;
            this._pxActor.setCMassLocalPose(value);
        }
        setInertiaTensor(value) {
            this._pxActor.setMassSpaceInertiaTensor(value);
        }
        isSleeping() {
            return this._pxActor.isSleeping();
        }
        setSleepThreshold(value) {
            this._sleepThreshold = value;
            this._pxActor.setSleepThreshold(value);
        }
        setCollisionDetectionMode(value) {
            this._collisionDetectionMode = value;
            switch (value) {
                case exports.CollisionDetectionMode.Continuous:
                    this._pxActor.setRigidBodyFlag(pxStatics._physX.PxRigidBodyFlag.eENABLE_CCD, true);
                    break;
                case exports.CollisionDetectionMode.ContinuousDynamic:
                    this._pxActor.setRigidBodyFlag(pxStatics._physX.PxRigidBodyFlag.eENABLE_CCD_FRICTION, true);
                    break;
                case exports.CollisionDetectionMode.ContinuousSpeculative:
                    this._pxActor.setRigidBodyFlag(pxStatics._physX.PxRigidBodyFlag.eENABLE_SPECULATIVE_CCD, true);
                    break;
                case exports.CollisionDetectionMode.Discrete:
                    const physX = pxStatics._physX;
                    this._pxActor.setRigidBodyFlag(physX.PxRigidBodyFlag.eENABLE_CCD, false);
                    this._pxActor.setRigidBodyFlag(physX.PxRigidBodyFlag.eENABLE_CCD_FRICTION, false);
                    this._pxActor.setRigidBodyFlag(physX.PxRigidBodyFlag.eENABLE_SPECULATIVE_CCD, false);
                    break;
            }
        }
        setSolverIterations(value) {
            this._solverIterations = value;
            this._pxActor.setSolverIterationCounts(value, 1);
        }
        setIsKinematic(value) {
            this.IsKinematic = value;
            if (value) {
                this._enableProcessCollisions = false;
                if (this._isSimulate)
                    this._physicsManager._dynamicUpdateList.remove(this);
                this._pxActor.setRigidBodyFlag(pxStatics._physX.PxRigidBodyFlag.eKINEMATIC, true);
                Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicaKinematicRigidBody, 1);
                Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicaDynamicRigidBody, -1);
            }
            else {
                this._enableProcessCollisions = true;
                if (this._isSimulate && this.inPhysicUpdateListIndex == -1)
                    this._physicsManager._dynamicUpdateList.add(this);
                this._pxActor.setRigidBodyFlag(pxStatics._physX.PxRigidBodyFlag.eKINEMATIC, false);
            }
        }
        allowSleep(value) {
            if (this.IsKinematic)
                return;
            if (this._pxActor) {
                if (value) {
                    this.setSleepThreshold(this._sleepThreshold);
                    this._pxActor.setWakeCounter(0.4);
                }
                else {
                    this.setSleepThreshold(0.0);
                    this._pxActor.setWakeCounter(Number.MAX_VALUE);
                }
            }
        }
        setConstraints(linearFactor, angularFactor) {
            let constrainFlag = exports.DynamicColliderConstraints.None;
            linearFactor.x == 0 && (constrainFlag |= exports.DynamicColliderConstraints.FreezePositionX);
            linearFactor.y == 0 && (constrainFlag |= exports.DynamicColliderConstraints.FreezePositionY);
            linearFactor.z == 0 && (constrainFlag |= exports.DynamicColliderConstraints.FreezePositionZ);
            angularFactor.x == 0 && (constrainFlag |= exports.DynamicColliderConstraints.FreezeRotationX);
            angularFactor.y == 0 && (constrainFlag |= exports.DynamicColliderConstraints.FreezeRotationY);
            angularFactor.z == 0 && (constrainFlag |= exports.DynamicColliderConstraints.FreezeRotationZ);
            this._pxActor.setRigidDynamicLockFlags(constrainFlag);
        }
        addForce(force, mode, localOffset) {
            this._pxActor.addForce({ x: force.x, y: force.y, z: force.z });
        }
        addTorque(torque, mode) {
            this._pxActor.addTorque({ x: torque.x, y: torque.y, z: torque.z });
        }
        sleep() {
            return this._pxActor.putToSleep();
        }
        wakeUp() {
            return this._pxActor.wakeUp();
        }
        move(positionOrRotation, rotation) {
            if (rotation) {
                this._pxActor.setKinematicTarget(positionOrRotation, rotation);
                return;
            }
            this.getWorldTransform();
            if (positionOrRotation instanceof Laya.Vector3) {
                this._pxActor.setKinematicTarget(positionOrRotation, _tempRotation);
            }
            else {
                this._pxActor.setKinematicTarget(_tempTranslation, positionOrRotation);
            }
        }
        destroy() {
            if (this.IsKinematic) {
                Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicaKinematicRigidBody, -1);
            }
            else {
                Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicaDynamicRigidBody, -1);
            }
            super.destroy();
        }
    }
    const _tempRotation = new Laya.Quaternion();
    const _tempTranslation = new Laya.Vector3();

    class pxStaticCollider extends pxCollider {
        static getStaticColliderCapable(value) {
            return pxStaticCollider._staticCapableMap.get(value);
        }
        static initCapable() {
            this._staticCapableMap = new Map();
            this._staticCapableMap.set(Laya.EColliderCapable.Collider_AllowTrigger, true);
            this._staticCapableMap.set(Laya.EColliderCapable.Collider_CollisionGroup, true);
            this._staticCapableMap.set(Laya.EColliderCapable.Collider_Friction, false);
            this._staticCapableMap.set(Laya.EColliderCapable.Collider_Restitution, true);
            this._staticCapableMap.set(Laya.EColliderCapable.Collider_RollingFriction, false);
            this._staticCapableMap.set(Laya.EColliderCapable.Collider_DynamicFriction, true);
            this._staticCapableMap.set(Laya.EColliderCapable.Collider_StaticFriction, true);
            this._staticCapableMap.set(Laya.EColliderCapable.Collider_BounceCombine, true);
            this._staticCapableMap.set(Laya.EColliderCapable.Collider_FrictionCombine, true);
            this._staticCapableMap.set(Laya.EColliderCapable.Collider_EventFilter, true);
            this._staticCapableMap.set(Laya.EColliderCapable.Collider_CollisionDetectionMode, true);
            this._staticCapableMap.set(Laya.EColliderCapable.RigidBody_AllowSleep, true);
        }
        constructor(manager) {
            super(manager);
            Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicaStaticRigidBody, 1);
        }
        getCapable(value) {
            return pxStaticCollider.getStaticColliderCapable(value);
        }
        _initCollider() {
            this._pxActor = pxStatics._physics.createRigidStatic(this._transformTo(new Laya.Vector3(), new Laya.Quaternion()));
        }
        setTrigger(value) {
            this._isTrigger = value;
            this._shape && this._shape.setIsTrigger(value);
        }
        _initColliderShapeByCollider() {
            super._initColliderShapeByCollider();
            this.setWorldTransform(true);
            this.setTrigger(this._isTrigger);
        }
        destroy() {
            Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicaStaticRigidBody, -1);
            super.destroy();
        }
    }

    exports.PxConstraintFlag = void 0;
    (function (PxConstraintFlag) {
        PxConstraintFlag[PxConstraintFlag["eBROKEN"] = 1] = "eBROKEN";
        PxConstraintFlag[PxConstraintFlag["ePROJECT_TO_ACTOR0"] = 2] = "ePROJECT_TO_ACTOR0";
        PxConstraintFlag[PxConstraintFlag["ePROJECT_TO_ACTOR1"] = 4] = "ePROJECT_TO_ACTOR1";
        PxConstraintFlag[PxConstraintFlag["ePROJECTION"] = 6] = "ePROJECTION";
        PxConstraintFlag[PxConstraintFlag["eCOLLISION_ENABLED"] = 8] = "eCOLLISION_ENABLED";
        PxConstraintFlag[PxConstraintFlag["eVISUALIZATION"] = 16] = "eVISUALIZATION";
        PxConstraintFlag[PxConstraintFlag["eDRIVE_LIMITS_ARE_FORCES"] = 32] = "eDRIVE_LIMITS_ARE_FORCES";
        PxConstraintFlag[PxConstraintFlag["eIMPROVED_SLERP"] = 128] = "eIMPROVED_SLERP";
        PxConstraintFlag[PxConstraintFlag["eDISABLE_PREPROCESSING"] = 256] = "eDISABLE_PREPROCESSING";
        PxConstraintFlag[PxConstraintFlag["eENABLE_EXTENDED_LIMITS"] = 512] = "eENABLE_EXTENDED_LIMITS";
        PxConstraintFlag[PxConstraintFlag["eGPU_COMPATIBLE"] = 1024] = "eGPU_COMPATIBLE";
        PxConstraintFlag[PxConstraintFlag["eALWAYS_UPDATE"] = 2048] = "eALWAYS_UPDATE";
        PxConstraintFlag[PxConstraintFlag["eDISABLE_CONSTRAINT"] = 4096] = "eDISABLE_CONSTRAINT";
    })(exports.PxConstraintFlag || (exports.PxConstraintFlag = {}));
    class pxJoint {
        constructor(manager) {
            this._breakForce = Number.MAX_VALUE;
            this._breakTorque = Number.MAX_VALUE;
            this._physicsManager = manager;
            this._id = pxJoint._pxJointID++;
            this._localPos = new Laya.Vector3();
            this._connectlocalPos = new Laya.Vector3();
            this._linearForce = new Laya.Vector3();
            this._angularForce = new Laya.Vector3();
            Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicsJoint, 1);
        }
        isEnable(value) {
            this._pxJoint && this._pxJoint.setConstraintFlag(exports.PxConstraintFlag.eDISABLE_CONSTRAINT, !value);
        }
        isCollision(value) {
            this._pxJoint && this._pxJoint.setConstraintFlag(exports.PxConstraintFlag.eCOLLISION_ENABLED, value);
        }
        isPreprocessiong(value) {
            this._pxJoint && this._pxJoint.setConstraintFlag(exports.PxConstraintFlag.eDISABLE_PREPROCESSING, value);
        }
        _createJoint() {
        }
        destroy() {
            Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicsJoint, -1);
        }
        setOwner(value) {
            this.owner = value;
            pxJoint._ActorPool.set(this._id, this);
            this._collider && this._connectCollider && this._createJoint();
        }
        _setActor() {
            if (this._pxJoint) {
                this._pxJoint.setActors(this._collider._pxActor || null, this._connectCollider._pxActor || null);
            }
            else {
                this._collider && this._connectCollider && this._createJoint();
            }
        }
        setCollider(owner) {
            if (owner == this._collider)
                return;
            this._collider = owner;
            this._setActor();
        }
        setConnectedCollider(owner) {
            if (owner == this._connectCollider)
                return;
            this._connectCollider = owner;
            this._setActor();
        }
        _setLocalPose(actor, position) {
            this._pxJoint && this._pxJoint.setLocalPose(actor, position, Laya.Quaternion.DEFAULT);
        }
        setLocalPos(value) {
            value && value.cloneTo(this._localPos);
            this._pxJoint && this._setLocalPose(0, this._localPos);
        }
        setConnectLocalPos(value) {
            value && value.cloneTo(this._connectlocalPos);
            this._setLocalPose(1, this._connectlocalPos);
        }
        setConnectedMassScale(value) {
            this._pxJoint && this._pxJoint.setInvMassScale0(1 / value);
        }
        setConnectedInertiaScale(value) {
            this._pxJoint && this._pxJoint.setInvInertiaScale0(1 / value);
        }
        setMassScale(value) {
            this._pxJoint && this._pxJoint.setInvMassScale1(1 / value);
        }
        setInertiaScale(value) {
            this._pxJoint && this._pxJoint.setInvInertiaScale1(1 / value);
        }
        setBreakForce(value) {
            this._breakForce = value;
            this._pxJoint && this._pxJoint.setBreakForce(this._breakForce, this._breakTorque);
        }
        setBreakTorque(value) {
            this._breakTorque = value;
            this._pxJoint && this._pxJoint.setBreakForce(this._breakForce, this._breakTorque);
        }
        getlinearForce() {
            const v3 = this._pxJoint.getlinearForce();
            this._linearForce.set(v3.x, v3.y, v3.z);
            return this._linearForce;
        }
        getAngularForce() {
            const v3 = this._pxJoint.getAngularForce();
            this._linearForce.set(v3.x, v3.y, v3.z);
            return this._linearForce;
        }
        isValid() {
            return this._pxJoint.isValid();
        }
        release() {
            if (this._pxJoint) {
                this._pxJoint.release();
                this._pxJoint = null;
            }
        }
    }
    pxJoint._ActorPool = new Map();
    pxJoint._pxJointID = 0;
    pxJoint._tempTransform0 = { translation: new Laya.Vector3(), rotation: new Laya.Quaternion() };
    pxJoint._tempTransform1 = { translation: new Laya.Vector3(), rotation: new Laya.Quaternion() };

    class pxFixedJoint extends pxJoint {
        _createJoint() {
            const transform = pxJoint._tempTransform0;
            this._localPos.cloneTo(transform.translation);
            const transform1 = pxJoint._tempTransform1;
            this._connectlocalPos.cloneTo(transform1.translation);
            this._pxJoint = pxStatics._physics.createFixedJoint(this._collider._pxActor, transform.translation, transform.rotation, this._connectCollider._pxActor, transform1.translation, transform1.rotation);
            this._pxJoint.setUUID(this._id);
        }
        destroy() {
            this._pxJoint && this._pxJoint.release();
            super.destroy();
        }
    }

    exports.PxD6JointDriveFlag = void 0;
    (function (PxD6JointDriveFlag) {
        PxD6JointDriveFlag[PxD6JointDriveFlag["eACCELERATION"] = 1] = "eACCELERATION";
    })(exports.PxD6JointDriveFlag || (exports.PxD6JointDriveFlag = {}));
    class pxD6Joint extends pxJoint {
        constructor() {
            super(...arguments);
            this._axis = new Laya.Vector3(1, 0, 0);
            this._SecondaryAxis = new Laya.Vector3(0, 1, 0);
            this._axisRotationQuaternion = new Laya.Quaternion();
        }
        _createJoint() {
            const transform = pxJoint._tempTransform0;
            this._localPos.cloneTo(transform.translation);
            const transform1 = pxJoint._tempTransform1;
            this._connectlocalPos.cloneTo(transform1.translation);
            this._pxJoint = pxStatics._physics.createD6Joint(this._collider._pxActor, transform.translation, transform.rotation, this._connectCollider._pxActor, transform1.translation, transform1.rotation);
            this._initAllConstrainInfo();
            this._pxJoint.setUUID(this._id);
        }
        _initAllConstrainInfo() {
            this.setAxis(this._axis, this._SecondaryAxis);
            this.setMotion(Laya.D6Axis.eFREE, Laya.D6MotionType.eX);
            this.setMotion(Laya.D6Axis.eFREE, Laya.D6MotionType.eY);
            this.setMotion(Laya.D6Axis.eFREE, Laya.D6MotionType.eZ);
            this.setMotion(Laya.D6Axis.eFREE, Laya.D6MotionType.eTWIST);
            this.setMotion(Laya.D6Axis.eFREE, Laya.D6MotionType.eSWING1);
            this.setMotion(Laya.D6Axis.eFREE, Laya.D6MotionType.eSWING2);
        }
        _setLocalPose(actor, position) {
            this._pxJoint && this._pxJoint.setLocalPose(actor, position, this._axisRotationQuaternion);
        }
        setAxis(axis, secendary) {
            this._axis = axis;
            this._SecondaryAxis = secendary;
            const xAxis = pxD6Joint.tempV3;
            const axisRotationQuaternion = this._axisRotationQuaternion;
            xAxis.set(1, 0, 0);
            axis = axis.normalize();
            const angle = Math.acos(Laya.Vector3.dot(xAxis, axis));
            Laya.Vector3.cross(xAxis, axis, xAxis);
            Laya.Quaternion.rotationAxisAngle(xAxis, angle, axisRotationQuaternion);
            this._setLocalPose(0, this._localPos);
        }
        setMotion(axis, motionType) {
            this._pxJoint && this._pxJoint.setMotion(motionType, axis);
        }
        setDistanceLimit(limit, bounceness, bounceThreshold, spring, damp) {
            this._pxJoint && this._pxJoint.setDistanceLimit(limit, bounceness, bounceThreshold, spring, damp);
        }
        setLinearLimit(linearAxis, upper, lower, bounceness, bounceThreshold, spring, damping) {
            this._pxJoint && this._pxJoint.setLinearLimit(linearAxis, lower, upper, bounceness, bounceThreshold, spring, damping);
        }
        setTwistLimit(upper, lower, bounceness, bounceThreshold, spring, damping) {
            this._pxJoint && this._pxJoint.setTwistLimit(lower, upper, bounceness, bounceThreshold, spring, damping);
        }
        setSwingLimit(yAngle, zAngle, bounceness, bounceThreshold, spring, damping) {
            this._pxJoint && this._pxJoint.setSwingLimit(yAngle, zAngle, bounceness, bounceThreshold, spring, damping);
        }
        setDrive(index, stiffness, damping, forceLimit) {
            let acceleration = exports.PxD6JointDriveFlag.eACCELERATION;
            this._pxJoint && this._pxJoint.setDrive(index, stiffness, damping, forceLimit, acceleration);
        }
        setDriveTransform(position, rotate) {
            this._pxJoint && this._pxJoint.setDrivePosition(position, rotate);
        }
        setDriveVelocity(position, angular) {
            this._pxJoint && this._pxJoint.setDriveVelocity(position, angular);
        }
        getTwistAngle() {
            return this._pxJoint.getTwistAngle();
        }
        getSwingYAngle() {
            return this._pxJoint.getSwingYAngle();
        }
        getSwingZAngle() {
            return this._pxJoint.getSwingZAngle();
        }
        destroy() {
            this._pxJoint && this._pxJoint.release();
            super.destroy();
        }
    }
    pxD6Joint.tempV3 = new Laya.Vector3();

    class pxDistanceJoint extends pxJoint {
        _createJoint() {
            const transform = pxJoint._tempTransform0;
            this._localPos.cloneTo(transform.translation);
            const transform1 = pxJoint._tempTransform1;
            this._connectlocalPos.cloneTo(transform1.translation);
            this._pxJoint = pxStatics._physics.createDistanceJoint(this._collider._pxActor, transform.translation, transform.rotation, this._connectCollider._pxActor, transform1.translation, transform1.rotation);
            this._pxJoint.setUUID(this._id);
            this._pxJoint.setDistanceJointFlag(2, true);
            this._pxJoint.setDistanceJointFlag(4, true);
            this._pxJoint.setDistanceJointFlag(8, true);
        }
        setMinDistance(distance) {
            this._pxJoint && this._pxJoint.setMinDistance(distance);
        }
        setMaxDistance(distance) {
            this._pxJoint && this._pxJoint.setMaxDistance(distance);
        }
        setConnectDistance(distance) {
            this._pxJoint && this._pxJoint.setConnectDistance(distance);
        }
        setTolerance(tolerance) {
            this._pxJoint && this._pxJoint.setTolerance(tolerance);
        }
        setStiffness(stiffness) {
            this._pxJoint && this._pxJoint.setStiffness(stiffness);
        }
        setDamping(damping) {
            this._pxJoint && this._pxJoint.setDamping(damping);
        }
        destroy() {
            this._pxJoint && this._pxJoint.release();
            super.destroy();
        }
    }

    exports.PxRevoluteJointFlag = void 0;
    (function (PxRevoluteJointFlag) {
        PxRevoluteJointFlag[PxRevoluteJointFlag["eLIMIT_ENABLED"] = 1] = "eLIMIT_ENABLED";
        PxRevoluteJointFlag[PxRevoluteJointFlag["eDRIVE_ENABLED"] = 2] = "eDRIVE_ENABLED";
        PxRevoluteJointFlag[PxRevoluteJointFlag["eDRIVE_FREESPIN"] = 4] = "eDRIVE_FREESPIN";
    })(exports.PxRevoluteJointFlag || (exports.PxRevoluteJointFlag = {}));
    class pxRevoluteJoint extends pxJoint {
        constructor() {
            super(...arguments);
            this._axisRotationQuaternion = new Laya.Quaternion();
            this._velocity = new Laya.Vector3();
            this._lowerLimit = -Math.PI / 2;
            this._uperLimit = Math.PI / 2;
            this._bouncenciness = 0;
            this._bouncenMinVelocity = 0;
            this._contactDistance = 0;
            this._enableLimit = false;
        }
        _createJoint() {
            const transform = pxJoint._tempTransform0;
            this._localPos.cloneTo(transform.translation);
            const transform1 = pxJoint._tempTransform1;
            this._connectlocalPos.cloneTo(transform1.translation);
            this._pxJoint = pxStatics._physics.createRevoluteJoint(this._collider._pxActor, transform.translation, transform.rotation, this._connectCollider._pxActor, transform1.translation, transform1.rotation);
            this._pxJoint.setUUID(this._id);
        }
        _setLocalPose(actor, position) {
            this._pxJoint && this._pxJoint.setLocalPose(actor, position, this._axisRotationQuaternion);
        }
        _setRevoluteJointFlag(flag, value) {
            this._pxJoint && this._pxJoint.setRevoluteJointFlag(flag, value);
        }
        _setLimit() {
            this._enableLimit && this._pxJoint && this._pxJoint.setHardLimit(this._lowerLimit, this._uperLimit, this._contactDistance);
        }
        setLowerLimit(lowerLimit) {
            if (this._lowerLimit == lowerLimit)
                return;
            this._lowerLimit = lowerLimit;
            this._setLimit();
        }
        setUpLimit(value) {
            if (this._uperLimit == value || !this._enableLimit)
                return;
            this._uperLimit = value;
            this._setLimit();
        }
        setBounceness(value) {
            if (this._bouncenciness == value)
                return;
            this._bouncenciness = value;
            this._setLimit();
        }
        setBouncenMinVelocity(value) {
            if (this._bouncenMinVelocity == value)
                return;
            this._bouncenMinVelocity = value;
            this._setLimit();
        }
        setContactDistance(value) {
            if (this._contactDistance == value)
                return;
            this._contactDistance = value;
            this._setLimit();
        }
        enableLimit(value) {
            this._enableLimit = value;
            this._setRevoluteJointFlag(exports.PxRevoluteJointFlag.eLIMIT_ENABLED, value);
            if (this._enableLimit)
                this._setLimit();
        }
        enableDrive(value) {
            this._setRevoluteJointFlag(exports.PxRevoluteJointFlag.eDRIVE_ENABLED, value);
        }
        enableFreeSpin(value) {
            this._setRevoluteJointFlag(exports.PxRevoluteJointFlag.eDRIVE_FREESPIN, value);
        }
        setAxis(value) {
            const xAxis = pxRevoluteJoint._xAxis;
            const axisRotationQuaternion = this._axisRotationQuaternion;
            xAxis.set(1, 0, 0);
            value = value.normalize();
            const angle = Math.acos(Laya.Vector3.dot(xAxis, value));
            Laya.Vector3.cross(xAxis, value, xAxis);
            Laya.Quaternion.rotationAxisAngle(xAxis, angle, axisRotationQuaternion);
            this._setLocalPose(0, this._localPos);
        }
        getAngle() {
            return this._pxJoint.getAngle();
        }
        getVelocity() {
            const velocity = this._velocity;
            const getVel = this._pxJoint.getVelocity();
            velocity.set(getVel.x, getVel.y, getVel.z);
            return velocity;
        }
        setDriveVelocity(velocity) {
            this._pxJoint && this._pxJoint.setDriveVelocity(velocity, true);
        }
        setDriveForceLimit(limit) {
            this._pxJoint && this._pxJoint.setDriveForceLimit(limit);
        }
        destroy() {
            this._pxJoint && this._pxJoint.release();
            super.destroy();
        }
    }
    pxRevoluteJoint._xAxis = new Laya.Vector3(1, 0, 0);

    class pxSphereJoint extends pxJoint {
    }

    class pxBoxColliderShape extends pxColliderShape {
        constructor() {
            super();
            this._size = new Laya.Vector3(0.5, 0.5, 0.5);
            this._pxGeometry = new pxStatics._physX.PxBoxGeometry(this._size.x / 2, this._size.y / 2, this._size.z / 2);
            this._createShape();
        }
        setSize(size) {
            const tempExtents = pxBoxColliderShape._tempHalfExtents;
            size.cloneTo(this._size);
            tempExtents.setValue(this._size.x * 0.5 * this._scale.x, this._size.y * 0.5 * this._scale.y, this._size.z * 0.5 * this._scale.z);
            this._pxGeometry.halfExtents = tempExtents;
            this._pxShape && this._pxShape.setGeometry(this._pxGeometry);
        }
        setOffset(position) {
            super.setOffset(position);
            this.setSize(this._size);
        }
        destroy() {
            super.destroy();
            this._size = null;
        }
    }
    pxBoxColliderShape._tempHalfExtents = new Laya.Vector3();

    exports.PxConvexFlag = void 0;
    (function (PxConvexFlag) {
        PxConvexFlag[PxConvexFlag["e16_BIT_INDICES"] = 1] = "e16_BIT_INDICES";
        PxConvexFlag[PxConvexFlag["eCOMPUTE_CONVEX"] = 2] = "eCOMPUTE_CONVEX";
        PxConvexFlag[PxConvexFlag["eCHECK_ZERO_AREA_TRIANGLES"] = 4] = "eCHECK_ZERO_AREA_TRIANGLES";
        PxConvexFlag[PxConvexFlag["eQUANTIZE_INPUT"] = 8] = "eQUANTIZE_INPUT";
        PxConvexFlag[PxConvexFlag["eDISABLE_MESH_VALIDATION"] = 16] = "eDISABLE_MESH_VALIDATION";
        PxConvexFlag[PxConvexFlag["ePLANE_SHIFTING"] = 32] = "ePLANE_SHIFTING";
        PxConvexFlag[PxConvexFlag["eFAST_INERTIA_COMPUTATION"] = 64] = "eFAST_INERTIA_COMPUTATION";
        PxConvexFlag[PxConvexFlag["eGPU_COMPATIBLE"] = 128] = "eGPU_COMPATIBLE";
        PxConvexFlag[PxConvexFlag["eSHIFT_VERTICES"] = 256] = "eSHIFT_VERTICES";
    })(exports.PxConvexFlag || (exports.PxConvexFlag = {}));
    exports.PxConvexMeshGeometryFlag = void 0;
    (function (PxConvexMeshGeometryFlag) {
        PxConvexMeshGeometryFlag[PxConvexMeshGeometryFlag["eTIGHT_BOUNDS"] = 1] = "eTIGHT_BOUNDS";
    })(exports.PxConvexMeshGeometryFlag || (exports.PxConvexMeshGeometryFlag = {}));
    exports.PxMeshGeometryFlag = void 0;
    (function (PxMeshGeometryFlag) {
        PxMeshGeometryFlag[PxMeshGeometryFlag["eTIGHT_BOUNDS"] = 1] = "eTIGHT_BOUNDS";
        PxMeshGeometryFlag[PxMeshGeometryFlag["eDOUBLE_SIDED"] = 2] = "eDOUBLE_SIDED";
    })(exports.PxMeshGeometryFlag || (exports.PxMeshGeometryFlag = {}));
    class pxMeshColliderShape extends pxColliderShape {
        constructor() {
            super();
            this._limitvertex = 255;
            this._convex = false;
            this._meshScale = new pxStatics._physX.PxMeshScale(Laya.Vector3.ONE, Laya.Quaternion.DEFAULT);
            this._id = pxColliderShape._pxShapeID++;
            this._pxMaterials[0] = new pxPhysicsMaterial();
        }
        _getMeshPosition() {
            let posArray = new Array();
            this._mesh.getPositions(posArray);
            if (this._convex && posArray.length > this._limitvertex) {
                console.warn("MeshColliderShape: The number of vertices exceeds the limit, please reduce the number of vertices.");
            }
            let vecpointer = new pxStatics._physX.PxVec3Vector();
            posArray.forEach((vec, index) => {
                vecpointer.push_back(vec);
            });
            return vecpointer;
        }
        _getIndices() {
            let indexCount = this._mesh.indexCount;
            let indices = this._mesh.getIndices();
            let traCount = indexCount / 3;
            let data = null;
            if (indices instanceof Uint32Array) {
                data = pxStatics.createUint32Array(indexCount);
            }
            else {
                data = pxStatics.createUint16Array(indexCount);
            }
            for (var i = 0; i < traCount; i++) {
                let index = i * 3;
                data.buffer[index] = indices[index];
                data.buffer[index + 1] = indices[index + 2];
                data.buffer[index + 2] = indices[index + 1];
            }
            return data;
        }
        _createConvexMeshGeometry() {
            if (!this._mesh)
                return;
            if (!this._mesh._convexMesh) {
                let vecpointer = this._getMeshPosition();
                this._mesh._convexMesh = pxStatics._physX.createConvexMeshFromBuffer(vecpointer, pxStatics._physics, this._limitvertex, pxStatics._tolerancesScale, exports.PxConvexFlag.eCOMPUTE_CONVEX);
                vecpointer.delete();
            }
            let flags = new pxStatics._physX.PxConvexMeshGeometryFlags(exports.PxConvexMeshGeometryFlag.eTIGHT_BOUNDS);
            this._pxGeometry = new pxStatics._physX.PxConvexMeshGeometry(this._mesh._convexMesh, this._meshScale, flags);
            if (this._pxShape && this._pxCollider)
                this._pxCollider._pxActor.detachShape(this._pxShape, true);
            else if (this._pxShape) {
                this._pxShape.release();
            }
            this._createShape();
        }
        _createTrianggleMeshGeometry() {
            if (!this._mesh)
                return;
            if (!this._mesh._triangleMesh) {
                let vecpointer = this._getMeshPosition();
                let indicesData = this._getIndices();
                this._mesh._triangleMesh = pxStatics._physX.createTriMesh(vecpointer, indicesData.ptr, this._mesh.indexCount, this._mesh.indexFormat == Laya.IndexFormat.UInt32 ? false : true, pxStatics._tolerancesScale, pxStatics._physics);
                vecpointer.delete();
                pxStatics.freeBuffer(indicesData);
            }
            let flags = new pxStatics._physX.PxMeshGeometryFlags(exports.PxMeshGeometryFlag.eTIGHT_BOUNDS);
            this._pxGeometry = new pxStatics._physX.PxTriangleMeshGeometry(this._mesh._triangleMesh, this._meshScale, flags);
            if (this._pxShape && this._pxCollider)
                this._pxCollider._pxActor.detachShape(this._pxShape, true);
            else if (this._pxShape) {
                this._pxShape.release();
            }
            this._createShape();
        }
        _createShape() {
            if (this._id == null) {
                this._id = pxColliderShape._pxShapeID++;
            }
            if (!this._pxMaterials[0]) {
                this._pxMaterials[0] = new pxPhysicsMaterial();
            }
            this._pxShape = pxStatics._physics.createShape(this._pxGeometry, this._pxMaterials[0]._pxMaterial, true, new pxStatics._physX.PxShapeFlags(this._shapeFlags));
            this._pxShape.setUUID(this._id);
            pxColliderShape._shapePool.set(this._id, this);
            this._reConfigShape();
        }
        _reConfigShape() {
            if (this._pxCollider) {
                this.setSimulationFilterData(this._pxCollider._collisionGroup, this._pxCollider._canCollisionWith);
                this.setOffset(this._offset);
                this._pxCollider._pxActor.attachShape(this._pxShape);
            }
        }
        _setScale(scale) {
            if (this._pxShape && scale.equal(this._scale))
                return;
            scale.cloneTo(this._scale);
            this._meshScale.scale = this._scale;
            if (this._convex)
                this._createConvexMeshGeometry();
            else
                this._createTrianggleMeshGeometry();
        }
        setOffset(position) {
            if (!this._pxCollider)
                return;
            position.cloneTo(this._offset);
            this._setScale(this._pxCollider.owner.transform.getWorldLossyScale());
            if (this._pxShape) {
                const transform = pxColliderShape.transform;
                if (this._pxCollider.owner)
                    Laya.Vector3.multiply(position, this._scale, transform.translation);
                this._pxShape.setLocalPose(transform);
            }
        }
        setPhysicsMeshFromMesh(value) {
            this._mesh = value;
            this._convex = false;
            this._createTrianggleMeshGeometry();
        }
        setConvexMesh(value) {
            this._mesh = value;
            this._convex = true;
            this._createConvexMeshGeometry();
        }
        setLimitVertex(limit) {
            this._limitvertex = limit;
            if (this._convex)
                this._createConvexMeshGeometry();
        }
    }

    class pxHeightFieldShape extends pxColliderShape {
        constructor() {
            super();
            this._numRows = 2;
            this._numCols = 2;
        }
        getHeightData() {
            this._minHeight = Number.MAX_VALUE;
            this._maxHeight = -Number.MAX_VALUE;
            this._heightData.forEach((value) => {
                this._maxHeight = Math.max(value, this._maxHeight);
                this._minHeight = Math.min(value, this._minHeight);
            });
            let deltaHeight = this._maxHeight - this._minHeight;
            let data = pxStatics.createFloat32Array(this._heightData.length);
            this._heightData.forEach((value, index) => {
                data.buffer[index] = (value - this._minHeight) / deltaHeight;
            });
            return data;
        }
        getFlagData() {
            let indexCount = this._numRows * this._numCols;
            let data = pxStatics.createUint8Array(indexCount);
            if (this._flag) {
                data.buffer.set(this._flag);
            }
            else {
                data.buffer.fill(0);
            }
            return data;
        }
        _createHeightField() {
            let heightdata = this.getHeightData();
            let flagdata = this.getFlagData();
            this._heightFiled = pxStatics._physX.createHeightField(this._numRows, this._numCols, heightdata.ptr, flagdata.ptr, pxStatics._allocator, pxStatics._tolerancesScale, pxStatics._physics);
            let heightScale = (this._scale.y * (this._maxHeight - this._minHeight)) / 32767;
            let flags = new pxStatics._physX.PxMeshGeometryFlags(exports.PxMeshGeometryFlag.eTIGHT_BOUNDS);
            this._pxGeometry = new pxStatics._physX.PxHeightFieldGeometry(this._heightFiled, flags, heightScale, this._scale.x, this._scale.z);
            this._pxShape && this._pxCollider._pxActor.detachShape(this._pxShape, true);
            this._createShape();
            pxStatics.freeBuffer(heightdata);
            pxStatics.freeBuffer(flagdata);
        }
        setHeightFieldData(numRows, numCols, heightData, flag, scale) {
            this._numRows = numRows;
            this._numCols = numCols;
            this._heightData = heightData;
            this._flag = flag;
            scale.cloneTo(this._scale);
            this._createHeightField();
        }
        getNbRows() {
            return this._heightFiled.getNbRows();
        }
        getNbColumns() {
            return this._heightFiled.getNbColumns();
        }
        getHeight(rows, cols) {
            return this._heightFiled.getHeight(rows, cols);
        }
    }

    class pxSphereColliderShape extends pxColliderShape {
        constructor() {
            super();
            this._radius = 0.5;
            this._pxGeometry = new pxStatics._physX.PxSphereGeometry(this._radius);
            this._createShape();
        }
        setRadius(radius) {
            this._radius = radius;
            var maxScale = Math.max(this._scale.x, Math.max(this._scale.y, this._scale.z));
            this._pxGeometry.radius = this._radius * maxScale;
            this._pxShape.setGeometry(this._pxGeometry);
        }
        setOffset(position) {
            super.setOffset(position);
            this.setRadius(this._radius);
        }
        destroy() {
            super.destroy();
            this._radius = null;
        }
    }

    class pxCollisionTool {
        constructor() {
        }
        static getCollision(pxCollsionData, isTrigger) {
            let collisionData = pxCollsionData.get(0);
            if (!collisionData)
                return null;
            let collsion = pxCollisionTool._collisionPool.length === 0 ? new Laya.Collision() : pxCollisionTool._collisionPool.pop();
            collsion._inPool = false;
            if (isTrigger) {
                let otherShape = pxColliderShape._shapePool.get(collisionData.otherShape);
                let triggerShape = pxColliderShape._shapePool.get(collisionData.triggerShape);
                if (!otherShape || !triggerShape)
                    return null;
                collsion._colliderA = otherShape._pxCollider;
                collsion._colliderB = triggerShape._pxCollider;
                collsion._isTrigger = true;
            }
            else {
                let shape0 = pxColliderShape._shapePool.get(collisionData.pxShape0);
                let shape1 = pxColliderShape._shapePool.get(collisionData.pxShape1);
                if (!shape0 || !shape1)
                    return null;
                collsion._colliderA = shape0._pxCollider;
                collsion._colliderB = shape1._pxCollider;
                for (let i = 0, j = collisionData.contactCount; i < j; i++) {
                    let contactInfo = collisionData["contactPoint" + i];
                    if (!contactInfo)
                        continue;
                    let contact = pxCollisionTool._contactPoint;
                    contact._colliderA = collsion._colliderA;
                    contact._colliderB = collsion._colliderB;
                    contact.normal = pxCollisionTool._tempV3.setValue(contactInfo.normal.x, contactInfo.normal.y, contactInfo.normal.z);
                    contact.positionOnA = contact.positionOnB = pxCollisionTool._tempV3.setValue(contactInfo.position.x, contactInfo.position.y, contactInfo.position.z);
                    collsion.contacts.push(contact);
                }
            }
            return collsion;
        }
        static getRayCastResult(out, quaryResult) {
            if (quaryResult.Quary) {
                out.succeeded = quaryResult.Quary;
                let normal = out.normal;
                normal.x = quaryResult.normal.x;
                normal.y = quaryResult.normal.y;
                normal.z = quaryResult.normal.z;
                let hitPos = out.point;
                hitPos.x = quaryResult.position.x;
                hitPos.y = quaryResult.position.y;
                hitPos.z = quaryResult.position.z;
                out.collider = pxCollider._ActorPool.get(quaryResult.ActorUUID);
            }
            return out;
        }
        static getRayCastResults(out, quaryResults) {
            let quarySize = quaryResults.size();
            if (quarySize <= 0)
                return out;
            out.length = 0;
            for (let i = 0; i < quarySize; i++) {
                let result = quaryResults.get(i);
                let outItem = pxCollisionTool._hitPool.length === 0 ? new Laya.HitResult() : pxCollisionTool._hitPool.pop();
                outItem._inPool = false;
                if (result) {
                    outItem.succeeded = result.Quary;
                    let normal = outItem.normal;
                    normal.x = result.normal.x;
                    normal.y = result.normal.y;
                    normal.z = result.normal.z;
                    let hitPos = outItem.point;
                    hitPos.x = result.position.x;
                    hitPos.y = result.position.y;
                    hitPos.z = result.position.z;
                    outItem.collider = pxCollider._ActorPool.get(result.ActorUUID);
                    out.push(outItem);
                }
            }
            return out;
        }
        static reCoverCollision(value) {
            if (!value._inPool) {
                value._inPool = true;
                pxCollisionTool._collisionPool.push(value);
            }
        }
        static reCoverHitresults(value) {
            if (!value._inPool) {
                value._inPool = true;
                pxCollisionTool._hitPool.push(value);
            }
        }
    }
    pxCollisionTool._collisionPool = [];
    pxCollisionTool._hitPool = [];
    pxCollisionTool._tempV3 = new Laya.Vector3();
    pxCollisionTool._contactPoint = new Laya.ContactPoint();

    class pxPhysicsManager {
        constructor(physicsSettings) {
            this._physicsUpdateList = new Laya.PhysicsUpdateList();
            this._dynamicUpdateList = new Laya.PhysicsUpdateList();
            this.fixedTime = 1.0 / 60.0;
            this.enableCCD = false;
            this._contactCollisionsBegin = new Map();
            this._contactCollisionsPersist = new Map();
            this._contactCollisionsEnd = new Map();
            this._triggerCollisionsBegin = new Map();
            this._triggerCollisionsPersist = new Map();
            this._triggerCollisionsEnd = new Map();
            this._gravity = new Laya.Vector3(0, -9.81, 0);
            const triggerCallback = {
                onWake: (wakeActors) => {
                    let size = wakeActors.size();
                    for (let i = 0; i < size; i++) {
                        let uuid = wakeActors.get(i);
                        this.addDynamicElementByUUID(uuid);
                    }
                },
                onSleep: (sleepActors) => {
                    let size = sleepActors.size();
                    for (let i = 0; i < size; i++) {
                        let uuid = sleepActors.get(i);
                        this.removeDynamicElementByUUID(uuid);
                    }
                },
                onContactBegin: (startContacts) => {
                    this.setDataToMap(startContacts, "onContactBegin");
                },
                onContactEnd: (onContactEnd) => {
                    this.setDataToMap(onContactEnd, "onContactEnd");
                },
                onContactPersist: (onContactPersist) => {
                    this.setDataToMap(onContactPersist, "onContactPersist");
                },
                onTriggerBegin: (startTrigger) => {
                    this.setDataToMap(startTrigger, "onTriggerBegin", true);
                },
                onTriggerEnd: (lostTrigger) => {
                    this.setDataToMap(lostTrigger, "onTriggerEnd", true);
                }
            };
            this.enableCCD = physicsSettings.enableCCD;
            const pxPhysics = pxStatics._physics;
            pxStatics._physXSimulationCallbackInstance = pxStatics._physX.PxSimulationEventCallback.implement(triggerCallback);
            pxStatics._sceneDesc = pxStatics._physX.getDefaultSceneDesc(pxPhysics.getTolerancesScale(), 0, pxStatics._physXSimulationCallbackInstance);
            this._pxScene = pxPhysics.createScene(pxStatics._sceneDesc);
            this.setGravity(this._gravity);
            this._pxcontrollerManager = this._pxScene.createControllerManager();
            if (pxStatics._physXPVD) {
                this._pxScene.setPVDClient();
            }
            this.fixedTime = physicsSettings.fixedTimeStep;
        }
        setActiveCollider(collider, value) {
            collider.active = value;
            if (value) {
                collider._physicsManager = this;
            }
            else {
                collider._physicsManager = null;
            }
        }
        enableDebugDrawer(value) {
            throw new Laya.NotImplementedError();
        }
        setDataToMap(dataCallBack, eventType, isTrigger = false) {
            let curCollision = pxCollisionTool.getCollision(dataCallBack, isTrigger);
            if (!curCollision)
                return;
            let _colliderA = curCollision._colliderA;
            let _colliderB = curCollision._colliderB;
            switch (eventType) {
                case "onContactBegin":
                    this._contactCollisionsBegin.set(_colliderA._id, curCollision);
                    this._contactCollisionsBegin.set(_colliderB._id, curCollision);
                    break;
                case "onContactPersist":
                    this._contactCollisionsPersist.set(_colliderA._id, curCollision);
                    this._contactCollisionsPersist.set(_colliderB._id, curCollision);
                    break;
                case "onContactEnd":
                    this._contactCollisionsEnd.set(_colliderA._id, curCollision);
                    this._contactCollisionsEnd.set(_colliderB._id, curCollision);
                    break;
                case "onTriggerBegin":
                    this._triggerCollisionsBegin.set(_colliderA._id, curCollision);
                    this._triggerCollisionsBegin.set(_colliderB._id, curCollision);
                    this._triggerCollisionsPersist.set(_colliderA._id, curCollision);
                    this._triggerCollisionsPersist.set(_colliderB._id, curCollision);
                    break;
                case "onTriggerEnd":
                    this._triggerCollisionsEnd.set(_colliderA._id, curCollision);
                    this._triggerCollisionsEnd.set(_colliderB._id, curCollision);
                    this._triggerCollisionsPersist.delete(_colliderA._id);
                    this._triggerCollisionsPersist.delete(_colliderB._id);
                    break;
            }
        }
        setGravity(gravity) {
            this._pxScene.setGravity(gravity);
        }
        _addCharactorCollider(charactorCollider) {
            charactorCollider._createController();
            this._dynamicUpdateList.add(charactorCollider);
        }
        _removeCharactorCollider(charactorCollider) {
            charactorCollider._releaseController();
            this._dynamicUpdateList.remove(charactorCollider);
        }
        addDynamicElementByUUID(uuid) {
            let collider = pxCollider._ActorPool.get(uuid);
            if (!collider || collider.inPhysicUpdateListIndex !== -1)
                return;
            this._dynamicUpdateList.add(collider);
        }
        removeDynamicElementByUUID(uuid) {
            let collider = pxCollider._ActorPool.get(uuid);
            if (!collider || collider.IsKinematic || collider.inPhysicUpdateListIndex === -1)
                return;
            this._dynamicUpdateList.remove(collider);
        }
        addCollider(collider) {
            if (!collider.active) {
                return;
            }
            let pxcollider = collider;
            switch (pxcollider._type) {
                case exports.pxColliderType.StaticCollider:
                    this._pxScene.addActor(pxcollider._pxActor, null);
                    Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_PhysicaStaticRigidBody, 1);
                    break;
                case exports.pxColliderType.RigidbodyCollider:
                    pxcollider.setWorldTransform(true);
                    this._pxScene.addActor(pxcollider._pxActor, null);
                    if (!collider.IsKinematic) {
                        this._dynamicUpdateList.add(collider);
                        Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_PhysicaDynamicRigidBody, 1);
                    }
                    else {
                        Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_PhysicaKinematicRigidBody, 1);
                    }
                    break;
                case exports.pxColliderType.CharactorCollider:
                    this._addCharactorCollider(collider);
                    Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_PhysicaCharacterController, 1);
                    break;
            }
            pxcollider._isSimulate = true;
        }
        removeCollider(collider) {
            let pxcollider = collider;
            switch (pxcollider._type) {
                case exports.pxColliderType.StaticCollider:
                    if (collider.inPhysicUpdateListIndex !== -1)
                        this._physicsUpdateList.remove(collider);
                    this._pxScene.removeActor(pxcollider._pxActor, true);
                    Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_PhysicaStaticRigidBody, -1);
                    break;
                case exports.pxColliderType.RigidbodyCollider:
                    if (collider.inPhysicUpdateListIndex !== -1)
                        !collider.IsKinematic && this._dynamicUpdateList.remove(collider);
                    this._pxScene.removeActor(pxcollider._pxActor, true);
                    if (!collider.IsKinematic) {
                        Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_PhysicaDynamicRigidBody, -1);
                    }
                    else {
                        Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_PhysicaKinematicRigidBody, -1);
                    }
                    break;
                case exports.pxColliderType.CharactorCollider:
                    this._removeCharactorCollider(pxcollider);
                    Laya.LayaGL.statAgent.recordCountData(Laya.StatElement.C_PhysicaCharacterController, -1);
                    break;
            }
            pxcollider._isSimulate = false;
        }
        _collision_event() {
            this._collision_EnterEvent();
            this._collision_StayEvent();
            this._collision_ExitEvent();
        }
        _collision_EnterEvent() {
            this._contactCollisionsBegin.forEach((value, key) => {
                if (!value)
                    return;
                Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicsEventCount, 1);
                let ownerA = value._colliderA.owner;
                let ownerB = value._colliderB.owner;
                value.other = value._colliderB.component;
                ownerA.event(Laya.Event.COLLISION_ENTER, value);
                value.other = value._colliderA.component;
                ownerB.event(Laya.Event.COLLISION_ENTER, value);
                pxCollisionTool.reCoverCollision(value);
            });
        }
        _collision_StayEvent() {
            this._contactCollisionsPersist.forEach((value, key) => {
                if (!value)
                    return;
                Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicsEventCount, 1);
                let ownerA = value._colliderA.owner;
                let ownerB = value._colliderB.owner;
                value.other = value._colliderB.component;
                ownerA.event(Laya.Event.COLLISION_STAY, value);
                value.other = value._colliderA.component;
                ownerB.event(Laya.Event.COLLISION_STAY, value);
                pxCollisionTool.reCoverCollision(value);
            });
        }
        _collision_ExitEvent() {
            this._contactCollisionsEnd.forEach((value, key) => {
                if (!value)
                    return;
                Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicsEventCount, 1);
                let ownerA = value._colliderA.owner;
                let ownerB = value._colliderB.owner;
                value.other = value._colliderB.component;
                ownerA.event(Laya.Event.COLLISION_EXIT, value);
                value.other = value._colliderA.component;
                ownerB.event(Laya.Event.COLLISION_EXIT, value);
                pxCollisionTool.reCoverCollision(value);
            });
        }
        _trigger_Event() {
            this._trigger_EnterEvent();
            this._trigger_StayEvent();
            this._trigger_ExitEvent();
        }
        _trigger_EnterEvent() {
            this._triggerCollisionsBegin.forEach((value, key) => {
                if (!value)
                    return;
                Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicsEventCount, 1);
                let ownerA = value._colliderA.owner;
                let ownerB = value._colliderB.owner;
                ownerA.event(Laya.Event.TRIGGER_ENTER, value);
                ownerB.event(Laya.Event.TRIGGER_ENTER, value);
                pxCollisionTool.reCoverCollision(value);
            });
        }
        _trigger_StayEvent() {
            this._triggerCollisionsPersist.forEach((value, key) => {
                if (!value)
                    return;
                Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicsEventCount, 1);
                let ownerA = value._colliderA.owner;
                let ownerB = value._colliderB.owner;
                ownerA.event(Laya.Event.TRIGGER_STAY, value);
                ownerB.event(Laya.Event.TRIGGER_STAY, value);
                pxCollisionTool.reCoverCollision(value);
            });
        }
        _trigger_ExitEvent() {
            this._triggerCollisionsEnd.forEach((value, key) => {
                if (!value)
                    return;
                Laya.Physics3DStatInfo.addStatisticsInfo(Laya.EPhysicsStatisticsInfo.C_PhysicsEventCount, 1);
                let ownerA = value._colliderA.owner;
                let ownerB = value._colliderB.owner;
                ownerA.event(Laya.Event.TRIGGER_EXIT, value);
                ownerB.event(Laya.Event.TRIGGER_EXIT, value);
                pxCollisionTool.reCoverCollision(value);
            });
        }
        _updatePhysicsEvents() {
            this._collision_event();
            this._trigger_Event();
            this._contactCollisionsBegin.clear();
            this._contactCollisionsPersist.clear();
            this._contactCollisionsEnd.clear();
            this._triggerCollisionsBegin.clear();
            this._triggerCollisionsEnd.clear();
        }
        _updatePhysicsTransformToRender() {
            var elements = this._dynamicUpdateList.elements;
            for (var i = 0, n = this._dynamicUpdateList.length; i < n; i++) {
                var physicCollider = elements[i];
                physicCollider.getWorldTransform();
            }
        }
        _updatePhysicsTransformFromRender() {
            var elements = this._physicsUpdateList.elements;
            for (var i = 0, n = this._physicsUpdateList.length; i < n; i++) {
                var physicCollider = elements[i];
                physicCollider.setWorldTransform(false);
                physicCollider.inPhysicUpdateListIndex = -1;
            }
            this._physicsUpdateList.length = 0;
        }
        update(elapsedTime) {
            this._updatePhysicsTransformFromRender();
            this._pxScene.simulate(1 / 60, true);
            this._pxScene.fetchResults(true);
            this._updatePhysicsTransformToRender();
            this._updatePhysicsEvents();
        }
        rayCast(ray, outHitResult, distance = 1000000, collisonGroup = 1 << 4, collisionMask = 1 << 4) {
            let result = this._pxScene.raycastCloset(ray.origin, ray.direction, distance, collisonGroup, collisionMask);
            pxCollisionTool.getRayCastResult(outHitResult, result);
            return outHitResult.succeeded;
        }
        rayCastAll(ray, out, distance = 1000000, collisonGroup = 1 << 4, collisionMask = 1 << 4) {
            let results = this._pxScene.raycastAllHits(ray.origin, ray.direction, distance, collisonGroup, collisionMask);
            pxCollisionTool.getRayCastResults(out, results);
            return (out.length >= 1 ? true : false);
        }
        shapeCast(shape, fromPosition, toPosition, out, fromRotation = new Laya.Quaternion(), toRotation = new Laya.Quaternion(), collisonGroup = 1 << 4, collisionMask = 1 << 4, allowedCcdPenetration = 0.0) {
            let transform = pxPhysicsManager._tempTransform;
            fromPosition.cloneTo(transform.translation);
            let distance = Laya.Vector3.distance(fromPosition, toPosition);
            Laya.Vector3.subtract(toPosition, fromPosition, pxPhysicsManager._tempVector30);
            Laya.Vector3.normalize(pxPhysicsManager._tempVector30, pxPhysicsManager._tempVector30);
            let dir = pxPhysicsManager._tempVector30;
            let result = this._pxScene.sweepSingle(shape._pxGeometry, transform, dir, distance, collisonGroup, collisionMask, allowedCcdPenetration);
            pxCollisionTool.getRayCastResult(out, result);
            return out.succeeded;
        }
        shapeCastAll(shape, fromPosition, toPosition, out, fromRotation = new Laya.Quaternion(), toRotation = new Laya.Quaternion(), collisonGroup = 1 << 4, collisionMask = 1 << 4, allowedCcdPenetration = 0.0) {
            let transform = pxPhysicsManager._tempTransform;
            fromPosition.cloneTo(transform.translation);
            let distance = Laya.Vector3.distance(fromPosition, toPosition);
            Laya.Vector3.subtract(toPosition, fromPosition, pxPhysicsManager._tempVector30);
            Laya.Vector3.normalize(pxPhysicsManager._tempVector30, pxPhysicsManager._tempVector30);
            let dir = pxPhysicsManager._tempVector30;
            let results = this._pxScene.sweepAny(shape._pxGeometry, transform, dir, distance, collisonGroup, collisionMask, allowedCcdPenetration);
            pxCollisionTool.getRayCastResults(out, results);
            return (out.length >= 1 ? true : false);
        }
        sphereQuery(pos, radius, result, collisionmask) {
        }
        destroy() {
        }
    }
    pxPhysicsManager._tempTransform = { translation: new Laya.Vector3(), rotation: new Laya.Quaternion() };
    pxPhysicsManager._tempVector30 = new Laya.Vector3();

    class pxPhysicsCreateUtil {
        initPhysicsCapable() {
            this._physicsEngineCapableMap = new Map();
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_Gravity, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_StaticCollider, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_DynamicCollider, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_CharacterCollider, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_BoxColliderShape, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_SphereColliderShape, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_CapsuleColliderShape, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_CylinderColliderShape, false);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_ConeColliderShape, false);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_MeshColliderShape, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.physics_heightFieldColliderShape, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_CompoundColliderShape, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_Joint, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_FixedJoint, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_SpringJoint, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_HingeJoint, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_D6Joint, true);
            this._physicsEngineCapableMap.set(Laya.EPhysicsCapable.Physics_CreateCorveMesh, true);
        }
        getPhysicsCapable(value) {
            return this._physicsEngineCapableMap.get(value);
        }
        initialize() {
            return window.PHYSX(Math.max(16, Laya.Config3D.defaultPhysicsMemory) * 16, null).then((PHYSX) => {
                this._init(PHYSX);
                console.log("PhysX loaded.");
                this.initPhysicsCapable();
                pxDynamicCollider.initCapable();
                pxStaticCollider.initCapable();
                pxCharactorCollider.initCapable();
                return Promise.resolve();
            });
        }
        _physxPVDSocketConnect(physX, pxFoundation) {
            var socket;
            var queue = [];
            const pvdTransport = physX.PxPvdTransport.implement({
                connect: function () {
                    let url = 'ws://127.0.0.1:' + pxStatics._PxPvdPort;
                    socket = new WebSocket(url, ['binary']);
                    socket.onopen = (e) => {
                        console.log('Connected to PhysX Debugger');
                        queue.forEach(data => socket.send(data));
                        queue = [];
                    };
                    socket.onclose = () => {
                    };
                    return true;
                },
                disconnect: function () {
                    console.log("Socket disconnect");
                },
                isConnected: function () {
                },
                write: function (inBytes, inLength) {
                    const data = physX.HEAPU8.slice(inBytes, inBytes + inLength);
                    if (socket.readyState === WebSocket.OPEN) {
                        if (queue.length) {
                            queue.forEach(data => socket.send(data));
                            queue.length = 0;
                        }
                        socket.send(data);
                    }
                    else {
                        queue.push(data);
                    }
                    return true;
                }
            });
            const gPvd = physX.PxCreatePvd(pxFoundation);
            physX.MyCreatepvdTransport(pvdTransport, gPvd);
            pxStatics._pvd = gPvd;
            pxStatics._PxPvdTransport = pvdTransport;
            return gPvd;
        }
        _init(physX) {
            const version = physX.PX_PHYSICS_VERSION;
            const defaultErrorCallback = new physX.PxDefaultErrorCallback();
            const allocator = new physX.PxDefaultAllocator();
            const pxFoundation = physX.PxCreateFoundation(version, allocator, defaultErrorCallback);
            pxStatics._tolerancesScale = new physX.PxTolerancesScale();
            let pxPhysics;
            if (pxStatics._physXPVD) {
                let gPvd = this._physxPVDSocketConnect(physX, pxFoundation);
                pxPhysics = physX.CreatePVDPhysics(pxFoundation, pxStatics._tolerancesScale, true, gPvd);
                physX.PxInitExtensions(pxPhysics, gPvd);
            }
            else {
                pxPhysics = physX.CreateDefaultPhysics(pxFoundation, pxStatics._tolerancesScale);
                physX.InitDefaultExtensions(pxPhysics);
            }
            pxStatics._physX = physX;
            pxStatics._foundation = pxFoundation;
            pxStatics._physics = pxPhysics;
            pxStatics._allocator = allocator;
        }
        createPhysicsManger(physicsSettings) {
            return new pxPhysicsManager(physicsSettings);
        }
        createDynamicCollider(manager) {
            return new pxDynamicCollider(manager);
        }
        createStaticCollider(manager) {
            return new pxStaticCollider(manager);
        }
        createCharacterController(manager) {
            return new pxCharactorCollider(manager);
        }
        createFixedJoint(manager) {
            return new pxFixedJoint(manager);
        }
        createHingeJoint(manager) {
            return new pxRevoluteJoint(manager);
        }
        createSpringJoint(manager) {
            return new pxDistanceJoint(manager);
        }
        createD6Joint(manager) {
            return new pxD6Joint(manager);
        }
        createBoxColliderShape() {
            return new pxBoxColliderShape();
        }
        createSphereColliderShape() {
            return new pxSphereColliderShape();
        }
        createPlaneColliderShape() {
            return null;
        }
        createCapsuleColliderShape() {
            return new pxCapsuleColliderShape();
        }
        createMeshColliderShape() {
            return new pxMeshColliderShape();
        }
        createCylinderColliderShape() {
            return null;
        }
        createConeColliderShape() {
            return null;
        }
        createHeightFieldShape() {
            return new pxHeightFieldShape();
        }
        createCompoundShape() {
            return new pxCompoundColliderShape();
        }
        createCorveMesh(mesh) {
            if (mesh._convexMesh == null) {
                return null;
            }
            if (mesh.__convexMesh == null) {
                let convexMesh = mesh._convexMesh;
                let vertices = convexMesh.getVertices();
                let vertexCount = vertices.size();
                var vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION");
                var vertexFloatStride = vertexDeclaration.vertexStride / 4;
                var vertice = new Float32Array(vertexCount * vertexFloatStride);
                for (var i = 0; i < vertexCount; i++) {
                    let index = i * 3;
                    let data = vertices.get(i);
                    vertice[index] = data.x;
                    vertice[index + 1] = data.y;
                    vertice[index + 2] = data.z;
                }
                let indexs = convexMesh.getIndexBuffer();
                let polygons = convexMesh.getPolygons();
                let triangles = [];
                for (var i = 0, n = polygons.size(); i < n;) {
                    let nbTris = polygons.get(i) - 2;
                    let mIndexBase = polygons.get(i + 1);
                    let vref0 = indexs.get(mIndexBase);
                    for (var j = 0; j < nbTris; j++) {
                        let vref1 = indexs.get(mIndexBase + j + 1);
                        let vref2 = indexs.get(mIndexBase + j + 2);
                        triangles.push(vref0, vref1, vref2);
                    }
                    i += 2;
                }
                mesh.__convexMesh = Laya.PrimitiveMesh._createMesh(vertexDeclaration, vertice, new Uint16Array(triangles));
            }
            return mesh.__convexMesh;
        }
    }
    Laya.Laya3D.PhysicsCreateUtil = new pxPhysicsCreateUtil();

    exports.pxBoxColliderShape = pxBoxColliderShape;
    exports.pxCapsuleColliderShape = pxCapsuleColliderShape;
    exports.pxCharactorCollider = pxCharactorCollider;
    exports.pxCollider = pxCollider;
    exports.pxColliderShape = pxColliderShape;
    exports.pxCollisionTool = pxCollisionTool;
    exports.pxCompoundColliderShape = pxCompoundColliderShape;
    exports.pxD6Joint = pxD6Joint;
    exports.pxDistanceJoint = pxDistanceJoint;
    exports.pxDynamicCollider = pxDynamicCollider;
    exports.pxFixedJoint = pxFixedJoint;
    exports.pxHeightFieldShape = pxHeightFieldShape;
    exports.pxJoint = pxJoint;
    exports.pxMeshColliderShape = pxMeshColliderShape;
    exports.pxPhysicsCreateUtil = pxPhysicsCreateUtil;
    exports.pxPhysicsManager = pxPhysicsManager;
    exports.pxPhysicsMaterial = pxPhysicsMaterial;
    exports.pxRevoluteJoint = pxRevoluteJoint;
    exports.pxSphereColliderShape = pxSphereColliderShape;
    exports.pxSphereJoint = pxSphereJoint;
    exports.pxStaticCollider = pxStaticCollider;
    exports.pxStatics = pxStatics;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.physX.js.map

if (window.conch && window.physx) {
	window.PHYSX = function(initialMemory, interactive) {
	var fake = {};
	fake.then = (complete) => {
		return complete(window.physx);
	};
	return fake;
	};
}
else {
var PHYSX = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(PHYSX) {
  PHYSX = PHYSX || {};


var g;g||(g=typeof PHYSX !== 'undefined' ? PHYSX : {});var aa=Object.assign,ba,ca;g.ready=new Promise(function(a,b){ba=a;ca=b});var da=aa({},g),ea=(a,b)=>{throw b;},ha="object"===typeof window,q="function"===typeof importScripts,ia="object"===typeof process&&"object"===typeof process.versions&&"string"===typeof process.versions.node,v="",ja,ka,la,fs,ma,na;
if(ia)v=q?require("path").dirname(v)+"/":__dirname+"/",na=function(){ma||(fs=require("fs"),ma=require("path"))},ja=function(a,b){na();a=ma.normalize(a);return fs.readFileSync(a,b?null:"utf8")},la=function(a){a=ja(a,!0);a.buffer||(a=new Uint8Array(a));return a},ka=function(a,b,c){na();a=ma.normalize(a);fs.readFile(a,function(d,e){d?c(d):b(e.buffer)})},1<process.argv.length&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(a){if(!(a instanceof oa))throw a;
}),process.on("unhandledRejection",function(a){throw a;}),ea=(a,b)=>{if(noExitRuntime||0<pa)throw process.exitCode=a,b;b instanceof oa||x("exiting due to exception: "+b);process.exit(a)},g.inspect=function(){return"[Emscripten Module object]"};else if(ha||q)q?v=self.location.href:"undefined"!==typeof document&&document.currentScript&&(v=document.currentScript.src),_scriptDir&&(v=_scriptDir),0!==v.indexOf("blob:")?v=v.substr(0,v.replace(/[?#].*/,"").lastIndexOf("/")+1):v="",ja=function(a){var b=new XMLHttpRequest;
b.open("GET",a,!1);b.send(null);return b.responseText},q&&(la=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),ka=function(a,b,c){var d=new XMLHttpRequest;d.open("GET",a,!0);d.responseType="arraybuffer";d.onload=function(){200==d.status||0==d.status&&d.response?b(d.response):c()};d.onerror=c;d.send(null)};var qa=g.print||console.log.bind(console),x=g.printErr||console.warn.bind(console);aa(g,da);da=null;
g.quit&&(ea=g.quit);var y;g.wasmBinary&&(y=g.wasmBinary);var noExitRuntime=g.noExitRuntime||!0;"object"!==typeof WebAssembly&&z("no native wasm support detected");var B,ra=!1,sa="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;
function ta(a,b,c){var d=b+c;for(c=b;a[c]&&!(c>=d);)++c;if(16<c-b&&a.subarray&&sa)return sa.decode(a.subarray(b,c));for(d="";b<c;){var e=a[b++];if(e&128){var f=a[b++]&63;if(192==(e&224))d+=String.fromCharCode((e&31)<<6|f);else{var k=a[b++]&63;e=224==(e&240)?(e&15)<<12|f<<6|k:(e&7)<<18|f<<12|k<<6|a[b++]&63;65536>e?d+=String.fromCharCode(e):(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023))}}else d+=String.fromCharCode(e)}return d}
function ua(a,b,c){var d=C;if(0<c){c=b+c-1;for(var e=0;e<a.length;++e){var f=a.charCodeAt(e);if(55296<=f&&57343>=f){var k=a.charCodeAt(++e);f=65536+((f&1023)<<10)|k&1023}if(127>=f){if(b>=c)break;d[b++]=f}else{if(2047>=f){if(b+1>=c)break;d[b++]=192|f>>6}else{if(65535>=f){if(b+2>=c)break;d[b++]=224|f>>12}else{if(b+3>=c)break;d[b++]=240|f>>18;d[b++]=128|f>>12&63}d[b++]=128|f>>6&63}d[b++]=128|f&63}}d[b]=0}}var va="undefined"!==typeof TextDecoder?new TextDecoder("utf-16le"):void 0;
function wa(a,b){var c=a>>1;for(var d=c+b/2;!(c>=d)&&xa[c];)++c;c<<=1;if(32<c-a&&va)return va.decode(C.subarray(a,c));c="";for(d=0;!(d>=b/2);++d){var e=D[a+2*d>>1];if(0==e)break;c+=String.fromCharCode(e)}return c}function ya(a,b,c){void 0===c&&(c=2147483647);if(2>c)return 0;c-=2;var d=b;c=c<2*a.length?c/2:a.length;for(var e=0;e<c;++e)D[b>>1]=a.charCodeAt(e),b+=2;D[b>>1]=0;return b-d}function za(a){return 2*a.length}
function Aa(a,b){for(var c=0,d="";!(c>=b/4);){var e=E[a+4*c>>2];if(0==e)break;++c;65536<=e?(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023)):d+=String.fromCharCode(e)}return d}function Ba(a,b,c){void 0===c&&(c=2147483647);if(4>c)return 0;var d=b;c=d+c-4;for(var e=0;e<a.length;++e){var f=a.charCodeAt(e);if(55296<=f&&57343>=f){var k=a.charCodeAt(++e);f=65536+((f&1023)<<10)|k&1023}E[b>>2]=f;b+=4;if(b+4>c)break}E[b>>2]=0;return b-d}
function Ca(a){for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&++c;b+=4}return b}var G,Da,C,D,xa,E,H,Ea,Fa;function Ga(a){G=a;g.HEAP8=Da=new Int8Array(a);g.HEAP16=D=new Int16Array(a);g.HEAP32=E=new Int32Array(a);g.HEAPU8=C=new Uint8Array(a);g.HEAPU16=xa=new Uint16Array(a);g.HEAPU32=H=new Uint32Array(a);g.HEAPF32=Ea=new Float32Array(a);g.HEAPF64=Fa=new Float64Array(a)}var Ha=g.INITIAL_MEMORY||16777216;
g.wasmMemory?B=g.wasmMemory:B=new WebAssembly.Memory({initial:Ha/65536,maximum:32768});B&&(G=B.buffer);Ha=G.byteLength;Ga(G);var Ia,Ja=[],Ka=[],La=[],pa=0;function Ma(){var a=g.preRun.shift();Ja.unshift(a)}var I=0,Na=null,Oa=null;g.preloadedImages={};g.preloadedAudios={};function z(a){if(g.onAbort)g.onAbort(a);a="Aborted("+a+")";x(a);ra=!0;a=new WebAssembly.RuntimeError(a+". Build with -s ASSERTIONS=1 for more info.");ca(a);throw a;}
function Pa(){return J.startsWith("data:application/octet-stream;base64,")}var J;J="physx.release.wasm";if(!Pa()){var Qa=J;J=g.locateFile?g.locateFile(Qa,v):v+Qa}function Ra(){var a=J;try{if(a==J&&y)return new Uint8Array(y);if(la)return la(a);throw"both async and sync fetching of the wasm failed";}catch(b){z(b)}}
function Sa(){if(!y&&(ha||q)){if("function"===typeof fetch&&!J.startsWith("file://"))return fetch(J,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+J+"'";return a.arrayBuffer()}).catch(function(){return Ra()});if(ka)return new Promise(function(a,b){ka(J,function(c){a(new Uint8Array(c))},b)})}return Promise.resolve().then(function(){return Ra()})}
function Ta(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b(g);else{var c=b.Ma;"number"===typeof c?void 0===b.ma?Ua(c)():Ua(c)(b.ma):c(void 0===b.ma?null:b.ma)}}}var Va=[];function Ua(a){var b=Va[a];b||(a>=Va.length&&(Va.length=a+1),Va[a]=b=Ia.get(a));return b}function Wa(a){if(void 0===a)return"_unknown";a=a.replace(/[^a-zA-Z0-9_]/g,"$");var b=a.charCodeAt(0);return 48<=b&&57>=b?"_"+a:a}function Xa(a,b){a=Wa(a);return function(){null;return b.apply(this,arguments)}}
var K=[{},{value:void 0},{value:null},{value:!0},{value:!1}],Ya=[];function Za(a){var b=Error,c=Xa(a,function(d){this.name=a;this.message=d;d=Error(d).stack;void 0!==d&&(this.stack=this.toString()+"\n"+d.replace(/^Error(:[^\n]*)?\n/,""))});c.prototype=Object.create(b.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message};return c}var M=void 0;function N(a){throw new M(a);}
function $a(a){a||N("Cannot use deleted val. handle = "+a);return K[a].value}function ab(a){switch(a){case void 0:return 1;case null:return 2;case !0:return 3;case !1:return 4;default:var b=Ya.length?Ya.pop():K.length;K[b]={pa:1,value:a};return b}}var bb=void 0,cb=void 0;function O(a){for(var b="";C[a];)b+=cb[C[a++]];return b}var db=[];function eb(){for(;db.length;){var a=db.pop();a.U.ha=!1;a["delete"]()}}var fb=void 0,P={};
function gb(a,b){for(void 0===b&&N("ptr should not be undefined");a.Z;)b=a.ja(b),a=a.Z;return b}var Q={};function hb(a){a=ib(a);var b=O(a);R(a);return b}function jb(a,b){var c=Q[a];void 0===c&&N(b+" has unknown type "+hb(a));return c}function kb(){}var lb=!1;function mb(a){--a.count.value;0===a.count.value&&(a.$?a.ba.ea(a.$):a.X.V.ea(a.W))}
function S(a){if("undefined"===typeof FinalizationGroup)return S=function(b){return b},a;lb=new FinalizationGroup(function(b){for(var c=b.next();!c.done;c=b.next())c=c.value,c.W?mb(c):console.warn("object already deleted: "+c.W)});S=function(b){lb.register(b,b.U,b.U);return b};kb=function(b){lb.unregister(b.U)};return S(a)}var nb={};function ob(a){for(;a.length;){var b=a.pop();a.pop()(b)}}function pb(a){return this.fromWireType(H[a>>2])}var T={},qb={},rb=void 0;function sb(a){throw new rb(a);}
function U(a,b,c){function d(h){h=c(h);h.length!==a.length&&sb("Mismatched type converter count");for(var m=0;m<a.length;++m)V(a[m],h[m])}a.forEach(function(h){qb[h]=b});var e=Array(b.length),f=[],k=0;b.forEach(function(h,m){Q.hasOwnProperty(h)?e[m]=Q[h]:(f.push(h),T.hasOwnProperty(h)||(T[h]=[]),T[h].push(function(){e[m]=Q[h];++k;k===f.length&&d(e)}))});0===f.length&&d(e)}
function tb(a){switch(a){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+a);}}
function V(a,b,c){c=c||{};if(!("argPackAdvance"in b))throw new TypeError("registerType registeredInstance requires argPackAdvance");var d=b.name;a||N('type "'+d+'" must have a positive integer typeid pointer');if(Q.hasOwnProperty(a)){if(c.Da)return;N("Cannot register type '"+d+"' twice")}Q[a]=b;delete qb[a];T.hasOwnProperty(a)&&(b=T[a],delete T[a],b.forEach(function(e){e()}))}function ub(a){N(a.U.X.V.name+" instance already deleted")}function W(){}var vb={};
function wb(a,b,c){if(void 0===a[b].Y){var d=a[b];a[b]=function(){a[b].Y.hasOwnProperty(arguments.length)||N("Function '"+c+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+a[b].Y+")!");return a[b].Y[arguments.length].apply(this,arguments)};a[b].Y=[];a[b].Y[d.ga]=d}}
function xb(a,b,c){g.hasOwnProperty(a)?((void 0===c||void 0!==g[a].Y&&void 0!==g[a].Y[c])&&N("Cannot register public name '"+a+"' twice"),wb(g,a,a),g.hasOwnProperty(c)&&N("Cannot register multiple overloads of a function with the same number of arguments ("+c+")!"),g[a].Y[c]=b):(g[a]=b,void 0!==c&&(g[a].Na=c))}function yb(a,b,c,d,e,f,k,h){this.name=a;this.constructor=b;this.da=c;this.ea=d;this.Z=e;this.ya=f;this.ja=k;this.wa=h;this.sa=[]}
function zb(a,b,c){for(;b!==c;)b.ja||N("Expected null or instance of "+c.name+", got an instance of "+b.name),a=b.ja(a),b=b.Z;return a}function Ab(a,b){if(null===b)return this.na&&N("null is not a valid "+this.name),0;b.U||N('Cannot pass "'+Bb(b)+'" as a '+this.name);b.U.W||N("Cannot pass deleted object as a pointer of type "+this.name);return zb(b.U.W,b.U.X.V,this.V)}
function Cb(a,b){if(null===b){this.na&&N("null is not a valid "+this.name);if(this.la){var c=this.oa();null!==a&&a.push(this.ea,c);return c}return 0}b.U||N('Cannot pass "'+Bb(b)+'" as a '+this.name);b.U.W||N("Cannot pass deleted object as a pointer of type "+this.name);!this.ka&&b.U.X.ka&&N("Cannot convert argument of type "+(b.U.ba?b.U.ba.name:b.U.X.name)+" to parameter type "+this.name);c=zb(b.U.W,b.U.X.V,this.V);if(this.la)switch(void 0===b.U.$&&N("Passing raw pointer to smart pointer is illegal"),
this.Ka){case 0:b.U.ba===this?c=b.U.$:N("Cannot convert argument of type "+(b.U.ba?b.U.ba.name:b.U.X.name)+" to parameter type "+this.name);break;case 1:c=b.U.$;break;case 2:if(b.U.ba===this)c=b.U.$;else{var d=b.clone();c=this.Ga(c,ab(function(){d["delete"]()}));null!==a&&a.push(this.ea,c)}break;default:N("Unsupporting sharing policy")}return c}
function Db(a,b){if(null===b)return this.na&&N("null is not a valid "+this.name),0;b.U||N('Cannot pass "'+Bb(b)+'" as a '+this.name);b.U.W||N("Cannot pass deleted object as a pointer of type "+this.name);b.U.X.ka&&N("Cannot convert argument of type "+b.U.X.name+" to parameter type "+this.name);return zb(b.U.W,b.U.X.V,this.V)}function Eb(a,b,c){if(b===c)return a;if(void 0===c.Z)return null;a=Eb(a,b,c.Z);return null===a?null:c.wa(a)}function Fb(a,b){b=gb(a,b);return P[b]}
function Hb(a,b){b.X&&b.W||sb("makeClassHandle requires ptr and ptrType");!!b.ba!==!!b.$&&sb("Both smartPtrType and smartPtr must be specified");b.count={value:1};return S(Object.create(a,{U:{value:b}}))}function X(a,b,c,d){this.name=a;this.V=b;this.na=c;this.ka=d;this.la=!1;this.ea=this.Ga=this.oa=this.ta=this.Ka=this.Fa=void 0;void 0!==b.Z?this.toWireType=Cb:(this.toWireType=d?Ab:Db,this.aa=null)}
function Ib(a,b,c){g.hasOwnProperty(a)||sb("Replacing nonexistant public symbol");void 0!==g[a].Y&&void 0!==c?g[a].Y[c]=b:(g[a]=b,g[a].ga=c)}function Jb(a,b){var c=[];return function(){c.length=arguments.length;for(var d=0;d<arguments.length;d++)c[d]=arguments[d];a.includes("j")?(d=g["dynCall_"+a],d=c&&c.length?d.apply(null,[b].concat(c)):d.call(null,b)):d=Ua(b).apply(null,c);return d}}
function Y(a,b){a=O(a);var c=a.includes("j")?Jb(a,b):Ua(b);"function"!==typeof c&&N("unknown function pointer with signature "+a+": "+b);return c}var Kb=void 0;function Z(a,b){function c(f){e[f]||Q[f]||(qb[f]?qb[f].forEach(c):(d.push(f),e[f]=!0))}var d=[],e={};b.forEach(c);throw new Kb(a+": "+d.map(hb).join([", "]));}
function Lb(a,b,c,d,e){var f=b.length;2>f&&N("argTypes array size mismatch! Must at least get return value and 'this' types!");var k=null!==b[1]&&null!==c,h=!1;for(c=1;c<b.length;++c)if(null!==b[c]&&void 0===b[c].aa){h=!0;break}var m="void"!==b[0].name,l=f-2,n=Array(l),p=[],r=[];return function(){arguments.length!==l&&N("function "+a+" called with "+arguments.length+" arguments, expected "+l+" args!");r.length=0;p.length=k?2:1;p[0]=e;if(k){var u=b[1].toWireType(r,this);p[1]=u}for(var t=0;t<l;++t)n[t]=
b[t+2].toWireType(r,arguments[t]),p.push(n[t]);t=d.apply(null,p);if(h)ob(r);else for(var w=k?1:2;w<b.length;w++){var A=1===w?u:n[w-2];null!==b[w].aa&&b[w].aa(A)}u=m?b[0].fromWireType(t):void 0;return u}}function Mb(a,b){for(var c=[],d=0;d<a;d++)c.push(E[(b>>2)+d]);return c}
function Nb(a,b,c){a instanceof Object||N(c+' with invalid "this": '+a);a instanceof b.V.constructor||N(c+' incompatible with "this" of type '+a.constructor.name);a.U.W||N("cannot call emscripten binding method "+c+" on deleted object");return zb(a.U.W,a.U.X.V,b.V)}function Ob(a){4<a&&0===--K[a].pa&&(K[a]=void 0,Ya.push(a))}
function Pb(a,b,c){switch(b){case 0:return function(d){return this.fromWireType((c?Da:C)[d])};case 1:return function(d){return this.fromWireType((c?D:xa)[d>>1])};case 2:return function(d){return this.fromWireType((c?E:H)[d>>2])};default:throw new TypeError("Unknown integer type: "+a);}}function Bb(a){if(null===a)return"null";var b=typeof a;return"object"===b||"array"===b||"function"===b?a.toString():""+a}
function Qb(a,b){switch(b){case 2:return function(c){return this.fromWireType(Ea[c>>2])};case 3:return function(c){return this.fromWireType(Fa[c>>3])};default:throw new TypeError("Unknown float type: "+a);}}
function Rb(a,b,c){switch(b){case 0:return c?function(d){return Da[d]}:function(d){return C[d]};case 1:return c?function(d){return D[d>>1]}:function(d){return xa[d>>1]};case 2:return c?function(d){return E[d>>2]}:function(d){return H[d>>2]};default:throw new TypeError("Unknown integer type: "+a);}}var Sb={},Tb=[];function Ub(a){var b=Tb.length;Tb.push(a);return b}function Vb(a,b){for(var c=Array(a),d=0;d<a;++d)c[d]=jb(E[(b>>2)+d],"parameter "+d);return c}var Wb=[],Xb;
Xb=ia?()=>{var a=process.hrtime();return 1E3*a[0]+a[1]/1E6}:()=>performance.now();var Yb=[null,[],[]];M=g.BindingError=Za("BindingError");g.count_emval_handles=function(){for(var a=0,b=5;b<K.length;++b)void 0!==K[b]&&++a;return a};g.get_first_emval=function(){for(var a=5;a<K.length;++a)if(void 0!==K[a])return K[a];return null};bb=g.PureVirtualError=Za("PureVirtualError");for(var Zb=Array(256),$b=0;256>$b;++$b)Zb[$b]=String.fromCharCode($b);cb=Zb;g.getInheritedInstanceCount=function(){return Object.keys(P).length};
g.getLiveInheritedInstances=function(){var a=[],b;for(b in P)P.hasOwnProperty(b)&&a.push(P[b]);return a};g.flushPendingDeletes=eb;g.setDelayFunction=function(a){fb=a;db.length&&fb&&fb(eb)};rb=g.InternalError=Za("InternalError");W.prototype.isAliasOf=function(a){if(!(this instanceof W&&a instanceof W))return!1;var b=this.U.X.V,c=this.U.W,d=a.U.X.V;for(a=a.U.W;b.Z;)c=b.ja(c),b=b.Z;for(;d.Z;)a=d.ja(a),d=d.Z;return b===d&&c===a};
W.prototype.clone=function(){this.U.W||ub(this);if(this.U.ia)return this.U.count.value+=1,this;var a=S,b=Object,c=b.create,d=Object.getPrototypeOf(this),e=this.U;a=a(c.call(b,d,{U:{value:{count:e.count,ha:e.ha,ia:e.ia,W:e.W,X:e.X,$:e.$,ba:e.ba}}}));a.U.count.value+=1;a.U.ha=!1;return a};W.prototype["delete"]=function(){this.U.W||ub(this);this.U.ha&&!this.U.ia&&N("Object already scheduled for deletion");kb(this);mb(this.U);this.U.ia||(this.U.$=void 0,this.U.W=void 0)};W.prototype.isDeleted=function(){return!this.U.W};
W.prototype.deleteLater=function(){this.U.W||ub(this);this.U.ha&&!this.U.ia&&N("Object already scheduled for deletion");db.push(this);1===db.length&&fb&&fb(eb);this.U.ha=!0;return this};X.prototype.za=function(a){this.ta&&(a=this.ta(a));return a};X.prototype.qa=function(a){this.ea&&this.ea(a)};X.prototype.argPackAdvance=8;X.prototype.readValueFromPointer=pb;X.prototype.deleteObject=function(a){if(null!==a)a["delete"]()};
X.prototype.fromWireType=function(a){function b(){return this.la?Hb(this.V.da,{X:this.Fa,W:c,ba:this,$:a}):Hb(this.V.da,{X:this,W:a})}var c=this.za(a);if(!c)return this.qa(a),null;var d=Fb(this.V,c);if(void 0!==d){if(0===d.U.count.value)return d.U.W=c,d.U.$=a,d.clone();d=d.clone();this.qa(a);return d}d=this.V.ya(c);d=vb[d];if(!d)return b.call(this);d=this.ka?d.ua:d.pointerType;var e=Eb(c,this.V,d.V);return null===e?b.call(this):this.la?Hb(d.V.da,{X:d,W:e,ba:this,$:a}):Hb(d.V.da,{X:d,W:e})};
Kb=g.UnboundTypeError=Za("UnboundTypeError");
var bc={I:function(a,b,c){a=O(a);b=jb(b,"wrapper");c=$a(c);var d=[].slice,e=b.V,f=e.da,k=e.Z.da,h=e.Z.constructor;a=Xa(a,function(){e.Z.sa.forEach(function(l){if(this[l]===k[l])throw new bb("Pure virtual function "+l+" must be implemented in JavaScript");}.bind(this));Object.defineProperty(this,"__parent",{value:f});this.__construct.apply(this,d.call(arguments))});f.__construct=function(){this===f&&N("Pass correct 'this' to __construct");var l=h.implement.apply(void 0,[this].concat(d.call(arguments)));
kb(l);var n=l.U;l.notifyOnDestruction();n.ia=!0;Object.defineProperties(this,{U:{value:n}});S(this);l=n.W;l=gb(e,l);P.hasOwnProperty(l)?N("Tried to register registered instance: "+l):P[l]=this};f.__destruct=function(){this===f&&N("Pass correct 'this' to __destruct");kb(this);var l=this.U.W;l=gb(e,l);P.hasOwnProperty(l)?delete P[l]:N("Tried to unregister unregistered instance: "+l)};a.prototype=Object.create(f);for(var m in c)a.prototype[m]=c[m];return ab(a)},m:function(a){var b=nb[a];delete nb[a];
var c=b.oa,d=b.ea,e=b.ra,f=e.map(function(k){return k.Ca}).concat(e.map(function(k){return k.Ia}));U([a],f,function(k){var h={};e.forEach(function(m,l){var n=k[l],p=m.Aa,r=m.Ba,u=k[l+e.length],t=m.Ha,w=m.Ja;h[m.xa]={read:function(A){return n.fromWireType(p(r,A))},write:function(A,L){var F=[];t(w,A,u.toWireType(F,L));ob(F)}}});return[{name:b.name,fromWireType:function(m){var l={},n;for(n in h)l[n]=h[n].read(m);d(m);return l},toWireType:function(m,l){for(var n in h)if(!(n in l))throw new TypeError('Missing field:  "'+
n+'"');var p=c();for(n in h)h[n].write(p,l[n]);null!==m&&m.push(d,p);return p},argPackAdvance:8,readValueFromPointer:pb,aa:d}]})},A:function(){},F:function(a,b,c,d,e){var f=tb(c);b=O(b);V(a,{name:b,fromWireType:function(k){return!!k},toWireType:function(k,h){return h?d:e},argPackAdvance:8,readValueFromPointer:function(k){if(1===c)var h=Da;else if(2===c)h=D;else if(4===c)h=E;else throw new TypeError("Unknown boolean type size: "+b);return this.fromWireType(h[k>>f])},aa:null})},c:function(a,b,c,d,e,
f,k,h,m,l,n,p,r){n=O(n);f=Y(e,f);h&&(h=Y(k,h));l&&(l=Y(m,l));r=Y(p,r);var u=Wa(n);xb(u,function(){Z("Cannot construct "+n+" due to unbound types",[d])});U([a,b,c],d?[d]:[],function(t){t=t[0];if(d){var w=t.V;var A=w.da}else A=W.prototype;t=Xa(u,function(){if(Object.getPrototypeOf(this)!==L)throw new M("Use 'new' to construct "+n);if(void 0===F.fa)throw new M(n+" has no accessible constructor");var Gb=F.fa[arguments.length];if(void 0===Gb)throw new M("Tried to invoke ctor of "+n+" with invalid number of parameters ("+
arguments.length+") - expected ("+Object.keys(F.fa).toString()+") parameters instead!");return Gb.apply(this,arguments)});var L=Object.create(A,{constructor:{value:t}});t.prototype=L;var F=new yb(n,t,L,r,w,f,h,l);w=new X(n,F,!0,!1);A=new X(n+"*",F,!1,!1);var fa=new X(n+" const*",F,!1,!0);vb[a]={pointerType:A,ua:fa};Ib(u,t);return[w,A,fa]})},z:function(a,b,c,d,e,f,k){var h=Mb(c,d);b=O(b);f=Y(e,f);U([],[a],function(m){function l(){Z("Cannot call "+n+" due to unbound types",h)}m=m[0];var n=m.name+"."+
b;b.startsWith("@@")&&(b=Symbol[b.substring(2)]);var p=m.V.constructor;void 0===p[b]?(l.ga=c-1,p[b]=l):(wb(p,b,n),p[b].Y[c-1]=l);U([],h,function(r){r=[r[0],null].concat(r.slice(1));r=Lb(n,r,null,f,k);void 0===p[b].Y?(r.ga=c-1,p[b]=r):p[b].Y[c-1]=r;return[]});return[]})},f:function(a,b,c,d,e,f){0<b||z(void 0);var k=Mb(b,c);e=Y(d,e);U([],[a],function(h){h=h[0];var m="constructor "+h.name;void 0===h.V.fa&&(h.V.fa=[]);if(void 0!==h.V.fa[b-1])throw new M("Cannot register multiple constructors with identical number of parameters ("+
(b-1)+") for class '"+h.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");h.V.fa[b-1]=function(){Z("Cannot construct "+h.name+" due to unbound types",k)};U([],k,function(l){l.splice(1,0,null);h.V.fa[b-1]=Lb(m,l,null,e,f);return[]});return[]})},b:function(a,b,c,d,e,f,k,h){var m=Mb(c,d);b=O(b);f=Y(e,f);U([],[a],function(l){function n(){Z("Cannot call "+p+" due to unbound types",m)}l=l[0];var p=l.name+"."+b;b.startsWith("@@")&&(b=Symbol[b.substring(2)]);
h&&l.V.sa.push(b);var r=l.V.da,u=r[b];void 0===u||void 0===u.Y&&u.className!==l.name&&u.ga===c-2?(n.ga=c-2,n.className=l.name,r[b]=n):(wb(r,b,p),r[b].Y[c-2]=n);U([],m,function(t){t=Lb(p,t,l,f,k);void 0===r[b].Y?(t.ga=c-2,r[b]=t):r[b].Y[c-2]=t;return[]});return[]})},d:function(a,b,c,d,e,f,k,h,m,l){b=O(b);e=Y(d,e);U([],[a],function(n){n=n[0];var p=n.name+"."+b,r={get:function(){Z("Cannot access "+p+" due to unbound types",[c,k])},enumerable:!0,configurable:!0};r.set=m?function(){Z("Cannot access "+
p+" due to unbound types",[c,k])}:function(){N(p+" is a read-only property")};Object.defineProperty(n.V.da,b,r);U([],m?[c,k]:[c],function(u){var t=u[0],w={get:function(){var L=Nb(this,n,p+" getter");return t.fromWireType(e(f,L))},enumerable:!0};if(m){m=Y(h,m);var A=u[1];w.set=function(L){var F=Nb(this,n,p+" setter"),fa=[];m(l,F,A.toWireType(fa,L));ob(fa)}}Object.defineProperty(n.V.da,b,w);return[]});return[]})},J:function(a,b,c){a=O(a);U([],[b],function(d){d=d[0];g[a]=d.fromWireType(c);return[]})},
E:function(a,b){b=O(b);V(a,{name:b,fromWireType:function(c){var d=$a(c);Ob(c);return d},toWireType:function(c,d){return ab(d)},argPackAdvance:8,readValueFromPointer:pb,aa:null})},i:function(a,b,c,d){function e(){}c=tb(c);b=O(b);e.values={};V(a,{name:b,constructor:e,fromWireType:function(f){return this.constructor.values[f]},toWireType:function(f,k){return k.value},argPackAdvance:8,readValueFromPointer:Pb(b,c,d),aa:null});xb(b,e)},e:function(a,b,c){var d=jb(a,"enum");b=O(b);a=d.constructor;d=Object.create(d.constructor.prototype,
{value:{value:c},constructor:{value:Xa(d.name+"_"+b,function(){})}});a.values[c]=d;a[b]=d},x:function(a,b,c){c=tb(c);b=O(b);V(a,{name:b,fromWireType:function(d){return d},toWireType:function(d,e){return e},argPackAdvance:8,readValueFromPointer:Qb(b,c),aa:null})},k:function(a,b,c,d,e,f){var k=Mb(b,c);a=O(a);e=Y(d,e);xb(a,function(){Z("Cannot call "+a+" due to unbound types",k)},b-1);U([],k,function(h){h=[h[0],null].concat(h.slice(1));Ib(a,Lb(a,h,null,e,f),b-1);return[]})},o:function(a,b,c,d,e){function f(h){return h}
b=O(b);-1===e&&(e=4294967295);e=tb(c);if(0===d){var k=32-8*c;f=function(h){return h<<k>>>k}}c=b.includes("unsigned")?function(h,m){return m>>>0}:function(h,m){return m};V(a,{name:b,fromWireType:f,toWireType:c,argPackAdvance:8,readValueFromPointer:Rb(b,e,0!==d),aa:null})},j:function(a,b,c){function d(f){f>>=2;var k=H;return new e(G,k[f+1],k[f])}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];c=O(c);V(a,{name:c,fromWireType:d,argPackAdvance:8,
readValueFromPointer:d},{Da:!0})},w:function(a,b){b=O(b);var c="std::string"===b;V(a,{name:b,fromWireType:function(d){var e=H[d>>2];if(c)for(var f=d+4,k=0;k<=e;++k){var h=d+4+k;if(k==e||0==C[h]){f=f?ta(C,f,h-f):"";if(void 0===m)var m=f;else m+=String.fromCharCode(0),m+=f;f=h+1}}else{m=Array(e);for(k=0;k<e;++k)m[k]=String.fromCharCode(C[d+4+k]);m=m.join("")}R(d);return m},toWireType:function(d,e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));var f="string"===typeof e;f||e instanceof Uint8Array||
e instanceof Uint8ClampedArray||e instanceof Int8Array||N("Cannot pass non-string to std::string");var k=(c&&f?function(){for(var l=0,n=0;n<e.length;++n){var p=e.charCodeAt(n);55296<=p&&57343>=p&&(p=65536+((p&1023)<<10)|e.charCodeAt(++n)&1023);127>=p?++l:l=2047>=p?l+2:65535>=p?l+3:l+4}return l}:function(){return e.length})(),h=ac(4+k+1);H[h>>2]=k;if(c&&f)ua(e,h+4,k+1);else if(f)for(f=0;f<k;++f){var m=e.charCodeAt(f);255<m&&(R(h),N("String has UTF-16 code units that do not fit in 8 bits"));C[h+4+f]=
m}else for(f=0;f<k;++f)C[h+4+f]=e[f];null!==d&&d.push(R,h);return h},argPackAdvance:8,readValueFromPointer:pb,aa:function(d){R(d)}})},s:function(a,b,c){c=O(c);if(2===b){var d=wa;var e=ya;var f=za;var k=function(){return xa};var h=1}else 4===b&&(d=Aa,e=Ba,f=Ca,k=function(){return H},h=2);V(a,{name:c,fromWireType:function(m){for(var l=H[m>>2],n=k(),p,r=m+4,u=0;u<=l;++u){var t=m+4+u*b;if(u==l||0==n[t>>h])r=d(r,t-r),void 0===p?p=r:(p+=String.fromCharCode(0),p+=r),r=t+b}R(m);return p},toWireType:function(m,
l){"string"!==typeof l&&N("Cannot pass non-string to C++ string type "+c);var n=f(l),p=ac(4+n+b);H[p>>2]=n>>h;e(l,p+4,n+b);null!==m&&m.push(R,p);return p},argPackAdvance:8,readValueFromPointer:pb,aa:function(m){R(m)}})},n:function(a,b,c,d,e,f){nb[a]={name:O(b),oa:Y(c,d),ea:Y(e,f),ra:[]}},g:function(a,b,c,d,e,f,k,h,m,l){nb[a].ra.push({xa:O(b),Ca:c,Aa:Y(d,e),Ba:f,Ia:k,Ha:Y(h,m),Ja:l})},G:function(a,b){b=O(b);V(a,{Ea:!0,name:b,argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},q:function(a,
b,c,d){a=Tb[a];b=$a(b);var e=Sb[c];c=void 0===e?O(c):e;a(b,c,null,d)},p:Ob,r:function(a,b){var c=Vb(a,b),d=c[0];b=d.name+"_$"+c.slice(1).map(function(k){return k.name}).join("_")+"$";var e=Wb[b];if(void 0!==e)return e;var f=Array(a-1);e=Ub(function(k,h,m,l){for(var n=0,p=0;p<a-1;++p)f[p]=c[p+1].Oa(l+n),n+=c[p+1].La;k=k[h].apply(k,f);for(p=0;p<a-1;++p)c[p+1].va&&c[p+1].va(f[p]);if(!d.Ea)return d.toWireType(m,k)});return Wb[b]=e},y:function(a){4<a&&(K[a].pa+=1)},l:function(a,b){a=jb(a,"_emval_take_value");
a=a.readValueFromPointer(b);return ab(a)},h:function(){z("")},u:Xb,B:function(a,b,c){C.copyWithin(a,b,b+c)},C:function(a){var b=C.length;a>>>=0;if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);d=Math.max(a,d);0<d%65536&&(d+=65536-d%65536);a:{try{B.grow(Math.min(2147483648,d)-G.byteLength+65535>>>16);Ga(B.buffer);var e=1;break a}catch(f){}e=void 0}if(e)return!0}return!1},D:function(a){if(!(noExitRuntime||0<pa)){if(g.onExit)g.onExit(a);ra=!0}ea(a,new oa(a))},
v:function(a,b,c,d){for(var e=0,f=0;f<c;f++){var k=E[b>>2],h=E[b+4>>2];b+=8;for(var m=0;m<h;m++){var l=C[k+m],n=Yb[a];0===l||10===l?((1===a?qa:x)(ta(n,0)),n.length=0):n.push(l)}e+=h}E[d>>2]=e;return 0},H:function(a){var b=Date.now();E[a>>2]=b/1E3|0;E[a+4>>2]=b%1E3*1E3|0;return 0},a:B,t:function(){}};
(function(){function a(e){g.asm=e.exports;Ia=g.asm.N;Ka.unshift(g.asm.K);I--;g.monitorRunDependencies&&g.monitorRunDependencies(I);0==I&&(null!==Na&&(clearInterval(Na),Na=null),Oa&&(e=Oa,Oa=null,e()))}function b(e){a(e.instance)}function c(e){return Sa().then(function(f){return WebAssembly.instantiate(f,d)}).then(function(f){return f}).then(e,function(f){x("failed to asynchronously prepare wasm: "+f);z(f)})}var d={a:bc};I++;g.monitorRunDependencies&&g.monitorRunDependencies(I);if(g.instantiateWasm)try{return g.instantiateWasm(d,
a)}catch(e){return x("Module.instantiateWasm callback failed with error: "+e),!1}(function(){return y||"function"!==typeof WebAssembly.instantiateStreaming||Pa()||J.startsWith("file://")||"function"!==typeof fetch?c(b):fetch(J,{credentials:"same-origin"}).then(function(e){return WebAssembly.instantiateStreaming(e,d).then(b,function(f){x("wasm streaming compile failed: "+f);x("falling back to ArrayBuffer instantiation");return c(b)})})})().catch(ca);return{}})();
g.___wasm_call_ctors=function(){return(g.___wasm_call_ctors=g.asm.K).apply(null,arguments)};var ac=g._malloc=function(){return(ac=g._malloc=g.asm.L).apply(null,arguments)},R=g._free=function(){return(R=g._free=g.asm.M).apply(null,arguments)},ib=g.___getTypeName=function(){return(ib=g.___getTypeName=g.asm.O).apply(null,arguments)};g.___embind_register_native_and_builtin_types=function(){return(g.___embind_register_native_and_builtin_types=g.asm.P).apply(null,arguments)};
g.dynCall_iijii=function(){return(g.dynCall_iijii=g.asm.Q).apply(null,arguments)};g.dynCall_ji=function(){return(g.dynCall_ji=g.asm.R).apply(null,arguments)};g.dynCall_vifijiif=function(){return(g.dynCall_vifijiif=g.asm.S).apply(null,arguments)};g.dynCall_jiji=function(){return(g.dynCall_jiji=g.asm.T).apply(null,arguments)};var cc;function oa(a){this.name="ExitStatus";this.message="Program terminated with exit("+a+")";this.status=a}Oa=function dc(){cc||ec();cc||(Oa=dc)};
function ec(){function a(){if(!cc&&(cc=!0,g.calledRun=!0,!ra)){Ta(Ka);ba(g);if(g.onRuntimeInitialized)g.onRuntimeInitialized();if(g.postRun)for("function"==typeof g.postRun&&(g.postRun=[g.postRun]);g.postRun.length;){var b=g.postRun.shift();La.unshift(b)}Ta(La)}}if(!(0<I)){if(g.preRun)for("function"==typeof g.preRun&&(g.preRun=[g.preRun]);g.preRun.length;)Ma();Ta(Ja);0<I||(g.setStatus?(g.setStatus("Running..."),setTimeout(function(){setTimeout(function(){g.setStatus("")},1);a()},1)):a())}}g.run=ec;
if(g.preInit)for("function"==typeof g.preInit&&(g.preInit=[g.preInit]);0<g.preInit.length;)g.preInit.pop()();ec();


  return PHYSX.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = PHYSX;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return PHYSX; });
else if (typeof exports === 'object')
  exports["PHYSX"] = PHYSX;


var _PHYSX_Module = PHYSX;
var _initialMemory = 0;

// 包装模块：在调用原始模块前，检查并添加 INITIAL_MEMORY 到 moduleArg
var _wrappedModule = function(moduleArg) {
    if (_initialMemory) {
        moduleArg["INITIAL_MEMORY"] = _initialMemory * 65536;
    }
    return _PHYSX_Module(moduleArg);
};

// 使用 WasmAdapter.create 创建加载器（在文件加载时执行，正确捕获 webDir）
var _PHYSX_Loader = Laya.WasmAdapter.create(_wrappedModule);

window.PHYSX = function(initialMemory, interactive) {
    _initialMemory = initialMemory || 0;
    return _PHYSX_Loader();
};
}