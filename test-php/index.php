<?php
function knapsack($items, $capacity) {
  // Create a table to store the maximum value that can be obtained with each weight capacity.
  $table = array();
  for ($i = 0; $i <= $capacity; $i++) {
    $table[$i] = 0;
  }

  // Iterate over the items and update the table.
  foreach ($items as $item) {
    for ($i = $capacity; $i >= $item['weight']; $i--) {
      $table[$i] = max($table[$i], $table[$i - $item['weight']] + $item['value']);
    }
  }

  // Return the maximum value that can be obtained.
  return $table[$capacity];
}

// Example usage:
$items = array(
  array('weight' => 1, 'value' => 10),
  array('weight' => 2, 'value' => 20),
  array('weight' => 3, 'value' => 30),
);

$capacity = 5;

$max_value = knapsack($items, $capacity);

echo "The maximum value that can be obtained is: $max_value";
