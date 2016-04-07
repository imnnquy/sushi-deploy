<?php echo $header; ?>
<div class="container">
<?php echo $content_top_location_picker; ?>
    <div class="row" id="near_product"></div>
</div>
<link href="catalog/view/theme/default/stylesheet/homestyle.css" rel="stylesheet">
<div class="container content">
    <div class="row"><?php echo $column_left; ?>
        <?php if ($column_left && $column_right) { ?>
        <?php $class = 'col-sm-6'; ?>
        <?php } elseif ($column_left || $column_right) { ?>
        <?php $class = 'col-sm-9'; ?>
        <?php } else { ?>
        <?php $class = 'col-sm-12'; ?>
        <?php } ?>
        <div id="content" class="<?php echo $class; ?>">
            <?php echo $content_bottom_catchphrase; ?>
        </div>
            <div id="content" class="<?php echo $class; ?>">
            <?php echo $content_bottom_image_contents; ?>
        </div>
        <?php echo $column_right; ?>
    </div>
</div>
<?php echo $footer2; ?>
<script src="https://maps.googleapis.com/maps/api/js?=v=3.exp&sensor=false"></script>
<script src="catalog/view/javascript/stores.js" type="text/javascript"></script>
