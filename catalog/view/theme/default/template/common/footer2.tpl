<?php if ($categories) { ?>
<div class="container">
    <div id="logo-footer" class="logo">
        <?php if ($logo) { ?>
        <a href="<?php echo $home; ?>"><img width="100" src="<?php echo $logo; ?>" title="<?php echo $name; ?>"
                                                alt="<?php echo $name; ?>" class="img-responsive"/></a>
        <?php } else { ?>
        <h1><a href="<?php echo $home; ?>"><?php echo $name; ?></a></h1>
        <?php } ?>
    </div>
    <nav id="menu-footer" class="menu footer-menu navbar">
        <div class="navbar-header"><span class="visible-xs menutitle footer-menutitle"><?php echo $text_menu; ?></span>
            <button type="button" class="btn btn-navbar navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse"><i class="fa fa-bars"></i></button>
        </div>
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav">
                <?php foreach ($categories as $category) { ?>
                <?php if ($category['children']) { ?>
                <li class="dropdown">
                    <a href="<?php echo $category['href']; ?>" class="dropdown-toggle" data-toggle="dropdown">
                        <?php echo $category['name']; ?>
                    </a>
                    <div class="dropdown-menu">
                        <div class="dropdown-inner">
                            <?php foreach (array_chunk($category['children'], ceil(count($category['children']) / $category['column'])) as $children) { ?>
                            <ul class="list-unstyled">
                                <?php foreach ($children as $child) { ?>
                                <li>
                                    <a href="<?php echo $child['href']; ?>">
                                        <?php echo $child['name']; ?>
                                    </a>
                                </li>
                                <?php } ?>
                            </ul>
                            <?php } http://localhost:8888/Sushi/Sushi/image/catalog/no-image.png?>
                        </div>
                        <a href="<?php echo $category['href']; ?>" class="see-all">
                            <?php echo $text_all; ?>
                            <?php echo $category['name']; ?>
                        </a>
                    </div>
                </li>
                <?php } else { ?>
                <li>
                    <a href="<?php echo $category['href']; ?>">
                        <?php echo $category['name']; ?>
                    </a>
                </li>
                <?php } ?>
                <?php } ?>
            </ul>
        </div>
    </nav>
    <div class="social-link">
        <ul id="social">
            <li>
                <div><a href="http://facebook.com" onclick="window.open(this.href, '_blank');return false;"><span class="fa fa-facebook"></a></span>
                </div>
            </li>
            <li>
                <div><a href="http://twitter.com" onclick="window.open(this.href, '_blank');return false;"><span class="fa fa-twitter"></a></span>
                </div>
            </li>
            <li>
                <div><a href="http://plus.google.com" onclick="window.open(this.href, '_blank');return false;"><span class="fa fa-google-plus"></a></span>
                </div>
            </li>
            <li>
                <div><a href="http://flickr.com" onclick="window.open(this.href, '_blank');return false;"><span class="fa fa-flickr"></a></span>
                </div>
            </li>
        </ul>
    </div>
    <div class="copy-right"><span>Copy right &copy; 2016 - DoTuiLam</span></div>
</div>
<?php } ?>
</body>

</html>
