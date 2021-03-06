/**
 * Incorrect(!) grammar to parse simple assignment statements like:
 * a = 10
 * b = (a | 20) & 4
 * return b ^ ~0
 *
 * The list of operators are: ~ + << >> >>> & ^ |
 * This grammar is incorrect because operator precedence is ignored.
 *
 * Compile this grammar with:
 * npm install -g pegjs
 * pegjs -e myparser --track-line-and-column myparser.pegjs
 */
start = _ "function" _ "one_bit" _ "(" _ "x" _ ")" _ "{" ll:(assignments / comments)* e:return comments* _ "}" _ { ll.push(e); return ll }

comments "comment" =
    _ "//" [^\n]* "\n" { return {} }

assignments "assignment" =
    _ lvalue:variable _ "=" _ expr:expr (ws / ";") { return {left:lvalue, op:"=", right:expr, line:line} }

return "return statement" =
    _ "return" ws expr:expr (ws / ";") { return {left: {}, op:"return", right:expr, line:line} }

expr =
    left:primary _ op:bin_op _ right:expr { return {left:left, op:op, right:right, line:line} }
  / op:unary_op _ right:expr { return {left: {}, op:op, right:right, line:line} }
  / primary

bin_op = "|" / "^" / "&" / "+" / "<<" / ">>>" / ">>"
unary_op = "~"

primary =
    constant:constant { return {constant: constant, line: line} }
  / variable:variable { return {variable: variable, line: line} }
  / "(" _ expr:expr _ ")" { return expr }

constant = digits:[0-9]+ { return parseInt(digits.join(""), 10) }
variable "variable" = letters:([a-zA-Z$_][a-zA-Z0-9$_]*) { return letters.join("") }

_ "whitespace" = [ \t\n\r]*
ws "whitespace" = [ \t\n\r]+
