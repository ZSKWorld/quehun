precision highp float;

uniform vec4 u_Color;

void main()
{
    gl_FragColor = vec4(u_Color.xyz,1.0);
}
