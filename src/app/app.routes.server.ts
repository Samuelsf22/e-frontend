import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'product/:public_id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'category/:public_id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'orders/:public_id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'order/:public_id/:is_paid',
    renderMode: RenderMode.Server,
  }
];
