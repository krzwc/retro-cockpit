import { Map, List } from 'immutable';
import {
  StateObject,
  Transition,
  ReactStateDeclaration,
} from '@uirouter/react';
import { Action } from 'redux';

import { ImmutableMap } from '../../common/interfaces';
import { ENTITY_TYPES } from '../entities/consts';

export interface RouterParams {
  pipeline_id?: string;
  site_id?: string;
  filters?: string;
  dashboard_id?: string;
}

export interface RouterBreadcrumbItem {
  label?: string;
  link?: string;
  entityType?: ENTITY_TYPES;
  routerParam?: keyof RouterParams;
  propertyToDisplay?: string;
  params?: any;
  testLocator?: string;
}

export type RouterActiveState = ImmutableMap<{
  name: string;
  includesPaths: Map<string, boolean>;
  params: ImmutableMap<RouterParams>;
  breadcrumbs: List<ImmutableMap<RouterBreadcrumbItem>>;
}>;

export type RouterPreviousState = ImmutableMap<{
  name: string;
  params: ImmutableMap<RouterParams>;
}>;

export type RouterState = ImmutableMap<{
  transitioning: boolean;
  activeState: RouterActiveState;
  previousState: RouterPreviousState;
}>;

export interface TransitionAction extends Action {
  transition: Transition;
}

export interface RouteTarget extends StateObject {
  breadcrumbs?: RouterBreadcrumbItem[];
}

export interface RouteInstance extends ReactStateDeclaration {
  breadcrumbs?: RouterBreadcrumbItem[];
  filterFunction?(state: any): boolean;
}
