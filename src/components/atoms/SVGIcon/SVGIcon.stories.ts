import type { Meta, StoryObj } from "@storybook/react";
import SVGIcon from ".";

const meta = {
  title: "Components/SVGIcon",
  component: SVGIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SVGIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Cogwheel: Story = {
  args: {
    iconName: "Cogwheel",
    size: 32,
  },
};

export const Error: Story = {
  args: {
    iconName: "",
    size: 32,
  },
};
