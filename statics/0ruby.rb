# 该文件的目的是将 HTML 文件抽取为 liquid 文件
# 1. 去掉页头页脚，只保留 main部分
# 2. 保存为 .liquid
# 在Linux下运行，否则出现编码和操作权限问题。

# mechanize lib
require 'rubygems'
require 'logger'
require 'fileutils'
# require 'pp'
# re-use Exception

# define main class
class DataExtractor
  def run
    puts "generate ........."

    # 2. extract single page content
    # 去除其他只保留body部分的main部分：
    # <!-- [[main start]] --> ... <!-- [[main end]] -->

    puts "\n =============== extract other single page--------------------"
    temp_list = Dir.glob("*.html")
    temp_list.each do |t|
      next if t !~ /^(.*)\.html$/i

      f_name = $1
      puts t

      the_content = File.read(t)
      next unless /<!-- ==========\{ MAIN \}==========  -->(.*)<!-- end main -->/im =~ the_content.force_encoding("utf-8")

      the_content = $1
      # File.write(t, the_content)
      File.write("#{f_name}.liquid", the_content)

      # remove original file t_blog_detail.html
      FileUtils.rm [t]
    end
    puts "\n\n............down!........."
    exit
  end
end

# run script
DataExtractor.new.run
