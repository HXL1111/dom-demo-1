window.dom = {
  //增
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }, //创建节点
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  }, //在node节点后新增一个节点2
  before(node, node2) {
    //（参考节点，新节点）
    node.parentNode.insertBefore(node2, node);
  }, //在node节点后新增一个节点2
  append(parent, node) {
    parent.appendChild(node);
  }, //在父节点增加一个子节点，追加到子节点的末尾处
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  }, //增加一个父节点
  //删
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    //const { childNodes } = node; 等价于 const childNode = node.childNode
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  //改
  attr(node, name, value) {
    // 重载
    if (arguments.length === 3) {
      //更改节点属性值
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      //查看节点属性值
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    // 适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string; // ie
      } else {
        node.textContent = string; // firefox / Chrome
      } // 更改内容
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText; // ie
      } else {
        return node.textContent; // firefox / Chrome
      } // 查看
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string; // 改写
    } else if (arguments.length === 1) {
      return node.innerHTML;
    } //读html内容
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
      // dom.style(div, "border", "1px solid red")
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        return node.style[name];
        // dom.style(div, "border")
      } else if (name instanceof Object) {
        // dom.style(div, {border: "1px solid red"})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },// 添加class
    remove(node, className) {
      node.classList.remove(className);
    },// 删除class
    has(node, className) {
      return node.classList.contains(className);
    },// class是否存在
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },// 添加事件
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },// 删除这个事件
  // 查
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },// 如果有范围，在范围里面找到一个选择器，没有，则直接找到第一个选择器
  parent(node) {
    return node.parentNode;
  },// 查看该节点的父节点
  children(node) {
    return node.children;
  },// 查看该节点的子节点
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  }, // 查看该节点的兄弟节点
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },// 查看该节点的下一个节点
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  }, // 查看该节点前的节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },// 对该数组 遍历操作
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  }, // 查看该节点是第几个节点
};
