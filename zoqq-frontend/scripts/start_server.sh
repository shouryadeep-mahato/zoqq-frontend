#!/bin/bash
mkdir /home/ec2-user/zoqq_f
cd /home/ec2-user/zooq_f
npm run build
pm2 serve --spa build -p 3000 -n react-zoqq