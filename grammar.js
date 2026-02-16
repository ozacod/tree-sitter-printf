module.exports = grammar({
    name: 'printf',

    extras: $ => [/\n/],

    rules: {
        format_string: $ => repeat1($.text_parts),

        text_parts: $ => choice($.text, $.format, '%%', $.escape_sequence),

        format: $ => seq('%',
            optional(field('flags', $.flags)),
            optional(field('width', $.width)),
            optional(field('precision', $.precision)),
            optional(field('size', $.size)),
            field('type', $.type)
        ),

        type: $ => /[a-zA-Z]/,

        flags: $ => /[+\-#0 ]+/,

        width: $ => /[1-9][0-9]*|\*/,

        precision: $ => /\.\*|\.[0-9]*/,

        size: $ => choice('hh', 'h', 'j', 'l', 'L', 'll', 't', 'w', 'z', 'I', 'I32', 'I64'),

        escape_sequence: $ => /\\[abfnrtv\\\\'"?0]|\\x[0-9a-fA-F]+|\\[0-7]{1,3}|\\u[0-9a-fA-F]{4}|\\U[0-9a-fA-F]{8}/,

        text: $ => /[^%\\\n]+/,
    }
});
