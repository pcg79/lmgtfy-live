#!/usr/bin/env perl -w

# Tails a logfile, parses the querystrings and outputs a json array of the
# queries

use utf8;
use File::Temp qw/tempfile/;
use CGI;

$access_log = $ARGV[0];
($temp_handle, $temp_path) = tempfile();

system("tail -1000 $access_log | grep 'GET /?q=' | tail -500 > $temp_path");

while(<$temp_handle>) {
    /GET \/\?q=(\S+)/;
    $query = CGI::unescape($1);
    $query =~ s/\"/\\\"/g;
    push(@recent_queries, "\"$query\"");
}

print "[", join(",", @recent_queries), "]";

unlink $temp_path
