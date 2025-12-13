#!/bin/bash

echo "========================================="
echo "Book Management API Test"
echo "========================================="
echo ""

# Wait for server to start
sleep 3

echo "1. ヘルスチェック"
curl -s http://localhost:3000/
echo -e "\n"

echo "2. 本を登録（1冊目）"
BOOK1=$(curl -s -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"吾輩は猫である","summary":"夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた小説。"}')
echo $BOOK1 | jq .
BOOK1_ID=$(echo $BOOK1 | jq -r '.id')
echo ""

echo "3. 本を登録（2冊目）"
BOOK2=$(curl -s -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"こころ","summary":"夏目漱石の後期三部作の一つ。人間の心の奥底にある孤独と葛藤を描いた作品。"}')
echo $BOOK2 | jq .
BOOK2_ID=$(echo $BOOK2 | jq -r '.id')
echo ""

echo "4. 全ての本を取得"
curl -s http://localhost:3000/api/books | jq .
echo ""

echo "5. IDを指定して本を取得（ID: $BOOK1_ID）"
curl -s http://localhost:3000/api/books/$BOOK1_ID | jq .
echo ""

echo "6. 本の情報を更新（ID: $BOOK1_ID）"
curl -s -X PUT http://localhost:3000/api/books/$BOOK1_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"吾輩は猫である（改訂版）","summary":"夏目漱石の代表作。猫の視点から人間社会を風刺的に描いた小説。改訂版では新たな解説を追加。"}' | jq .
echo ""

echo "7. 更新後の本を確認（ID: $BOOK1_ID）"
curl -s http://localhost:3000/api/books/$BOOK1_ID | jq .
echo ""

echo "8. 本を削除（ID: $BOOK2_ID）"
curl -s -X DELETE http://localhost:3000/api/books/$BOOK2_ID | jq .
echo ""

echo "9. 削除後の全ての本を取得"
curl -s http://localhost:3000/api/books | jq .
echo ""

echo "========================================="
echo "Test Completed!"
echo "========================================="
