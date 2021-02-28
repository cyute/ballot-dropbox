import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Disclaimer, DisclaimerProps } from './Disclaimer';

export default {
  title: 'Example/Disclaimer',
  component: Disclaimer,
  argTypes: {
    dropboxLocations: {},
  },
} as Meta;

const Template: Story<DisclaimerProps> = (args) => <Disclaimer {...args} />;

export const Michigan = Template.bind({});
Michigan.args = {
  dropboxLocations: [{ address: 'address', city: 'city', state: 'MI' }],
}

export const Ohio = Template.bind({});
Ohio.args = {
  dropboxLocations: [{ address: 'address', city: 'city', state: 'OH' }],
}