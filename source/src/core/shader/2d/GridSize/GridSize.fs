precision mediump float;

uniform sampler2D texture;
uniform vec2 u_size;
uniform float u_Time;
uniform float u_GridSize;    // 网格数量 (如 24)
uniform float u_Speed;

varying vec2 v_texcoord;

void main() {
	// 将 texCoord 映射到像素坐标 (0~分辨率)
	vec2 uv = v_texcoord;
	vec2 pos = uv * u_size;

	// ---- 像素化：计算网格 ----
	float grid = u_GridSize;
	vec2 gridPos = floor(pos / grid);       // 网格索引
	vec2 gridCenter = gridPos * grid + grid * 0.5;
	vec2 uvCenter = gridCenter / u_size;

	// 采样纹理 (使用网格中心)
	vec4 color = texture2D(texture, uvCenter);

	// ---- 棋盘格消失 ----
	// 奇偶判断: (ix + iy) % 2
	float ix = gridPos.x;
	float iy = gridPos.y;
	float parity = mod(ix + iy, 2.0);

	// 随时间翻转
	float phase = floor(u_Time * u_Speed * 0.5);
	float flip = mod(phase, 2.0);
	float show = mod(parity + flip, 2.0);

	// 消失的方块 → 黑色 (带一点微弱光晕)
	if(show < 0.5) {
		// 渐隐边缘柔和一点，保留硬边像素感
		color = vec4(0.0, 0.0, 0.0, 1.0);
	}

	// ---- 可选：网格线（增强像素感） ----
	// 在方块边缘加极细暗线
	vec2 gridFrac = fract(pos / grid);
	float lineX = smoothstep(0.0, 0.03, gridFrac.x) * smoothstep(0.0, 0.03, 1.0 - gridFrac.x);
	float lineY = smoothstep(0.0, 0.03, gridFrac.y) * smoothstep(0.0, 0.03, 1.0 - gridFrac.y);
	float line = 1.0 - (1.0 - min(lineX, lineY)) * 0.3;
	color.rgb *= line;

	// color = vec4(1.0, 0.0, 0.0, 1.0);
	gl_FragColor = color;
}