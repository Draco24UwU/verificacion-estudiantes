import { computed, Injectable, signal } from '@angular/core';
import { SidebarItem } from '../types/modules.layout.types';

@Injectable({
  providedIn: 'root',
})
export class ModulesSidebarService {
  private $isExpanded = signal(false);
  private $currentSideBarItem = signal<SidebarItem | null>(null);
  private $isExpandedClass = computed(() => {
    const isExpanded = this.$isExpanded();
    return isExpanded ? 'ml-50' : 'ml-20';
  });

  public toogleSideBar() {
    this.$isExpanded.update(v => !v);
  }

  public get isExpandedClass() {
    return this.$isExpandedClass();
  }
  public get isExpanded() {
    return this.$isExpanded();
  }
  public set currentSideBarItem(i: SidebarItem) {
    this.$currentSideBarItem.set(i);
  }
  public get currentSideBarItem(): SidebarItem | null {
    return this.$currentSideBarItem();
  }
}
