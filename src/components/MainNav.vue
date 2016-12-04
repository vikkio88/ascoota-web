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