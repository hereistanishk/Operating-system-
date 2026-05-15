import React from 'react';

export interface AppMeta {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  component: React.ElementType;
  inDock?: boolean;
  url?: string;
}
