const log = console.log.bind(console);

// 定义我们用于测试的函数
const ensureEqual = function (a, b, message) {
  if (a !== b) {
    log(`${message}, (${a}) 不等于 (${b})`);
  } else {
    log("测试成功");
  }
};

const arrayEquals = function (a, b) {
  // a 和 b 都是数组
  // 如果这两个数组每一个位置对应的元素都相等, 那么说明 a 与 b 相等
  // 此时返回 true, 否则返回 false

  /*
    提示
    a. 如果这两个参数的长度不相等，直接返回 false
    b. 遍历参数 a，每次遍历的元素为 a[i]，判断 a[i] 与 b[i] 的值
        如果 a[i] 与 b[i] 不相等，直接返回 false
    c. 循环结束后，返回 true
    */
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

const ensure = function (condition, message) {
  // 在条件不成立的时候, 输出 message
  if (!condition) {
    log("*** 测试失败:", message);
  } else {
    log("||| 测试成功");
  }
};

const join = function (delimiter, array) {
  /*
    delimiter 是 string
    array 是包含 string 的 array

    把 array 中的元素用 delimiter 连接成一个字符串并返回
    具体请看测试

    提示：
        在循环里面拼接 delimiter

    分步提示：
        1. 把 array 中的第一个元素赋值给 s
        2. 从 1 开始遍历数组 array，每次遍历的时候把 delimiter 和 遍历的元素 e 看成一个整体 (delimiter + e)
        3. 每次遍历的时候把这个整体累加到 s
        4. 循环结束的时候 s 就是拼接好的字符，返回这个结果 s
    */
  let res = array[0];
  for (let i = 1; i < array.length; i++) {
    res += delimiter + array[i];
  }
  return res;
};

// 作业 2
// 实现函数
const split = function (s, delimiter = " ") {
  /*
    s 是 string
    delimiter 是 string, 默认为空格 ' '

    以 delimiter 为分隔符号, 返回一个 array
    例如
    split('1 2 3', ' ') 返回 ['1', '2', '3']
    split('a=b&c=d', '&') 返回 ['a=b', 'c=d']
    注意, 测试 array 是否相等得自己写一个函数用循环来跑

    提示：
        用循环找到 delimiter，记录两个变量 start 和 end 来 slice 出子字符串，把子字符串添加到数组中

    分步提示：
        1. 定义一个数组 l 来存储结果，初始值为 []
        2. 计算出 delimiter 的长度 space，因为 delimiter 的长度不一定为 1
        3. 使用 start 来记录每次 slice 的初始位置，初始值为 0
        4. 遍历字符串，slice 子字符串 slice(i, i + space)，
            如果子字符串与 delimiter 相等，把相应数据存储到数组 l 中。
            数据的计算方式是 s.slice(start, i)
        5. 改变 start 的值，把 i + space 设置为新的 start 下标
        6. 循环结束后，还要把最后一个元素添加到数组 l 中，这个元素为 s.slice(start)
        7. 最后数组 l 就是需要的结果，返回 l
        8. 注意，判断数组相等使用以前作业里的 arrayEquals
    */

  const res = [];
  let len = delimiter.length;
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    if (s.slice(i, i + len) === delimiter) {
      res.push(s.slice(start, i));
      start = i + len;
    }
  }
  res.push(s.slice(start));
  return res;
};

// 作业 3
// 实现函数
const replaceAll = function (s, old, newString) {
  /*
    s old newString 都是 string
    返回一个「将 s 中出现的所有 old 字符串替换为 new 字符串」的字符串

    提示
        先按照 old 来 split 出一个数组，然后用 newString 来 join 这个数组

    分步提示：
        1. 调用作业 2 的 split 函数，按照 old 来 split，结果为 l
        2. 调用作业 1 的 join 函数，delimiter 为 newString，array 为第一步的 l，结果为 result
        3. 返回第二步的计算结果 result
    */

  const arr = s.split(old);
  let res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    res += newString + arr[i];
  }
  return res;
};

// 作业 4
// 实现函数
const str1 = function (n) {
  /*
    n 是 int
    返回这样规律的字符串, 特殊情况不考虑
    n       返回值
    1       '1'
    2       '121'
    3       '12321'

    提示：
        把返回值分成两部分，用两个循环分别来生成这两部分

    分步提示：
        1. 定义字符串 s 来存储计算的结果，初始值为 ''
        2. 生成 12345...n 这部分内容
            循环从 0 到 n，把每次循环的元素转成字符串，并且累加到 s 上
        3. 生成 n...4321 这部分内容
            循环从 n-1 到 0，把每次循环的元素转成字符串，并且累加到 s 上
        4. 循环结束后 s 就是计算的结果，返回 s
    */

  let res = "";
  for (let i = 1; i <= n; i++) {
    res += i;
  }
  for (let i = 1; i < n; i++) {
    res += n - i;
  }
  return res;
};

// 作业 5
// 实现函数
const str2 = function (n) {
  /*
    n 是 int
    返回这样规律的字符串, 特殊情况不考虑
    n       返回值
    1       'A'
    2       'ABA'
    3       'ABCBA'

    提示：
        和作业 4 类似，用两个循环来分别生成前半部分和前后部分

    分步提示：
        1. 定义一个字符串 s 来存储计算的结果，初始值为 ''
        2. 同作业 4 的处理方式，不同的是从 upper 里面用下标取出字母
            upper 是以前作业里的字符串，包含所有大写字母
        3. 同作业 4 的处理方式，不过需要注意循环从 n - 2 到 0
        4. 循环结束后 s 就是计算的结果，返回 s
    */
  let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let res = "";
  for (let i = 1; i <= n; i++) {
    res += upper[i - 1];
  }
  for (let i = 1; i < n; i++) {
    res += upper[n - i - 1];
  }
  return res;
};

// 6
const addLine = function (n) {
  // 生成从 n + 1 = n + 1 到 n + n = n + n 的值字符串
  // 仔细观察测试结果, 每一个式子的后面有一个空格
  let s = "";
  for (let i = 1; i <= n; i++) {
    s += `${n} + ${i} = ${n + i} `;
  }
  return s;
};

// 7
// 实现加法口诀表
const addTable = function (n) {
  /*
    返回这样格式的加法口诀表(没写全, 但是要返回完整的)
    注意, 这只是我输入的内容
    实际上你普通 log 出来是不会有回车的
    [
        '1 + 1 = 2 ',
        '2 + 1 = 3  2 + 2 = 4 ',
        '3 + 1 = 4  3 + 2 = 5  3 + 3 = 6 ',
    ]

    分步提示：
        1. 定义一个数组 table 来存储加法口诀表，初始值为 []
        2. 循环从 0 开始，到 n 结束（包含 n），在每次循环里调用 addLine 函数，
            把调用结果 push 到 table 中
        3. 循环结束后 table 就是加法口诀表，但是这个目前是写在一行里面
            如果想要有回车，用作业 1 的函数 join('\n', addTable())
    */
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(addLine(i));
  }
  return arr;
};

// 8
// 实现函数
const range1 = function (start, end) {
  /*
    start end 都是 int

    返回一个 array, 假设 start 为 1, end 为 5, 返回数据如下
    [1, 2, 3, 4]

    提示：
        循环从 start 开始，end 结束（不包含 end），依次 push 到数组中

    分步提示：
        1. 循环从 start 开始，end 结束（不包含 end），
            每次循环的元素 push 到数组中
        2. 返回数组
    */
  const arr = [];
  for (let i = start; i < end; i++) {
    arr.push(i);
  }
  return arr;
};

// 9
// 实现函数
const range2 = function (start, end, step = 1) {
  /*
    start end step 都是数字
    step 是大于 0 的正整数

    返回一个 array
    假设 start=1, end=5, step=1 返回数据如下
    [1, 2, 3, 4]
    假设 start=0, end=6, step=2 返回数据如下
    [0, 2, 4]

    提示：
        类似作业 7，不同的是每次循环递增的不是 1，而是 step

    分步提示：
        1. 步骤和作业 7 类似，但是循环递增的是 step
        2. 返回数组
    */
  let arr = [];
  for (let i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
};

// 10
// 实现函数
const range3 = function (start, end, step = 1) {
  /*
    start end step 都是数字

    和 range2 一样, 但是要求支持负数 step
    使用 while 循环
    返回一个 array
    假设 start=1, end=5, step=1 返回数据如下
    [1, 2, 3, 4]
    假设 start=6, end=0, step=-1 返回数据如下
    [6, 5, 4, 3, 2, 1]

    提示：
        判断 start 和 end 的大小，然后循环生成数组

    分步提示：
        1. 如果 start < end，调用作业 8 的 range2
        2. 否则，类似作业 8，循环从 start 开始，到 end 结束（不包括 end），每次递减 step
        3. 返回数组
    */
  if (start < end) {
    return range2(start, end, step);
  }
  let i = start;
  let arr = [];
  while (i > end) {
    arr.push(i);
    i += step;
  }
  return arr;
};

// 11
// 实现函数
const random01 = function () {
  /*
    js 标准数学库有一个随机数函数
    Math.random()
    它返回 0 - 1 之间的小数

    用它实现本函数, 返回 0 或 1

    提示：
        这道题目有多种实现方式，我们这里拿 Math.random() 与 0.5 比较

    分步提示：
        1. 如果 Math.random() > 0.5，返回 1
        2. 否则返回 0
    */
  return Math.random() > 0.8 ? 1 : 0;
};

// 12
// 实现函数
const randomLine01 = function (n) {
  /*
    返回一个只包含了 0 1 的随机 array, 长度为 n
    假设 n 为 5, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
    [0, 0, 1, 0, 1]

    提示：
        循环 n 次，每次调用 random01，push 到数组中

    分步提示：
        1. 循环 n 次，每次调用 random01，把结果 push 到数组中
        2. 返回数组
    */
  let a = [];
  for (let i = 0; i < n; i++) {
    a.push(random01());
  }
  return a;
};

// 13
const randomSquare01 = function (n) {
  /*
    返回以下格式的数据
    假设 n 为 3, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
    注意, 这只是一个 array, 并不是它显示的样子
    注意, 这是一个 array 不是 string
    [
        [0, 0, 1],
        [1, 0, 1],
        [0, 0, 0],
    ]
    返回, 包含了 n 个『只包含 n 个「随机 0 1」的 array』的 array

    提示：
        循环 n 次，每次调用 randomLine01，把结果 push 到数组中

    分步提示：
        1. 循环 n 次，每次调用 randomLine01，把结果 push 到数组中
        2. 返回数组
    */

  let a = [];
  for (let i = 0; i < n; i++) {
    a.push(randomLine01(n));
  }
  return a;
};

// 14
const randomLine09 = function (n) {
  /*
    返回一个只包含了 0 9 的随机 array, 长度为 n
    假设 n 为 5, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
    [0, 0, 9, 0, 9]

    提示：
        先生成只包含 0 1 的数组，然后把数组里的 1 替换成 9

    分步提示：
        1. 调用函数 randomLine01 得到一个只包含 0 1 的数组 line
        2. 遍历这个数组，如果遍历出来的元素为 1，就把这个位置的元素值设置为 9
        3. 返回 line
    */
  let arr = randomLine01(n);
  for (let i = 0; i < n; i++) {
    if (arr[i] === 1) {
      arr[i] = 9;
    }
  }
  return arr;
};

// 14
const randomSquare09 = function (n) {
  /*
        返回一个随机二维数组, 只有 0, 9
    [
        [0, 9, 0, 0],
        [0, 0, 9, 0],
        [9, 0, 9, 0],
        [0, 9, 0, 0],
    ]
    */

  let r = [];
  for (let i = 0; i < n; i++) {
    r.push(randomLine09(n));
  }
  return r;
};

// 15
const clonedArray = function (array) {
  // array 是一个数组, 把 array 的元素复制到另一个新数组
  // 返回新数组
  // 这样改变旧数组的时候, 新数组不会发生改变

  // 注意, 这个作业可以用 array.slice(0) 完成
  return array.slice(0);
};

// 16
const markedLine = function (array) {
  /*
    array 是一个只包含了 0 9 的 array
    返回一个标记过的 array
    ** 注意, 使用一个新数组来存储结果, 不要直接修改老数组
    复制数组用 array.slice(0) 实现

    标记规则如下
    对于下面这样的 array
    [0, 0, 9, 0, 9]
    标记后是这样
    [0, 1, 9, 2, 9]

    规则是, 0 会被设置为左右两边 9 的数量

    提示：
        把 9 左右加 1，注意判断 9 是否在两边

    分步提示：
        1. 先使用 clonedArray 复制数组 array，用变量 line 存储
        2. 遍历数组 line，每次遍历的元素是 n
        3. 如果 n 为 9，并且 n 不是第一个元素，并且 n 左边的数字不是 9，把 n 左边的数字 + 1
        4. 如果 n 为 9，并且 n 不是最后一个元素，并且 n 右边的数字不是 9，把 n 右面的数字 + 1
        5. 返回数组 line
    */
  let res = clonedArray(array);
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== 9) {
      continue;
    }
    if (i !== 0) {
      res[i - 1] += 1;
    }
    if (i !== array.length - 1) {
      res[i + 1] += 1;
    }
  }
  return res;
};

// !!! 17 重点！！！！
const clonedSquare = function (array) {
  // array 是一个二维数组, 即 array 的每一个元素依然是一个数组
  // 把 array 的每一个数组元素的元素复制到另一个新数组
  // 返回新数组
  // 提示: 遍历 array, 复制每一个元素到新数组即可
  let res = [];
  for (let i = 0; i < array.length; i++) {
    res.push(clonedArray(array[i]));
  }
  return res;
};

// 18
// 注意, 这道题比较麻烦, 你要是不会, 就填写答案「这道题目我放弃」的全拼
const plusArr = function (arr, x, y) {
  const rows = arr.length;
  if (rows === 0) {
    return;
  }

  const cols = arr[0].length;

  if (x < 0 || y < 0 || x >= rows || y >= cols) {
    return;
  }

  if (arr[x][y] === 9) {
    return;
  }

  arr[x][y]++;
};

const markedSquare = function (array) {
  /*
    array 是一个「包含了『只包含了 0 9 的 array』的 array」
    返回一个标记过的 array
    ** 注意, 使用一个新数组来存储结果, 不要直接修改老数组

    范例如下, 这是 array
    [
        [0, 9, 0, 0],
        [0, 0, 9, 0],
        [9, 0, 9, 0],
        [0, 9, 0, 0],
    ]

    这是标记后的结果
    [
        [1, 9, 2, 1],
        [2, 4, 9, 2],
        [9, 4, 9, 2],
        [2, 9, 2, 1],
    ]

    规则是, 0 会被设置为四周 8 个元素中 9 的数量

    提示：
        这道题比较麻烦, 你要是不会, 就直接写「这道题目我不会」
        这道题目循环调用前面作业的 markedLine，这道题目不要求写测试

    分步提示：
        1. 先定义一个 clonedSquare 函数，把 array 的内容复制到一个新数组中
        2. 调用 clonedSquare 函数，得到 square
        3. 遍历 square，每次遍历的元素为 line
        4. 遍历 line，调用一个 markAround 函数，传入 square, i, j
        5. 实现 markAround 函数，对于每一个 square[i][j] 这样的元素都按照规则 +1
            分 4 个顶角、4 条边和剩下的元素这几种情形
        6. 两重遍历结束后，square 就是需要的结果，return square 即可。
    */

  let res = clonedSquare(array);
  let n = array.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (array[i][j] !== 9) {
        continue;
      }

      plusArr(res, i - 1, j);
      plusArr(res, i + 1, j);
      plusArr(res, i, j - 1);
      plusArr(res, i, j + 1);

      plusArr(res, i - 1, j - 1);
      plusArr(res, i - 1, j + 1);
      plusArr(res, i + 1, j - 1);
      plusArr(res, i + 1, j + 1);
    }
  }
  return res;
};

const testMarkedSquare = function () {
  let arr = randomSquare09(5);
  log(arr);

  let res = markedSquare(arr);
  log(res);
};
testMarkedSquare();

module.exports = {
  log,
  ensureEqual,
  arrayEquals,
  ensure,
  randomSquare09,
  markedSquare,
  clonedSquare,
};
