import * as React from 'react';
import './App.css';
import { matrix, pan, scale } from './math';

/* tslint:disable */
const SVGMap = (clickFn: any) => {
  console.log('clickFn', clickFn);

  return (
    <svg x="0px" y="0px" width="1757.48px" height="1388.98px" viewBox="0 0 1757.48 1388.98">
      <g>
        <defs>
          <rect id="SVGID_1_" x="325" y="371.231" width="1105.729" height="649.75"/>
        </defs>
        <clipPath id="SVGID_2_">
          <use xlinkHref="#SVGID_1_" overflow="visible"/>
        </clipPath>
        <path
          clipPath="url(#SVGID_2_)"

          fill="none"
          stroke="#F26F21"
          strokeWidth="4.318"
          strokeLinejoin="round"
          d="M1210.217,589.119
		l207.856-207.724 M1206.821,385.239l0.003,202.337 M782.66,743.693l-263.531,270.166 M1206.844,587.576l0.014,154.805
		l-601.085-0.002l-270.245,270.312 M390.688,384.052l158.016,158.056h176.87 M1330.424,657.198H845.767l-276.371-276.44
		 M1219.03,811.564l201.172,201.391 M1216.773,789.027l-229.963,224.139 M360.407,630.05l856.782,0.068l-0.003,381.608"
        />
        <path
          clipPath="url(#SVGID_2_)"

          fill="none"
          stroke="#F26F21"
          strokeWidth="4.318"
          strokeLinejoin="round"
          d="M612.896,735.574
		v9.156 M645.339,735.576v9.154 M1107.303,735.576v9.154 M700.095,735.576v9.154 M1154.045,735.576v9.154 M1331.333,654.932v9.154
		 M362.616,622.403v9.155 M775.142,622.403v9.155 M744.577,622.403v9.155 M683.448,622.403v9.155 M714.012,622.403v9.155
		 M652.884,622.403v9.155 M622.32,622.403v9.155 M591.755,622.403v9.155 M561.191,622.402v9.156 M530.627,622.403v9.155
		 M500.063,622.403v9.155 M469.498,622.403v9.155 M438.934,622.403v9.155 M408.369,622.403v9.155 M1145.215,622.402v9.156
		 M1118.694,622.402v9.156 M1092.176,622.402v9.156 M1171.737,622.402v9.156 M1118.694,654.932v9.155 M1208.706,874.92h9.154
		 M1208.706,897.322h9.154 M1208.706,919.725h9.154 M1208.706,942.127h9.154 M1208.706,1009.332h9.154 M1208.706,965.607h9.154
		 M1208.706,852.52h9.154 M1417.168,1013.232l6.477-6.473 M1374.696,970.754l6.474-6.475 M1331.994,928.045l6.474-6.475
		 M1287.822,883.865l6.473-6.475 M1245.003,841.041l6.476-6.473 M1141.997,852.52l6.388,6.557 M1119.93,874.025l6.388,6.557
		 M1095.958,897.379l6.39,6.561 M1073.874,918.9l6.39,6.559 M1051.792,940.42l6.39,6.559 M434.346,903.998l6.474,6.475
		 M585.933,752.412l6.473,6.475 M559.798,962.408l6.557,6.391 M616.602,904.102l6.557,6.389 M675.196,843.957l6.557,6.391
		 M733.791,783.811l6.556,6.391 M515.951,1007.512l6.203,6.734 M603.241,424.766l6.474-6.475 M622.031,442.742l6.472-6.474
		 M639.869,461.668l6.473-6.475 M658.934,479.863l6.474-6.474 M426.102,427.554h15.378 M446.648,448.427h15.378 M471.016,473.981
		l6.474-6.473 M492.659,495.626l6.474-6.473 M512.992,515.961l6.473-6.474 M530.061,531.909h15.378 M755.794,576.739l6.472-6.472
		 M677.316,498.248l6.47-6.473 M384.484,385.813h15.378 M565.74,386.655l6.473-6.476 M1199.973,408.148h9.154 M1199.973,435.438
		h9.154 M1199.973,462.727h9.154 M1199.973,490.016h9.154 M1208.706,811.562h15.232 M1199.973,588.483h16.24 M1199.973,517.306
		h9.154 M1346.471,443.452l6.475,6.476 M1411.598,378.318l6.474,6.473 M1199.973,691.347h19.743 M1199.973,719.311h19.743
		 M1208.706,748.719h9.154"
        />
        <path
          clipPath="url(#SVGID_2_)"

          fill="#F26F21"
          d="M1223.695,766.984c0,3.891-3.153,7.043-7.043,7.043
		c-3.892,0-7.043-3.152-7.043-7.043s3.151-7.043,7.043-7.043C1220.542,759.941,1223.695,763.094,1223.695,766.984"
        />

        <circle
          clipPath="url(#SVGID_2_)"
          fill="none"
          stroke="#F26F21"
          strokeWidth="2.867"
          strokeLinejoin="round"
          cx="1216.652"
          cy="766.984"
          r="7.043"
        />
        <path
          clipPath="url(#SVGID_2_)"
          fill="#FFFFFF"
          d="M1061.25,741.83c0,3.889-3.154,7.043-7.044,7.043s-7.043-3.154-7.043-7.043
		c0-3.891,3.153-7.043,7.043-7.043S1061.25,737.939,1061.25,741.83"
        />

        <circle
          clipPath="url(#SVGID_2_)"
          fill="none"
          stroke="#F26F21"
          strokeWidth="2.867"
          strokeLinejoin="round"
          cx="1054.207"
          cy="741.83"
          r="7.043"
        />
        <path
          clipPath="url(#SVGID_2_)"
          fill="#FFFFFF"
          d="M1040.912,965.453c0,3.889-3.152,7.043-7.043,7.043s-7.043-3.154-7.043-7.043
		c0-3.891,3.152-7.043,7.043-7.043S1040.912,961.562,1040.912,965.453"
        />

        <circle
          clipPath="url(#SVGID_2_)"
          fill="none"
          stroke="#F26F21"
          strokeWidth="2.867"
          strokeLinejoin="round"
          cx="1033.869" cy="965.453" r="7.043"
        />
        <path
          clipPath="url(#SVGID_2_)"
          fill="#FFFFFF"
          d="M1018.211,986.762c0,3.891-3.153,7.043-7.043,7.043
		c-3.891,0-7.043-3.152-7.043-7.043s3.152-7.043,7.043-7.043C1015.058,979.719,1018.211,982.871,1018.211,986.762"
        />

        <circle
          clipPath="url(#SVGID_2_)"
          fill="none"
          stroke="#F26F21"
          strokeWidth="2.867"
          strokeLinejoin="round"
          cx="1011.168" cy="986.762" r="7.043"/>
        <path
          clipPath="url(#SVGID_2_)"
          fill="#FFFFFF"
          d="M1288.431,517.224c0,3.891-3.152,7.043-7.043,7.043
		c-3.89,0-7.043-3.152-7.043-7.043c0-3.89,3.153-7.043,7.043-7.043C1285.278,510.181,1288.431,513.334,1288.431,517.224"
        />

        <circle
          clipPath="url(#SVGID_2_)"
          fill="none"
          stroke="#F26F21"
          strokeWidth="2.867"
          strokeLinejoin="round"
          cx="1281.388" cy="517.224" r="7.043"
        />
        <path
          clipPath="url(#SVGID_2_)"
          fill="#FFFFFF"
          d="M1176.771,834.49c0,3.891-3.151,7.043-7.043,7.043
		c-3.89,0-7.044-3.152-7.044-7.043s3.154-7.043,7.044-7.043C1173.62,827.447,1176.771,830.6,1176.771,834.49"
        />

        <circle
          clipPath="url(#SVGID_2_)"
          fill="none"
          stroke="#F26F21"
          strokeWidth="2.867"
          strokeLinejoin="round"
          cx="1169.728" cy="834.49" r="7.043"
        />
      </g>
      <polygon

        fill="#F26F21" points="1169.311,826.082 1169.311,841.031 1177.125,838.447 1177.125,830.803 "
      />
      <g>
        <defs>
          <rect id="SVGID_3_" x="325" y="371.231" width="1105.729" height="649.75"
          />
        </defs>
        <clipPath id="SVGID_4_">
          <use xlinkHref="#SVGID_3_" overflow="visible"
          />
        </clipPath>
        <path
          clipPath="url(#SVGID_4_)"
          fill="#FFFFFF"
          d="M996.312,1009.15c0,3.891-3.151,7.043-7.043,7.043
		c-3.89,0-7.043-3.152-7.043-7.043s3.153-7.043,7.043-7.043C993.161,1002.107,996.312,1005.26,996.312,1009.15"
        />

        <circle
          clipPath="url(#SVGID_4_)"
          fill="none"
          stroke="#F26F21"
          strokeWidth="2.867"
          strokeLinejoin="round"
          cx="989.27" cy="1009.15" r="7.043"/>
      </g>
      <polygon

        fill="#F26F21" points="988.85,1001.432 988.85,1015.691 996.307,1013.225 996.307,1005.936 "/>
      <g>
        <defs>
          <rect id="SVGID_5_" x="325" y="371.231" width="1105.729" height="649.75"/>
        </defs>
        <clipPath id="SVGID_6_">
          <use xlinkHref="#SVGID_5_" overflow="visible"/>
        </clipPath>
        <path
          clipPath="url(#SVGID_6_)"
          fill="#FFFFFF"
          d="M1224.11,986.762c0,3.891-3.151,7.043-7.043,7.043
		c-3.889,0-7.043-3.152-7.043-7.043s3.154-7.043,7.043-7.043C1220.959,979.719,1224.11,982.871,1224.11,986.762"/>

        <circle
          clipPath="url(#SVGID_6_)"
          fill="none"
          stroke="#F26F21"
          strokeWidth="2.867"
          strokeLinejoin="round"
          cx="1217.067" cy="986.762" r="7.043"/>
      </g>
      <polygon

        fill="#F26F21" points="1216.649,979.584 1216.649,993.303 1223.821,990.93 1223.821,983.918 "/>
      <g>
        <defs>
          <rect id="SVGID_7_" x="325" y="371.231" width="1105.729" height="649.75"/>
        </defs>
        <clipPath id="SVGID_8_">
          <use xlinkHref="#SVGID_7_" overflow="visible"/>
        </clipPath>
        <path
          clipPath="url(#SVGID_8_)"
          fill="#FFFFFF"
          d="M1213.783,383.334c0,3.89-3.152,7.043-7.043,7.043
		c-3.89,0-7.043-3.153-7.043-7.043c0-3.891,3.153-7.043,7.043-7.043C1210.631,376.292,1213.783,379.444,1213.783,383.334"/>

        <circle clipPath="url(#SVGID_8_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867"
                strokeLinejoin="round"
                cx="1206.74" cy="383.334" r="7.043"/>
      </g>
      <polygon
        fill="#F26F21" points="1206.74,376.472 1206.74,383.333 1213.603,383.333 1213.16,380.925 "/>
      <g>
        <defs>
          <rect id="SVGID_9_" x="325" y="371.231" width="1105.729" height="649.75"/>
        </defs>
        <clipPath id="SVGID_10_">
          <use xlinkHref="#SVGID_9_" overflow="visible"/>
        </clipPath>
        <path clipPath="url(#SVGID_10_)"
              fill="#F26F21"
              d="M372.09,983.895c0,3.891-3.153,7.043-7.043,7.043s-7.043-3.152-7.043-7.043
		s3.153-7.043,7.043-7.043S372.09,980.004,372.09,983.895"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867"
                strokeLinejoin="round"
                cx="365.047" cy="983.895" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#F26F21"
              d="M395.878,958.646c0,3.889-3.153,7.043-7.043,7.043s-7.043-3.154-7.043-7.043
		c0-3.891,3.153-7.043,7.043-7.043S395.878,954.756,395.878,958.646"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867"
                strokeLinejoin="round"
                cx="388.835" cy="958.646" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#F26F21"
              d="M495.836,857.648c0,3.891-3.153,7.043-7.043,7.043s-7.043-3.152-7.043-7.043
		c0-3.889,3.153-7.043,7.043-7.043S495.836,853.76,495.836,857.648"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867"
                strokeLinejoin="round"
                cx="488.793" cy="857.648" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#F26F21"
              d="M544.775,532.01c0,3.89-3.153,7.043-7.043,7.043s-7.043-3.153-7.043-7.043
		s3.153-7.043,7.043-7.043S544.775,528.121,544.775,532.01"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867"
                strokeLinejoin="round"
                cx="537.732" cy="532.01" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#F26F21"
              d="M704.659,509.536c0,3.891-3.153,7.043-7.043,7.043s-7.043-3.152-7.043-7.043
		c0-3.89,3.153-7.043,7.043-7.043S704.659,505.646,704.659,509.536"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867"
                strokeLinejoin="round"
                cx="697.616" cy="509.536" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#F26F21"
              d="M824.911,630.092c0,3.89-3.154,7.043-7.043,7.043
		c-3.892,0-7.043-3.153-7.043-7.043c0-3.891,3.151-7.043,7.043-7.043C821.757,623.049,824.911,626.202,824.911,630.092"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867"
                strokeLinejoin="round"
                cx="817.868" cy="630.092" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M571.192,781.9c0,3.889-3.153,7.043-7.043,7.043s-7.043-3.154-7.043-7.043
		c0-3.891,3.153-7.043,7.043-7.043S571.192,778.01,571.192,781.9"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867"
                strokeLinejoin="round"
                cx="564.149" cy="781.9" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M789.158,742.062c0,3.891-3.153,7.043-7.043,7.043s-7.043-3.152-7.043-7.043
		c0-3.889,3.153-7.043,7.043-7.043S789.158,738.174,789.158,742.062"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="782.115" cy="742.062" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M629.521,630.092c0,3.89-3.153,7.043-7.043,7.043
		c-3.89,0-7.043-3.153-7.043-7.043c0-3.891,3.153-7.043,7.043-7.043C626.368,623.049,629.521,626.202,629.521,630.092"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="622.478" cy="630.092" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M735.581,542.203c0,3.891-3.151,7.044-7.043,7.044
		c-3.889,0-7.043-3.153-7.043-7.044c0-3.89,3.154-7.043,7.043-7.043C732.429,535.16,735.581,538.313,735.581,542.203"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="728.537" cy="542.203" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M632.887,439.661c0,3.891-3.153,7.043-7.043,7.043
		c-3.89,0-7.043-3.152-7.043-7.043c0-3.89,3.153-7.043,7.043-7.043C629.734,432.618,632.887,435.771,632.887,439.661"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="625.844" cy="439.661" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M613.687,418.461c0,3.89-3.153,7.043-7.043,7.043
		c-3.89,0-7.043-3.153-7.043-7.043c0-3.891,3.153-7.043,7.043-7.043C610.533,411.418,613.687,414.571,613.687,418.461"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="606.643" cy="418.461" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M461.74,448.578c0,3.89-3.153,7.043-7.043,7.043
		c-3.89,0-7.043-3.153-7.043-7.043c0-3.891,3.153-7.043,7.043-7.043C458.587,441.535,461.74,444.687,461.74,448.578"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="454.697" cy="448.578" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M441.074,427.716c0,3.891-3.153,7.044-7.043,7.044s-7.043-3.153-7.043-7.044
		c0-3.89,3.153-7.043,7.043-7.043S441.074,423.827,441.074,427.716"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none"
                stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="434.031" cy="427.716" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M420.188,406.86c0,3.89-3.153,7.043-7.043,7.043
		c-3.89,0-7.043-3.153-7.043-7.043s3.153-7.043,7.043-7.043C417.034,399.817,420.188,402.97,420.188,406.86"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none" stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="413.144" cy="406.86" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M399.585,385.242c0,3.891-3.153,7.043-7.043,7.043s-7.043-3.152-7.043-7.043
		c0-3.89,3.153-7.043,7.043-7.043S399.585,381.352,399.585,385.242"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none" stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="392.542" cy="385.242" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M388.341,630.092c0,3.89-3.153,7.043-7.043,7.043s-7.043-3.153-7.043-7.043
		c0-3.891,3.153-7.043,7.043-7.043S388.341,626.202,388.341,630.092"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none" stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="381.298" cy="630.092" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#F26F21"
              d="M342.762,1012.504c0,3.889-3.153,7.043-7.043,7.043
		c-3.89,0-7.043-3.154-7.043-7.043c0-3.891,3.153-7.043,7.043-7.043C339.608,1005.461,342.762,1008.613,342.762,1012.504"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none" stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="335.719" cy="1012.504" r="7.043"/>
        <path clipPath="url(#SVGID_10_)"
              fill="#FFFFFF"
              d="M652.507,457.053c0,3.891-3.153,7.043-7.043,7.043
		c-3.89,0-7.043-3.152-7.043-7.043c0-3.89,3.153-7.043,7.043-7.043C649.354,450.01,652.507,453.164,652.507,457.053"/>

        <circle clipPath="url(#SVGID_10_)"
                fill="none" stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="645.464" cy="457.053" r="7.043"/>
      </g>
      <polygon
        fill="#F26F21" points="645.045,449.648 645.045,463.594 652.335,461.183 652.335,454.052 "/>
      <g>
        <defs>
          <rect id="SVGID_11_" x="325" y="371.231" width="1105.729" height="649.75"/>
        </defs>
        <clipPath id="SVGID_12_">
          <use xlinkHref="#SVGID_11_" overflow="visible"/>
        </clipPath>
        <path clipPath="url(#SVGID_12_)"
              fill="#FFFFFF"
              d="M420.081,933.395c0,3.891-3.153,7.043-7.043,7.043
		c-3.89,0-7.043-3.152-7.043-7.043c0-3.889,3.153-7.043,7.043-7.043C416.928,926.352,420.081,929.506,420.081,933.395"/>

        <circle clipPath="url(#SVGID_12_)"
                fill="none" stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="413.038" cy="933.395" r="7.043"/>
      </g>
      <polygon
        fill="#F26F21" points="413.038,926.533 413.038,933.396 419.9,933.396 419.458,930.986 "/>
      <g>
        <defs>
          <rect id="SVGID_13_" x="325" y="371.231" width="1105.729" height="649.75"/>
        </defs>
        <clipPath id="SVGID_14_">
          <use xlinkHref="#SVGID_13_" overflow="visible"/>
        </clipPath>
        <path clipPath="url(#SVGID_14_)"
              fill="#FFFFFF"
              d="M446.215,630.092c0,3.89-3.153,7.043-7.043,7.043s-7.043-3.153-7.043-7.043
		c0-3.891,3.153-7.043,7.043-7.043S446.215,626.202,446.215,630.092"/>

        <circle clipPath="url(#SVGID_14_)"
                fill="none" stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="439.172" cy="630.092" r="7.043"/>
      </g>
      <polygon
        fill="#F26F21" points="439.172,623.229 439.172,630.092 446.034,630.092 445.592,627.682 "/>
      <g>
        <defs>
          <rect id="SVGID_15_" x="325" y="371.231" width="1105.729" height="649.75"/>
        </defs>
        <clipPath id="SVGID_16_">
          <use xlinkHref="#SVGID_15_" overflow="visible"/>
        </clipPath>
        <path clipPath="url(#SVGID_16_)"
              fill="#FFFFFF"
              d="M522.67,832.398c0,3.891-3.153,7.043-7.043,7.043s-7.043-3.152-7.043-7.043
		c0-3.889,3.153-7.043,7.043-7.043S522.67,828.51,522.67,832.398"/>

        <circle clipPath="url(#SVGID_16_)"
                fill="none" stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="515.627" cy="832.398" r="7.043"/>
      </g>
      <polygon
        fill="#F26F21" points="515.627,825.537 515.627,832.398 522.49,832.398 522.047,829.99 "/>
      <g>
        <defs>
          <rect id="SVGID_17_" x="325" y="371.231" width="1105.729" height="649.75"/>
        </defs>
        <clipPath id="SVGID_18_">
          <use xlinkHref="#SVGID_17_" overflow="visible"/>
        </clipPath>
        <path clipPath="url(#SVGID_18_)"
              fill="#FFFFFF"
              d="M546.949,807.148c0,3.891-3.153,7.045-7.043,7.045s-7.043-3.154-7.043-7.045
		c0-3.889,3.153-7.043,7.043-7.043S546.949,803.26,546.949,807.148"/>

        <circle clipPath="url(#SVGID_18_)"
                fill="none" stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="539.906" cy="807.148" r="7.043"/>
      </g>
      <polygon
        fill="#F26F21" points="539.906,800.287 539.906,807.15 546.77,807.15 546.326,804.74 "/>
      <g>
        <defs>
          <rect id="SVGID_19_" x="325" y="371.231" width="1105.729" height="649.75"/>
        </defs>
        <clipPath id="SVGID_20_">
          <use xlinkHref="#SVGID_19_" overflow="visible"/>
        </clipPath>
        <path clipPath="url(#SVGID_20_)"
              fill="#FFFFFF"
              d="M472.247,882.896c0,3.891-3.153,7.043-7.043,7.043
		c-3.89,0-7.043-3.152-7.043-7.043c0-3.889,3.153-7.043,7.043-7.043C469.093,875.854,472.247,879.008,472.247,882.896"/>

        <circle clipPath="url(#SVGID_20_)"
                fill="none" stroke="#F26F21"
                strokeWidth="2.867" strokeLinejoin="round"
                cx="465.203" cy="882.896" r="7.043"/>
      </g>
      <polygon
        fill="#F26F21" points="465.204,876.035 465.204,882.898 472.065,882.898 471.624,880.488 "/>
      <g>
        <defs>
          <rect id="SVGID_21_" x="325" y="371.231" width="1105.729" height="649.75"/>
        </defs>
        <clipPath id="SVGID_22_">
          <use xlinkHref="#SVGID_21_" overflow="visible"/>
        </clipPath>
        <path clipPath="url(#SVGID_22_)"
              fill="#FFFFFF"
              d="M527.187,1011.688c0,3.783-3.064,6.85-6.849,6.85
		c-3.782,0-6.849-3.066-6.849-6.85s3.067-6.85,6.849-6.85C524.123,1004.838,527.187,1007.904,527.187,1011.688"/>

        <circle clipPath="url(#SVGID_22_)"
                fill="none" stroke="#F26F21" strokeWidth="2.788" strokeLinejoin="round"
                cx="520.338" cy="1011.688" r="6.849"/>
      </g>
    </svg>

  )
}

const Station = (props: any) => {
  interface Dim {
    r: number;
  }

  const dim: Dim = {
    r: 10
  };

  return (
    <circle cx={props.x}
            cy={props.y}
            {...dim}
            fill="black"/>
  );
};


const gridX = 50;
const gridY = 50;
const xFromGrid = (x: number, direction: string) => {
  switch (direction) {
    case 'e':
    case 'ne':
    case 'se':
      return x + gridX;
    case 'w':
    case 'nw':
    case 'sw':
      return x - gridX;
    default:
      return x;
  }
};

const yFromGrid = (y: number, direction: string) => {
  switch (direction) {
    case 's':
    case 'se':
    case 'sw':
      return y + gridY;
    case 'n':
    case 'ne':
    case 'nw':
      return y - gridY;
    default:
      return y;
  }
};

interface Node {
  filled: number;
  direction: string;

  x: number;
  y: number;
}
const RedLine = () => {
  const redLineNodes:any[] = [
    // red line - south bound from t-centralen
    {
      filled: -1,
      direction: 's',
    },
    {
      filled: 1.0,
      direction: 's',
    },
    {
      filled: -1, // negative means non-circular station
      direction: 'se',
    }
  ];
  const nodes:Node[] = redLineNodes.map(n => {
    return Object.assign(n, { x: 0, y: 0});
  });

  const stations = [];

  const centralStation = {x: 100, y: 10};

  for (let i=0; i<nodes.length; i++) {
    const node = nodes[i];
    const previousNode = i === 0 ? centralStation : nodes[i-1];
    let x = xFromGrid(previousNode.x, node.direction);
    let y = yFromGrid(previousNode.y, node.direction);

    // store the positions inside the node objects
    node.x = x;
    node.y = y;
    console.log('node', nodes[i], x, y);
    stations.push(<Station x={x} y={y}/>,)
  }

  return (
    <g>
      {stations.map(s => s)}
    </g>
  )
};

class App extends React.Component {

  render() {

    const coords = {
      x1: 100,
      y1: 10,
      x2: 100,
      y2: 100,

      strokeWidth: 2,
    };

    const mat = [
      1, 0, 0,
      1, 0, 0
    ];

    const scaleFactor = 1;
    const panX = 10;
    const panY = 20;

    return (
      <div className="App">

        <svg width="1024" height="768">
          <g transform={matrix(scale(pan(mat, panX, panY), scaleFactor))}>
            <line {...coords} stroke="red"/>

            <RedLine/>
          </g>
        </svg>

        <div>
          <SVGMap/>
        </div>
      </div>
    );
  }
}

export default App;
