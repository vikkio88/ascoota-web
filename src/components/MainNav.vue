<style>

</style>
<template>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
                <a class="navbar-brand" href="./"><i class="material-icons">radio</i>
                <div class="ripple-container"></div>
            </a>
            </div>
            <div class="navbar-collapse collapse navbar-inverse-collapse">
                <!--
            <ul class="nav navbar-nav">
                <li class=""><a href="javascript:void(0)">Active</a></li>
                <li><a href="javascript:void(0)">Link</a></li>
                <li class="dropdown">
                    <a href="index.html" data-target="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown
                        <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="javascript:void(0)">Action</a></li>
                        <li><a href="javascript:void(0)">Another action</a></li>
                        <li><a href="javascript:void(0)">Something else here</a></li>
                        <li class="divider"></li>
                        <li class="dropdown-header">Dropdown header</li>
                        <li><a href="javascript:void(0)">Separated link</a></li>
                        <li><a href="javascript:void(0)">One more separated link</a></li>
                    </ul>
                </li>
            </ul>
            -->
                <form class="navbar-form navbar-left">
                    <!--
                <div class="form-group is-empty">
                    <input type="text" class="form-control col-sm-8" placeholder="Search">
                    <span class="material-input"></span>
                </div>
                -->
                </form>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="javascript:void(0)" class="btn btn-sm btn-primary">Login
                    <div class="ripple-container"></div>
                </a></li>
                    <li><a href="javascript:void(0)" class="btn btn-sm btn-info">SignUp
                    <div class="ripple-container"></div>
                </a></li>
                </ul>
            </div>
        </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: "mainNavBar"
}
</script>