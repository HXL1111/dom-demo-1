const div = dom.create("<div>div1</div>");

dom.wrap(child1, div);
const div2 = dom.create("<div>div2</div>");
dom.append(div, div2);
dom.remove(div2);

const nodes = dom.empty(window.empty);
console.log(nodes);

dom.attr(child1, "name", "222222");
const title = dom.attr(child1, "name");
console.log(`title:${title}`);

dom.text(test, "你好，这是新内容");
console.log(dom.text(test));

dom.style(test, { border: "1px solid red", color: "blue" });
console.log(dom.style(test, "border"));
dom.style(test, "border", "1px solid red");

dom.class.add(test, "red");
dom.class.remove(test, "red");
console.log(dom.class.has(test, "red"));


let fn = () => {
  console.log("点击了");
};

dom.on(test, "click", fn);
dom.off(test, "click", fn);

const test1Div = dom.find("#test1")[0]
console.log(test1Div)
console.log(dom.find(".red", test1Div)[0])


console.log(dom.siblings(dom.find("#s1")[0]))
console.log(dom.next(dom.find("#s1")[0]))
console.log(dom.previous(dom.find("#s2")[0]))

const t = dom.find("#travel")[0]
dom.each(dom.children(t),(n)=> dom.style(n, "border","1px solid red") )

console.log(dom.index(dom.find("#t2")[0]))

