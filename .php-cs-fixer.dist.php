<?php

// https://github.com/PrestaShop/PrestaShop/blob/develop/.php-cs-fixer.dist.php
// ../tools/php-cs-fixer/vendor/bin/php-cs-fixer fix getcwd() --config getcwd() . /.php-cs-fixer.dist.php
ini_set('memory_limit','256M');

$it = new RecursiveTreeIterator(new RecursiveDirectoryIterator(getcwd(), RecursiveDirectoryIterator::SKIP_DOTS), RecursiveDirectoryIterator::SKIP_DOTS);
$new_array_path = [];

function allowedDir($path) {
    $bool = true;
    $folders = ['.git', 'vendor', 'node_modules', 'tools/php-cs-fixer', 'tools', 'build', 'docs'];
    foreach($folders as $folder) {
        if(strpos($path, $folder)) {
            $bool = false;
            break;
        }
    }
           
    return $bool;
}
    
foreach($it as $path) {
    $new_path = substr($path, strpos($path, '-/') + 1);
    if(allowedDir($new_path) && is_dir($new_path)) {        
        $new_array_path[] = $new_path;
    }
}

echo '<pre>';
print_r($new_array_path);
echo '</pre>';

$finder = PhpCsFixer\Finder::create()->in($new_array_path)->notPath([
    'Unit/Resources/config/params.php',
    'Unit/Resources/config/params_modified.php',
]);

return (new PhpCsFixer\Config())
    ->setRiskyAllowed(true)
    ->setRules([
        '@Symfony' => true,
        'array_indentation' => true,
        'cast_spaces' => [
            'space' => 'single',
        ],
        'combine_consecutive_issets' => true,
        'concat_space' => [
            'spacing' => 'one',
        ],
        'error_suppression' => [
            'mute_deprecation_error' => false,
            'noise_remaining_usages' => false,
            'noise_remaining_usages_exclude' => [],
        ],
        'function_to_constant' => false,
        'method_chaining_indentation' => true,
        'no_alias_functions' => false,
        'no_superfluous_phpdoc_tags' => false,
        'non_printable_character' => [
            'use_escape_sequences_in_strings' => true,
        ],
        'phpdoc_align' => [
            'align' => 'left',
        ],
        'phpdoc_summary' => false,
        'protected_to_private' => false,
        'psr_autoloading' => false,
        'self_accessor' => false,
        'yoda_style' => false,
        'single_line_throw' => false,
        'no_alias_language_construct_call' => false,
    ])
    ->setFinder($finder)
    ->setCacheFile(__DIR__.'/.php_cs.cache');
