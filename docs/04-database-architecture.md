# 数据库架构设计 V1.0
更新时间：2026-05-21

## 核心结论
用**引用表 + 关联表**的归一化设计，将可变维度（城市/饮食类型/过敏原）从主表中剥离，杜绝字段爆炸。扩展新城市、新饮食类型、新过敏标签只需插入新行，不改 schema。

---

## 表结构总览

```
cities ──────────────────────────┐
                                 │ city_id
diet_profiles ──┐                ▼
                │ ──── restaurant_diet_tags ──── restaurants
allergens ──────┤                                     │
                │ ──── restaurant_allergen_flags       │ restaurant_id
                                                      ▼
ordering_phrases ─── diet_profile_id            menu_items
(复用于任意餐厅)
                                                 meta (系统配置)
```

---

## 各表职责说明

### `cities` — 城市表
**为什么独立？** 活动结束后扩展到北京/成都，只需新增 city 行，所有餐厅通过 `city_id` 自动归属。无需复制 schema。

### `diet_profiles` — 饮食类型表
**为什么独立？** 避免在 restaurants 表加 `is_vegan / is_vegetarian / is_halal / is_jain / is_kosher...` 无限字段。新增类型 = 新增一行，餐厅表零修改。

| slug | 含义 | 当前状态 |
|------|------|---------|
| vegan | 纯素 | ✅ 上线 |
| vegetarian | 素食（含蛋奶）| ✅ 上线 |
| halal | 清真 | ✅ 上线 |
| veg_friendly | 有素食套餐 | ✅ 上线 |
| jain | 耆那教素食 | 预留 |
| kosher | 犹太洁食 | 预留 |

### `allergens` — 过敏原/成分表
**4个 category 隔离不同语义：**

| category | 用途 | 例子 |
|----------|------|------|
| `allergen` | 医学过敏原 | 花生/麸质/坚果/贝类/乳制品/蛋/大豆 |
| `religious` | 宗教禁忌 | 猪肉/酒精/动物血 |
| `hidden_ingredient` | 中餐隐藏成分 | 蚝油/猪油/鸡精/骨汤/鱼露 |
| `diet_blocker` | 饮食限制 | 肉类/海鲜/蛋/奶 |

### `restaurant_diet_tags` — 关联表
**`confidence` 字段解决"确认 vs 推断"问题：**
- `confirmed`：已人工核实（电话/到店）
- `likely`：高置信度推断（如新疆菜馆=清真）
- `partial`：部分菜品符合，UI 上显示"Has veg options"

### `menu_items` — 菜品表
`diet_tags` 和 `allergen_*` 冗余存储 slug 数组（非 ID），原因：
- Convex 无原生 JOIN，冗余查询更快
- 菜品层面的过滤不依赖关联查询

### `ordering_phrases` — 点餐卡短句
与餐厅解耦。同一套"蚝油警告"短句可复用于所有素食餐厅。未来按城市/方言定制不同版本时，加 `city_id` 字段即可。

---

## 扩展路径（不改现有 schema）

| 扩展需求 | 操作 |
|----------|------|
| 新增城市（北京）| `cities` 表新增一行，新餐厅绑定新 city_id |
| 新增饮食类型（Jain素）| `diet_profiles` 新增一行，关联表新增关系 |
| 新增过敏原（芝麻）| `allergens` 新增一行，category=allergen |
| 新增人群标签（孕妇/儿童）| `diet_profiles` 新增行，或新建 `user_profiles` 表 |
| 用户贡献数据 | `menu_items` 加 `contributed_by` 字段，`restaurants` 加 `user_submitted: boolean` |
| 多语言 | 各表加 `name_*` 字段，或新建 `translations` 表 |

---

## 当前 MVP 数据量估算（上海站）

| 表 | 行数 | 说明 |
|----|------|------|
| cities | 1 | 上海 |
| diet_profiles | 4 | vegan/vegetarian/halal/veg_friendly |
| allergens | ~20 | 常见过敏原+中餐隐藏成分 |
| restaurants | 12 | 当前候选 |
| restaurant_diet_tags | ~20 | 平均每家2个标签 |
| restaurant_allergen_flags | ~30 | 按需标注 |
| menu_items | ~40 | 每家3-5道推荐菜 |
| ordering_phrases | ~15 | 三类饮食各5句 |
| meta | ~5 | 系统配置 |

远低于 Convex 免费版限额（1GB存储，每日5万查询）。
