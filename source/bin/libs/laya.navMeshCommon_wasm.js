(function (exports, Laya) {
    'use strict';

    class AreaMask {
        get excludeflag() {
            return this._excludeflag;
        }
        get flag() {
            return this._flags;
        }
        set flag(value) {
            this._flags = value;
            this._calculFlagVale();
        }
        constructor() {
            this._flags = 7;
        }
        _setAreaMap(areaFlagMap) {
            this._areaFlagMap = areaFlagMap;
            this._calculFlagVale();
        }
        _calculFlagVale() {
            if (!this._areaFlagMap)
                return;
            let flag = 0;
            let excludeflag = 0;
            this._areaFlagMap.forEach((value, key) => {
                if (this._flags & value.flag) {
                    flag = flag | value.flag;
                }
                else {
                    excludeflag = excludeflag | value.flag;
                }
            });
            this._flags = flag;
            this._excludeflag = excludeflag;
        }
    }

    class NavMeshGrid {
        get tileWidth() {
            return this._config.tileSize * this._config.cellSize;
        }
        get max() {
            return this._max;
        }
        get min() {
            return this._min;
        }
        get config() {
            return this._config;
        }
        get maxtiles() {
            return this.maxXTileCount * this.maxZTileCount;
        }
        get maxXTileCount() {
            return this._tileSize.x;
        }
        get maxZTileCount() {
            return this._tileSize.y;
        }
        constructor(config, min, max) {
            this._bordWidth = 0;
            this._config = config;
            this._min = min;
            this._max = max;
            this._tileSize = new Laya.Vector2();
            this._cellSize = new Laya.Vector2();
            this._updateBound();
        }
        _refeashBound(tile) {
            tile._boundMin.cloneTo(this._min);
            tile._boundMax.cloneTo(this._max);
            this._updateBound();
        }
        getBoundTileIndex(min, max, isbord = false) {
            let pMinx = min.x;
            let pMinz = min.z;
            let pMaxx = max.x;
            let pMaxz = max.z;
            if (isbord) {
                pMinx -= this._bordWidth;
                pMinz -= this._bordWidth;
                pMaxx += this._bordWidth;
                pMaxz += this._bordWidth;
            }
            let lists = [];
            let minIx = Math.max(0, this._getTileXIndex(pMinx));
            let maxIx = Math.min(this._tileSize.x - 1, this._getTileXIndex(pMaxx));
            let minIz = Math.max(0, this._getTileZIndex(pMinz));
            let maxIz = Math.min(this._tileSize.y - 1, this._getTileZIndex(pMaxz));
            for (var z = minIz; z <= maxIz; z++) {
                for (var x = minIx; x <= maxIx; x++) {
                    lists.push(z * this._tileSize.x + x);
                }
            }
            return lists;
        }
        getTileIndexByPos(x, z) {
            return this.getTileIndex(this._getTileXIndex(x), this._getTileZIndex(z));
        }
        getTileIndex(xIndex, zIndex) {
            if (zIndex < 0 || zIndex >= this._tileSize.y) {
                return -1;
            }
            if (xIndex < 0 || xIndex >= this._tileSize.x) {
                return -1;
            }
            return zIndex * this._tileSize.x + xIndex;
        }
        _getTileXIndex(value) {
            return this._getLeftValue(value - this._min.x);
        }
        _getTileZIndex(value) {
            return this._getLeftValue(value - this._min.z);
        }
        _getLeftValue(value) {
            return Math.floor(value / this.tileWidth);
        }
        _updateBound() {
            this._bordWidth = this._config.cellSize * 3;
            const max = this._max;
            const min = this._min;
            const tileWidth = this._config.cellSize * this._config.tileSize;
            this._tileSize.x = Math.ceil((max.x - min.x) / tileWidth);
            this._tileSize.y = Math.ceil((max.z - min.z) / tileWidth);
            const cellSize = this._config.cellSize;
            this._cellSize.x = Math.ceil((max.x - min.x) / cellSize);
            this._cellSize.x = Math.ceil((max.z - min.z) / cellSize);
        }
    }

    class NavigationPathData {
        get pos() {
            return this._pos;
        }
        get flag() {
            return this._flag;
        }
        constructor() {
            this._flag = 0;
            this._pos = new Laya.Vector3();
        }
    }

    const tempVec3$2 = new Laya.Vector3();
    const tempVec31 = new Laya.Vector3();
    const tempVec32 = new Laya.Vector3();
    const tempVec33 = new Laya.Vector3();
    class NavigationUtils {
        static _boundContentPoint(min, max, point) {
            if (point.x > max.x || point.x < min.x)
                return false;
            if (point.y > max.y || point.y < min.y)
                return false;
            if (point.z > max.z || point.z < min.z)
                return false;
            return true;
        }
        static _boundInterection(min1, max1, min2, max2) {
            var tempV0 = tempVec3$2;
            var tempV1 = tempVec31;
            var thisExtends = tempVec32;
            Laya.Vector3.subtract(max1, min1, thisExtends);
            Laya.Vector3.scale(thisExtends, 0.5, thisExtends);
            var boundExtends = tempVec33;
            Laya.Vector3.subtract(max2, min2, boundExtends);
            Laya.Vector3.scale(boundExtends, 0.5, boundExtends);
            tempV0.setValue(Math.max(max1.x, max2.x) - Math.min(min1.x, min2.x), Math.max(max1.y, max2.y) - Math.min(min1.y, min2.y), Math.max(max1.z, max2.z) - Math.min(min1.z, min2.z));
            tempV1.setValue((thisExtends.x + boundExtends.x) * 2.0, (thisExtends.y + boundExtends.y) * 2.0, (thisExtends.z + boundExtends.z) * 2.0);
            if ((tempV0.x) > (tempV1.x))
                return -1;
            if ((tempV0.y) > (tempV1.y))
                return -1;
            if ((tempV0.z) > (tempV1.z))
                return -1;
            return (tempV1.x - tempV0.x) * (tempV1.y - tempV0.y) * (tempV1.z - tempV0.z);
        }
        static _setDatastoArray(fllowPath, index, data, flag) {
            let navData = fllowPath[index] ? fllowPath[index] : new NavigationPathData();
            navData.pos.fromArray(data);
            navData._flag = flag;
            fllowPath[index] = navData;
        }
        static _inRange(v1, v2, radius, height, offIndex) {
            const dx = v2[0] - v1[offIndex];
            const dy = v2[1] - v1[offIndex + 1];
            const dz = v2[2] - v1[offIndex + 2];
            return (dx * dx + dz * dz) < radius * radius && Math.abs(dy) < height;
        }
        static _transfromBoundBox(min, max, transfrom, outMin, outMax) {
            const center = tempVec3$2;
            Laya.Vector3.lerp(min, max, 0.5, center);
            const extent = tempVec31;
            Laya.Vector3.subtract(max, min, extent);
            Laya.Vector3.scale(extent, 0.5, extent);
            Laya.Vector3.transformCoordinate(center, transfrom, center);
            Laya.Vector3.TransformNormal(extent, transfrom, extent);
            Laya.Vector3.subtract(center, extent, outMin);
            Laya.Vector3.add(center, extent, outMax);
        }
        static _isFlags(data, flag) {
            return data & flag.value;
        }
        static _addVector3ToArray(vec1, vec2, scale) {
            let dest = [];
            dest[0] = vec1.x + vec2.x * scale;
            dest[1] = vec1.y + vec2.y * scale;
            dest[2] = vec1.z + vec2.z * scale;
            return dest;
        }
        static _getSteerTarget(navMesh, startRef, endRef, minTargetDist, paths, pathSize, out) {
            const navQuery = navMesh.navQuery;
            let data = navQuery.findStraightPath(startRef, endRef, paths, pathSize, 3);
            let steerPath = data.steerPath;
            let steerPathFlags = data.steerPathFlags;
            let steerPathPolys = data.steerPathPolys;
            let nsteerPath = data.nsteerPath;
            if (!nsteerPath) {
                return null;
            }
            let ns = 0;
            while (ns < nsteerPath) {
                if (this._isFlags(steerPathFlags[ns], this._recast.dtStraightPathFlags.DT_STRAIGHTPATH_OFFMESH_CONNECTION) ||
                    !this._inRange(steerPath, startRef, minTargetDist, 1000, ns * 3))
                    break;
                ns++;
            }
            if (ns >= nsteerPath)
                return null;
            out.fromArray(steerPath, ns * 3);
            return {
                steerPosFlag: steerPathFlags[ns],
                steerPosRef: steerPathPolys[ns]
            };
        }
        static _dtMergeCorridorStartMoved(path, npath, maxPath, visited, nvisited) {
            let furthestPath = -1;
            let furthestVisited = -1;
            for (var i = npath - 1; i >= 0; i--) {
                let found = false;
                for (let j = nvisited - 1; j >= 0; --j) {
                    if (path[i] == visited[j]) {
                        furthestPath = i;
                        furthestVisited = j;
                        found = true;
                    }
                }
                if (found)
                    break;
            }
            if (furthestPath == -1 || furthestVisited == -1)
                return npath;
            const req = nvisited - furthestVisited;
            const orig = Math.min(furthestPath + 1, npath);
            let size = Math.max(0, npath - orig);
            if (req + size > maxPath)
                size = maxPath - req;
            for (let i = 0; i < req; ++i)
                path[i] = visited[(nvisited - 1) - i];
            return req + size;
        }
        static _findFllowPath(navMesh, filter, startPos, endPos, steplength, minTarget, fllowPath) {
            const navQuery = navMesh.navQuery;
            const namesh = navMesh.navMesh;
            const startRef = navQuery.findNearestPoly(startPos.toArray(), navMesh.extents, filter);
            const endRef = navQuery.findNearestPoly(endPos.toArray(), navMesh.extents, filter);
            let pathdata = navQuery.findPath(startRef, endRef, filter, NavigationUtils._MAX_POLYS);
            let polys = pathdata.polys;
            let m_npolys = polys.length;
            let m_nsmoothPath = 0;
            let steerPos = new Laya.Vector3();
            let help1 = new Laya.Vector3();
            let help2 = new Laya.Vector3();
            if (polys.length > 0) {
                let npolys = m_npolys;
                let iterPos = navQuery.closestPointOnPolyByRefPointData(startRef);
                let targetPos = navQuery.closestPointOnPoly(polys[npolys - 1], endRef.data);
                this._setDatastoArray(fllowPath, m_nsmoothPath, iterPos, this._recast.dtStraightPathFlags.DT_STRAIGHTPATH_START.value);
                m_nsmoothPath++;
                while (npolys && m_nsmoothPath < NavigationUtils._MAX_SMOOTH) {
                    let steerData = this._getSteerTarget(navMesh, iterPos, targetPos, minTarget, polys, npolys, steerPos);
                    if (steerData == null) {
                        break;
                    }
                    help1.fromArray(iterPos);
                    let steerPosFlag = steerData.steerPosFlag;
                    let steerPosRef = steerData.steerPosRef;
                    let endOfPath = this._isFlags(steerPosFlag, this._recast.dtStraightPathFlags.DT_STRAIGHTPATH_END) ? true : false;
                    let offMeshConnection = this._isFlags(steerPosFlag, this._recast.dtStraightPathFlags.DT_STRAIGHTPATH_OFFMESH_CONNECTION) ? true : false;
                    Laya.Vector3.subtract(steerPos, help1, help2);
                    let len = help2.length();
                    if ((endOfPath || offMeshConnection) && len < steplength)
                        len = 1;
                    else
                        len = steplength / len;
                    let moveTgt = this._addVector3ToArray(help1, help2, len);
                    let surfacedata = navQuery.moveAlongSurface(polys[0], iterPos, moveTgt, filter, 16);
                    let result = surfacedata.resultPos;
                    let visited = surfacedata.visited;
                    polys = this._recast.mergeCorridorStartMoved(polys, NavigationUtils._MAX_POLYS, Array.from(visited));
                    polys = this._recast.fixupShortcuts(polys, navQuery);
                    npolys = polys.length;
                    let heightData = navQuery.getPolyHeight(polys[0], result);
                    result[1] = heightData.height;
                    iterPos = result;
                    let isRange = this._inRange(iterPos, steerPos.toArray(), minTarget, 1.0, 0);
                    if (endOfPath && isRange) {
                        iterPos = targetPos;
                        if (m_nsmoothPath < NavigationUtils._MAX_SMOOTH) {
                            this._setDatastoArray(fllowPath, m_nsmoothPath, iterPos, this._recast.dtStraightPathFlags.DT_STRAIGHTPATH_END.value);
                            m_nsmoothPath++;
                        }
                        break;
                    }
                    else if (offMeshConnection && isRange) {
                        let startPos = [0, 0, 0];
                        let endPos = [0, 0, 0];
                        let prevRef = 0, polyRef = polys[0];
                        let npos = 0;
                        while (npos < npolys && polyRef != steerPosRef) {
                            prevRef = polyRef;
                            polyRef = polys[npos];
                            npos++;
                        }
                        for (let i = npos; i < npolys; ++i) {
                            polys[i - npos] = polys[i];
                        }
                        npolys -= npos;
                        let status = namesh.getOffMeshConnectionPolyEndPoints(prevRef, polyRef, startPos, endPos);
                        if (this._statusSucceed(status)) {
                            if (m_nsmoothPath < NavigationUtils._MAX_SMOOTH) {
                                this._setDatastoArray(fllowPath, m_nsmoothPath, startPos, steerPosFlag);
                                m_nsmoothPath++;
                                if (m_nsmoothPath & 1) {
                                    this._setDatastoArray(fllowPath, m_nsmoothPath, startPos, steerPosFlag);
                                    m_nsmoothPath++;
                                }
                            }
                            iterPos = endPos;
                            heightData = navQuery.getPolyHeight(polys[0], iterPos);
                            iterPos[1] = heightData.height;
                        }
                    }
                    if (m_nsmoothPath < NavigationUtils._MAX_SMOOTH) {
                        this._setDatastoArray(fllowPath, m_nsmoothPath, iterPos, steerPosFlag);
                        m_nsmoothPath++;
                    }
                }
            }
            fllowPath.length = m_nsmoothPath;
        }
        static _initialize(Recast) {
            NavigationUtils._recast = Recast;
            NavigationUtils._dtCrowdAgentParams = new Recast.dtCrowdAgentParams();
            NavigationUtils._TemprefPoint = {};
            NavigationUtils._TemprefPoint1 = {};
        }
        static _getRecast() {
            return NavigationUtils._recast;
        }
        static _createNavMesh() {
            return new this._recast.dtNavMesh();
        }
        static _createNavMeshQuery() {
            return new this._recast.dtNavMeshQuery();
        }
        static _createRefPointData() {
            return new this._recast.dtRefPointData();
        }
        static _createMeshOffLink() {
            return new this._recast.dtOffMeshConnection();
        }
        static _createConvexVolume() {
            return new this._recast.dtConvexVolume();
        }
        static _createQueryFilter() {
            return new this._recast.dtQueryFilter();
        }
        static _createCrowd() {
            return new this._recast.dtCrowd();
        }
        static _createdtNavTileData() {
            return new this._recast.dtNavTileData();
        }
        static _createdtNavTileCache() {
            return new this._recast.dtNavTileCache();
        }
        static _getCrowdAgentParams() {
            return this._dtCrowdAgentParams;
        }
        static _freeNavMeshQuery(data) {
            this._recast.dtFreeNavMeshQuery(data);
        }
        static _freeNavMesh(data) {
            this._recast.dtFreeNavMesh(data);
        }
        static _freeCrowd(data) {
            this._recast.dtFreeCrowd(data);
        }
        static _free(data) {
            this._recast.dtFree(data);
        }
        static _freeLayaData(data) {
            this._recast._free(data);
        }
        static _statusSucceed(data) {
            return this._recast.dtStatusSucceed(data);
        }
        static _updateCrowd(crowd, dt) {
            return this._recast.updateCrowd(crowd, dt);
        }
    }
    NavigationUtils._MAX_SMOOTH = 2048;
    NavigationUtils._MAX_POLYS = 256;
    NavigationUtils._TitleMeshIbOff = [0, 2, 1];

    class TitleConfig {
        constructor() {
            this.tx = 0;
            this.ty = 0;
            this.maxSimplificationError = 0.9;
            this.bmin = [0, 0, 0];
            this.bmax = [0, 0, 0];
        }
        _setOff(tx, ty) {
            this.tx = tx;
            this.ty = ty;
        }
        _setMin(value) {
            this.bmin[0] = value.x;
            this.bmin[1] = value.y;
            this.bmin[2] = value.z;
        }
        _setMax(value) {
            this.bmax[0] = value.x;
            this.bmax[1] = value.y;
            this.bmax[2] = value.z;
        }
        _setAgent(height, radius, maxClimb) {
            this.agentHeight = height;
            this.agentRadius = radius;
            this.agentMaxClimb = maxClimb;
        }
        _setMaxEdgeLen(value) {
            this.maxEdgeLen = Math.ceil(value);
        }
    }

    const CROW_MAX_FILTER = 16;
    const tempVec3$1 = new Laya.Vector3();
    class BaseNavMesh {
        get extents() {
            return this._extents;
        }
        get navMesh() {
            return this._navMesh;
        }
        get navQuery() {
            return this._navQuery;
        }
        get crowd() {
            return this._crowd;
        }
        get navTileGrid() {
            return this._grid;
        }
        get is3D() {
            return this._is3D;
        }
        constructor(config, min, max, surface, is3D = true) {
            this._extents = [2, 4, 2];
            this._maxAgents = 128;
            this._is3D = true;
            this._grid = new NavMeshGrid(config, min, max);
            this._surface = surface;
            this._is3D = is3D;
            this._titileConfig = new TitleConfig();
            this._navcreateedTileMaps = new Set();
            this._delayCreates = new Map();
            this._allAgents = new Map();
            this._fiterMap = new Map();
            this._creatNavMesh();
        }
        _getFilter(areaMask) {
            let excludeflag = areaMask.excludeflag;
            if (this._fiterMap.has(excludeflag)) {
                return this._fiterMap.get(excludeflag);
            }
            let size = this._fiterMap.size;
            if (size >= CROW_MAX_FILTER) {
                console.error("Not max " + CROW_MAX_FILTER + ".");
                return null;
            }
            let fiter = this._crowd.getFilter(size);
            fiter.setIncludeFlags(areaMask.flag);
            fiter.setExcludeFlags(excludeflag);
            fiter.queryFilterType = size;
            this._fiterMap.set(excludeflag, fiter);
            return fiter;
        }
        _createAgents(agent) {
            agent._filter = this._getFilter(agent._areaMask);
            let params = NavigationUtils._getCrowdAgentParams();
            params.radius = agent._getradius();
            params.collisionQueryRange = agent._getcollisionQueryRange();
            params.pathOptimizationRange = agent._getpathOptimizationRange();
            params.height = agent._getheight();
            params.maxAcceleration = agent.maxAcceleration;
            params.maxSpeed = agent.speed;
            params.obstacleAvoidanceType = agent.quality;
            params.separationWeight = agent.priority;
            params.queryFilterType = agent._filter.queryFilterType;
            params.updateFlags = agent._getUpdateFlags();
            agent._getpos(tempVec3$1);
            let refPoint = this._navQuery.findNearestPoly(tempVec3$1.toArray(), this._extents, agent._filter);
            agent._agentId = this._crowd.addAgent(refPoint.data, params);
            agent._crowAgent = this._crowd.getAgent(agent._agentId);
            this._allAgents.set(agent._agentId, agent);
        }
        _addAgent(agent) {
            agent._getpos(tempVec3$1);
            let tileIndex = this._grid.getTileIndexByPos(tempVec3$1.x, tempVec3$1.z);
            if (this._navcreateedTileMaps.has(tileIndex)) {
                this._createAgents(agent);
            }
            else {
                if (!this._delayCreates.has(tileIndex)) {
                    this._delayCreates.set(tileIndex, []);
                }
                this._delayCreates.get(tileIndex).push(agent);
            }
        }
        _removeAgent(agent) {
            if (agent._agentId == null) {
                agent._getpos(tempVec3$1);
                let tileIndex = this._grid.getTileIndexByPos(tempVec3$1.x, tempVec3$1.z);
                if (this._delayCreates.has(tileIndex)) {
                    let lists = this._delayCreates.get(tileIndex);
                    let index = lists.indexOf(agent);
                    if (index >= 0) {
                        lists.splice(index, 1);
                    }
                }
            }
            else {
                this._crowd.removeAgent(agent._agentId);
                this._allAgents.delete(agent._agentId);
                agent._agentId = null;
                agent._crowAgent = null;
            }
        }
        _getPolyFlags(pos, fiter = null) {
            const polyRef = this._findNearestPoly(pos, fiter, tempVec3$1);
            return this._navMesh.getPolyFlags(polyRef);
        }
        _getPolyArea(pos, fiter = null) {
            const polyRef = this._findNearestPoly(pos, fiter, tempVec3$1);
            return this._navMesh.getPolyArea(polyRef);
        }
        _findNearestPoly(pos, fiter = null, out) {
            if (!fiter)
                fiter = this._defatfilter;
            let poly = this._navQuery.findNearestPoly(pos.toArray(), this.extents, fiter);
            out.fromArray(poly.data);
            return poly.polyRef;
        }
        _findFllowPath(fllowPaths, startPos, endPos, speed, filter = null) {
            if (!filter)
                filter = this._defatfilter;
            let tileIndex = this._grid.getTileIndexByPos(startPos.x, startPos.z);
            if (this._navcreateedTileMaps.has(tileIndex)) {
                NavigationUtils._findFllowPath(this, filter, startPos, endPos, speed * 0.1, 0.01, fllowPaths);
                return true;
            }
            else {
                return false;
            }
        }
        _findDistanceToWall(pos, filter = null) {
            if (!filter)
                filter = this._defatfilter;
            let posref = this._navQuery.findNearestPoly(pos.toArray(), this.extents, filter);
            let data = this._navQuery.findDistanceToWall(posref, filter, 100);
            if (NavigationUtils._statusSucceed(data.Status))
                return data;
            else
                return null;
        }
        _requestMoveTarget(agent, destination) {
            agent._getpos(tempVec3$1);
            let tileIndex = this._grid.getTileIndexByPos(tempVec3$1.x, tempVec3$1.z);
            if (this._navcreateedTileMaps.has(tileIndex)) {
                let refPoint = this._navQuery.findNearestPoly(destination.toArray(), this._extents, agent._filter);
                this.crowd.requestMoveTarget(agent._agentId, refPoint);
                return true;
            }
            else {
                return false;
            }
        }
        _creatNavMesh() {
            this._navMesh = NavigationUtils._createNavMesh();
            this._navQuery = NavigationUtils._createNavMeshQuery();
            this._crowd = NavigationUtils._createCrowd();
            this._navMeshLink = NavigationUtils._createMeshOffLink();
            this._navConvexVolume = NavigationUtils._createConvexVolume();
            let surface = this._surface;
            let manager = surface._manager;
            for (var i = 0; i < CROW_MAX_FILTER; i++) {
                manager.setFilterCost(this._crowd.getFilter(i));
            }
            this._defatfilter = this._getFilter(manager._deflatAllMask);
            this._navConvexVolume.setIs3D(this._is3D);
        }
        _navMeshInit() {
            let config = this._grid.config;
            let min = this._grid.min;
            let max = this._grid.max;
            this._navMesh.init(min.toArray(), max.toArray(), config.cellSize, config.tileSize);
            this._navQuery.init(this._navMesh, 2048);
            this._crowd.init(this._maxAgents, config.agentRadius, this.navMesh);
        }
        _updateNavMesh(dt) {
            let datas = NavigationUtils._updateCrowd(this._crowd, dt);
            this._allAgents.forEach((agent, index) => {
                let off = agent._agentId * 6;
                let pos = [datas[off], datas[off + 1], datas[off + 2]];
                let vel = [datas[off + 3], datas[off + 4], datas[off + 5]];
                agent._updateNavMesh(pos, vel);
            });
        }
        _addNavMeshLink(index, start, end, width, bidirectional, areaFlag) {
            this._navMeshLink.addOffMeshConnection(index, start.toArray(), end.toArray(), width, bidirectional ? 1 : 0, areaFlag);
        }
        _removeNavMeshLink(index) {
            this._navMeshLink.deleteOffMeshConnection(index);
        }
        _updateConvexVolume(index, buffer, miny, maxy, areaType) {
            this._navConvexVolume.addCovexVoume(index, buffer, miny, maxy, areaType);
            return true;
        }
        _deleteConvexVoume(index) {
            if (index < 0)
                return false;
            this._navConvexVolume.deleteCovexVoume(index);
            return true;
        }
        _addTile(cache, binds, partitionType, maxSimplificationError) {
            if (binds.length <= 0)
                return;
            const config = this._grid.config;
            this._titileConfig.partitionType = partitionType;
            this._titileConfig._setAgent(config.agentHeight, config.agentRadius, config.agentMaxClimb);
            this._titileConfig._setOff(cache.x, cache.y);
            this._titileConfig._setMin(cache.boundMin);
            this._titileConfig._setMax(cache.boundMax);
            this._titileConfig.maxSimplificationError = maxSimplificationError;
            this._removeTile(cache.x, cache.y);
            let ptrs = [];
            binds.forEach((value) => {
                ptrs.push(value.$$.ptr);
            });
            this._navMesh.addTile(config, this._titileConfig, ptrs, this._navMeshLink, this._navConvexVolume);
            const tileIndex = this._grid.getTileIndex(cache.x, cache.y);
            this._navcreateedTileMaps.add(tileIndex);
            if (this._delayCreates.has(tileIndex)) {
                const delaylists = this._delayCreates.get(tileIndex);
                delaylists.forEach((nav) => {
                    this._createAgents(nav);
                });
                this._delayCreates.delete(tileIndex);
            }
        }
        _removeTile(tileX, tileY) {
            this._navMesh.removeTile(tileX, tileY);
            this._navcreateedTileMaps.delete(this._grid.getTileIndex(tileX, tileY));
        }
        _clearn() {
            this._allAgents.forEach((agent) => {
                this._removeAgent(agent);
            });
            this._allAgents.clear();
        }
        _destroy() {
            if (this._navMesh) {
                NavigationUtils._freeNavMesh(this._navMesh);
                this._navMesh = null;
            }
            if (this._navQuery) {
                NavigationUtils._freeNavMeshQuery(this._navQuery);
                this._navQuery = null;
            }
            if (this._navMeshLink) {
                NavigationUtils._free(this._navMeshLink);
                this._navMeshLink = null;
            }
            if (this._navConvexVolume) {
                NavigationUtils._free(this._navConvexVolume);
                this._navConvexVolume = null;
            }
            if (this._crowd) {
                NavigationUtils._freeCrowd(this._crowd);
                this._crowd = null;
            }
        }
    }

    class RecastConfig {
        set cellSize(value) {
            this._cellSize = value;
            this._dirtyFlag++;
        }
        get cellSize() {
            return this._cellSize;
        }
        constructor() {
            this._dirtyFlag = 0;
            this._cellSize = 0.2;
            this.cellHeight = 0.3;
            this.agentMaxSlope = 45;
            this.agentHeight = 2;
            this.agentMaxClimb = 0.3;
            this.agentRadius = 0.2;
            this.tileSize = 32;
        }
        clone() {
            let data = new RecastConfig();
            this.cloneTo(data);
            return data;
        }
        cloneTo(destObject) {
            destObject.agentName = this.agentName;
            destObject.cellSize = this.cellSize;
            destObject.cellHeight = this.cellHeight;
            destObject.agentMaxSlope = this.agentMaxSlope;
            destObject.agentHeight = this.agentHeight;
            destObject.agentMaxClimb = this.agentMaxClimb;
            destObject.agentRadius = this.agentRadius;
            destObject.tileSize = this.tileSize;
        }
    }

    exports.PartitionType = void 0;
    (function (PartitionType) {
        PartitionType[PartitionType["PARTITION_WATERSHED"] = 0] = "PARTITION_WATERSHED";
        PartitionType[PartitionType["PARTITION_MONOTONE"] = 1] = "PARTITION_MONOTONE";
        PartitionType[PartitionType["PARTITION_LAYERS"] = 2] = "PARTITION_LAYERS";
    })(exports.PartitionType || (exports.PartitionType = {}));
    exports.UpdateFlags = void 0;
    (function (UpdateFlags) {
        UpdateFlags[UpdateFlags["DT_CROWD_ANTICIPATE_TURNS"] = 1] = "DT_CROWD_ANTICIPATE_TURNS";
        UpdateFlags[UpdateFlags["DT_CROWD_OBSTACLE_AVOIDANCE"] = 2] = "DT_CROWD_OBSTACLE_AVOIDANCE";
        UpdateFlags[UpdateFlags["DT_CROWD_SEPARATION"] = 4] = "DT_CROWD_SEPARATION";
        UpdateFlags[UpdateFlags["DT_CROWD_OPTIMIZE_VIS"] = 8] = "DT_CROWD_OPTIMIZE_VIS";
        UpdateFlags[UpdateFlags["DT_CROWD_OPTIMIZE_TOPO"] = 16] = "DT_CROWD_OPTIMIZE_TOPO";
    })(exports.UpdateFlags || (exports.UpdateFlags = {}));
    exports.CrowdAgentState = void 0;
    (function (CrowdAgentState) {
        CrowdAgentState[CrowdAgentState["DT_CROWDAGENT_STATE_INVALID"] = 0] = "DT_CROWDAGENT_STATE_INVALID";
        CrowdAgentState[CrowdAgentState["DT_CROWDAGENT_STATE_WALKING"] = 1] = "DT_CROWDAGENT_STATE_WALKING";
        CrowdAgentState[CrowdAgentState["DT_CROWDAGENT_STATE_OFFMESH"] = 2] = "DT_CROWDAGENT_STATE_OFFMESH";
    })(exports.CrowdAgentState || (exports.CrowdAgentState = {}));
    exports.ObstacleAvoidanceType = void 0;
    (function (ObstacleAvoidanceType) {
        ObstacleAvoidanceType[ObstacleAvoidanceType["NoObstacle"] = 0] = "NoObstacle";
        ObstacleAvoidanceType[ObstacleAvoidanceType["LowQuality"] = 1] = "LowQuality";
        ObstacleAvoidanceType[ObstacleAvoidanceType["MedQuality"] = 2] = "MedQuality";
        ObstacleAvoidanceType[ObstacleAvoidanceType["GoodQuality"] = 3] = "GoodQuality";
        ObstacleAvoidanceType[ObstacleAvoidanceType["HighQuality"] = 4] = "HighQuality";
    })(exports.ObstacleAvoidanceType || (exports.ObstacleAvoidanceType = {}));
    exports.NavigationConfig = void 0;
    (function (NavigationConfig) {
        NavigationConfig["defaltAgentName"] = "humanoid";
        NavigationConfig["defaltUnWalk"] = "unwalk";
        NavigationConfig["defaltWalk"] = "walk";
        NavigationConfig["defaltJump"] = "jump";
    })(exports.NavigationConfig || (exports.NavigationConfig = {}));
    class NavAreaFlag {
        get flag() {
            return 1 << this.index;
        }
    }

    const readNavTileCache = function (byte, navData) {
        navData._dirtyFlag = byte.readFloat32();
        const min = navData._boundMin;
        min.x = byte.readFloat32();
        min.y = byte.readFloat32();
        min.z = byte.readFloat32();
        const max = navData._boundMax;
        max.x = byte.readFloat32();
        max.y = byte.readFloat32();
        max.z = byte.readFloat32();
        let navCount = byte.readUint16();
        for (var i = 0; i < navCount; i++) {
            let nav = navData._oriTiles[i] = new NavTileCache();
            const min = nav._boundMin;
            min.x = byte.readFloat32();
            min.y = byte.readFloat32();
            min.z = byte.readFloat32();
            const max = nav._boundMax;
            max.x = byte.readFloat32();
            max.y = byte.readFloat32();
            max.z = byte.readFloat32();
            nav.x = byte.readUint16();
            nav.y = byte.readUint16();
            let vertStart = byte.readUint32();
            let vertCount = byte.readUint32();
            let indexStart = byte.readUint32();
            let indexCount = byte.readUint32();
            let flagStart = byte.readUint32();
            let flagCount = byte.readUint32();
            byte.pos = vertStart;
            nav.triVertex = new Float32Array(byte.readArrayBuffer(vertCount));
            byte.pos = indexStart;
            nav.triIndex = new Uint32Array(byte.readArrayBuffer(indexCount));
            byte.pos = flagStart;
            nav.triFlag = new Uint8Array(byte.readArrayBuffer(flagCount));
        }
    };
    class NavTileCache {
        constructor() {
            this._bindData = NavigationUtils._createdtNavTileData();
            this._boundMax = new Laya.Vector3();
            this._boundMin = new Laya.Vector3();
            this.x = this.y = 0;
        }
        set triVertex(data) {
            this._triVertex = data;
            this._bindData.setTriVertex(data);
        }
        get triVertex() {
            return this._triVertex;
        }
        set triIndex(data) {
            this._triIndex = data;
            this._bindData.setTriIndex(data);
        }
        get triIndex() {
            return this._triIndex;
        }
        set triFlag(data) {
            this._triFlag = data;
            this._bindData.setTriFlag(data);
        }
        get triFlag() {
            return this._triFlag;
        }
        get boundMin() {
            return this._boundMin;
        }
        get boundMax() {
            return this._boundMax;
        }
        get bindData() {
            return this._bindData;
        }
        destroy() {
            if (this._bindData) {
                NavigationUtils._free(this._bindData);
                this._bindData = null;
            }
        }
    }
    class NavTileData {
        constructor(res) {
            this._dirtyFlag = 0;
            this._boundMax = new Laya.Vector3();
            this._boundMin = new Laya.Vector3();
            this._res = res;
            this._oriTiles = [];
            this._parse();
        }
        _parse() {
            var readData = new Laya.Byte(this._res.data);
            readData.pos = 0;
            var version = readData.readUTFString();
            switch (version) {
                case "LAYANAV:0101":
                    readNavTileCache(readData, this);
                    break;
            }
        }
        get dirtyFlag() {
            return this._dirtyFlag;
        }
        getNavData(index) {
            return this._oriTiles[index];
        }
        get length() {
            return this._oriTiles.length;
        }
        destroy() {
            this._oriTiles.forEach(element => {
                element.destroy();
            });
            this._oriTiles = null;
            this._res = null;
        }
    }

    const helpTempSet = new Set();
    class CacheData {
        constructor(surface) {
            this._cacheflag = 0;
            this._transfrom = new Laya.Matrix4x4();
            this._min = new Laya.Vector3();
            this._max = new Laya.Vector3();
            this._surface = surface;
            this._titleIndex = new Set();
        }
        _setUpdateDataHander(handler) {
            this._flagChangeHander = handler;
        }
        _setTileHander(handler) {
            this._tileHander = handler;
        }
        _updateTransfrom(mat) {
            if (mat.equalsOtherMatrix(this._transfrom))
                return;
            mat.cloneTo(this._transfrom);
            this._setCacheFlag(CacheData.TransfromFlag);
        }
        _updateAreaFlag(flag) {
            if (this._areaFlag == flag)
                return;
            this._areaFlag = flag;
            this._setCacheFlag(CacheData.AreaFlag);
        }
        get areaFlag() {
            return this._areaFlag;
        }
        _cacheBound(min, max) {
            if (!Laya.Vector3.equals(this._min, min)) {
                min.cloneTo(this._min);
                this._setCacheFlag(CacheData.MinFlag);
            }
            if (!Laya.Vector3.equals(this._max, max)) {
                max.cloneTo(this._max);
                this._setCacheFlag(CacheData.MaxFlag);
            }
        }
        set _cacheData(data) {
            if (this._data == data)
                return;
            this._data = data;
            this._setCacheFlag(CacheData.DataFlag);
        }
        get _cacheData() {
            return this._data;
        }
        _destroy() {
            this._setCacheFlag(CacheData.DeleteFlag);
        }
        _setCacheFlag(type) {
            this._cacheflag |= type;
            this._surface._delayCacheMap.add(this);
        }
        _getCacheFlag(type) {
            return (this._cacheflag & type) != 0;
        }
        _updateCache() {
            if (this._cacheflag == 0)
                return;
            this._titleIndex.forEach((index) => {
                this._surface._buildTileList.add(index);
            });
            if (this._getCacheFlag(CacheData.DeleteFlag)) {
                this._cacheflag = 0;
                return;
            }
            let flags = this._surface._manager.getArea(this._areaFlag);
            if (this._flagChangeHander)
                this._flagChangeHander.runWith([this, flags.index]);
            helpTempSet.clear();
            let index = this._surface._navMesh.navTileGrid.getBoundTileIndex(this._min, this._max, false);
            index.forEach((index) => {
                helpTempSet.add(index);
                this._surface._buildTileList.add(index);
            });
            if (this._tileHander)
                this._tileHander.runWith([this, this._titleIndex, helpTempSet]);
            this._titleIndex.clear();
            helpTempSet.forEach((index) => {
                this._titleIndex.add(index);
            });
            this._cacheflag = 0;
        }
        _resetData() {
            this._titleIndex.clear();
            this._setCacheFlag(CacheData.ResetDataFlag);
        }
    }
    CacheData.TransfromFlag = 1;
    CacheData.AreaFlag = 2;
    CacheData.MinFlag = 4;
    CacheData.MaxFlag = 8;
    CacheData.DataFlag = 16;
    CacheData.DeleteFlag = 32;
    CacheData.OtherDataFlag = 64;
    CacheData.ResetDataFlag = 128;

    class ItemMapId {
        constructor(maxCount) {
            this._idMap = new Map();
            this._idArray = new Array();
            for (var i = 0; i < maxCount; i++) {
                this._idArray.push(i);
            }
        }
        haveId() {
            return this._idArray.length > 0;
        }
        getId(value) {
            if (this._idMap.has(value)) {
                return this._idMap.get(value);
            }
            if (this._idArray.length > 0) {
                let id = this._idArray.shift();
                this._idMap.set(value, id);
                return id;
            }
            return -1;
        }
        removeItem(value) {
            if (this._idMap.has(value)) {
                let id = this._idMap.get(value);
                this._idArray.push(id);
                this._idMap.delete(value);
                this._idArray.sort((a, b) => { return a - b; });
                return id;
            }
            else {
                return -1;
            }
        }
    }

    class BaseNavMeshSurface extends Laya.Component {
        set agentType(value) {
            if (this._agentType == value)
                return;
            this._agentType = value;
            if (this._oriTiles == null)
                return;
            let tileCount = this._oriTiles.length;
            for (var i = 0; i < tileCount; i++) {
                this._buildTileList.add(i);
            }
        }
        get agentType() {
            return this._agentType;
        }
        set areaFlag(value) {
            this._cachedata._updateAreaFlag(value);
        }
        get areaFlag() {
            return this._cachedata.areaFlag;
        }
        set asyn(value) {
            this._needAsyn = value;
        }
        get asyn() {
            return this._needAsyn;
        }
        set partitionType(value) {
            this._partitionType = value;
        }
        get partitionType() {
            return this._partitionType;
        }
        get min() {
            return this._boundMin;
        }
        get max() {
            return this._boundMax;
        }
        set datas(value) {
            this._datas = value;
            this._updateNavData();
        }
        get datas() {
            return this._datas;
        }
        set maxSimplificationError(value) {
            if (this._maxSimplificationError == value)
                return;
            this._maxSimplificationError = value;
            this._cachedata._setCacheFlag(CacheData.OtherDataFlag);
        }
        get maxSimplificationError() {
            return this._maxSimplificationError;
        }
        constructor() {
            super();
            this._maxSimplificationError = 0.9;
            this._agentType = exports.NavigationConfig.defaltAgentName;
            this._boundMin = new Laya.Vector3();
            this._boundMax = new Laya.Vector3();
            this._needAsyn = false;
            this.runInEditor = true;
            this._singleton = false;
            this._delayCacheMap = new Set();
            this._buildTileList = new Set();
            this._featureCache = new Map();
            this._partitionType = exports.PartitionType.PARTITION_WATERSHED;
            this._cachedata = this._createCacheData();
            this._cachedata._setUpdateDataHander(new Laya.Handler(this, this._updateOrigTileCache, undefined, false));
            this._cachedata._cacheData = [];
            this._cacheDataMap = new Map();
            this._meshlinkOffMaps = new ItemMapId(256);
            this._meshVolumeMaps = new ItemMapId(256);
        }
        cleanAllTile() {
            if (!this._oriTiles)
                return;
            for (var i = 0, n = this._oriTiles.length; i < n; i++) {
                let tile = this._oriTiles.getNavData(i);
                this._navMesh._removeTile(tile.x, tile.y);
            }
        }
        rebuildTile(pos) {
            let index = this._navMesh.navTileGrid.getTileIndexByPos(pos.x, pos.z);
            this._buildTileList.add(index);
        }
        getPolyFlags(pos, fiter = null) {
            if (this._navMesh == null)
                return -1;
            return this._navMesh._getPolyFlags(pos, fiter);
        }
        findNearestPoly(pos, fiter = null, out) {
            if (this._navMesh == null)
                return null;
            return this._navMesh._findNearestPoly(pos, fiter, out);
        }
        findFllowPath(outPaths, startPos, endPos, speed, filter = null) {
            if (this._navMesh == null)
                return false;
            return this._navMesh._findFllowPath(outPaths, startPos, endPos, speed, filter);
        }
        findDistanceToWall(pos, filter) {
            if (this._navMesh == null)
                return null;
            return this._navMesh._findDistanceToWall(pos, filter);
        }
        _updateOrigTileCache(cache, areaflags) {
            if (!cache._getCacheFlag(CacheData.AreaFlag))
                return;
            let datas = cache._cacheData;
            let tileCount = datas.length;
            if (cache._getCacheFlag(CacheData.DataFlag | CacheData.AreaFlag)) {
                for (var i = 0; i < tileCount; i++) {
                    datas[i].setFlag(areaflags);
                }
            }
        }
        _createCacheData() {
            return new CacheData(this);
        }
        _getCahceData(data) {
            let cacheData = this._cacheDataMap.get(data);
            if (cacheData == null) {
                cacheData = this._createCacheData();
                this._cacheDataMap.set(data, cacheData);
            }
            return cacheData;
        }
        _removeCacheData(data) {
            let cacheData = this._cacheDataMap.get(data);
            if (cacheData == null)
                return null;
            this._cacheDataMap.delete(data);
            cacheData._destroy();
            this._navMesh._deleteConvexVoume(cacheData.id);
            return cacheData;
        }
        _crateNavMesh(config, min, max) {
            throw new Error("BaseNavMeshSurface: must override this function");
        }
        _updateNavData() {
            this._featureCache.clear();
            this._cleanBindData();
            if (this._navMesh)
                this._navMesh._clearn();
            if (this._datas) {
                this._oriTiles = new NavTileData(this._datas);
                if (this._navMesh) {
                    this._navMesh.navTileGrid._refeashBound(this._oriTiles);
                    this._navMesh._navMeshInit();
                }
                let bindDatas = [];
                for (var i = 0, n = this._oriTiles.length; i < n; i++) {
                    let bindData = NavigationUtils._createdtNavTileCache();
                    bindData.init(this._oriTiles.getNavData(i).bindData);
                    this._featureCache.set(i, new Set([bindData]));
                    bindDatas.push(bindData);
                }
                this._cachedata._cacheBound(this._oriTiles._boundMin, this._oriTiles._boundMax);
                this._cachedata._cacheData = bindDatas;
                this._cacheDataMap.forEach((value) => { value._resetData(); });
            }
            else {
                this._oriTiles = null;
                this._buildTileList.clear();
            }
        }
        _getManager() {
            throw new Error("BaseNavMeshSurface: must override this function");
        }
        _onEnable() {
            this._manager = this._getManager();
            if (!this._navMesh) {
                this._navMesh = this._crateNavMesh(this._manager.getNavConfig(this._agentType), this._boundMin, this._boundMax);
                if (this._oriTiles) {
                    this._navMesh.navTileGrid._refeashBound(this._oriTiles);
                    this._navMesh._navMeshInit();
                }
            }
            this._manager.regNavMeshSurface(this);
        }
        _update(dt) {
            if (this._oriTiles == null)
                return;
            this._delayCacheMap.forEach((value) => { value._updateCache(); });
            this._delayCacheMap.clear();
            if (this._needAsyn) {
                this._buildOneTileMesh();
            }
            else {
                this._buildAllTileMesh();
            }
            if (dt > 0)
                this._navMesh._updateNavMesh(dt);
        }
        _buildOneTileMesh() {
            if (this._buildTileList.size == 0)
                return;
            const setIter = this._buildTileList.keys();
            let tileIndex = setIter.next().value;
            let oritile = this._oriTiles.getNavData(tileIndex);
            var featureCache = this._featureCache.get(tileIndex);
            this._navMesh._addTile(oritile, [...featureCache], this._partitionType, this._maxSimplificationError);
            this._buildTileList.delete(tileIndex);
        }
        _buildAllTileMesh() {
            while (this._buildTileList.size > 0) {
                this._buildOneTileMesh();
            }
        }
        _onDisable() {
            this.cleanAllTile();
            this._manager.removeNavMeshSurface(this);
        }
        _onDestroy() {
            if (this._oriTiles)
                this._oriTiles = null;
        }
        _cloneTo(dest) {
            let surface = dest;
            surface._agentType = this._agentType;
            surface.areaFlag = this.areaFlag;
            surface._partitionType = this._partitionType;
            super._cloneTo(dest);
        }
        _cleanBindData() {
            let bindDatas = this._cachedata._cacheData;
            bindDatas.forEach((value) => {
                NavigationUtils._freeLayaData(value);
            });
            this._cachedata._titleIndex.clear();
            this._cachedata._cacheData = [];
        }
        _addModifileNavMesh(navModifile) {
            return this._getCahceData(navModifile);
        }
        _removeModifileNavMesh(navModifile) {
            this._removeCacheData(navModifile);
        }
        _addModifileLink(link) {
            let cache = this._getCahceData(link);
            let linkId = this._meshlinkOffMaps.getId(link);
            if (linkId == -1) {
                return null;
            }
            cache.id = linkId;
            return cache;
        }
        _addConvexVoume(volume) {
            let cache = this._getCahceData(volume);
            let volumeId = this._meshVolumeMaps.getId(cache);
            if (volumeId == -1) {
                return null;
            }
            cache.id = volumeId;
            return cache;
        }
        _deleteCovexVoume(volume) {
            this._removeCacheData(volume);
        }
    }

    class BaseNavigationManager {
        static _initialize(callback) {
            if (NavigationUtils._getRecast() != null) {
                return Promise.resolve().then(callback);
            }
            const Recast = window.Recast;
            if (!Recast) {
                return Promise.resolve();
            }
            if (BaseNavigationManager._initializePromise == null) {
                BaseNavigationManager._initializePromise = Recast()
                    .then((recast) => {
                    NavigationUtils._initialize(recast);
                })
                    .catch((error) => {
                    BaseNavigationManager._initializePromise = null;
                    throw error;
                });
            }
            return BaseNavigationManager._initializePromise.then(callback);
        }
        static findNavMeshSurface(surfaces, sprite, agentFlags) {
            let array = sprite.getComponents(BaseNavMeshSurface);
            if (array && array.length > 0) {
                array.forEach(element => {
                    (agentFlags.indexOf(element.agentType) >= 0) && surfaces.push(element);
                });
            }
            let parat = sprite.parent;
            if (parat && (parat instanceof Laya.Node)) {
                BaseNavigationManager.findNavMeshSurface(surfaces, parat, agentFlags);
            }
        }
        constructor(name) {
            this._navConfigMap = new Map();
            this._areaFlagMap = new Map();
            this._naveMeshMaps = new Map();
            this._naveMeshLinkMaps = new Map();
            this.name = name;
            this._deflatAllMask = new AreaMask();
            this._init();
        }
        destroy() {
        }
        _init() {
            let config = new RecastConfig();
            config.agentName = exports.NavigationConfig.defaltAgentName;
            this.regNavConfig(config);
            let area = new NavAreaFlag();
            area.name = exports.NavigationConfig.defaltUnWalk;
            area.cost = 1;
            area.index = 0;
            this.regArea(area);
            area = new NavAreaFlag();
            area.name = exports.NavigationConfig.defaltWalk;
            area.cost = 1;
            area.index = 1;
            this.regArea(area);
            area = new NavAreaFlag();
            area.name = exports.NavigationConfig.defaltJump;
            area.cost = 1;
            area.index = 2;
            this.regArea(area);
            this._deflatAllMask._setAreaMap(this._areaFlagMap);
            this._deflatAllMask.flag = 3;
        }
        _getLinkIdByNavMeshSurfaces(a, b) {
            if (a.id < b.id) {
                return a.id + "_" + b.id;
            }
            else {
                return b.id + "_" + a.id;
            }
        }
        Init(data) {
            if (!data)
                return;
            const agents = data.agents;
            if (agents) {
                for (var i = 0, n = agents.length; i < n; i++) {
                    let agent = agents[i];
                    let config = this.getNavConfig(agent.agentName);
                    if (!config) {
                        config = new RecastConfig();
                        config.agentName = agent.agentName;
                        this.regNavConfig(config);
                    }
                    config.cellSize = agent.cellSize;
                    config.cellHeight = agent.cellHeight;
                    config.agentMaxSlope = agent.agentMaxSlope;
                    config.agentHeight = agent.agentHeight;
                    config.agentRadius = agent.agentRadius;
                    config.agentMaxClimb = agent.agentMaxClimb;
                    config.tileSize = agent.tileSize;
                }
            }
            const areas = data.areas;
            if (areas) {
                for (var i = 0, n = areas.length; i < n; i++) {
                    let area = this.getArea(areas[i].name);
                    if (!area) {
                        area = new NavAreaFlag();
                        area.name = areas[i].name;
                        this.regArea(area);
                    }
                    area.index = areas[i].index;
                    area.cost = areas[i].cost;
                }
                let flag = 0;
                this._areaFlagMap.forEach((value, key) => {
                    flag = flag | value.flag;
                });
                this._deflatAllMask.flag = flag;
            }
        }
        setFilterCost(filer) {
            this._areaFlagMap.forEach((value) => {
                filer.setAreaCost(value.flag, value.cost);
            });
        }
        update(dt) {
            let delta = Math.min(dt, 0.3);
            this._naveMeshMaps.forEach((lists) => {
                for (var i = 0, n = lists.length; i < n; i++) {
                    lists.elements[i]._update(delta);
                }
            });
        }
        regNavConfig(config) {
            this._navConfigMap.set(config.agentName, config);
        }
        getNavConfig(type) {
            return this._navConfigMap.get(type);
        }
        regArea(area) {
            this._areaFlagMap.set(area.name, area);
        }
        getArea(type) {
            return this._areaFlagMap.get(type);
        }
        getAreaFlagMap() {
            return this._areaFlagMap;
        }
        regNavMeshLink(start, end, link) {
            if (start == end)
                return;
            if (start.agentType != end.agentType)
                return;
            let key = this._getLinkIdByNavMeshSurfaces(start, end);
            if (!this._naveMeshLinkMaps.has(key)) {
                this._naveMeshLinkMaps.set(key, Array());
            }
            this._naveMeshLinkMaps.get(key).push(link);
        }
        removeMeshLink(start, end, link) {
            if (start == end)
                return;
            if (start.agentType != end.agentType)
                return;
            let key = this._getLinkIdByNavMeshSurfaces(start, end);
            if (!this._naveMeshLinkMaps.has(key)) {
                return;
            }
            let links = this._naveMeshLinkMaps.get(key);
            let index = links.indexOf(link);
            if (index >= 0) {
                links.splice(index, 1);
            }
        }
        getNavMeshLink(from, to) {
            let key = this._getLinkIdByNavMeshSurfaces(from, to);
            if (!this._naveMeshLinkMaps.has(key)) {
                return null;
            }
            return this._naveMeshLinkMaps.get(key);
        }
        regNavMeshSurface(nav) {
            if (!nav) {
                console.error("cannot regist empyt NavMeshSurface.");
                return;
            }
            const agentType = nav.agentType;
            let surfaces = this._naveMeshMaps.get(agentType);
            if (surfaces == null) {
                surfaces = new Laya.SingletonList();
                this._naveMeshMaps.set(agentType, surfaces);
            }
            surfaces.add(nav);
        }
        removeNavMeshSurface(nav) {
            if (!nav) {
                console.error("cannot remove empyt NavMeshSurface.");
                return;
            }
            const agentType = nav.agentType;
            let surfaces = this._naveMeshMaps.get(agentType);
            if (surfaces == null) {
                return;
            }
            surfaces.remove(nav);
        }
        getNavMeshSurface(pos, agentType) {
            if (!this._naveMeshMaps.has(agentType))
                return null;
            let surfaces = this._naveMeshMaps.get(agentType);
            for (var i = 0, n = surfaces.length; i < n; i++) {
                let nav = surfaces.elements[i];
                if (NavigationUtils._boundContentPoint(nav.min, nav.max, pos)) {
                    return surfaces.elements[i];
                }
            }
            return null;
        }
        getNavMeshSurfaces(pos) {
            var surfaces = [];
            this._naveMeshMaps.forEach((datas) => {
                for (var i = 0, n = datas.length; i < n; i++) {
                    let nav = datas.elements[i];
                    if (NavigationUtils._boundContentPoint(nav.min, nav.max, pos)) {
                        surfaces.push(datas.elements[i]);
                    }
                }
            });
            return surfaces;
        }
        getNavMeshSurfacesByBound(min, max, type) {
            var surfaces = [];
            this._naveMeshMaps.forEach((datas) => {
                for (var i = 0, n = datas.length; i < n; i++) {
                    let nav = datas.elements[i];
                    if (nav.agentType != type)
                        continue;
                    if (NavigationUtils._boundInterection(nav.min, nav.max, min, max) >= 0) {
                        surfaces.push(datas.elements[i]);
                    }
                }
            });
            return surfaces;
        }
    }
    BaseNavigationManager._initializePromise = null;

    let c = Laya.ClassUtils.regClass;
    c("NavMeshGrid", NavMeshGrid);
    c("RecastConfig", RecastConfig);
    c("NavigationUtils", NavigationUtils);
    c("AreaMask", AreaMask);

    class NavAgentLinkAnim {
        constructor() {
            this._startPos = new Laya.Vector3();
            this._endPos = new Laya.Vector3();
            this._initPos = new Laya.Vector3();
            this._active = false;
        }
        _clearn() {
            this._active = false;
            this._isStart = false;
            this._runTime = 0;
        }
        _setStartPos(value) {
            value.cloneTo(this._startPos);
        }
        _getSartPos() {
            return this._startPos;
        }
        _setEndPos(value) {
            value.cloneTo(this._endPos);
        }
        _getEndPos() {
            return this._endPos;
        }
        _nearerStartPos(value) {
            return Laya.Vector3.distance(this._startPos, value) < 0.2;
        }
        _nearerEndPos(value) {
            return Laya.Vector3.distance(this._endPos, value) < 0.1;
        }
        _start(maxSpeed, postions) {
            this._isStart = true;
            this._runTime = 0;
            this._totalTime = Laya.Vector3.distance(this._startPos, this._endPos) / maxSpeed;
            postions.cloneTo(this._initPos);
        }
        _update(position, dir) {
            if (!this._isStart)
                return;
            this._runTime += Laya.Laya.timer.delta * 0.001;
            const ta = this._totalTime * 0.05;
            if (this._runTime < ta) {
                const t = this._tween(this._runTime, 0, ta);
                Laya.Vector3.lerp(this._initPos, this._startPos, t, position);
            }
            else {
                const t = this._tween(this._runTime, ta, this._totalTime);
                Laya.Vector3.lerp(this._startPos, this._endPos, t, position);
            }
            Laya.Vector3.subtract(this._endPos, this._startPos, dir);
            dir.y = 0;
            Laya.Vector3.normalize(dir, dir);
        }
        _tween(t, t0, t1) {
            let value = (t - t0) / (t1 - t0);
            return Math.max(Math.min(1, value), 0);
        }
    }

    const tempVector3 = new Laya.Vector3();
    const tempVector31 = new Laya.Vector3();
    class BaseNavAgent extends Laya.Component {
        set radius(value) {
            this._radius = value;
            if (this._crowAgent) {
                let params = this._crowAgent.getparams();
                const radius = this._getradius();
                params.radius = radius;
                params.collisionQueryRange = radius * 12;
                params.pathOptimizationRange = radius * 30;
            }
        }
        get radius() {
            return this._radius;
        }
        set height(value) {
            this._height = value;
            if (this._crowAgent) {
                this._crowAgent.getparams().height = this._getheight();
            }
        }
        get height() {
            return this._height;
        }
        set speed(value) {
            this._speed = value;
            if (this._crowAgent) {
                this._crowAgent.getparams().maxSpeed = this._speed;
            }
        }
        get speed() {
            return this._speed;
        }
        set maxAcceleration(value) {
            this._maxAcceleration = value;
            if (this._crowAgent) {
                this._crowAgent.getparams().maxAcceleration = this._speed;
            }
        }
        get maxAcceleration() {
            return this._maxAcceleration;
        }
        set angularSpeed(value) {
            this._angularSpeed = value;
        }
        get angularSpeed() {
            return this._angularSpeed;
        }
        set quality(value) {
            if (this._quality == value)
                return;
            this._quality = value;
            if (this._crowAgent) {
                let params = this._crowAgent.getparams();
                params.updateFlags = this._getUpdateFlags();
                params.obstacleAvoidanceType = this._quality;
            }
        }
        get quality() {
            return this._quality;
        }
        set priority(value) {
            if (this._priority == value)
                return;
            this._priority = value;
            if (this._crowAgent) {
                let params = this._crowAgent.getparams();
                params.updateFlags = this._getUpdateFlags();
                params.separationWeight = this._priority;
            }
        }
        get priority() {
            return this._priority;
        }
        get isOnNavMesh() {
            return this._crowAgent != null;
        }
        get isOnOffMeshLink() {
            if (!this.isOnNavMesh)
                return this._navAgentLinkAnim._active;
            return this._crowAgent.state == exports.CrowdAgentState.DT_CROWDAGENT_STATE_OFFMESH;
        }
        set agentType(value) {
            if (value == this._agentType)
                return;
            this._agentType = value;
            if (this._crowAgent) {
                this._removeAgent();
                this._addAgent();
            }
        }
        get agentType() {
            return this._agentType;
        }
        set areaMask(value) {
            this._areaMask.flag = value;
        }
        get areaMask() {
            return this._areaMask.flag;
        }
        constructor() {
            super();
            this._targetPos = new Laya.Vector3();
            this._agentType = null;
            this._speed = 3.5;
            this._maxAcceleration = 10;
            this._angularSpeed = 120;
            this._radius = 0.5;
            this._height = 2;
            this._quality = exports.ObstacleAvoidanceType.MedQuality;
            this._priority = 0;
            this._baseOffset = 1;
            this._navMeshSurfaceReady = false;
            this._navAgentLinkAnim = new NavAgentLinkAnim();
            this._areaMask = new AreaMask();
            this._curentSpeed = new Laya.Vector3();
        }
        onUpdate() {
            if (this._crowAgent != null)
                return;
            if (!this._navMeshSurfaceReady)
                this._addAgent();
            if (!this._navAgentLinkAnim._active)
                return;
            let position = tempVector3;
            let dir = tempVector31;
            this._navAgentLinkAnim._update(position, dir);
            if (this._navAgentLinkAnim._nearerEndPos(position)) {
                this._addAgent();
                this._navAgentLinkAnim._clearn();
                this._setTarget(this._targetPos);
            }
            this._updatePosition(position, dir);
        }
        isStop() {
            return Laya.MathUtils3D.isZero(this._curentSpeed.length());
        }
        getCurrentPath() {
            if (!this._currentNaveSurface) {
                this._fllowPath.length = 0;
            }
            else {
                this._getpos(tempVector3);
                this._currentNaveSurface.findFllowPath(this._fllowPath, tempVector3, this._targetPos, this._speed, this._filter);
            }
            return this._fllowPath;
        }
        findDistanceToWall() {
            if (this._crowAgent) {
                this._getpos(tempVector3);
                return this._currentNaveSurface.findDistanceToWall(tempVector3, this._filter);
            }
            else {
                return null;
            }
        }
        _setTarget(value) {
            value.cloneTo(this._targetPos);
            if (!this._navManager)
                return;
            if (this._currentNaveSurface == null || !this._currentNaveSurface.enabled)
                return;
            let targetSurface = this._navManager.getNavMeshSurface(value, this._agentType);
            if (targetSurface == this._currentNaveSurface) {
                this._currentNaveSurface._navMesh._requestMoveTarget(this, this._targetPos);
                return;
            }
            let linkes = this._navManager.getNavMeshLink(this._currentNaveSurface, targetSurface);
            if (linkes == null)
                return;
            let link = null;
            let distance = Number.MAX_VALUE;
            let isstart;
            linkes.forEach((value) => {
                if (value._startNavSurfaces.indexOf(this._currentNaveSurface) >= 0) {
                    let dis = value.getDistance();
                    if (dis < distance) {
                        dis = distance;
                        link = value;
                        isstart = true;
                    }
                }
                else if (value._endNavSurfaces.indexOf(this._currentNaveSurface) >= 0 && value._bidirectional) {
                    let dis = value.getDistance();
                    if (dis < distance) {
                        dis = distance;
                        link = value;
                        isstart = false;
                    }
                }
            });
            if (link == null) {
                return;
            }
            this._navAgentLinkAnim.targetSurface = targetSurface;
            this._navAgentLinkAnim._active = true;
            if (isstart) {
                this._navAgentLinkAnim._setStartPos(link.globalStart);
                this._navAgentLinkAnim._setEndPos(link.globalEnd);
            }
            else {
                this._navAgentLinkAnim._setStartPos(link.globalEnd);
                this._navAgentLinkAnim._setEndPos(link.globalStart);
            }
            let startPos = this._navAgentLinkAnim._getSartPos();
            let refPoint = this._currentNaveSurface._navMesh._findNearestPoly(startPos, this._filter, startPos);
            if (refPoint >= 0) {
                this._currentNaveSurface._navMesh._requestMoveTarget(this, startPos);
            }
        }
        _getpos(vec) {
            throw new Laya.NotImplementedError();
        }
        _getcollisionQueryRange() {
            return this.radius * 12;
        }
        _getpathOptimizationRange() {
            return this.radius * 30;
        }
        _getManager() {
            throw new Error("BaseNavMeshSurface: must override this function");
        }
        _onEnable() {
            super._onEnable();
            this._fllowPath = [];
            let manager = this._navManager = this._getManager();
            this._areaMask._setAreaMap(manager.getAreaFlagMap());
            this._addAgent();
        }
        _onDisable() {
            super._onDisable();
            this._removeAgent();
        }
        _addAgent() {
            if (this._navManager == null)
                return;
            this._getpos(tempVector3);
            let surface = this._navManager.getNavMeshSurface(tempVector3, this._agentType);
            if (surface == null) {
                return;
            }
            this._currentNaveSurface = surface;
            this._currentNaveSurface._navMesh._addAgent(this);
            this._navMeshSurfaceReady = true;
        }
        _removeAgent() {
            if (this._currentNaveSurface == null || this._agentId == null || this._crowAgent == null)
                return;
            this._currentNaveSurface._navMesh._removeAgent(this);
            this._currentNaveSurface = null;
            this._navMeshSurfaceReady = false;
        }
        _getheight() {
            throw new Laya.NotImplementedError();
        }
        _getradius() {
            throw new Laya.NotImplementedError();
        }
        _getUpdateFlags() {
            let updateFlags = exports.UpdateFlags.DT_CROWD_ANTICIPATE_TURNS | exports.UpdateFlags.DT_CROWD_OPTIMIZE_VIS | exports.UpdateFlags.DT_CROWD_OPTIMIZE_TOPO;
            if (this._quality > 0) {
                updateFlags |= exports.UpdateFlags.DT_CROWD_OBSTACLE_AVOIDANCE;
            }
            if (this._priority > 0) {
                updateFlags |= exports.UpdateFlags.DT_CROWD_SEPARATION;
            }
            return updateFlags;
        }
        _onDestroy() {
            super._onDestroy();
            this._removeAgent();
        }
        _updateNavMesh(pos, dir) {
            if (this._crowAgent == null)
                return;
            let position = tempVector3;
            let direction = tempVector31;
            position.fromArray(pos);
            direction.fromArray(dir);
            let isNearerStart = false;
            if (this._navAgentLinkAnim._active) {
                isNearerStart = this._navAgentLinkAnim._nearerStartPos(position);
            }
            if (isNearerStart) {
                this._removeAgent();
                this._navAgentLinkAnim._start(this._speed, position);
            }
            direction.cloneTo(this._curentSpeed);
            this._updatePosition(position, direction);
        }
        _updatePosition(pos, dir) {
            throw new Laya.NotImplementedError();
        }
        _cloneTo(dest) {
            let agent = dest;
            agent.agentType = this.agentType;
            agent.speed = this._speed;
            agent.angularSpeed = this.angularSpeed;
            agent.radius = this.radius;
            agent.height = this.height;
            agent.areaMask = this.areaMask;
            agent.quality = this.quality;
            agent.priority = this.priority;
            agent.maxAcceleration = this.maxAcceleration;
            super._cloneTo(dest);
        }
    }

    class BaseData {
        constructor() {
            this._transfrom = new Laya.Matrix4x4();
            this._min = new Laya.Vector3();
            this._max = new Laya.Vector3();
            this._agentType = exports.NavigationConfig.defaltAgentName;
            this._areaFlags = exports.NavigationConfig.defaltUnWalk;
            this._cacheDatas = [];
        }
        set agentType(value) {
            this._agentType = value;
        }
        get agentType() {
            return this._agentType;
        }
        set areaFlag(value) {
            this._areaFlags = value;
            this._cacheDatas.forEach(element => {
                element._updateAreaFlag(value);
            });
        }
        get areaFlag() {
            return this._areaFlags;
        }
        _refeashData() {
            this._cacheDatas.forEach(element => {
                element._setCacheFlag(CacheData.DataFlag);
            });
        }
        _refeahTransfrom() {
            this._cacheDatas.forEach(element => {
                element._updateTransfrom(this._transfrom);
            });
        }
        _refeahBound() {
            this._cacheDatas.forEach(element => {
                element._cacheBound(this._min, this._max);
            });
        }
    }

    const tempVec3 = new Laya.Vector3();
    const tempMat = new Laya.Matrix4x4();
    class ModifierVolumeData extends BaseData {
        constructor(yOff = 0.1) {
            super();
            this._datas = [];
            this._yOffset = 0.1;
            this._yOffset = yOff;
        }
        _updateBuffer(cache, flag) {
            let mesh = cache._surface._navMesh;
            if (cache._getCacheFlag(CacheData.TransfromFlag) || cache._getCacheFlag(CacheData.DataFlag)) {
                if (mesh.is3D) {
                    if (this._buffer == null) {
                        this._buffer = new Float32Array(22);
                    }
                    this._max.setValue(1, 1, 1);
                    this._min.setValue(-1, -1, -1);
                    NavigationUtils._transfromBoundBox(this._min, this._max, this._transfrom, this._min, this._max);
                    this._buffer[0] = this._min.x;
                    this._buffer[1] = this._min.y;
                    this._buffer[2] = this._min.z;
                    this._buffer[3] = this._max.x;
                    this._buffer[4] = this._max.y;
                    this._buffer[5] = this._max.z;
                    this._transfrom.invert(tempMat);
                    this._buffer.set(tempMat.elements, 6);
                    cache._cacheBound(this._min, this._max);
                }
                else {
                    if (this._buffer == null || this._buffer.length != this._datas.length) {
                        this._buffer = new Float32Array(this._datas.length);
                    }
                    let count = this._datas.length / 3;
                    this._max.setValue(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
                    this._min.setValue(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
                    for (var i = 0; i < count; i++) {
                        tempVec3.setValue(this._datas[i * 3], this._datas[i * 3 + 1], this._datas[i * 3 + 2]);
                        Laya.Vector3.transformCoordinate(tempVec3, this._transfrom, tempVec3);
                        this._buffer[i * 3] = tempVec3.x;
                        this._buffer[i * 3 + 1] = tempVec3.y;
                        this._buffer[i * 3 + 2] = tempVec3.z;
                        this._max.x = Math.max(this._max.x, tempVec3.x);
                        this._max.y = Math.max(this._max.y, tempVec3.y);
                        this._max.z = Math.max(this._max.z, tempVec3.z);
                        this._min.x = Math.min(this._min.x, tempVec3.x);
                        this._min.y = Math.min(this._min.y, tempVec3.y);
                        this._min.z = Math.min(this._min.z, tempVec3.z);
                    }
                    this._min.x -= this._yOffset;
                    this._max.y += this._yOffset;
                    cache._cacheBound(this._min, this._max);
                }
            }
            mesh._updateConvexVolume(cache.id, this._buffer, this._min.y, this._max.y, flag);
        }
        _initSurface(surface) {
            this._cacheDatas = [];
            surface.forEach(element => {
                let cache = element._addConvexVoume(this);
                cache._setUpdateDataHander(Laya.Handler.create(this, this._updateBuffer, undefined, false));
                this._cacheDatas.push(cache);
                cache._updateAreaFlag(this._areaFlags);
                cache._updateTransfrom(this._transfrom);
                cache._setCacheFlag(CacheData.DataFlag);
            });
        }
        _destory() {
            this._cacheDatas.forEach(element => {
                element._surface._deleteCovexVoume(this);
            });
            this._cacheDatas = [];
        }
    }

    class NavMeshLinkData extends BaseData {
        constructor() {
            super();
            this._startPoint = new Laya.Vector3();
            this._endPoint = new Laya.Vector3();
            this._width = 1;
            this._bidirectional = true;
            this.globalStart = new Laya.Vector3();
            this.globalEnd = new Laya.Vector3();
            this._startNavSurfaces = [];
            this._endNavSurfaces = [];
            this._regisgMaps = [];
        }
        _updateWidth(value) {
            if (this._width == value)
                return;
            this._width = value;
            this._updateData(CacheData.OtherDataFlag);
        }
        _updateBidirectional(value) {
            if (this._bidirectional == value)
                return;
            this._bidirectional = value;
            this._updateData(CacheData.OtherDataFlag);
        }
        _updateStartPoint(value) {
            if (Laya.Vector3.equals(this._startPoint, value))
                return;
            value.cloneTo(this._startPoint);
            this._updateData(CacheData.DataFlag);
        }
        _updateEndPoint(value) {
            if (Laya.Vector3.equals(this._endPoint, value))
                return;
            value.cloneTo(this._endPoint);
            this._updateData(CacheData.DataFlag);
        }
        _updateData(flag) {
            this._cacheDatas.forEach(element => {
                element._setCacheFlag(flag);
            });
        }
        _initSurface(surface) {
            this._cacheDatas.length = 0;
            surface.forEach(element => {
                let cache = element._addModifileLink(this);
                cache._setUpdateDataHander(Laya.Handler.create(this, this._updateBuffer, undefined, false));
                this._cacheDatas.push(cache);
                cache._updateAreaFlag(this._areaFlags);
                cache._updateTransfrom(this._transfrom);
                cache._setCacheFlag(CacheData.DataFlag);
            });
        }
        _updateBuffer(cache, areaFlag) {
            if (cache._getCacheFlag(CacheData.DataFlag | CacheData.TransfromFlag)) {
                Laya.Vector3.transformCoordinate(this._startPoint, this._transfrom, this.globalStart);
                Laya.Vector3.transformCoordinate(this._endPoint, this._transfrom, this.globalEnd);
            }
            let surface = cache._surface;
            let manager = surface._manager;
            var starts = manager.getNavMeshSurfaces(this.globalStart);
            var ends = manager.getNavMeshSurfaces(this.globalEnd);
            for (var i = starts.length - 1; i >= 0; i--) {
                let surface = starts[i];
                let index = ends.indexOf(surface);
                if (index < 0) {
                    continue;
                }
                ends.splice(index, 1);
                starts.splice(i);
                surface._navMesh._addNavMeshLink(cache.id, this.globalStart, this.globalEnd, this._width, this._bidirectional, areaFlag);
            }
            if (ends.length > 0 && starts.length > 0) {
                starts.forEach((value) => {
                    this._startNavSurfaces.push(value);
                });
                ends.forEach((value) => {
                    this._endNavSurfaces.push(value);
                });
                for (var i = 0, n = starts.length; i < n; i++) {
                    for (var j = 0, k = ends.length; j < k; j++) {
                        manager.regNavMeshLink(starts[i], ends[j], this);
                    }
                }
            }
        }
        getDistance() {
            return Laya.Vector3.distance(this._startPoint, this._endPoint);
        }
        destroy() {
            this._cacheDatas.forEach(element => {
                element._destroy();
            });
        }
    }

    class NavModifleData extends BaseData {
        set datas(value) {
            if (this._datas == value)
                return;
            this._datas = value;
            this._refeashData();
        }
        get datas() {
            return this._datas;
        }
        constructor() {
            super();
            this._bindData = NavigationUtils._createdtNavTileCache();
        }
        _updateBuffer(cache, flag) {
            if (this._datas == null)
                return;
            if (cache._getCacheFlag(CacheData.DataFlag)) {
                this._bindData.init(this._datas.bindData);
            }
            if (cache._getCacheFlag(CacheData.DataFlag | CacheData.AreaFlag)) {
                this._bindData.setFlag(flag);
            }
            if (cache._getCacheFlag(CacheData.DataFlag | CacheData.TransfromFlag)) {
                this._bindData.transfromData(this._transfrom.elements);
                NavigationUtils._transfromBoundBox(this._datas._boundMin, this._datas._boundMax, this._transfrom, this._min, this._max);
                cache._cacheBound(this._min, this._max);
            }
        }
        _updateTileIndexs(cache, oldTileIndex, newTileIndexs) {
            let surface = cache._surface;
            oldTileIndex.forEach((index) => {
                surface._featureCache.get(index).delete(this._bindData);
            });
            if (this._datas == null)
                return;
            newTileIndexs.forEach((index) => {
                surface._featureCache.get(index).add(this._bindData);
            });
        }
        _initSurface(surface) {
            this._cacheDatas = [];
            surface.forEach(element => {
                let cache = element._addModifileNavMesh(this);
                cache._setUpdateDataHander(Laya.Handler.create(this, this._updateBuffer, undefined, false));
                cache._setTileHander(Laya.Handler.create(this, this._updateTileIndexs, undefined, false));
                this._cacheDatas.push(cache);
                cache._updateAreaFlag(this._areaFlags);
                cache._updateTransfrom(this._transfrom);
                cache._setCacheFlag(CacheData.DataFlag);
            });
        }
        _destory() {
            this._cacheDatas.forEach(element => {
                let surface = element._surface;
                let oldTileIndex = element._titleIndex;
                oldTileIndex.forEach((index) => {
                    surface._featureCache.get(index).delete(this._bindData);
                });
                surface._removeModifileNavMesh(this);
            });
            this._cacheDatas = [];
        }
    }

    exports.AreaMask = AreaMask;
    exports.BaseData = BaseData;
    exports.BaseNavAgent = BaseNavAgent;
    exports.BaseNavMesh = BaseNavMesh;
    exports.BaseNavMeshSurface = BaseNavMeshSurface;
    exports.BaseNavigationManager = BaseNavigationManager;
    exports.CacheData = CacheData;
    exports.ItemMapId = ItemMapId;
    exports.ModifierVolumeData = ModifierVolumeData;
    exports.NavAgentLinkAnim = NavAgentLinkAnim;
    exports.NavAreaFlag = NavAreaFlag;
    exports.NavMeshGrid = NavMeshGrid;
    exports.NavMeshLinkData = NavMeshLinkData;
    exports.NavModifleData = NavModifleData;
    exports.NavTileCache = NavTileCache;
    exports.NavTileData = NavTileData;
    exports.NavigationPathData = NavigationPathData;
    exports.NavigationUtils = NavigationUtils;
    exports.RecastConfig = RecastConfig;
    exports.TitleConfig = TitleConfig;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.navMeshCommon.js.map

var Recast=(()=>{var _scriptName=typeof document!=="undefined"&&document.currentScript?document.currentScript.src:undefined;return async function(moduleArg={}){var moduleRtn;function _defineProperty(e,r,t){return(r=_toPropertyKey(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function _toPropertyKey(t){var i=_toPrimitive(t,"string");return"symbol"==typeof i?i:i+""}function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}var Module=moduleArg;var ENVIRONMENT_IS_WEB=true;var ENVIRONMENT_IS_WORKER=false;var arguments_=[];var thisProgram="./this.program";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var readAsync,readBinary;if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){try{scriptDirectory=new URL(".",_scriptName).href}catch{}{readAsync=async url=>{var response=await fetch(url,{credentials:"same-origin"});if(response.ok){return response.arrayBuffer()}throw new Error(response.status+" : "+response.url)}}}else{}var out=console.log.bind(console);var err=console.error.bind(console);var wasmBinary;var ABORT=false;var readyPromiseResolve,readyPromiseReject;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;var runtimeInitialized=false;function updateMemoryViews(){var b=wasmMemory.buffer;HEAP8=new Int8Array(b);HEAP16=new Int16Array(b);HEAPU8=new Uint8Array(b);HEAPU16=new Uint16Array(b);HEAP32=new Int32Array(b);HEAPU32=new Uint32Array(b);HEAPF32=new Float32Array(b);HEAPF64=new Float64Array(b)}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(onPreRuns)}function initRuntime(){runtimeInitialized=true;wasmExports["O"]()}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(onPostRuns)}function abort(what){var _Module$onAbort,_readyPromiseReject;(_Module$onAbort=Module["onAbort"])===null||_Module$onAbort===void 0||_Module$onAbort.call(Module,what);what="Aborted("+what+")";err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);(_readyPromiseReject=readyPromiseReject)===null||_readyPromiseReject===void 0||_readyPromiseReject(e);throw e}var wasmBinaryFile;function findWasmBinary(){return locateFile("recast-navigation-wasm.wasm")}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}async function getWasmBinary(binaryFile){if(!wasmBinary){try{var response=await readAsync(binaryFile);return new Uint8Array(response)}catch{}}return getBinarySync(binaryFile)}async function instantiateArrayBuffer(binaryFile,imports){try{var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);return instance}catch(reason){err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)}}async function instantiateAsync(binary,binaryFile,imports){if(!binary){try{var response=fetch(binaryFile,{credentials:"same-origin"});var instantiationResult=await WebAssembly.instantiateStreaming(response,imports);return instantiationResult}catch(reason){err(`wasm streaming compile failed: ${reason}`);err("falling back to ArrayBuffer instantiation")}}return instantiateArrayBuffer(binaryFile,imports)}function getWasmImports(){var imports={a:wasmImports};return imports}async function createWasm(){function receiveInstance(instance,module){wasmExports=instance.exports;assignWasmExports(wasmExports);updateMemoryViews();return wasmExports}function receiveInstantiationResult(result){return receiveInstance(result["instance"])}var info=getWasmImports();if(Module["instantiateWasm"]){return new Promise((resolve,reject)=>{Module["instantiateWasm"](info,(inst,mod)=>{resolve(receiveInstance(inst,mod))})})}wasmBinaryFile!==null&&wasmBinaryFile!==void 0?wasmBinaryFile:wasmBinaryFile=findWasmBinary();var result=await instantiateAsync(wasmBinary,wasmBinaryFile,info);var exports=receiveInstantiationResult(result);return exports}class ExitStatus{constructor(status){_defineProperty(this,"name","ExitStatus");this.message=`Program terminated with exit(${status})`;this.status=status}}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var onPostRuns=[];var addOnPostRun=cb=>onPostRuns.push(cb);var onPreRuns=[];var addOnPreRun=cb=>onPreRuns.push(cb);var noExitRuntime=true;class ExceptionInfo{constructor(excPtr){this.excPtr=excPtr;this.ptr=excPtr-24}set_type(type){HEAPU32[this.ptr+4>>2]=type}get_type(){return HEAPU32[this.ptr+4>>2]}set_destructor(destructor){HEAPU32[this.ptr+8>>2]=destructor}get_destructor(){return HEAPU32[this.ptr+8>>2]}set_caught(caught){caught=caught?1:0;HEAP8[this.ptr+12]=caught}get_caught(){return HEAP8[this.ptr+12]!=0}set_rethrown(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+13]=rethrown}get_rethrown(){return HEAP8[this.ptr+13]!=0}init(type,destructor){this.set_adjusted_ptr(0);this.set_type(type);this.set_destructor(destructor)}set_adjusted_ptr(adjustedPtr){HEAPU32[this.ptr+16>>2]=adjustedPtr}get_adjusted_ptr(){return HEAPU32[this.ptr+16>>2]}}var exceptionLast=0;var uncaughtExceptionCount=0;var ___cxa_throw=(ptr,type,destructor)=>{var info=new ExceptionInfo(ptr);info.init(type,destructor);exceptionLast=ptr;uncaughtExceptionCount++;throw exceptionLast};var __abort_js=()=>abort("");var tupleRegistrations={};var runDestructors=destructors=>{while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr)}};function readPointer(pointer){return this.fromWireType(HEAPU32[pointer>>2])}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var InternalError=class InternalError extends Error{constructor(message){super(message);this.name="InternalError"}};var throwInternalError=message=>{throw new InternalError(message)};var whenDependentTypesAreResolved=(myTypes,dependentTypes,getTypeConverters)=>{myTypes.forEach(type=>typeDependencies[type]=dependentTypes);function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count")}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i])}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;for(let[i,dt]of dependentTypes.entries()){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt]}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[]}awaitingDependencies[dt].push(()=>{typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters)}})}}if(0===unregisteredTypes.length){onComplete(typeConverters)}};var __embind_finalize_value_array=rawTupleType=>{var reg=tupleRegistrations[rawTupleType];delete tupleRegistrations[rawTupleType];var elements=reg.elements;var elementsLength=elements.length;var elementTypes=elements.map(elt=>elt.getterReturnType).concat(elements.map(elt=>elt.setterArgumentType));var rawConstructor=reg.rawConstructor;var rawDestructor=reg.rawDestructor;whenDependentTypesAreResolved([rawTupleType],elementTypes,elementTypes=>{for(const[i,elt]of elements.entries()){const getterReturnType=elementTypes[i];const getter=elt.getter;const getterContext=elt.getterContext;const setterArgumentType=elementTypes[i+elementsLength];const setter=elt.setter;const setterContext=elt.setterContext;elt.read=ptr=>getterReturnType.fromWireType(getter(getterContext,ptr));elt.write=(ptr,o)=>{var destructors=[];setter(setterContext,ptr,setterArgumentType.toWireType(destructors,o));runDestructors(destructors)}}return[{name:reg.name,fromWireType:ptr=>{var rv=new Array(elementsLength);for(var i=0;i<elementsLength;++i){rv[i]=elements[i].read(ptr)}rawDestructor(ptr);return rv},toWireType:(destructors,o)=>{if(elementsLength!==o.length){throw new TypeError(`Incorrect number of tuple elements for ${reg.name}: expected=${elementsLength}, actual=${o.length}`)}var ptr=rawConstructor();for(var i=0;i<elementsLength;++i){elements[i].write(ptr,o[i])}if(destructors!==null){destructors.push(rawDestructor,ptr)}return ptr},readValueFromPointer:readPointer,destructorFunction:rawDestructor}]})};var structRegistrations={};var __embind_finalize_value_object=structType=>{var reg=structRegistrations[structType];delete structRegistrations[structType];var rawConstructor=reg.rawConstructor;var rawDestructor=reg.rawDestructor;var fieldRecords=reg.fields;var fieldTypes=fieldRecords.map(field=>field.getterReturnType).concat(fieldRecords.map(field=>field.setterArgumentType));whenDependentTypesAreResolved([structType],fieldTypes,fieldTypes=>{var fields={};for(var[i,field]of fieldRecords.entries()){const getterReturnType=fieldTypes[i];const getter=field.getter;const getterContext=field.getterContext;const setterArgumentType=fieldTypes[i+fieldRecords.length];const setter=field.setter;const setterContext=field.setterContext;fields[field.fieldName]={read:ptr=>getterReturnType.fromWireType(getter(getterContext,ptr)),write:(ptr,o)=>{var destructors=[];setter(setterContext,ptr,setterArgumentType.toWireType(destructors,o));runDestructors(destructors)},optional:getterReturnType.optional}}return[{name:reg.name,fromWireType:ptr=>{var rv={};for(var i in fields){rv[i]=fields[i].read(ptr)}rawDestructor(ptr);return rv},toWireType:(destructors,o)=>{for(var fieldName in fields){if(!(fieldName in o)&&!fields[fieldName].optional){throw new TypeError(`Missing field: "${fieldName}"`)}}var ptr=rawConstructor();for(fieldName in fields){fields[fieldName].write(ptr,o[fieldName])}if(destructors!==null){destructors.push(rawDestructor,ptr)}return ptr},readValueFromPointer:readPointer,destructorFunction:rawDestructor}]})};var __embind_register_bigint=(primitiveType,name,size,minRange,maxRange)=>{};var AsciiToString=ptr=>{var str="";while(1){var ch=HEAPU8[ptr++];if(!ch)return str;str+=String.fromCharCode(ch)}};var BindingError=class BindingError extends Error{constructor(message){super(message);this.name="BindingError"}};var throwBindingError=message=>{throw new BindingError(message)};function sharedRegisterType(rawType,registeredInstance){let options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var name=registeredInstance.name;if(!rawType){throwBindingError(`type "${name}" must have a positive integer typeid pointer`)}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else{throwBindingError(`Cannot register type '${name}' twice`)}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(cb=>cb())}}function registerType(rawType,registeredInstance){let options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};return sharedRegisterType(rawType,registeredInstance,options)}var __embind_register_bool=(rawType,name,trueValue,falseValue)=>{name=AsciiToString(name);registerType(rawType,{name,fromWireType:function(wt){return!!wt},toWireType:function(destructors,o){return o?trueValue:falseValue},readValueFromPointer:function(pointer){return this.fromWireType(HEAPU8[pointer])},destructorFunction:null})};var shallowCopyInternalPointer=o=>({count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType});var throwInstanceAlreadyDeleted=obj=>{function getInstanceTypeName(handle){return handle.$$.ptrType.registeredClass.name}throwBindingError(getInstanceTypeName(obj)+" instance already deleted")};var finalizationRegistry=false;var detachFinalizer=handle=>{};var runDestructor=$$=>{if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr)}else{$$.ptrType.registeredClass.rawDestructor($$.ptr)}};var releaseClassHandle=$$=>{$$.count.value-=1;var toDelete=0===$$.count.value;if(toDelete){runDestructor($$)}};var attachFinalizer=handle=>{if(!globalThis.FinalizationRegistry){attachFinalizer=handle=>handle;return handle}finalizationRegistry=new FinalizationRegistry(info=>{releaseClassHandle(info.$$)});attachFinalizer=handle=>{var $$=handle.$$;var hasSmartPtr=!!$$.smartPtr;if(hasSmartPtr){var info={$$};finalizationRegistry.register(handle,info,handle)}return handle};detachFinalizer=handle=>finalizationRegistry.unregister(handle);return attachFinalizer(handle)};var deletionQueue=[];var flushPendingDeletes=()=>{while(deletionQueue.length){var obj=deletionQueue.pop();obj.$$.deleteScheduled=false;obj["delete"]()}};var delayFunction;var init_ClassHandle=()=>{let proto=ClassHandle.prototype;Object.assign(proto,{isAliasOf(other){if(!(this instanceof ClassHandle)){return false}if(!(other instanceof ClassHandle)){return false}var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;other.$$=other.$$;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass}return leftClass===rightClass&&left===right},clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this}else{var clone=attachFinalizer(Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}}));clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone}},delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}detachFinalizer(this);releaseClassHandle(this.$$);if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=undefined;this.$$.ptr=undefined}},isDeleted(){return!this.$$.ptr},deleteLater(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}deletionQueue.push(this);if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes)}this.$$.deleteScheduled=true;return this}});const symbolDispose=Symbol.dispose;if(symbolDispose){proto[symbolDispose]=proto["delete"]}};function ClassHandle(){}var createNamedFunction=(name,func)=>Object.defineProperty(func,"name",{value:name});var registeredPointers={};var ensureOverloadTable=(proto,methodName,humanName)=>{if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}if(!proto[methodName].overloadTable.hasOwnProperty(args.length)){throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`)}return proto[methodName].overloadTable[args.length].apply(this,args)};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc}};var exposePublicSymbol=(name,value,numArguments)=>{if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError(`Cannot register public name '${name}' twice`)}ensureOverloadTable(Module,name,name);if(Module[name].overloadTable.hasOwnProperty(numArguments)){throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`)}Module[name].overloadTable[numArguments]=value}else{Module[name]=value;Module[name].argCount=numArguments}};var char_0=48;var char_9=57;var makeLegalFunctionName=name=>{name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return`_${name}`}return name};function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[]}var upcastPointer=(ptr,ptrClass,desiredClass)=>{while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`)}ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass}return ptr};var embindRepr=v=>{if(v===null){return"null"}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString()}else{return""+v}};function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError(`null is not a valid ${this.name}`)}return 0}if(!handle.$$){throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`)}if(!handle.$$.ptr){throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`)}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function genericPointerToWireType(destructors,handle){var ptr;if(handle===null){if(this.isReference){throwBindingError(`null is not a valid ${this.name}`)}if(this.isSmartPointer){ptr=this.rawConstructor();if(destructors!==null){destructors.push(this.rawDestructor,ptr)}return ptr}else{return 0}}if(!handle||!handle.$$){throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`)}if(!handle.$$.ptr){throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`)}if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name} to parameter type ${this.name}`)}var handleClass=handle.$$.ptrType.registeredClass;ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError("Passing raw pointer to smart pointer is illegal")}switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}else{throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name} to parameter type ${this.name}`)}break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}else{var clonedHandle=handle["clone"]();ptr=this.rawShare(ptr,Emval.toHandle(()=>clonedHandle["delete"]()));if(destructors!==null){destructors.push(this.rawDestructor,ptr)}}break;default:throwBindingError("Unsupported sharing policy")}}return ptr}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError(`null is not a valid ${this.name}`)}return 0}if(!handle.$$){throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`)}if(!handle.$$.ptr){throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`)}if(handle.$$.ptrType.isConst){throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`)}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}var downcastPointer=(ptr,ptrClass,desiredClass)=>{if(ptrClass===desiredClass){return ptr}if(undefined===desiredClass.baseClass){return null}var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null){return null}return desiredClass.downcast(rv)};var registeredInstances={};var getBasestPointer=(class_,ptr)=>{if(ptr===undefined){throwBindingError("ptr should not be undefined")}while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass}return ptr};var getInheritedInstance=(class_,ptr)=>{ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr]};var makeClassHandle=(prototype,record)=>{if(!record.ptrType||!record.ptr){throwInternalError("makeClassHandle requires ptr and ptrType")}var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr){throwInternalError("Both smartPtrType and smartPtr must be specified")}record.count={value:1};return attachFinalizer(Object.create(prototype,{$$:{value:record,writable:true}}))};function RegisteredPointer_fromWireType(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance["clone"]()}else{var rv=registeredInstance["clone"]();this.destructor(ptr);return rv}}function makeDefaultHandle(){if(this.isSmartPointer){return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr})}}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord){return makeDefaultHandle.call(this)}var toType;if(this.isConst){toType=registeredPointerRecord.constPointerType}else{toType=registeredPointerRecord.pointerType}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null){return makeDefaultHandle.call(this)}if(this.isSmartPointer){return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp})}}var init_RegisteredPointer=()=>{Object.assign(RegisteredPointer.prototype,{getPointee(ptr){if(this.rawGetPointee){ptr=this.rawGetPointee(ptr)}return ptr},destructor(ptr){var _this$rawDestructor;(_this$rawDestructor=this.rawDestructor)===null||_this$rawDestructor===void 0||_this$rawDestructor.call(this,ptr)},readValueFromPointer:readPointer,fromWireType:RegisteredPointer_fromWireType})};function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===undefined){if(isConst){this.toWireType=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null}else{this.toWireType=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null}}else{this.toWireType=genericPointerToWireType}}var replacePublicSymbol=(name,value,numArguments)=>{if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistent public symbol")}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value}else{Module[name]=value;Module[name].argCount=numArguments}};var dynCalls={};var dynCallLegacy=(sig,ptr,args)=>{sig=sig.replace(/p/g,"i");var f=dynCalls[sig];return f(ptr,...args)};var wasmTableMirror=[];var getWasmTableEntry=funcPtr=>{var func=wasmTableMirror[funcPtr];if(!func){wasmTableMirror[funcPtr]=func=wasmTable.get(funcPtr)}return func};var dynCall=function(sig,ptr){let args=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];let promising=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;if(sig.includes("j")){return dynCallLegacy(sig,ptr,args)}var func=getWasmTableEntry(ptr);var rtn=func(...args);function convert(rtn){return rtn}return convert(rtn)};var getDynCaller=function(sig,ptr){let promising=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;return function(){for(var _len2=arguments.length,args=new Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2]}return dynCall(sig,ptr,args,promising)}};var embind__requireFunction=function(signature,rawFunction){let isAsync=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;signature=AsciiToString(signature);function makeDynCaller(){if(signature.includes("j")){return getDynCaller(signature,rawFunction)}var rtn=getWasmTableEntry(rawFunction);return rtn}var fp=makeDynCaller();if(typeof fp!="function"){throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`)}return fp};class UnboundTypeError extends Error{}var getTypeName=type=>{var ptr=___getTypeName(type);var rv=AsciiToString(ptr);_free(ptr);return rv};var throwUnboundTypeError=(message,types)=>{var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return}if(registeredTypes[type]){return}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true}types.forEach(visit);throw new UnboundTypeError(`${message}: `+unboundTypes.map(getTypeName).join([", "]))};var __embind_register_class=(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor)=>{name=AsciiToString(name);getActualType=embind__requireFunction(getActualTypeSignature,getActualType);upcast&&(upcast=embind__requireFunction(upcastSignature,upcast));downcast&&(downcast=embind__requireFunction(downcastSignature,downcast));rawDestructor=embind__requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,function(){throwUnboundTypeError(`Cannot construct ${name} due to unbound types`,[baseClassRawType])});whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],base=>{base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype}else{basePrototype=ClassHandle.prototype}var constructor=createNamedFunction(name,function(){if(Object.getPrototypeOf(this)!==instancePrototype){throw new BindingError(`Use 'new' to construct ${name}`)}if(undefined===registeredClass.constructor_body){throw new BindingError(`${name} has no accessible constructor`)}for(var _len3=arguments.length,args=new Array(_len3),_key3=0;_key3<_len3;_key3++){args[_key3]=arguments[_key3]}var body=registeredClass.constructor_body[args.length];if(undefined===body){throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${args.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`)}return body.apply(this,args)});var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);if(registeredClass.baseClass){var _registeredClass$base,_registeredClass$base2;(_registeredClass$base2=(_registeredClass$base=registeredClass.baseClass).__derivedClasses)!==null&&_registeredClass$base2!==void 0?_registeredClass$base2:_registeredClass$base.__derivedClasses=[];registeredClass.baseClass.__derivedClasses.push(registeredClass)}var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return[referenceConverter,pointerConverter,constPointerConverter]})};var heap32VectorToArray=(count,firstElement)=>{var array=[];for(var i=0;i<count;i++){array.push(HEAPU32[firstElement+i*4>>2])}return array};function usesDestructorStack(argTypes){for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){return true}}return false}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc,isAsync){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=usesDestructorStack(argTypes);var returns=!argTypes[0].isVoid;var expectedArgCount=argCount-2;var argsWired=new Array(expectedArgCount);var invokerFuncArgs=[];var destructors=[];var invokerFn=function(){destructors.length=0;var thisWired;invokerFuncArgs.length=isClassMethodFunc?2:1;invokerFuncArgs[0]=cppTargetFunc;if(isClassMethodFunc){thisWired=argTypes[1].toWireType(destructors,this);invokerFuncArgs[1]=thisWired}for(var i=0;i<expectedArgCount;++i){argsWired[i]=argTypes[i+2].toWireType(destructors,i<0||arguments.length<=i?undefined:arguments[i]);invokerFuncArgs.push(argsWired[i])}var rv=cppInvokerFunc(...invokerFuncArgs);function onDone(rv){if(needsDestructorStack){runDestructors(destructors)}else{for(var i=isClassMethodFunc?1:2;i<argTypes.length;i++){var param=i===1?thisWired:argsWired[i-2];if(argTypes[i].destructorFunction!==null){argTypes[i].destructorFunction(param)}}}if(returns){return argTypes[0].fromWireType(rv)}}return onDone(rv)};return createNamedFunction(humanName,invokerFn)}var __embind_register_class_constructor=(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor)=>{var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=embind__requireFunction(invokerSignature,invoker);whenDependentTypesAreResolved([],[rawClassType],classType=>{classType=classType[0];var humanName=`constructor ${classType.name}`;if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[]}if(undefined!==classType.registeredClass.constructor_body[argCount-1]){throw new BindingError(`Cannot register multiple constructors with identical number of parameters (${argCount-1}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`)}classType.registeredClass.constructor_body[argCount-1]=()=>{throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`,rawArgTypes)};whenDependentTypesAreResolved([],rawArgTypes,argTypes=>{argTypes.splice(1,0,null);classType.registeredClass.constructor_body[argCount-1]=craftInvokerFunction(humanName,argTypes,null,invoker,rawConstructor);return[]});return[]})};var getFunctionName=signature=>{signature=signature.trim();const argsIndex=signature.indexOf("(");if(argsIndex===-1)return signature;return signature.slice(0,argsIndex)};var __embind_register_class_function=(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual,isAsync,isNonnullReturn)=>{var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=AsciiToString(methodName);methodName=getFunctionName(methodName);rawInvoker=embind__requireFunction(invokerSignature,rawInvoker,isAsync);whenDependentTypesAreResolved([],[rawClassType],classType=>{classType=classType[0];var humanName=`${classType.name}.${methodName}`;if(methodName.startsWith("@@")){methodName=Symbol[methodName.substring(2)]}if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName)}function unboundTypesHandler(){throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`,rawArgTypes)}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler}else{ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler}whenDependentTypesAreResolved([],rawArgTypes,argTypes=>{var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context,isAsync);if(undefined===proto[methodName].overloadTable){memberFunction.argCount=argCount-2;proto[methodName]=memberFunction}else{proto[methodName].overloadTable[argCount-2]=memberFunction}return[]});return[]})};var validateThis=(this_,classType,humanName)=>{if(!(this_ instanceof Object)){throwBindingError(`${humanName} with invalid "this": ${this_}`)}if(!(this_ instanceof classType.registeredClass.constructor)){throwBindingError(`${humanName} incompatible with "this" of type ${this_.constructor.name}`)}if(!this_.$$.ptr){throwBindingError(`cannot call emscripten binding method ${humanName} on deleted object`)}return upcastPointer(this_.$$.ptr,this_.$$.ptrType.registeredClass,classType.registeredClass)};var __embind_register_class_property=(classType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext)=>{fieldName=AsciiToString(fieldName);getter=embind__requireFunction(getterSignature,getter);whenDependentTypesAreResolved([],[classType],classType=>{classType=classType[0];var humanName=`${classType.name}.${fieldName}`;var desc={get(){throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`,[getterReturnType,setterArgumentType])},enumerable:true,configurable:true};if(setter){desc.set=()=>throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`,[getterReturnType,setterArgumentType])}else{desc.set=v=>throwBindingError(humanName+" is a read-only property")}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);whenDependentTypesAreResolved([],setter?[getterReturnType,setterArgumentType]:[getterReturnType],types=>{var getterReturnType=types[0];var desc={get(){var ptr=validateThis(this,classType,humanName+" getter");return getterReturnType.fromWireType(getter(getterContext,ptr))},enumerable:true};if(setter){setter=embind__requireFunction(setterSignature,setter);var setterArgumentType=types[1];desc.set=function(v){var ptr=validateThis(this,classType,humanName+" setter");var destructors=[];setter(setterContext,ptr,setterArgumentType.toWireType(destructors,v));runDestructors(destructors)}}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);return[]});return[]})};var emval_freelist=[];var emval_handles=[0,1,,1,null,1,true,1,false,1];var __emval_decref=handle=>{if(handle>9&&0===--emval_handles[handle+1]){emval_handles[handle]=undefined;emval_freelist.push(handle)}};var Emval={toValue:handle=>{if(!handle){throwBindingError(`Cannot use deleted val. handle = ${handle}`)}return emval_handles[handle]},toHandle:value=>{switch(value){case undefined:return 2;case null:return 4;case true:return 6;case false:return 8;default:{const handle=emval_freelist.pop()||emval_handles.length;emval_handles[handle]=value;emval_handles[handle+1]=1;return handle}}}};var EmValType={name:"emscripten::val",fromWireType:handle=>{var rv=Emval.toValue(handle);__emval_decref(handle);return rv},toWireType:(destructors,value)=>Emval.toHandle(value),readValueFromPointer:readPointer,destructorFunction:null};var __embind_register_emval=rawType=>registerType(rawType,EmValType);var enumReadValueFromPointer=(name,width,signed)=>{switch(width){case 1:return signed?function(pointer){return this.fromWireType(HEAP8[pointer])}:function(pointer){return this.fromWireType(HEAPU8[pointer])};case 2:return signed?function(pointer){return this.fromWireType(HEAP16[pointer>>1])}:function(pointer){return this.fromWireType(HEAPU16[pointer>>1])};case 4:return signed?function(pointer){return this.fromWireType(HEAP32[pointer>>2])}:function(pointer){return this.fromWireType(HEAPU32[pointer>>2])};default:throw new TypeError(`invalid integer width (${width}): ${name}`)}};function getEnumValueType(rawValueType){return rawValueType===0?"object":rawValueType===1?"number":"string"}var __embind_register_enum=(rawType,name,size,isSigned,rawValueType)=>{name=AsciiToString(name);const valueType=getEnumValueType(rawValueType);switch(valueType){case"object":{function ctor(){}ctor.values={};registerType(rawType,{name,constructor:ctor,valueType,fromWireType:function(c){return this.constructor.values[c]},toWireType:(destructors,c)=>c.value,readValueFromPointer:enumReadValueFromPointer(name,size,isSigned),destructorFunction:null});exposePublicSymbol(name,ctor);break}case"number":{var keysMap={};registerType(rawType,{name,keysMap,valueType,fromWireType:c=>c,toWireType:(destructors,c)=>c,readValueFromPointer:enumReadValueFromPointer(name,size,isSigned),destructorFunction:null});exposePublicSymbol(name,keysMap);delete Module[name].argCount;break}case"string":{var valuesMap={};var reverseMap={};var keysMap={};registerType(rawType,{name,valuesMap,reverseMap,keysMap,valueType,fromWireType:function(c){return this.reverseMap[c]},toWireType:function(destructors,c){return this.valuesMap[c]},readValueFromPointer:enumReadValueFromPointer(name,size,isSigned),destructorFunction:null});exposePublicSymbol(name,keysMap);delete Module[name].argCount;break}}};var requireRegisteredType=(rawType,humanName)=>{var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`)}return impl};var __embind_register_enum_value=(rawEnumType,name,enumValue)=>{var enumType=requireRegisteredType(rawEnumType,"enum");name=AsciiToString(name);switch(enumType.valueType){case"object":{var Enum=enumType.constructor;var Value=Object.create(enumType.constructor.prototype,{value:{value:enumValue},constructor:{value:createNamedFunction(`${enumType.name}_${name}`,function(){})}});Enum.values[enumValue]=Value;Enum[name]=Value;break}case"number":{enumType.keysMap[name]=enumValue;break}case"string":{enumType.valuesMap[name]=enumValue;enumType.reverseMap[enumValue]=name;enumType.keysMap[name]=name;break}}};var floatReadValueFromPointer=(name,width)=>{switch(width){case 4:return function(pointer){return this.fromWireType(HEAPF32[pointer>>2])};case 8:return function(pointer){return this.fromWireType(HEAPF64[pointer>>3])};default:throw new TypeError(`invalid float width (${width}): ${name}`)}};var __embind_register_float=(rawType,name,size)=>{name=AsciiToString(name);registerType(rawType,{name,fromWireType:value=>value,toWireType:(destructors,value)=>value,readValueFromPointer:floatReadValueFromPointer(name,size),destructorFunction:null})};var __embind_register_function=(name,argCount,rawArgTypesAddr,signature,rawInvoker,fn,isAsync,isNonnullReturn)=>{var argTypes=heap32VectorToArray(argCount,rawArgTypesAddr);name=AsciiToString(name);name=getFunctionName(name);rawInvoker=embind__requireFunction(signature,rawInvoker,isAsync);exposePublicSymbol(name,function(){throwUnboundTypeError(`Cannot call ${name} due to unbound types`,argTypes)},argCount-1);whenDependentTypesAreResolved([],argTypes,argTypes=>{var invokerArgsArray=[argTypes[0],null].concat(argTypes.slice(1));replacePublicSymbol(name,craftInvokerFunction(name,invokerArgsArray,null,rawInvoker,fn,isAsync),argCount-1);return[]})};var integerReadValueFromPointer=(name,width,signed)=>{switch(width){case 1:return signed?pointer=>HEAP8[pointer]:pointer=>HEAPU8[pointer];case 2:return signed?pointer=>HEAP16[pointer>>1]:pointer=>HEAPU16[pointer>>1];case 4:return signed?pointer=>HEAP32[pointer>>2]:pointer=>HEAPU32[pointer>>2];default:throw new TypeError(`invalid integer width (${width}): ${name}`)}};var __embind_register_integer=(primitiveType,name,size,minRange,maxRange)=>{name=AsciiToString(name);const isUnsignedType=minRange===0;let fromWireType=value=>value;if(isUnsignedType){var bitshift=32-8*size;fromWireType=value=>value<<bitshift>>>bitshift;maxRange=fromWireType(maxRange)}registerType(primitiveType,{name,fromWireType,toWireType:(destructors,value)=>value,readValueFromPointer:integerReadValueFromPointer(name,size,minRange!==0),destructorFunction:null})};var installIndexedIterator=(proto,sizeMethodName,getMethodName)=>{const makeIterator=(size,getValue)=>{let index=0;return{next(){if(index>=size){return{done:true}}const current=index;index++;const value=getValue(current);return{value,done:false}},[Symbol.iterator](){return this}}};if(!proto[Symbol.iterator]){proto[Symbol.iterator]=function(){const size=this[sizeMethodName]();return makeIterator(size,i=>this[getMethodName](i))}}};var __embind_register_iterable=(rawClassType,rawElementType,sizeMethodName,getMethodName)=>{sizeMethodName=AsciiToString(sizeMethodName);getMethodName=AsciiToString(getMethodName);whenDependentTypesAreResolved([],[rawClassType,rawElementType],types=>{const classType=types[0];installIndexedIterator(classType.registeredClass.instancePrototype,sizeMethodName,getMethodName);return[]})};var __embind_register_memory_view=(rawType,dataTypeIndex,name)=>{var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){var size=HEAPU32[handle>>2];var data=HEAPU32[handle+4>>2];return new TA(HEAP8.buffer,data,size)}name=AsciiToString(name);registerType(rawType,{name,fromWireType:decodeMemoryView,readValueFromPointer:decodeMemoryView},{ignoreDuplicateRegistrations:true})};var EmValOptionalType=Object.assign({optional:true},EmValType);var __embind_register_optional=(rawOptionalType,rawType)=>{registerType(rawOptionalType,EmValOptionalType)};var stringToUTF8Array=(str,heap,outIdx,maxBytesToWrite)=>{if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.codePointAt(i);if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;i++}}heap[outIdx]=0;return outIdx-startIdx};var stringToUTF8=(str,outPtr,maxBytesToWrite)=>stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);var lengthBytesUTF8=str=>{var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127){len++}else if(c<=2047){len+=2}else if(c>=55296&&c<=57343){len+=4;++i}else{len+=3}}return len};var UTF8Decoder=globalThis.TextDecoder&&new TextDecoder;var findStringEnd=(heapOrArray,idx,maxBytesToRead,ignoreNul)=>{var maxIdx=idx+maxBytesToRead;if(ignoreNul)return maxIdx;while(heapOrArray[idx]&&!(idx>=maxIdx))++idx;return idx};var UTF8ArrayToString=function(heapOrArray){let idx=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;let maxBytesToRead=arguments.length>2?arguments[2]:undefined;let ignoreNul=arguments.length>3?arguments[3]:undefined;var endPtr=findStringEnd(heapOrArray,idx,maxBytesToRead,ignoreNul);if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead,ignoreNul)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead,ignoreNul):"";var __embind_register_std_string=(rawType,name)=>{name=AsciiToString(name);var stdStringIsUTF8=true;registerType(rawType,{name,fromWireType(value){var length=HEAPU32[value>>2];var payload=value+4;var str;if(stdStringIsUTF8){str=UTF8ToString(payload,length,true)}else{str="";for(var i=0;i<length;++i){str+=String.fromCharCode(HEAPU8[payload+i])}}_free(value);return str},toWireType(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value)}var length;var valueIsOfTypeString=typeof value=="string";if(!(valueIsOfTypeString||ArrayBuffer.isView(value)&&value.BYTES_PER_ELEMENT==1)){throwBindingError("Cannot pass non-string to std::string")}if(stdStringIsUTF8&&valueIsOfTypeString){length=lengthBytesUTF8(value)}else{length=value.length}var base=_malloc(4+length+1);var ptr=base+4;HEAPU32[base>>2]=length;if(valueIsOfTypeString){if(stdStringIsUTF8){stringToUTF8(value,ptr,length+1)}else{for(var i=0;i<length;++i){var charCode=value.charCodeAt(i);if(charCode>255){_free(base);throwBindingError("String has UTF-16 code units that do not fit in 8 bits")}HEAPU8[ptr+i]=charCode}}}else{HEAPU8.set(value,ptr)}if(destructors!==null){destructors.push(_free,base)}return base},readValueFromPointer:readPointer,destructorFunction(ptr){_free(ptr)}})};var UTF16Decoder=globalThis.TextDecoder?new TextDecoder("utf-16le"):undefined;var UTF16ToString=(ptr,maxBytesToRead,ignoreNul)=>{var idx=ptr>>1;var endIdx=findStringEnd(HEAPU16,idx,maxBytesToRead/2,ignoreNul);if(endIdx-idx>16&&UTF16Decoder)return UTF16Decoder.decode(HEAPU16.subarray(idx,endIdx));var str="";for(var i=idx;i<endIdx;++i){var codeUnit=HEAPU16[i];str+=String.fromCharCode(codeUnit)}return str};var stringToUTF16=(str,outPtr,maxBytesToWrite)=>{maxBytesToWrite!==null&&maxBytesToWrite!==void 0?maxBytesToWrite:maxBytesToWrite=2147483647;if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2}HEAP16[outPtr>>1]=0;return outPtr-startPtr};var lengthBytesUTF16=str=>str.length*2;var UTF32ToString=(ptr,maxBytesToRead,ignoreNul)=>{var str="";var startIdx=ptr>>2;for(var i=0;!(i>=maxBytesToRead/4);i++){var utf32=HEAPU32[startIdx+i];if(!utf32&&!ignoreNul)break;str+=String.fromCodePoint(utf32)}return str};var stringToUTF32=(str,outPtr,maxBytesToWrite)=>{maxBytesToWrite!==null&&maxBytesToWrite!==void 0?maxBytesToWrite:maxBytesToWrite=2147483647;if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codePoint=str.codePointAt(i);if(codePoint>65535){i++}HEAP32[outPtr>>2]=codePoint;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr};var lengthBytesUTF32=str=>{var len=0;for(var i=0;i<str.length;++i){var codePoint=str.codePointAt(i);if(codePoint>65535){i++}len+=4}return len};var __embind_register_std_wstring=(rawType,charSize,name)=>{name=AsciiToString(name);var decodeString,encodeString,lengthBytesUTF;if(charSize===2){decodeString=UTF16ToString;encodeString=stringToUTF16;lengthBytesUTF=lengthBytesUTF16}else{decodeString=UTF32ToString;encodeString=stringToUTF32;lengthBytesUTF=lengthBytesUTF32}registerType(rawType,{name,fromWireType:value=>{var length=HEAPU32[value>>2];var str=decodeString(value+4,length*charSize,true);_free(value);return str},toWireType:(destructors,value)=>{if(!(typeof value=="string")){throwBindingError(`Cannot pass non-string to C++ string type ${name}`)}var length=lengthBytesUTF(value);var ptr=_malloc(4+length+charSize);HEAPU32[ptr>>2]=length/charSize;encodeString(value,ptr+4,length+charSize);if(destructors!==null){destructors.push(_free,ptr)}return ptr},readValueFromPointer:readPointer,destructorFunction(ptr){_free(ptr)}})};var __embind_register_value_array=(rawType,name,constructorSignature,rawConstructor,destructorSignature,rawDestructor)=>{tupleRegistrations[rawType]={name:AsciiToString(name),rawConstructor:embind__requireFunction(constructorSignature,rawConstructor),rawDestructor:embind__requireFunction(destructorSignature,rawDestructor),elements:[]}};var __embind_register_value_array_element=(rawTupleType,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext)=>{tupleRegistrations[rawTupleType].elements.push({getterReturnType,getter:embind__requireFunction(getterSignature,getter),getterContext,setterArgumentType,setter:embind__requireFunction(setterSignature,setter),setterContext})};var __embind_register_value_object=(rawType,name,constructorSignature,rawConstructor,destructorSignature,rawDestructor)=>{structRegistrations[rawType]={name:AsciiToString(name),rawConstructor:embind__requireFunction(constructorSignature,rawConstructor),rawDestructor:embind__requireFunction(destructorSignature,rawDestructor),fields:[]}};var __embind_register_value_object_field=(structType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext)=>{structRegistrations[structType].fields.push({fieldName:AsciiToString(fieldName),getterReturnType,getter:embind__requireFunction(getterSignature,getter),getterContext,setterArgumentType,setter:embind__requireFunction(setterSignature,setter),setterContext})};var __embind_register_void=(rawType,name)=>{name=AsciiToString(name);registerType(rawType,{isVoid:true,name,fromWireType:()=>undefined,toWireType:(destructors,o)=>undefined})};var __emval_array_to_memory_view=(dst,src)=>{dst=Emval.toValue(dst);src=Emval.toValue(src);dst.set(src)};var emval_methodCallers=[];var emval_addMethodCaller=caller=>{var id=emval_methodCallers.length;emval_methodCallers.push(caller);return id};var emval_lookupTypes=(argCount,argTypes)=>{var a=new Array(argCount);for(var i=0;i<argCount;++i){a[i]=requireRegisteredType(HEAPU32[argTypes+i*4>>2],`parameter ${i}`)}return a};var emval_returnValue=(toReturnWire,destructorsRef,handle)=>{var destructors=[];var result=toReturnWire(destructors,handle);if(destructors.length){HEAPU32[destructorsRef>>2]=Emval.toHandle(destructors)}return result};var emval_symbols={};var getStringOrSymbol=address=>{var symbol=emval_symbols[address];if(symbol===undefined){return AsciiToString(address)}return symbol};var __emval_create_invoker=(argCount,argTypesPtr,kind)=>{var GenericWireTypeSize=8;var[retType,...argTypes]=emval_lookupTypes(argCount,argTypesPtr);var toReturnWire=retType.toWireType.bind(retType);var argFromPtr=argTypes.map(type=>type.readValueFromPointer.bind(type));argCount--;var argN=new Array(argCount);var invokerFunction=(handle,methodName,destructorsRef,args)=>{var offset=0;for(var i=0;i<argCount;++i){argN[i]=argFromPtr[i](args+offset);offset+=GenericWireTypeSize}var rv;switch(kind){case 0:rv=Emval.toValue(handle).apply(null,argN);break;case 2:rv=Reflect.construct(Emval.toValue(handle),argN);break;case 3:rv=argN[0];break;case 1:rv=Emval.toValue(handle)[getStringOrSymbol(methodName)](...argN);break}return emval_returnValue(toReturnWire,destructorsRef,rv)};var functionName=`methodCaller<(${argTypes.map(t=>t.name)}) => ${retType.name}>`;return emval_addMethodCaller(createNamedFunction(functionName,invokerFunction))};var __emval_get_property=(handle,key)=>{handle=Emval.toValue(handle);key=Emval.toValue(key);return Emval.toHandle(handle[key])};var __emval_incref=handle=>{if(handle>9){emval_handles[handle+1]+=1}};var __emval_invoke=(caller,handle,methodName,destructorsRef,args)=>emval_methodCallers[caller](handle,methodName,destructorsRef,args);var __emval_new_array_from_memory_view=view=>{view=Emval.toValue(view);var a=new Array(view.length);for(var i=0;i<view.length;i++)a[i]=view[i];return Emval.toHandle(a)};var __emval_new_cstring=v=>Emval.toHandle(getStringOrSymbol(v));var __emval_new_object=()=>Emval.toHandle({});var __emval_run_destructors=handle=>{var destructors=Emval.toValue(handle);runDestructors(destructors);__emval_decref(handle)};var __emval_set_property=(handle,key,value)=>{handle=Emval.toValue(handle);key=Emval.toValue(key);value=Emval.toValue(value);handle[key]=value};var _emscripten_get_now=()=>performance.now();var getHeapMax=()=>2147483648;var alignMemory=(size,alignment)=>Math.ceil(size/alignment)*alignment;var growMemory=size=>{var oldHeapSize=wasmMemory.buffer.byteLength;var pages=(size-oldHeapSize+65535)/65536|0;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignMemory(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false};init_ClassHandle();init_RegisteredPointer();{if(Module["noExitRuntime"])noExitRuntime=Module["noExitRuntime"];if(Module["print"])out=Module["print"];if(Module["printErr"])err=Module["printErr"];if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].shift()()}}}var ___getTypeName,_malloc,_free,memory,__indirect_function_table,wasmMemory,wasmTable;function assignWasmExports(wasmExports){___getTypeName=wasmExports["P"];_malloc=Module["_malloc"]=wasmExports["R"];_free=Module["_free"]=wasmExports["S"];memory=wasmMemory=wasmExports["N"];__indirect_function_table=wasmTable=wasmExports["Q"]}var wasmImports={A:___cxa_throw,E:__abort_js,L:__embind_finalize_value_array,t:__embind_finalize_value_object,D:__embind_register_bigint,I:__embind_register_bool,k:__embind_register_class,n:__embind_register_class_constructor,a:__embind_register_class_function,c:__embind_register_class_property,G:__embind_register_emval,K:__embind_register_enum,x:__embind_register_enum_value,z:__embind_register_float,o:__embind_register_function,p:__embind_register_integer,B:__embind_register_iterable,j:__embind_register_memory_view,C:__embind_register_optional,H:__embind_register_std_string,v:__embind_register_std_wstring,M:__embind_register_value_array,y:__embind_register_value_array_element,u:__embind_register_value_object,h:__embind_register_value_object_field,J:__embind_register_void,s:__emval_array_to_memory_view,f:__emval_create_invoker,b:__emval_decref,q:__emval_get_property,l:__emval_incref,e:__emval_invoke,w:__emval_new_array_from_memory_view,g:__emval_new_cstring,r:__emval_new_object,d:__emval_run_destructors,i:__emval_set_property,m:_emscripten_get_now,F:_emscripten_resize_heap};function run(){preRun();function doRun(){var _readyPromiseResolve,_Module$onRuntimeInit;Module["calledRun"]=true;if(ABORT)return;initRuntime();(_readyPromiseResolve=readyPromiseResolve)===null||_readyPromiseResolve===void 0||_readyPromiseResolve(Module);(_Module$onRuntimeInit=Module["onRuntimeInitialized"])===null||_Module$onRuntimeInit===void 0||_Module$onRuntimeInit.call(Module);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(()=>{setTimeout(()=>Module["setStatus"](""),1);doRun()},1)}else{doRun()}}var wasmExports;wasmExports=await (createWasm());run();if(runtimeInitialized){moduleRtn=Module}else{moduleRtn=new Promise((resolve,reject)=>{readyPromiseResolve=resolve;readyPromiseReject=reject})}
;return moduleRtn}})();if(typeof exports==="object"&&typeof module==="object"){module.exports=Recast;module.exports.default=Recast}else if(typeof define==="function"&&define["amd"])define([],()=>Recast);
window.Recast = Laya.WasmAdapter.create(Recast, "recast-navigation-wasm.wasm");