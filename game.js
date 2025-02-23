// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const screenSize = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.7, 640); // 动态调整大小
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
const questions = [
    { question: "以下哪种行为最能减少碳排放？", options: ["1. 开车上班", "2. 步行或骑自行车", "3. 使用一次性餐具", "4. 长时间开空调"], answer: 2 },
    { question: "以下哪种能源是可再生的？", options: ["1. 煤炭", "2. 石油", "3. 太阳能", "4. 天然气"], answer: 3 },
    { question: "减少塑料污染的最佳方法是什么？", options: ["1. 使用一次性塑料袋", "2. 回收利用塑料", "3. 焚烧塑料", "4. 丢弃到海洋"], answer: 2 },
    { question: "以下哪种行为有助于节约水资源？", options: ["1. 洗澡时长时间开水", "2. 关紧水龙头", "3. 浇花用自来水", "4. 洗车不控制水量"], answer: 2 },
    { question: "以下哪种物品可以回收？", options: ["1. 废电池", "2. 玻璃瓶", "3. 食物残渣", "4. 脏纸巾"], answer: 2 },
    { question: "温室效应的主要原因是？", options: ["1. 二氧化碳增加", "2. 植树造林", "3. 使用清洁能源", "4. 节约用电"], answer: 1 },
    { question: "以下哪种做法有助于保护森林？", options: ["1. 乱砍乱伐", "2. 植树造林", "3. 焚烧树木", "4. 随意丢弃垃圾"], answer: 2 },
    { question: "以下哪种动物因环境污染受到威胁？", options: ["1. 家猫", "2. 北极熊", "3. 家鸡", "4. 宠物狗"], answer: 2 },
    { question: "以下哪种能源对环境污染最小？", options: ["1. 煤炭", "2. 风能", "3. 石油", "4. 柴油"], answer: 2 },
    { question: "减少垃圾的最佳方法是什么？", options: ["1. 垃圾分类", "2. 随意丢弃", "3. 全部焚烧", "4. 埋进土壤"], answer: 1 },
    { question: "以下哪种气体是大气污染的主要来源？", options: ["1. 氧气", "2. 二氧化硫", "3. 氮气", "4. 水蒸气"], answer: 2 },
    { question: "保护臭氧层的最佳方法是？", options: ["1. 使用含氟利昂的制冷剂", "2. 减少使用喷雾剂", "3. 增加汽车尾气排放", "4. 焚烧垃圾"], answer: 2 },
    { question: "以下哪种做法有助于减少空气污染？", options: ["1. 多开车", "2. 使用公共交通", "3. 燃放烟花", "4. 露天烧烤"], answer: 2 },
    { question: "以下哪种资源是不可再生的？", options: ["1. 风能", "2. 煤炭", "3. 太阳能", "4. 水能"], answer: 2 },
    { question: "以下哪种行为可以保护土壤？", options: ["1. 过度使用化肥", "2. 种植绿植", "3. 随意倾倒废液", "4. 焚烧秸秆"], answer: 2 },
    { question: "以下哪种海洋生物因塑料污染受害最严重？", options: ["1. 海豚", "2. 海龟", "3. 鲸鱼", "4. 珊瑚"], answer: 2 },
    { question: "以下哪种做法能减少能源浪费？", options: ["1. 长时间开灯", "2. 使用节能灯", "3. 不关电器待机", "4. 频繁开关空调"], answer: 2 },
    { question: "以下哪种行为有助于保护水质？", options: ["1. 向河流倾倒垃圾", "2. 减少化肥使用", "3. 工厂废水直排", "4. 过度捕捞"], answer: 2 },
    { question: "以下哪种材料最环保？", options: ["1. 塑料", "2. 可降解材料", "3. 泡沫", "4. 一次性木筷"], answer: 2 },
    { question: "以下哪种做法能减少噪音污染？", options: ["1. 深夜鸣笛", "2. 使用隔音设备", "3. 高声喧哗", "4. 播放高分贝音乐"], answer: 2 },
    { question: "以下哪种能源是清洁能源？", options: ["1. 煤炭", "2. 核能", "3. 石油", "4. 天然气"], answer: 2 },
    { question: "以下哪种行为对保护野生动物有益？", options: ["1. 非法狩猎", "2. 建立自然保护区", "3. 破坏栖息地", "4. 买卖野生动物"], answer: 2 },
    { question: "以下哪种做法能减少温室气体？", options: ["1. 砍伐森林", "2. 多植树", "3. 增加工厂排放", "4. 燃烧化石燃料"], answer: 2 },
    { question: "以下哪种物品应放入有害垃圾桶？", options: ["1. 纸张", "2. 废电池", "3. 果皮", "4. 玻璃"], answer: 2 },
    { question: "以下哪种现象是酸雨的结果？", options: ["1. 土壤肥沃", "2. 建筑物腐蚀", "3. 空气清新", "4. 植物茂盛"], answer: 2 },
    { question: "以下哪种行为有助于节约电能？", options: ["1. 长时间开电视", "2. 关闭不用的电器", "3. 使用大功率灯泡", "4. 待机不关机"], answer: 2 },
    { question: "以下哪种做法能保护海洋生态？", options: ["1. 过度捕捞", "2. 减少海洋垃圾", "3. 倾倒油污", "4. 破坏珊瑚礁"], answer: 2 },
    { question: "以下哪种气体导致雾霾？", options: ["1. 氧气", "2. PM2.5", "3. 水蒸气", "4. 氮气"], answer: 2 },
    { question: "以下哪种做法有助于节能减排？", options: ["1. 长时间开空调", "2. 使用太阳能热水器", "3. 多开车", "4. 使用一次性用品"], answer: 2 },
    { question: "以下哪种动物因气候变化受威胁？", options: ["1. 家狗", "2. 企鹅", "3. 家鸡", "4. 宠物猫"], answer: 2 },
    { question: "以下哪种行为能减少白色污染？", options: ["1. 使用塑料袋", "2. 使用布袋", "3. 丢弃塑料瓶", "4. 焚烧塑料"], answer: 2 },
    { question: "以下哪种资源需要循环利用？", options: ["1. 水", "2. 阳光", "3. 风力", "4. 空气"], answer: 1 },
    { question: "以下哪种做法能减少土地沙漠化？", options: ["1. 过度放牧", "2. 植树造林", "3. 乱砍树木", "4. 开垦荒地"], answer: 2 },
    { question: "以下哪种能源利用率最高？", options: ["1. 煤炭", "2. 风能", "3. 石油", "4. 天然气"], answer: 2 },
    { question: "以下哪种垃圾属于可回收物？", options: ["1. 废纸", "2. 剩菜", "3. 废电池", "4. 脏塑料"], answer: 1 },
    { question: "以下哪种行为对生态系统有害？", options: ["1. 保护湿地", "2. 填湖造田", "3. 植树造林", "4. 垃圾分类"], answer: 2 },
    { question: "以下哪种现象与全球变暖有关？", options: ["1. 冰川融化", "2. 空气变冷", "3. 降雨减少", "4. 森林增多"], answer: 1 },
    { question: "以下哪种做法能减少光污染？", options: ["1. 夜晚开强光灯", "2. 使用柔和灯光", "3. 增加路灯亮度", "4. 全天开灯"], answer: 2 },
    { question: "以下哪种行为有助于保护鸟类？", options: ["1. 破坏鸟巢", "2. 设置鸟类喂食点", "3. 使用农药", "4. 砍伐树木"], answer: 2 },
    { question: "以下哪种污染与工业排放有关？", options: ["1. 噪音污染", "2. 大气污染", "3. 光污染", "4. 热污染"], answer: 2 },
    { question: "以下哪种做法能减少水污染？", options: ["1. 乱倒废水", "2. 处理污水再排放", "3. 过度捕鱼", "4. 丢弃垃圾到河中"], answer: 2 },
    { question: "以下哪种能源利用不会产生二氧化碳？", options: ["1. 煤炭", "2. 水力发电", "3. 石油", "4. 天然气"], answer: 2 },
    { question: "以下哪种行为能保护草原生态？", options: ["1. 过度放牧", "2. 禁止过度开垦", "3. 焚烧草地", "4. 随意丢弃垃圾"], answer: 2 },
    { question: "以下哪种现象是大气污染的后果？", options: ["1. 能见度降低", "2. 空气清新", "3. 植物茂盛", "4. 水质变好"], answer: 1 },
    { question: "以下哪种做法能减少热岛效应？", options: ["1. 增加绿化面积", "2. 多建高楼", "3. 铺设更多水泥路", "4. 减少植被"], answer: 1 },
    { question: "以下哪种物品应放入厨余垃圾桶？", options: ["1. 塑料瓶", "2. 菜叶", "3. 废纸", "4. 电池"], answer: 2 },
    { question: "以下哪种行为有助于保护珊瑚礁？", options: ["1. 过度捕捞", "2. 减少海洋污染", "3. 倾倒废物", "4. 破坏海底"], answer: 2 },
    { question: "以下哪种做法能减少森林火灾？", options: ["1. 乱丢烟头", "2. 加强防火巡查", "3. 露天焚烧", "4. 随意野炊"], answer: 2 },
    { question: "以下哪种能源利用不会破坏生态？", options: ["1. 煤炭开采", "2. 地热能", "3. 石油钻探", "4. 天然气开采"], answer: 2 },
    { question: "以下哪种行为能提高空气质量？", options: ["1. 增加汽车使用", "2. 种植树木", "3. 焚烧垃圾", "4. 使用劣质燃料"], answer: 2 }
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
    ctx.font = '36px SimSun';
    ctx.fillStyle = COLORS.RED;
    ctx.fillText(`时间: ${Math.floor(remainingTime)}`, screenSize - 150, 40);
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
            ctx.font = '36px SimSun';
            ctx.fillStyle = hintMessage.includes('正确') || hintMessage.includes('道具') ? COLORS.GREEN : COLORS.RED;
            ctx.fillText(hintMessage, screenSize / 2 - 50, screenSize / 2);
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
        document.getElementById('question-text').textContent = currentQuestion.question;
        document.getElementById('options-text').textContent = currentQuestion.options.join('\n');
    } else if (gameOver) {
        ctx.font = '36px SimSun';
        ctx.fillStyle = hintMessage === '恭喜你，你赢了！' ? COLORS.GREEN : COLORS.RED;
        ctx.fillText(hintMessage, screenSize / 2 - 100, screenSize / 2 - 40);
        ctx.fillStyle = COLORS.BLACK;
        ctx.fillText('按Q退出游戏，按R重新开始游戏', screenSize / 2 - 200, screenSize / 2 + 20);
        ctx.fillText('创作者：', screenSize / 2 - 350, screenSize / 2 + 200); // 新增创作者提示
        ctx.fillText('南昌市育新学校北京西路校区', screenSize / 2 - 200, screenSize / 2 + 240); // 新增创作者提示
        ctx.fillText('四(8)班 郑馨怡', screenSize / 2 + 10, screenSize / 2 + 280); // 新增创作者提示
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
            hintMessage = '回答错误';
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