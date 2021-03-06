myparser = (function(){
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */
  
  function quote(s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
     * string literal except for the closing quote character, backslash,
     * carriage return, line separator, paragraph separator, and line feed.
     * Any character may appear in the form of an escape sequence.
     *
     * For portability, we also escape escape all control and non-ASCII
     * characters. Note that "\0" and "\v" escape sequences are not used
     * because JSHint does not like the first and IE the second.
     */
     return '"' + s
      .replace(/\\/g, '\\\\')  // backslash
      .replace(/"/g, '\\"')    // closing quote character
      .replace(/\x08/g, '\\b') // backspace
      .replace(/\t/g, '\\t')   // horizontal tab
      .replace(/\n/g, '\\n')   // line feed
      .replace(/\f/g, '\\f')   // form feed
      .replace(/\r/g, '\\r')   // carriage return
      .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
      + '"';
  }
  
  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "start": parse_start,
        "comments": parse_comments,
        "assignments": parse_assignments,
        "return": parse_return,
        "expr": parse_expr,
        "bin_op": parse_bin_op,
        "unary_op": parse_unary_op,
        "primary": parse_primary,
        "constant": parse_constant,
        "variable": parse_variable,
        "_": parse__,
        "ws": parse_ws
      };
      
      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "start";
      }
      
      var pos = { offset: 0, line: 1, column: 1, seenCR: false };
      var reportFailures = 0;
      var rightmostFailuresPos = { offset: 0, line: 1, column: 1, seenCR: false };
      var rightmostFailuresExpected = [];
      
      function padLeft(input, padding, length) {
        var result = input;
        
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        
        return result;
      }
      
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;
        
        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }
        
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }
      
      function clone(object) {
        var result = {};
        for (var key in object) {
          result[key] = object[key];
        }
        return result;
      }
      
      function advance(pos, n) {
        var endOffset = pos.offset + n;
        
        for (var offset = pos.offset; offset < endOffset; offset++) {
          var ch = input.charAt(offset);
          if (ch === "\n") {
            if (!pos.seenCR) { pos.line++; }
            pos.column = 1;
            pos.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            pos.line++;
            pos.column = 1;
            pos.seenCR = true;
          } else {
            pos.column++;
            pos.seenCR = false;
          }
        }
        
        pos.offset += n;
      }
      
      function matchFailed(failure) {
        if (pos.offset < rightmostFailuresPos.offset) {
          return;
        }
        
        if (pos.offset > rightmostFailuresPos.offset) {
          rightmostFailuresPos = clone(pos);
          rightmostFailuresExpected = [];
        }
        
        rightmostFailuresExpected.push(failure);
      }
      
      function parse_start() {
        var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17;
        var pos0, pos1;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse__();
        if (result0 !== null) {
          if (input.substr(pos.offset, 8) === "function") {
            result1 = "function";
            advance(pos, 8);
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"function\"");
            }
          }
          if (result1 !== null) {
            result2 = parse__();
            if (result2 !== null) {
              if (input.substr(pos.offset, 7) === "one_bit") {
                result3 = "one_bit";
                advance(pos, 7);
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\"one_bit\"");
                }
              }
              if (result3 !== null) {
                result4 = parse__();
                if (result4 !== null) {
                  if (input.charCodeAt(pos.offset) === 40) {
                    result5 = "(";
                    advance(pos, 1);
                  } else {
                    result5 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"(\"");
                    }
                  }
                  if (result5 !== null) {
                    result6 = parse__();
                    if (result6 !== null) {
                      if (input.charCodeAt(pos.offset) === 120) {
                        result7 = "x";
                        advance(pos, 1);
                      } else {
                        result7 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"x\"");
                        }
                      }
                      if (result7 !== null) {
                        result8 = parse__();
                        if (result8 !== null) {
                          if (input.charCodeAt(pos.offset) === 41) {
                            result9 = ")";
                            advance(pos, 1);
                          } else {
                            result9 = null;
                            if (reportFailures === 0) {
                              matchFailed("\")\"");
                            }
                          }
                          if (result9 !== null) {
                            result10 = parse__();
                            if (result10 !== null) {
                              if (input.charCodeAt(pos.offset) === 123) {
                                result11 = "{";
                                advance(pos, 1);
                              } else {
                                result11 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"{\"");
                                }
                              }
                              if (result11 !== null) {
                                result12 = [];
                                result13 = parse_assignments();
                                if (result13 === null) {
                                  result13 = parse_comments();
                                }
                                while (result13 !== null) {
                                  result12.push(result13);
                                  result13 = parse_assignments();
                                  if (result13 === null) {
                                    result13 = parse_comments();
                                  }
                                }
                                if (result12 !== null) {
                                  result13 = parse_return();
                                  if (result13 !== null) {
                                    result14 = [];
                                    result15 = parse_comments();
                                    while (result15 !== null) {
                                      result14.push(result15);
                                      result15 = parse_comments();
                                    }
                                    if (result14 !== null) {
                                      result15 = parse__();
                                      if (result15 !== null) {
                                        if (input.charCodeAt(pos.offset) === 125) {
                                          result16 = "}";
                                          advance(pos, 1);
                                        } else {
                                          result16 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\"}\"");
                                          }
                                        }
                                        if (result16 !== null) {
                                          result17 = parse__();
                                          if (result17 !== null) {
                                            result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17];
                                          } else {
                                            result0 = null;
                                            pos = clone(pos1);
                                          }
                                        } else {
                                          result0 = null;
                                          pos = clone(pos1);
                                        }
                                      } else {
                                        result0 = null;
                                        pos = clone(pos1);
                                      }
                                    } else {
                                      result0 = null;
                                      pos = clone(pos1);
                                    }
                                  } else {
                                    result0 = null;
                                    pos = clone(pos1);
                                  }
                                } else {
                                  result0 = null;
                                  pos = clone(pos1);
                                }
                              } else {
                                result0 = null;
                                pos = clone(pos1);
                              }
                            } else {
                              result0 = null;
                              pos = clone(pos1);
                            }
                          } else {
                            result0 = null;
                            pos = clone(pos1);
                          }
                        } else {
                          result0 = null;
                          pos = clone(pos1);
                        }
                      } else {
                        result0 = null;
                        pos = clone(pos1);
                      }
                    } else {
                      result0 = null;
                      pos = clone(pos1);
                    }
                  } else {
                    result0 = null;
                    pos = clone(pos1);
                  }
                } else {
                  result0 = null;
                  pos = clone(pos1);
                }
              } else {
                result0 = null;
                pos = clone(pos1);
              }
            } else {
              result0 = null;
              pos = clone(pos1);
            }
          } else {
            result0 = null;
            pos = clone(pos1);
          }
        } else {
          result0 = null;
          pos = clone(pos1);
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, ll, e) { ll.push(e); return ll })(pos0.offset, pos0.line, pos0.column, result0[12], result0[13]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        return result0;
      }
      
      function parse_comments() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse__();
        if (result0 !== null) {
          if (input.substr(pos.offset, 2) === "//") {
            result1 = "//";
            advance(pos, 2);
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"//\"");
            }
          }
          if (result1 !== null) {
            result2 = [];
            if (/^[^\n]/.test(input.charAt(pos.offset))) {
              result3 = input.charAt(pos.offset);
              advance(pos, 1);
            } else {
              result3 = null;
              if (reportFailures === 0) {
                matchFailed("[^\\n]");
              }
            }
            while (result3 !== null) {
              result2.push(result3);
              if (/^[^\n]/.test(input.charAt(pos.offset))) {
                result3 = input.charAt(pos.offset);
                advance(pos, 1);
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("[^\\n]");
                }
              }
            }
            if (result2 !== null) {
              if (input.charCodeAt(pos.offset) === 10) {
                result3 = "\n";
                advance(pos, 1);
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\"\\n\"");
                }
              }
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = clone(pos1);
              }
            } else {
              result0 = null;
              pos = clone(pos1);
            }
          } else {
            result0 = null;
            pos = clone(pos1);
          }
        } else {
          result0 = null;
          pos = clone(pos1);
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column) { return {} })(pos0.offset, pos0.line, pos0.column);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("comment");
        }
        return result0;
      }
      
      function parse_assignments() {
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse__();
        if (result0 !== null) {
          result1 = parse_variable();
          if (result1 !== null) {
            result2 = parse__();
            if (result2 !== null) {
              if (input.charCodeAt(pos.offset) === 61) {
                result3 = "=";
                advance(pos, 1);
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\"=\"");
                }
              }
              if (result3 !== null) {
                result4 = parse__();
                if (result4 !== null) {
                  result5 = parse_expr();
                  if (result5 !== null) {
                    result6 = parse_ws();
                    if (result6 === null) {
                      if (input.charCodeAt(pos.offset) === 59) {
                        result6 = ";";
                        advance(pos, 1);
                      } else {
                        result6 = null;
                        if (reportFailures === 0) {
                          matchFailed("\";\"");
                        }
                      }
                    }
                    if (result6 !== null) {
                      result0 = [result0, result1, result2, result3, result4, result5, result6];
                    } else {
                      result0 = null;
                      pos = clone(pos1);
                    }
                  } else {
                    result0 = null;
                    pos = clone(pos1);
                  }
                } else {
                  result0 = null;
                  pos = clone(pos1);
                }
              } else {
                result0 = null;
                pos = clone(pos1);
              }
            } else {
              result0 = null;
              pos = clone(pos1);
            }
          } else {
            result0 = null;
            pos = clone(pos1);
          }
        } else {
          result0 = null;
          pos = clone(pos1);
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, lvalue, expr) { return {left:lvalue, op:"=", right:expr, line:line} })(pos0.offset, pos0.line, pos0.column, result0[1], result0[5]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("assignment");
        }
        return result0;
      }
      
      function parse_return() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse__();
        if (result0 !== null) {
          if (input.substr(pos.offset, 6) === "return") {
            result1 = "return";
            advance(pos, 6);
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"return\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_ws();
            if (result2 !== null) {
              result3 = parse_expr();
              if (result3 !== null) {
                result4 = parse_ws();
                if (result4 === null) {
                  if (input.charCodeAt(pos.offset) === 59) {
                    result4 = ";";
                    advance(pos, 1);
                  } else {
                    result4 = null;
                    if (reportFailures === 0) {
                      matchFailed("\";\"");
                    }
                  }
                }
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = clone(pos1);
                }
              } else {
                result0 = null;
                pos = clone(pos1);
              }
            } else {
              result0 = null;
              pos = clone(pos1);
            }
          } else {
            result0 = null;
            pos = clone(pos1);
          }
        } else {
          result0 = null;
          pos = clone(pos1);
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, expr) { return {left: {}, op:"return", right:expr, line:line} })(pos0.offset, pos0.line, pos0.column, result0[3]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("return statement");
        }
        return result0;
      }
      
      function parse_expr() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse_primary();
        if (result0 !== null) {
          result1 = parse__();
          if (result1 !== null) {
            result2 = parse_bin_op();
            if (result2 !== null) {
              result3 = parse__();
              if (result3 !== null) {
                result4 = parse_expr();
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = clone(pos1);
                }
              } else {
                result0 = null;
                pos = clone(pos1);
              }
            } else {
              result0 = null;
              pos = clone(pos1);
            }
          } else {
            result0 = null;
            pos = clone(pos1);
          }
        } else {
          result0 = null;
          pos = clone(pos1);
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, left, op, right) { return {left:left, op:op, right:right, line:line} })(pos0.offset, pos0.line, pos0.column, result0[0], result0[2], result0[4]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        if (result0 === null) {
          pos0 = clone(pos);
          pos1 = clone(pos);
          result0 = parse_unary_op();
          if (result0 !== null) {
            result1 = parse__();
            if (result1 !== null) {
              result2 = parse_expr();
              if (result2 !== null) {
                result0 = [result0, result1, result2];
              } else {
                result0 = null;
                pos = clone(pos1);
              }
            } else {
              result0 = null;
              pos = clone(pos1);
            }
          } else {
            result0 = null;
            pos = clone(pos1);
          }
          if (result0 !== null) {
            result0 = (function(offset, line, column, op, right) { return {left: {}, op:op, right:right, line:line} })(pos0.offset, pos0.line, pos0.column, result0[0], result0[2]);
          }
          if (result0 === null) {
            pos = clone(pos0);
          }
          if (result0 === null) {
            result0 = parse_primary();
          }
        }
        return result0;
      }
      
      function parse_bin_op() {
        var result0;
        
        if (input.charCodeAt(pos.offset) === 124) {
          result0 = "|";
          advance(pos, 1);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"|\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos.offset) === 94) {
            result0 = "^";
            advance(pos, 1);
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"^\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos.offset) === 38) {
              result0 = "&";
              advance(pos, 1);
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"&\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos.offset) === 43) {
                result0 = "+";
                advance(pos, 1);
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"+\"");
                }
              }
              if (result0 === null) {
                if (input.substr(pos.offset, 2) === "<<") {
                  result0 = "<<";
                  advance(pos, 2);
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"<<\"");
                  }
                }
                if (result0 === null) {
                  if (input.substr(pos.offset, 3) === ">>>") {
                    result0 = ">>>";
                    advance(pos, 3);
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\">>>\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.substr(pos.offset, 2) === ">>") {
                      result0 = ">>";
                      advance(pos, 2);
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\">>\"");
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      
      function parse_unary_op() {
        var result0;
        
        if (input.charCodeAt(pos.offset) === 126) {
          result0 = "~";
          advance(pos, 1);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"~\"");
          }
        }
        return result0;
      }
      
      function parse_primary() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        pos0 = clone(pos);
        result0 = parse_constant();
        if (result0 !== null) {
          result0 = (function(offset, line, column, constant) { return {constant: constant, line: line} })(pos0.offset, pos0.line, pos0.column, result0);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        if (result0 === null) {
          pos0 = clone(pos);
          result0 = parse_variable();
          if (result0 !== null) {
            result0 = (function(offset, line, column, variable) { return {variable: variable, line: line} })(pos0.offset, pos0.line, pos0.column, result0);
          }
          if (result0 === null) {
            pos = clone(pos0);
          }
          if (result0 === null) {
            pos0 = clone(pos);
            pos1 = clone(pos);
            if (input.charCodeAt(pos.offset) === 40) {
              result0 = "(";
              advance(pos, 1);
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"(\"");
              }
            }
            if (result0 !== null) {
              result1 = parse__();
              if (result1 !== null) {
                result2 = parse_expr();
                if (result2 !== null) {
                  result3 = parse__();
                  if (result3 !== null) {
                    if (input.charCodeAt(pos.offset) === 41) {
                      result4 = ")";
                      advance(pos, 1);
                    } else {
                      result4 = null;
                      if (reportFailures === 0) {
                        matchFailed("\")\"");
                      }
                    }
                    if (result4 !== null) {
                      result0 = [result0, result1, result2, result3, result4];
                    } else {
                      result0 = null;
                      pos = clone(pos1);
                    }
                  } else {
                    result0 = null;
                    pos = clone(pos1);
                  }
                } else {
                  result0 = null;
                  pos = clone(pos1);
                }
              } else {
                result0 = null;
                pos = clone(pos1);
              }
            } else {
              result0 = null;
              pos = clone(pos1);
            }
            if (result0 !== null) {
              result0 = (function(offset, line, column, expr) { return expr })(pos0.offset, pos0.line, pos0.column, result0[2]);
            }
            if (result0 === null) {
              pos = clone(pos0);
            }
          }
        }
        return result0;
      }
      
      function parse_constant() {
        var result0, result1;
        var pos0;
        
        pos0 = clone(pos);
        if (/^[0-9]/.test(input.charAt(pos.offset))) {
          result1 = input.charAt(pos.offset);
          advance(pos, 1);
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[0-9]");
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            if (/^[0-9]/.test(input.charAt(pos.offset))) {
              result1 = input.charAt(pos.offset);
              advance(pos, 1);
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("[0-9]");
              }
            }
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, digits) { return parseInt(digits.join(""), 10) })(pos0.offset, pos0.line, pos0.column, result0);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        return result0;
      }
      
      function parse_variable() {
        var result0, result1, result2;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = clone(pos);
        pos1 = clone(pos);
        if (/^[a-zA-Z$_]/.test(input.charAt(pos.offset))) {
          result0 = input.charAt(pos.offset);
          advance(pos, 1);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[a-zA-Z$_]");
          }
        }
        if (result0 !== null) {
          result1 = [];
          if (/^[a-zA-Z0-9$_]/.test(input.charAt(pos.offset))) {
            result2 = input.charAt(pos.offset);
            advance(pos, 1);
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("[a-zA-Z0-9$_]");
            }
          }
          while (result2 !== null) {
            result1.push(result2);
            if (/^[a-zA-Z0-9$_]/.test(input.charAt(pos.offset))) {
              result2 = input.charAt(pos.offset);
              advance(pos, 1);
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("[a-zA-Z0-9$_]");
              }
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = clone(pos1);
          }
        } else {
          result0 = null;
          pos = clone(pos1);
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, letters) { return letters.join("") })(pos0.offset, pos0.line, pos0.column, result0);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("variable");
        }
        return result0;
      }
      
      function parse__() {
        var result0, result1;
        
        reportFailures++;
        result0 = [];
        if (/^[ \t\n\r]/.test(input.charAt(pos.offset))) {
          result1 = input.charAt(pos.offset);
          advance(pos, 1);
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[ \\t\\n\\r]");
          }
        }
        while (result1 !== null) {
          result0.push(result1);
          if (/^[ \t\n\r]/.test(input.charAt(pos.offset))) {
            result1 = input.charAt(pos.offset);
            advance(pos, 1);
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("[ \\t\\n\\r]");
            }
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("whitespace");
        }
        return result0;
      }
      
      function parse_ws() {
        var result0, result1;
        
        reportFailures++;
        if (/^[ \t\n\r]/.test(input.charAt(pos.offset))) {
          result1 = input.charAt(pos.offset);
          advance(pos, 1);
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[ \\t\\n\\r]");
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            if (/^[ \t\n\r]/.test(input.charAt(pos.offset))) {
              result1 = input.charAt(pos.offset);
              advance(pos, 1);
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("[ \\t\\n\\r]");
              }
            }
          }
        } else {
          result0 = null;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("whitespace");
        }
        return result0;
      }
      
      
      function cleanupExpected(expected) {
        expected.sort();
        
        var lastExpected = null;
        var cleanExpected = [];
        for (var i = 0; i < expected.length; i++) {
          if (expected[i] !== lastExpected) {
            cleanExpected.push(expected[i]);
            lastExpected = expected[i];
          }
        }
        return cleanExpected;
      }
      
      
      
      var result = parseFunctions[startRule]();
      
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos.offset === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos.offset < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos.offset === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos.offset !== input.length) {
        var offset = Math.max(pos.offset, rightmostFailuresPos.offset);
        var found = offset < input.length ? input.charAt(offset) : null;
        var errorPosition = pos.offset > rightmostFailuresPos.offset ? pos : rightmostFailuresPos;
        
        throw new this.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          offset,
          errorPosition.line,
          errorPosition.column
        );
      }
      
      return result;
    },
    
    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };
  
  /* Thrown when a parser encounters a syntax error. */
  
  result.SyntaxError = function(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      var expectedHumanized, foundHumanized;
      
      switch (expected.length) {
        case 0:
          expectedHumanized = "end of input";
          break;
        case 1:
          expectedHumanized = expected[0];
          break;
        default:
          expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }
      
      foundHumanized = found ? quote(found) : "end of input";
      
      return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
    }
    
    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.message = buildMessage(expected, found);
    this.offset = offset;
    this.line = line;
    this.column = column;
  };
  
  result.SyntaxError.prototype = Error.prototype;
  
  return result;
})();
