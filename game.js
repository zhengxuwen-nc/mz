// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const screenSize = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.7, 800); // 动态调整大小
canvas.width = screenSize;
canvas.height = screenSize;
const cellSize = screenSize / 32;

// 颜色定义
const COLORS = {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    RED: '#FF0000',
    GREEN: '#00FF00',
    GRAY: '#808080'
};

// 加载图片资源
const images = {
    role: new Image(),
    win: new Image(),
    door: new Image(),
    box: new Image(),
    trap: new Image()
};
images.role.src = 'role.png';
images.win.src = 'win.png';
images.door.src = 'door.png';
images.box.src = 'box.png';
images.trap.src = 'trap.png';

// 环保选择题（50道）
const questions =  [
    {
      "question_text": "以下哪种行为能提高空气质量？",
      "options": [
        "1. 增加汽车使用",
        "2. 种植树木",
        "3. 焚烧垃圾",
        "4. 使用劣质燃料"
      ],
      "answer": 2
    },
    {
      "question_text": "下列哪一项是减少水污染的有效方法？",
      "options": [
        "1. 将工业废水直接排放到河流",
        "2. 推广使用化肥农药",
        "3. 建立污水处理厂",
        "4. 随意丢弃生活垃圾"
      ],
      "answer": 3
    },
    {
      "question_text": "以下哪种能源属于可再生能源？",
      "options": [
        "1. 煤炭",
        "2. 石油",
        "3. 天然气",
        "4. 太阳能"
      ],
      "answer": 4
    },
    {
      "question_text": "为了保护生物多样性，我们应该怎么做？",
      "options": [
        "1. 大量砍伐森林",
        "2. 建立自然保护区",
        "3. 扩大城市建设规模",
        "4. 随意捕杀野生动物"
      ],
      "answer": 2
    },
    {
      "question_text": "减少塑料污染，以下哪种做法最有效？",
      "options": [
        "1. 增加塑料袋的使用",
        "2. 推广使用可降解塑料",
        "3. 随意丢弃塑料垃圾",
        "4. 减少塑料制品生产和使用"
      ],
      "answer": 4
    },
    {
      "question_text": "以下哪种行为不利于节约用水？",
      "options": [
        "1. 使用节水龙头",
        "2. 洗衣水二次利用",
        "3. 大水漫灌农田",
        "4. 缩短淋浴时间"
      ],
      "answer": 3
    },
    {
      "question_text": "下列哪一项是造成土壤污染的主要原因之一？",
      "options": [
        "1. 过度使用农药",
        "2. 合理施用肥料",
        "3. 植树造林",
        "4. 秸秆还田"
      ],
      "answer": 1
    },
    {
      "question_text": "为了应对气候变化，以下哪种措施是有效的？",
      "options": [
        "1. 增加温室气体排放",
        "2. 减少森林面积",
        "3. 发展低碳经济",
        "4. 大量使用化石燃料"
      ],
      "answer": 3
    },
    {
      "question_text": "以下哪种生活方式更环保？",
      "options": [
        "1. 购物自带环保袋",
        "2. 出行首选私家车",
        "3. 经常使用一次性餐具",
        "4. 浪费食物"
      ],
      "answer": 1
    },
    {
      "question_text": "保护海洋环境，我们应该怎么做？",
      "options": [
        "1. 随意倾倒垃圾入海",
        "2. 减少海洋捕捞",
        "3. 开发海底矿产资源",
        "4. 填海造陆"
      ],
      "answer": 2
    },
    {
      "question_text": "以下哪种行为可以减少噪音污染？",
      "options": [
        "1. 在居民区使用高音喇叭",
        "2. 车辆在禁鸣区鸣笛",
        "3. 安装隔音窗户",
        "4. 夜晚进行建筑施工"
      ],
      "answer": 3
    },
    {
      "question_text": "下列哪一项是绿色建筑的特点？",
      "options": [
        "1. 大量使用高耗能材料",
        "2. 注重能源节约和环境保护",
        "3. 建筑密度高，绿化面积少",
        "4. 室内装修豪华"
      ],
      "answer": 2
    },
    {
      "question_text": "以下哪种做法有助于保护臭氧层？",
      "options": [
        "1. 大量使用氟利昂制冷剂",
        "2. 减少使用消耗臭氧层物质",
        "3. 增加工业生产",
        "4. 发展航空航天事业"
      ],
      "answer": 2
    },
    {
      "question_text": "下列哪一项不是空气污染物？",
      "options": [
        "1. 二氧化碳",
        "2. 二氧化硫",
        "3. 可吸入颗粒物",
        "4. 氮气"
      ],
      "answer": 4
    },
    {
      "question_text": "为了保护森林资源，以下哪种做法是正确的？",
      "options": [
        "1. 大面积采伐原始森林",
        "2. 提倡植树造林和森林抚育",
        "3. 毁林开荒",
        "4. 随意砍伐林木"
      ],
      "answer": 2
    },
    {
      "question_text": "以下哪种废弃物属于有害垃圾，需要特殊处理？",
      "options": [
        "1. 废纸",
        "2. 废旧电池",
        "3. 厨余垃圾",
        "4. 塑料瓶"
      ],
      "answer": 2
    },
    {
      "question_text": "下列哪一项不是提倡绿色出行的措施？",
      "options": [
        "1. 优先选择燃油汽车",
        "2. 骑自行车或步行",
        "3. 乘坐公共交通工具",
        "4. 拼车出行"
      ],
      "answer": 1
    },
    {
      "question_text": "以下哪种农业生产方式更环保可持续？",
      "options": [
        "1. 大面积种植单一作物",
        "2. 过度依赖化肥农药",
        "3. 发展生态农业和有机农业",
        "4. 焚烧秸秆"
      ],
      "answer": 3
    },
    {
      "question_text": "为了保护湿地，我们应该怎么做？",
      "options": [
        "1. 建立湿地保护区，限制人为破坏",
        "2. 发展湿地旅游，过度开发",
        "3. 填埋湿地用于城市建设",
        "4. 将湿地改造成耕地"
      ],
      "answer": 1
    },
    {
      "question_text": "下列哪一项不是雾霾天气的主要危害？",
      "options": [
        "1. 促进植物生长",
        "2. 引起呼吸道疾病",
        "3. 影响交通安全",
        "4. 降低空气能见度"
      ],
      "answer": 1
    },
    {
      "question_text": "以下哪种能源利用方式对环境影响最小？",
      "options": [
        "1. 燃煤发电",
        "2. 核能发电",
        "3. 风力发电",
        "4. 燃油发电"
      ],
      "answer": 3
    },
    {
      "question_text": "下列哪一项不是节约用电的措施？",
      "options": [
        "1. 随手关灯",
        "2. 使用节能电器",
        "3. 频繁开关电器",
        "4. 减少电器待机时间"
      ],
      "answer": 3
    },
    {
      "question_text": "以下哪种包装材料更环保？",
      "options": [
        "1. 纸质包装",
        "2. 塑料薄膜",
        "3. 塑料泡沫",
        "4. 复合塑料包装"
      ],
      "answer": 1
    },
    {
      "question_text": "下列哪一项不是保护野生动物栖息地的方法？",
      "options": [
        "1. 建立自然保护区",
        "2. 恢复退化生态系统",
        "3. 过度放牧和开垦",
        "4. 减少人为干扰"
      ],
      "answer": 3
    },
    {
      "question_text": "以下哪种行为不利于垃圾分类？",
      "options": [
        "1. 了解垃圾分类知识",
        "2. 将所有垃圾混合投放",
        "3. 购买分类垃圾桶",
        "4. 参与垃圾分类宣传活动"
      ],
      "answer": 2
    },
    {
      "question_text": "下列哪一项不是酸雨的成因？",
      "options": [
        "1. 过度使用农药",
        "2. 汽车尾气排放氮氧化物",
        "3. 燃煤排放二氧化硫",
        "4. 火山爆发释放硫化物"
      ],
      "answer": 1
    },
    {
      "question_text": "以下哪种做法有助于减少光污染？",
      "options": [
        "1. 增加城市夜景照明",
        "2. 限制户外广告牌亮度",
        "3. 使用高亮度LED灯",
        "4. 建筑外墙采用反光材料"
      ],
      "answer": 2
    },
    {
      "question_text": "下列哪一项不是生物多样性的作用？",
      "options": [
        "1. 维持生态系统稳定",
        "2. 提供食物和药物",
        "3. 促进物种单一化",
        "4. 具有重要的科学价值"
      ],
      "answer": 3
    },
    {
      "question_text": "以下哪种措施可以有效防治荒漠化？",
      "options": [
        "1. 植树种草，退耕还林还草",
        "2. 乱砍滥伐",
        "3. 过度放牧",
        "4. 扩大城市建设"
      ],
      "answer": 1
    },
    {
      "question_text": "下列哪一项不是白色污染的来源？",
      "options": [
        "1. 废弃塑料包装物",
        "2. 农田地膜",
        "3. 建筑垃圾",
        "4. 一次性塑料餐具"
      ],
      "answer": 3
    },
    {
      "question_text": "以下哪种行为符合绿色消费理念？",
      "options": [
        "1. 追求名牌，过度消费",
        "2. 购买过度包装的商品",
        "3. 优先选择节能环保产品",
        "4. 浪费粮食和水电"
      ],
      "answer": 3
    },
    {
      "question_text": "下列哪一项不是控制噪声污染的途径？",
      "options": [
        "1. 声源处降噪",
        "2. 传播途径中降噪",
        "3. 人耳处防噪",
        "4. 增加噪声源"
      ],
      "answer": 4
    },
    {
      "question_text": "以下哪种能源技术更清洁环保？",
      "options": [
        "1. 水力发电技术",
        "2. 页岩气开采技术",
        "3. 煤炭液化技术",
        "4. 油页岩开采技术"
      ],
      "answer": 1
    },
    {
      "question_text": "下列哪一项不是生态系统的功能？",
      "options": [
        "1. 物质循环",
        "2. 能量流动",
        "3. 信息传递",
        "4. 产生污染"
      ],
      "answer": 4
    },
    {
      "question_text": "以下哪种做法不利于保护耕地？",
      "options": [
        "1. 退耕还林还草",
        "2. 合理轮作，保护地力",
        "3. 占用耕地建设",
        "4. 推广节水灌溉技术"
      ],
      "answer": 3
    },
    {
      "question_text": "下列哪一项不是全球变暖的影响？",
      "options": [
        "1. 海平面上升",
        "2. 极端天气事件频发",
        "3. 生物多样性增加",
        "4. 冰川融化加速"
      ],
      "answer": 3
    },
    {
      "question_text": "以下哪种行为可以减少电子垃圾污染？",
      "options": [
        "1. 回收和合理处理废旧电子产品",
        "2. 购买更多新型电子产品",
        "3. 随意丢弃废旧电子产品",
        "4. 将电子产品送给他人继续使用"
      ],
      "answer": 1
    },
    {
      "question_text": "下列哪一项不是可持续发展的目标？",
      "options": [
        "1. 经济增长",
        "2. 社会公平",
        "3. 环境保护",
        "4. 资源无限开发"
      ],
      "answer": 4
    },
    {
      "question_text": "以下哪种做法有助于提高能源利用效率？",
      "options": [
        "1. 粗放式能源使用",
        "2. 推广节能技术和设备",
        "3. 增加能源浪费",
        "4. 发展高耗能产业"
      ],
      "answer": 2
    },
    {
      "question_text": "下列哪一项不是环境监测的内容？",
      "options": [
        "1. 空气质量监测",
        "2. 水质监测",
        "3. 土壤监测",
        "4. 经济效益评估"
      ],
      "answer": 4
    },
    {
      "question_text": "以下哪种措施可以减少汽车尾气污染？",
      "options": [
        "1. 增加汽车产量",
        "2. 使用清洁能源汽车",
        "3. 提高汽油标号",
        "4. 鼓励购买大排量汽车"
      ],
      "answer": 2
    },
    {
      "question_text": "下列哪一项不是保护珍稀动物的方法？",
      "options": [
        "1. 建立人工饲养基地",
        "2. 打击盗猎行为",
        "3. 破坏动物栖息地",
        "4. 开展科学研究和保护教育"
      ],
      "answer": 3
    },
    {
      "question_text": "以下哪种行为不利于节约粮食？",
      "options": [
        "1. 按需取餐，杜绝浪费",
        "2. 提倡光盘行动",
        "3. 大量囤积粮食",
        "4. 将剩饭剩菜进行合理处理"
      ],
      "answer": 3
    },
    {
      "question_text": "下列哪一项不是环境影响评价的内容？",
      "options": [
        "1. 分析项目对环境的影响",
        "2. 提出环境保护措施",
        "3. 评估项目经济效益",
        "4. 预测环境影响趋势"
      ],
      "answer": 3
    },
    {
      "question_text": "以下哪种做法有助于实现碳中和？",
      "options": [
        "1. 大量使用化石燃料",
        "2. 增加碳排放量",
        "3. 发展碳捕集和封存技术",
        "4. 减少植树造林"
      ],
      "answer": 3
    },
    {
      "question_text": "下列哪一项不是自然资源？",
      "options": [
        "1. 阳光",
        "2. 空气",
        "3. 矿产",
        "4. 人工合成材料"
      ],
      "answer": 4
    },
    {
      "question_text": "以下哪种行为可以减少水土流失？",
      "options": [
        "1. 陡坡开荒",
        "2. 毁林种地",
        "3. 植树种草，保持水土",
        "4. 过度樵采"
      ],
      "answer": 3
    },
    {
      "question_text": "下列哪一项不是环境法律法规的作用？",
      "options": [
        "1. 保护环境和资源",
        "2. 惩罚环境违法行为",
        "3. 促进经济快速增长，不考虑环境影响",
        "4. 规范人们的环境行为"
      ],
      "answer": 3
    },
    {
      "question_text": "以下哪种技术可以用于处理生活污水？",
      "options": [
        "1. 焚烧法",
        "2. 填埋法",
        "3. 生物处理法",
        "4. 化学氧化法"
      ],
      "answer": 3
    },
    {
      "question_text": "下列哪一项不是提倡简约适度生活的意义？",
      "options": [
        "1. 减少资源消耗",
        "2. 减轻环境压力",
        "3. 促进物质极大丰富，鼓励过度消费",
        "4. 提升生活品质"
      ],
      "answer": 3
    }
  ];

// Prim 算法生成迷宫
function createMazePrim(size) {
    const maze = Array(size).fill().map(() => Array(size).fill(1));
    const startX = Math.floor(Math.random() * size);
    const startY = Math.floor(Math.random() * size);
    maze[startY][startX] = 0;
    let walls = [
        startY + 1 < size ? [startX, startY + 1] : null,
        startY - 1 >= 0 ? [startX, startY - 1] : null,
        startX + 1 < size ? [startX + 1, startY] : null,
        startX - 1 >= 0 ? [startX - 1, startY] : null
    ].filter(w => w);

    while (walls.length) {
        const [wx, wy] = walls.splice(Math.floor(Math.random() * walls.length), 1)[0];
        const neighbors = [];
        if (wy + 1 < size && maze[wy + 1][wx] === 0) neighbors.push([wx, wy + 1]);
        if (wy - 1 >= 0 && maze[wy - 1][wx] === 0) neighbors.push([wx, wy - 1]);
        if (wx + 1 < size && maze[wy][wx + 1] === 0) neighbors.push([wx + 1, wy]);
        if (wx - 1 >= 0 && maze[wy][wx - 1] === 0) neighbors.push([wx - 1, wy]);
        if (neighbors.length === 1) {
            maze[wy][wx] = 0;
            if (wy + 1 < size && maze[wy + 1][wx] === 1) walls.push([wx, wy + 1]);
            if (wy - 1 >= 0 && maze[wy - 1][wx] === 1) walls.push([wx, wy - 1]);
            if (wx + 1 < size && maze[wy][wx + 1] === 1) walls.push([wx + 1, wy]);
            if (wx - 1 >= 0 && maze[wy][wx - 1] === 1) walls.push([wx - 1, wy]);
        }
    }
    return maze;
}

// 随机选择起点和终点
function selectStartEnd(maze) {
    const size = maze.length;
    const corners = [[0, 0], [0, size - 1], [size - 1, 0], [size - 1, size - 1]];
    const startCandidates = corners.map(([cx, cy]) => {
        let minDist = Infinity, closest = null;
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (maze[y][x] === 0) {
                    const dist = Math.abs(x - cx) + Math.abs(y - cy);
                    if (dist < minDist) {
                        minDist = dist;
                        closest = [x, y];
                    }
                }
            }
        }
        return closest;
    }).filter(c => c);

    const [startX, startY] = startCandidates[Math.floor(Math.random() * startCandidates.length)];
    let endX, endY;
    do {
        endX = Math.floor(Math.random() * size);
        endY = Math.floor(Math.random() * size);
    } while (maze[endY][endX] !== 0 || (Math.abs(endX - startX) + Math.abs(endY - startY) <= 40));
    return [[startX, startY], [endX, endY]];
}

// 生成触发器
function createTriggers(maze, count, start, end) {
    const triggers = [];
    for (let i = 0; i < count; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * maze.length);
            y = Math.floor(Math.random() * maze[0].length);
        } while (maze[y][x] !== 0 || (x === start[0] && y === start[1]) || (x === end[0] && y === end[1]));
        const prob = Math.random();
        const type = prob < 0.1 ? 2 : prob < 0.4 ? 3 : 4; // 箱子、门、陷阱
        maze[y][x] = type;
        triggers.push([x, y, type]);
    }
    return triggers;
}

// 绘制迷宫
function drawMaze(maze, endPos) {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 0) ctx.fillStyle = COLORS.WHITE;
            else if (maze[y][x] === 1) ctx.fillStyle = COLORS.BLACK;
            else if (maze[y][x] === 2) { ctx.drawImage(images.box, x * cellSize, y * cellSize, cellSize, cellSize); continue; }
            else if (maze[y][x] === 3) { ctx.drawImage(images.door, x * cellSize, y * cellSize, cellSize, cellSize); continue; }
            else if (maze[y][x] === 4) { ctx.drawImage(images.trap, x * cellSize, y * cellSize, cellSize, cellSize); continue; }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    ctx.drawImage(images.win, endPos[0] * cellSize, endPos[1] * cellSize, cellSize, cellSize);
}

// 绘制玩家
function drawPlayer(x, y) {
    ctx.drawImage(images.role, x * cellSize, y * cellSize, cellSize, cellSize);
}

// 绘制迷雾
function drawFog(maze, playerX, playerY, endPos) {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if ((x !== endPos[0] || y !== endPos[1]) && (Math.abs(y - playerY) > 4 || Math.abs(x - playerX) > 4)) {
                ctx.fillStyle = COLORS.GRAY;
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

// 绘制时间
function drawTime(remainingTime) {
    ctx.font = `${canvas.width * 0.05}px SimSun`;
    ctx.fillStyle = COLORS.RED;
    ctx.fillText(`时间: ${Math.floor(remainingTime)}`, screenSize*0.8, screenSize/16);
}

// 游戏主循环
let maze, playerX, playerY, endX, endY, startTime, gameOver, gameState, currentQuestion, usedQuestions, hintMessage, hintTimer, lastMoveTime;
function startGame() {
    maze = createMazePrim(32);
    [[playerX, playerY], [endX, endY]] = selectStartEnd(maze);
    createTriggers(maze, 28, [playerX, playerY], [endX, endY]); // 触发器总数28
    startTime = Date.now();
    gameOver = false;
    gameState = 'playing';
    currentQuestion = null;
    usedQuestions = new Set();
    hintMessage = null;
    hintTimer = 0;
    lastMoveTime = Date.now();
}

function gameLoop() {
    const now = Date.now();
    const elapsed = (now - startTime) / 1000;
    const remainingTime = 70 - elapsed; // 游戏时间70秒

    ctx.fillStyle = COLORS.WHITE;
    ctx.fillRect(0, 0, screenSize, screenSize);

    if (gameState === 'playing') {
        drawMaze(maze, [endX, endY]);
        drawPlayer(playerX, playerY);
        drawFog(maze, playerX, playerY, [endX, endY]);
        drawTime(remainingTime);

        if (hintMessage && now < hintTimer) {
            ctx.font = `${canvas.width * 0.05}px SimSun`;
            ctx.fillStyle = hintMessage.includes('正确') || hintMessage.includes('道具') ? COLORS.GREEN : COLORS.RED;
            ctx.fillText(hintMessage, screenSize *0.3, screenSize / 2);
        } else {
            hintMessage = null;
        }

        if (playerX === endX && playerY === endY) {
            hintMessage = '恭喜你，你赢了！';
            gameState = 'over';
            gameOver = true;
        } else if (remainingTime <= 0) {
            hintMessage = '很遗憾，你输了！';
            gameState = 'over';
            gameOver = true;
        }
    } else if (gameState === 'answering') {
        document.getElementById('question-box').style.display = 'block';
        document.getElementById('question-text').textContent = currentQuestion.question_text;
        document.getElementById('options-text').innerHTML = currentQuestion.options.join('<br>');
    } else if (gameOver) {
        ctx.font = `${canvas.width * 0.05}px SimSun`;
        ctx.fillStyle = hintMessage === '恭喜你，你赢了！' ? COLORS.GREEN : COLORS.RED;
        ctx.fillText(hintMessage, screenSize *0.344, screenSize *0.42);
        ctx.font = `${canvas.width * 0.04}px SimSun`;
        ctx.fillStyle = COLORS.BLACK;
        ctx.fillText('按Q退出游戏，按R重新开始游戏', screenSize *0.25, screenSize *0.54);
        ctx.font = `${canvas.width * 0.03}px SimSun`;
        ctx.fillStyle = COLORS.GREEN;
        ctx.fillText('创作者：', screenSize *0.25, screenSize *0.7); // 新增创作者提示
        ctx.fillText('南昌市育新学校北京西路校区', screenSize *0.4, screenSize *0.75); // 新增创作者提示
        ctx.fillText('四(8)班 郑馨怡', screenSize *0.52, screenSize *0.8); // 新增创作者提示
    }

    requestAnimationFrame(gameLoop);
}

// 键盘和触控控制
let moveInterval = 100; // 移动间隔（毫秒）
function simulateKey(key) {
    const event = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(event);
}

document.addEventListener('keydown', (e) => {
    if (gameState === 'playing' && Date.now() - lastMoveTime > moveInterval) {
        if (e.key === 'ArrowUp' && playerY > 0 && maze[playerY - 1][playerX] !== 1) playerY--;
        else if (e.key === 'ArrowDown' && playerY < 31 && maze[playerY + 1][playerX] !== 1) playerY++;
        else if (e.key === 'ArrowLeft' && playerX > 0 && maze[playerY][playerX - 1] !== 1) playerX--;
        else if (e.key === 'ArrowRight' && playerX < 31 && maze[playerY][playerX + 1] !== 1) playerX++;
        lastMoveTime = Date.now();

        if (maze[playerY][playerX] > 1) {
            if (maze[playerY][playerX] === 2) {
                hintMessage = '获得道具！增加10秒';
                hintTimer = Date.now() + 5000;
                startTime += 10000;
            } else if (maze[playerY][playerX] === 3) {
                do {
                    playerX = Math.floor(Math.random() * 32);
                    playerY = Math.floor(Math.random() * 32);
                } while (maze[playerY][playerX] !== 0);
            } else if (maze[playerY][playerX] === 4) {
                gameState = 'answering';
                const available = questions.filter(q => !usedQuestions.has(q.question));
                currentQuestion = available.length ? available[Math.floor(Math.random() * available.length)] : questions[Math.floor(Math.random() * questions.length)];
                usedQuestions.add(currentQuestion.question);
            }
            maze[playerY][playerX] = 0;
        }
    } else if (gameState === 'answering' && ['1', '2', '3', '4'].includes(e.key)) {
        const answer = parseInt(e.key);
        if (answer === currentQuestion.answer) {
            hintMessage = '回答正确';
            hintTimer = Date.now() + 5000;
        } else {
            hintMessage = '回答错误，扣时5秒！';
            hintTimer = Date.now() + 5000;
            startTime -= 5000; // 扣5秒
        }
        gameState = 'playing';
        document.getElementById('question-box').style.display = 'none';
    } else if (gameOver) {
        if (e.key.toLowerCase() === 'q') window.close();
        else if (e.key.toLowerCase() === 'r') startGame();
    }
});

// 触控按钮事件
document.getElementById('up').addEventListener('touchstart', () => simulateKey('ArrowUp'));
document.getElementById('down').addEventListener('touchstart', () => simulateKey('ArrowDown'));
document.getElementById('left').addEventListener('touchstart', () => simulateKey('ArrowLeft'));
document.getElementById('right').addEventListener('touchstart', () => simulateKey('ArrowRight'));
document.getElementById('btn1').addEventListener('touchstart', () => simulateKey('1'));
document.getElementById('btn2').addEventListener('touchstart', () => simulateKey('2'));
document.getElementById('btn3').addEventListener('touchstart', () => simulateKey('3'));
document.getElementById('btn4').addEventListener('touchstart', () => simulateKey('4'));
document.getElementById('btnR').addEventListener('touchstart', () => simulateKey('r'));
document.getElementById('btnQ').addEventListener('touchstart', () => simulateKey('q'));

// 启动游戏
startGame();
gameLoop();