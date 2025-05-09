import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Nav, NavItem } from '../src/components/Nav';
import { Grid } from '../src/components/Grid';
import { Card } from '../src/components/Card';
import { Article } from '../src/components/Article';
import { Button } from '../src/components/Button';

const meta = {
  title: 'Components/Dashboard',
  component: () => (
    <div className="min-h-screen bg-gray-100">
      <Nav>
        <div className="flex space-x-4">
          <NavItem href="#">Home</NavItem>
          <NavItem href="#">About</NavItem>
          <NavItem href="#">Contact</NavItem>
        </div>
      </Nav>

      <main className="container mx-auto p-4">
        <Grid>
          <Card>
            <h2 className="text-xl font-bold mb-4">Card Title</h2>
            <p className="mb-4">This is a responsive card that adapts to different screen sizes.</p>
            <Button>Click me</Button>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Another Card</h2>
            <p className="mb-4">Cards in the grid will reflow based on screen size.</p>
            <Button disabled>Disabled Button</Button>
          </Card>

          <Article>
            <h1>Article Title</h1>
            <p>This is a paragraph with a <a href="#">link</a>.</p>
            <h2>Subtitle</h2>
            <p>Another paragraph with more content.</p>
          </Article>
        </Grid>
      </main>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomContent: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen bg-gray-100">
      <Nav>
        <div className="flex space-x-4">
          <NavItem href="#">Dashboard</NavItem>
          <NavItem href="#">Analytics</NavItem>
          <NavItem href="#">Settings</NavItem>
        </div>
      </Nav>

      <main className="container mx-auto p-4">
        <Grid>
          <Card>
            <h2 className="text-xl font-bold mb-4">Statistics</h2>
            <p className="mb-4">View your key metrics and performance indicators.</p>
            <Button>View Details</Button>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <p className="mb-4">Track your latest actions and updates.</p>
            <Button>View Activity</Button>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <p className="mb-4">Access frequently used features and tools.</p>
            <Button>Get Started</Button>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            <p className="mb-4">Stay updated with important alerts and messages.</p>
            <Button>View All</Button>
          </Card>
        </Grid>
      </main>
    </div>
  ),
}; 