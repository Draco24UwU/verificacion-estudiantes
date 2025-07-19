import { Component } from '@angular/core';
import { DynamicTableComponent } from '../../shared/components/common/dynamic-table.component';
import { DynamicTableConfig, RouteDefinition } from '../../shared/types/common';
import { store } from '../../shared/classes/store';

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  imports: [DynamicTableComponent],
  selector: 'app-test',
  template: ` <ng-container>
    <app-dynamic-table [tableConfig]="config" />
    <app-dynamic-table [tableConfig]="confiPosts" />
    <div></div>
  </ng-container>`,
})
export class TestComponent {
  public test = store<Post[]>();

  constructor() {
    setTimeout(() => {
      this.test.data = [{ body: 'test', id: 1, title: 'test2', userId: 1 }];
      const owo = this.test.data;
      console.log(this.test.values());
    }, 3000);
  }

  public config: DynamicTableConfig<GitHubUser> = {
    route: {
      method: 'GET',
      url: 'https://api.github.com/users',
      filters: {
        queryParams: {
          userId: {
            defaultValue: 1,
            filterType: 'select',
          },
          limit: {
            defaultValue: 10,
            filterType: 'paginator',
          },
          term: {
            defaultValue: '',
            filterType: 'term',
          },
        },
      },
    },
    columns: [
      {
        field: 'id',
        header: 'ID',
        type: 'number',
      },
      {
        field: 'node_id',
        header: 'Node ID',
        type: 'text',
      },
      {
        field: 'type',
        header: 'Type',
        type: 'text',
      },
    ],
    actions: [
      {
        name: 'editar',
        icon: 'fa-solid fa-gear',
        callback: data => {
          console.log('Editar:', data);
        },
        disabled: data => {
          return data.id === 1;
        },
      },
      {
        name: 'eliminar',
        icon: 'fa-regular fa-user',
        callback: data => {
          console.log('Eliminar:', data);
        },
      },
    ],
  };

  public confiPosts: DynamicTableConfig<Post> = {
    route: {
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
      filters: {
        queryParams: {
          userId: {
            defaultValue: 1,
            filterType: 'select',
          },
          limit: {
            defaultValue: 10,
            filterType: 'paginator',
          },
          term: {
            defaultValue: '',
            filterType: 'term',
          },
        },
      },
    },
    columns: [
      {
        field: 'id',
        header: 'ID',
        type: 'number',
      },
      {
        field: 'title',
        header: 'Título',
        type: 'text',
      },
      {
        field: 'body',
        header: 'Cuerpo',
        type: 'text',
      },
    ],
    actions: [
      {
        name: 'editar',
        icon: 'fa-solid fa-gear',
        callback: data => {
          console.log('Editar:', data);
        },
        disabled: data => {
          return data.id === 1;
        },
      },
      {
        name: 'eliminar',
        icon: 'fa-regular fa-user',
        callback: data => {
          console.log('Eliminar:', data);
        },
      },
    ],
  };
}
