#!/usr/bin/env ruby

# Tails a logfile, parses the querystrings and outputs a json array of the
# queries

require 'rubygems'
require 'tempfile'
require 'cgi'
require 'activesupport'

access_log = ARGV[0]
temp       = Tempfile.new("lmgtfy-live")

system("tail -1000 #{access_log} | grep 'GET /?q=' | tail -500 > #{temp.path}")

recent_queries = open(temp.path).readlines.map do |line|
  query = line.match(/GET \/\?q=(\S+)/)[1]
  CGI.unescape(query)
end

puts recent_queries.to_json

temp.unlink
