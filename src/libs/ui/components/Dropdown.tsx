import React from 'react';

import Select, { SelectProps } from '@mui/material/Select';
import { SvgIconProps } from '@mui/material/SvgIcon';

import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';

function ExpandMoreIcon(props: SvgIconProps) {
  return <ExpandMoreRounded fontSize='small' {...props} />;
}
ExpandMoreIcon.muiName = 'SvgIcon';

export function Dropdown(props: SelectProps) {
  return <Select IconComponent={ExpandMoreIcon} {...props} />;
}
