curl -X POST 'https://notify.walletconnect.com/60ebdf6cf9d2e46d029f32ce3de219f6/notify' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer 6f073acc-e757-4c87-88b8-2b55e1ba5d53' \
  --data '{
    "notification": {
      "type": "22792085-6c56-4750-8b6f-ebdb9788adbb",
      "title": "Liquidation Notice",
      "body": "You have been bogged"
    },
    "accounts": [
      "eip155:1:0xFdd73594DBE376a62d1CAaA44B5BD2B813B611CF"
    ]
  }'