#!/bin/bash
pm2 stop react-zoqq
cd /tempWeb
rm -rf zoqq_f
mv /home/ec2-user/zoqq_f /tempWeb