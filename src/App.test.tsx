import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";
import Table from "./table/Table";
import { Simulate } from "react-dom/test-utils";
import { findClosest, randomNumber } from "./general";

let mokRows1 = [
  [
    {
      amount: 111,
      id: 0,
      lighted: false,
      percent: "25%",
      showPercent: false,
    },
  ],
  [
    {
      amount: 182,
      id: 1,
      lighted: false,
      percent: "150%",
      showPercent: false,
    },
  ],
  [
    {
      amount: 133,
      id: 2,
      lighted: false,
      percent: "25%",
      showPercent: false,
    },
  ],
  [
    {
      amount: 144,
      id: 3,
      lighted: false,
      percent: "52%",
      showPercent: false,
    },
  ],
];

let mokRows2 = [
  [
    {
      amount: 211,
      id: 1,
      lighted: false,
      percent: "25%",
      showPercent: false,
    },
  ],
  [
    {
      amount: 222,
      id: 20,
      lighted: false,
      percent: "150%",
      showPercent: false,
    },
  ],
  [
    {
      amount: 233,
      id: 210,
      lighted: false,
      percent: "52%",
      showPercent: false,
    },
  ],
];

let mokParams = {
  x: 1,
  y: 4,
  closest: 2,
  tableData: mokRows1,
};
let mokParams2 = {
  x: 1,
  y: 4,
  closest: 0,
  tableData: mokRows2,
};
let mokParams1 = {
  x: 0,
  y: 0,
  closest: 0,
  tableData: undefined,
};

test("renders App with mokParams", () => {
  let root: any;
  renderer.act(() => {
    root = renderer.create(<App data={mokParams} />);
  });
  expect(root.toJSON()).toMatchSnapshot();
});

test("renders App  with mokParams1", () => {
  let root: any;
  renderer.act(() => {
    root = renderer.create(<App data={mokParams1} />);
  });
  expect(root.toJSON()).toMatchSnapshot();
});

test("renders App with undefined params", () => {
  let root: any;
  renderer.act(() => {
    root = renderer.create(<App data={undefined} />);
  });
  expect(root.toJSON()).toMatchSnapshot();
});

test("table event test dispatch", (done) => {
  let data = {
    rows: mokRows1,
  };
  let component = new Table(data);
  window.addEventListener("offHints", () => {
    done();
  });
  component.offAllLight();
});

test("base snapshot app", () => {
  let root: any;
  renderer.act(() => {
    root = renderer.create(<App data={mokParams2} />);
  });
  expect(root.toJSON()).toMatchSnapshot();
});

test("generate test event removeButton & addButton", () => {
  let component: any;
  renderer.act(() => {
    component = renderer.create(<App data={mokParams} />);
  });
  const testInstance = component.root;
  let removeButton = testInstance.findByProps({
    className: "button",
    id: "removeButton",
  });
  let addButton = testInstance.findByProps({
    className: "button",
    id: "addButton",
  });
  expect(component.toJSON()).toMatchSnapshot();
  removeButton.props.onClick();
  expect(component.toJSON()).toMatchSnapshot();
  addButton.props.onClick();
  expect(component.toJSON()).toMatchSnapshot();
});

test("generate test event createButton", () => {
  let component: any;
  renderer.act(() => {
    component = renderer.create(<App data={mokParams} />);
  });
  const testInstance = component.root;
  let createButton = testInstance.findByProps({ id: "formZ" });
  expect(component.toJSON()).toMatchSnapshot();
  createButton.props.onSubmit();
  expect(component.toJSON()).toMatchSnapshot();
});
test("generate test event createButton without params", () => {
  let component: any;
  renderer.act(() => {
    component = renderer.create(<App data={mokParams1} />);
  });
  const testInstance = component.root;
  let createButton = testInstance.findByProps({ id: "formZ" });
  expect(component.toJSON()).toMatchSnapshot();
  createButton.props.onSubmit();
  expect(component.toJSON()).toMatchSnapshot();
});

test("cell click", () => {
  let component: any;
  renderer.act(() => {
    component = renderer.create(<App data={mokParams2} />);
  });
  const testInstance = component.root;
  let wrap = testInstance.findByProps({ className: "table_wrap" });
  expect(component.toJSON()).toMatchSnapshot();
  let event = new Event("click", { bubbles: true });
  wrap.props.onClick(event);
  expect(component.toJSON()).toMatchSnapshot();
});

test("Column event test dispatch", (done) => {
  let component: any;
  window.addEventListener("offHints", () => {
    done();
  });
  renderer.act(() => {
    component = renderer.create(<App data={mokParams2} />);
  });
  const testInstance = component.root;
  let cells = testInstance.findAllByProps({ className: "sum" });
  expect(component.toJSON()).toMatchSnapshot();
  cells[0].props.onMouseLeave();
  expect(component.toJSON()).toMatchSnapshot();
});

test("inputX change", () => {
  let component: any;
  renderer.act(() => {
    component = renderer.create(<App data={mokParams2} />);
  });
  const testInstance = component.root;
  let inputX = testInstance.findByProps({ name: "x" });
  expect(component.toJSON()).toMatchSnapshot();
  renderer.act(() =>
    inputX.props.onChange({ target: { value: 5, name: "x" } })
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("inputY change", () => {
  let component: any;
  renderer.act(() => {
    component = renderer.create(<App data={mokParams2} />);
  });
  const testInstance = component.root;
  let inputY = testInstance.findByProps({ name: "y" });
  expect(component.toJSON()).toMatchSnapshot();
  renderer.act(() =>
    inputY.props.onChange({ target: { value: 6, name: "y" } })
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("input closest change", () => {
  let component: any;
  renderer.act(() => {
    component = renderer.create(<App data={mokParams2} />);
  });
  const testInstance = component.root;
  let inputY = testInstance.findByProps({ name: "closest" });
  expect(component.toJSON()).toMatchSnapshot();
  renderer.act(() =>
    inputY.props.onChange({ target: { value: 2, name: "closest" } })
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("click on cell test", () => {
  let component: any;
  renderer.act(() => {
    component = renderer.create(<App data={mokParams2} />);
  });
  const testInstance = component.root;
  let wrapper = testInstance.findByProps({ className: "table_wrap" });
  expect(component.toJSON()).toMatchSnapshot();
  let mokEvent = {
    target: {
      value: 2,
      tagName: "TH",
      dataset: {
        collumnindex: 0,
        index: 1,
      },
    },
    type: "click",
  };
  renderer.act(() => wrapper.props.onClick(mokEvent));
  expect(component.toJSON()).toMatchSnapshot();
});

test("mouseover on cell test", () => {
  let component: any;
  renderer.act(() => {
    component = renderer.create(<App data={mokParams} />);
  });
  const testInstance = component.root;
  let wrapper = testInstance.findByProps({ className: "table_wrap" });
  expect(component.toJSON()).toMatchSnapshot();
  let mokEvent = {
    target: {
      value: 2,
      tagName: "TH",
      dataset: {
        collumnindex: 0,
        index: 1,
      },
    },
    type: "mouseover",
  };
  renderer.act(() => wrapper.props.onMouseOver(mokEvent));
  expect(component.toJSON()).toMatchSnapshot();
});

test("mouseover on SUM test", () => {
  let component: any;
  renderer.act(() => {
    component = renderer.create(<App data={mokParams} />);
  });
  const testInstance = component.root;
  let wrapper = testInstance.findByProps({ className: "table_wrap" });
  expect(component.toJSON()).toMatchSnapshot();
  let mokEvent = {
    target: {
      value: 2,
      tagName: "TH",
      dataset: {
        collumnindex: 1,
        index: -1,
      },
    },
    type: "mouseover",
  };
  renderer.act(() => wrapper.props.onMouseOver(mokEvent));
  expect(component.toJSON()).toMatchSnapshot();
});

test("general findClosest func", () => {
  let result = findClosest(0, mokRows1, 2);
  expect(result?.length).toBe(3);
  result = findClosest(3, mokRows1, 1);
  expect(result?.length).toBe(2);
  result = findClosest(3, mokRows1, 0);
  expect(result?.length).toBeFalsy();
  result = findClosest(3, mokRows1, 5);
  expect(result?.length).toBe(4);
});

test("general randomNumber func", () => {
  let random = randomNumber(100, 200);
  expect(random).toBeGreaterThanOrEqual(100);
  expect(random).toBeLessThanOrEqual(200);
});
