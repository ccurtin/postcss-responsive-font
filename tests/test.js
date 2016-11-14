import postcss from 'postcss';
import test from 'ava';

import postcssResponsiveFont from '../';

function run(t, input, output, opts = {}) {
    return postcss([postcssResponsiveFont(opts)]).process(input)
        .then(result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}
// Tests
test('selector declaration, all px', t => {
    return run(t, 'a{ font-size-responsive: 12px 32px 580px 1280px; }',
        'a{ font-size: 12px; }\n' +
        '@media (min-width:580px){\n' +
        ' a{ font-size: 32px; } }\n' +
        '@media (min-width:580px) and (max-width:1280px){\n' +
        ' a{ font-size: calc(12px + (32 - 12) * ' +
        '( (100vw - 580px) / ( 1280 - 580))); } }', {});
});

test('selector declaration, all em', t => {
    return run(t, 'a{ font-size-responsive: 1em 3em 40em 80em; }',
        'a{ font-size: 1em; }\n' +
        '@media (min-width:40em){\n' +
        ' a{ font-size: 3em; } }\n' +
        '@media (min-width:40em) and (max-width:80em){\n' +
        ' a{ font-size: calc(1em + (3 - 1) * ' +
        '( (100vw - 40em) / ( 80 - 40))); } }', {});
});

test('selector declaration, font em, viewport px', t => {
    return run(t, 'a{ font-size-responsive: 1em 3em 928px 1280px; }',
        'a{ font-size: 1em; }\n' +
        '@media (min-width:58em){\n' +
        ' a{ font-size: 3em; } }\n' +
        '@media (min-width:58em) and (max-width:80em){\n' +
        ' a{ font-size: calc(1em + (3 - 1) * ' +
        '( (100vw - 58em) / ( 80 - 58))); } }', {});
});

test('selector declaration, font px, viewport em', t => {
    return run(t, 'a{ font-size-responsive: 12px 32px 40em 80em; }',
        'a{ font-size: 12px; }\n' +
        '@media (min-width:640px){\n' +
        ' a{ font-size: 32px; } }\n' +
        '@media (min-width:640px) and (max-width:1280px){\n' +
        ' a{ font-size: calc(12px + (32 - 12) * ' +
        '( (100vw - 640px) / ( 1280 - 640))); } }', {});
});
