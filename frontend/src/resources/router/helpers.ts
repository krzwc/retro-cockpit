import { createElement, ComponentType } from 'react';


interface GenerateView<Props> {
  component: ComponentType<Props>;
  props?: Props;
  name?: string;
}

const generateView = <Props>({
  component,
  props,
  name = 'main',
}: GenerateView<Props>) => {
  return {
    [`!${name}`]: () => createElement(component, props),
  };
};

export const generateViews = <Props>(viewResources: GenerateView<Props>[]) => {
  return viewResources.reduce((result, resource) => {
    return {
      ...result,
      ...generateView(resource),
    };
  }, {});
};
