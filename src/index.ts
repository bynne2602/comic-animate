import {registerRoot} from 'remotion';
import {VerticalRoot} from './DienHongVertical';
import React from 'react';
import {BachDangCompositions} from './bach-dang/BachDangDemo';
registerRoot(()=>React.createElement(React.Fragment,null,React.createElement(VerticalRoot),React.createElement(BachDangCompositions)));
