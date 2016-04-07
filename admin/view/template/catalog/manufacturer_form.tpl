<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
    <div class="page-header">
        <div class="container-fluid">
            <div class="pull-right">
                <button type="submit" form="form-manufacturer" data-toggle="tooltip" title="<?php echo $button_save; ?>"
                        class="btn btn-primary"><i class="fa fa-save"></i></button>
                <a href="<?php echo $cancel; ?>" data-toggle="tooltip" title="<?php echo $button_cancel; ?>"
                   class="btn btn-default"><i class="fa fa-reply"></i></a></div>
            <h1><?php echo $heading_title; ?></h1>
            <ul class="breadcrumb">
                <?php foreach ($breadcrumbs as $breadcrumb) { ?>
                <li><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
                <?php } ?>
            </ul>
        </div>
    </div>
    <div class="container-fluid">
        <?php if ($error_warning) { ?>
        <div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> <?php echo $error_warning; ?>
            <button type="button" class="close" data-dismiss="alert">&times;</button>
        </div>
        <?php } ?>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-pencil"></i> <?php echo $text_form; ?></h3>
            </div>
            <div class="panel-body">
                <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" id="form-manufacturer"
                      class="form-horizontal">
                    <div class="form-group required">
                        <label class="col-sm-2 control-label" for="input-name"><?php echo $entry_name; ?></label>
                        <div class="col-sm-10">
                            <input type="text" name="name" value="<?php echo $name; ?>"
                                   placeholder="<?php echo $entry_name; ?>" id="input-name" class="form-control"/>
                            <?php if ($error_name) { ?>
                            <div class="text-danger"><?php echo $error_name; ?></div>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label"><?php echo $entry_store; ?></label>
                        <div class="col-sm-10">
                            <div class="well well-sm" style="height: 150px; overflow: auto;">
                                <div class="checkbox">
                                    <label>
                                        <?php if (in_array(0, $manufacturer_store)) { ?>
                                        <input type="checkbox" name="manufacturer_store[]" value="0" checked="checked"/>
                                        <?php echo $text_default; ?>
                                        <?php } else { ?>
                                        <input type="checkbox" name="manufacturer_store[]" value="0"/>
                                        <?php echo $text_default; ?>
                                        <?php } ?>
                                    </label>
                                </div>
                                <?php foreach ($stores as $store) { ?>
                                <div class="checkbox">
                                    <label>
                                        <?php if (in_array($store['store_id'], $manufacturer_store)) { ?>
                                        <input type="checkbox" name="manufacturer_store[]"
                                               value="<?php echo $store['store_id']; ?>" checked="checked"/>
                                        <?php echo $store['name']; ?>
                                        <?php } else { ?>
                                        <input type="checkbox" name="manufacturer_store[]"
                                               value="<?php echo $store['store_id']; ?>"/>
                                        <?php echo $store['name']; ?>
                                        <?php } ?>
                                    </label>
                                </div>
                                <?php } ?>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="input-keyword"><span data-toggle="tooltip"
                                                                                        title="<?php echo $help_keyword; ?>"><?php echo $entry_keyword; ?></span></label>
                        <div class="col-sm-10">
                            <input type="text" name="keyword" value="<?php echo $keyword; ?>"
                                   placeholder="<?php echo $entry_keyword; ?>" id="input-keyword" class="form-control"/>
                            <?php if ($error_keyword) { ?>
                            <div class="text-danger"><?php echo $error_keyword; ?></div>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="input-image"><?php echo $entry_image; ?></label>
                        <div class="col-sm-10"><a href="" id="thumb-image" data-toggle="image"
                                                  class="img-thumbnail"><img src="<?php echo $thumb; ?>" alt="" title=""
                                                                             data-placeholder="<?php echo $placeholder; ?>"/></a>
                            <input type="hidden" name="image" value="<?php echo $image; ?>" id="input-image"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label"
                               for="input-sort-order"><?php echo $entry_sort_order; ?></label>
                        <div class="col-sm-10">
                            <input type="text" name="sort_order" value="<?php echo $sort_order; ?>"
                                   placeholder="<?php echo $entry_sort_order; ?>" id="input-sort-order"
                                   class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="input-fkb-map"><?php echo $entry_fkb_map; ?></label>
                        <div class="col-sm-10">
                            <input type="text" name="fkb_map" value="<?php echo $fkb_map; ?>"
                                   placeholder="<?php echo $entry_fkb_map_ph; ?>" id="input-fkb-map"
                                   class="form-control"/>
                            <style>
                                #map_canvas {display:inline-block; vertical-align:top; width:100%; height:240px;border: 1px solid #999;margin-top:5px;} #map-canvas-geocoding {height: 100%;width: 100%;display: inline-block;margin:0 auto; position:relative;} #panel {width: 33%;position: relative;z-index: 5;padding: 15px; display:inline-block;} .rv-divider

                                {display: block; width:100%; height:1px; background:#999; margin:15px 0px;}
                            </style>
                            <?php if ($fkb_map) { ?>
                            <div id="map_canvas"></div>
                            <?php } ?>
                            <div style="border: 1px solid #999; width:100%; display:inline-block; vertical-align:top; margin-top:5px;">
                                <div style="display:inline-block; vertical-align:top; position:relative; width:65%; height:240px; margin-left:0px;">
                                    <div id="map-canvas-geocoding"></div>
                                </div>
                                <div id="panel">
                                    <h3>COORDINATES SEARCH</h3>
                                    Key in any street address or coordinates.<br>
                                    Example: 1-15 Centre St, New York<br><br>
                                    <input id="address" style="width:100%;" type="textbox" value=""/><br><br>
                                    <input type="button" style="width:100%; text-align:center;" value="Get Coordinates"
                                           onclick="codeAddress()"/>
                                    <div class="rv-divider"></div>
                                    <h4 style="text-align:center; color:#FF0004"><strong><span id="lat"></span><span
                                                    id="comma"></span> <span id="lng"></span></strong></h4>
                                </div>
                            </div>
                            <script src="https://maps.googleapis.com/maps/api/js?=v=3.exp&sensor=false"></script>
                            <script type="text/javascript" src="view/javascript/manufacturer_map.js"></script>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<?php echo $footer; ?>