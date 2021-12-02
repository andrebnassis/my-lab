import { Button } from '@mui/material'
import {Story, Meta} from '@storybook/react'

export default {
    title: 'Mui Lab/Button',
    component: Button,
} as Meta;

export const StoryWithNoProps:Story = () => <Button variant={'text'}>Text</Button>;

export const StoryWithUnusedProps:Story = (props) => <Button variant={'text'}>Text</Button>;
