require "rubygems"
require "bundler/setup"
require "directory_watcher"

excludes = %w(.* R* G* *.haml *.sass recent.json artwork javascript script/test vendor)
exclude_options = excludes.map { |e| "--exclude=#{e}" }.join(" ")
SETTINGS = {
  :rsync_server  => "lmgtfy.com:/u/apps/lmgtfy-live",
  :rsync_options => "-e ssh -avz --delete #{exclude_options}"
}

task :default => [:test]

desc "publish this wicked site to the world"
task :publish => :build do
  sh("rsync #{SETTINGS[:rsync_options]} ./ #{SETTINGS[:rsync_server]}")
end

task :test do
  watch_and_open("http://live.lmgtfy.local/")
end

task :build do
  build(watcher)
end

def watch_and_open(file)
  w = watcher
  build(w)
  open(file)
  autobuild(w)
end

def open(file)
  sh("open #{file}")
end

def build(watcher)
  watcher.run_once
end

def autobuild(watcher)
  puts "Starting autobuild (Ctrl-C to stop)\n"
  Signal.trap('INT') { puts "trying to int"; watcher.stop }
  watcher.start
  watcher.join
end

def watcher
  watcher = DirectoryWatcher.new '.', :interval => 0.25
  watcher.glob = %w(javascript/*.js *.haml *.sass)
  watcher.add_observer do |*events|
    haml = false
    js   = false
    events.each do |event|
      sh("haml index.haml > index.html") &&  haml = true if event.path =~ /\.(haml|sass)$/ unless haml
      sh("cat javascript/*.js > bundle.js") && js = true if event.path =~ /\.(js)$/        unless js
    end
  end
  watcher
end
