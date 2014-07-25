#parses the input
class Parser

  def initialize

  end
  def parse(input)
    i = input.split(" ")
    [i[0], i[1].to_i]
  end
end