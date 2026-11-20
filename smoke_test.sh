#!/usr/bin/env bash
# Run while a student's server is listening on port 3000.  NOTE: it inserts test rows.
B=http://localhost:3000
J='Content-Type: application/json'
code() { curl -s -o /dev/null -w "%{http_code}" "$@"; }
echo "GET  /api/products        expect 200: $(code $B/api/products)"
echo "GET  /api/products/1      expect 200: $(code $B/api/products/1)"
echo "GET  /api/products/99999  expect 404: $(code $B/api/products/99999)"
echo "POST /api/products ok     expect 201: $(code -X POST $B/api/products -H "$J" -d '{"product_name":"T","category":"T","price":1.5,"stock":1}')"
echo "POST /api/products bad    expect 400: $(code -X POST $B/api/products -H "$J" -d '{"category":"T"}')"
echo "GET  /api/customers       expect 200: $(code $B/api/customers)"
echo "POST /api/customers ok    expect 201: $(code -X POST $B/api/customers -H "$J" -d '{"full_name":"T","email":"t@t.lk","city":"T"}')"
echo "POST /api/customers bad   expect 400: $(code -X POST $B/api/customers -H "$J" -d '{"full_name":"","email":"","city":""}')"
