<style>
</style>
<template>
    <nav class="navbar">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
                <a class="navbar-brand" href="./"><i class="material-icons">hearing</i>scoota
                    <div class="ripple-container"></div>
                </a>
            </div>
            <div class="navbar-collapse collapse navbar-inverse-collapse">
                <navigation />
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on topLogin/SignUp" href="javascript:void(0)"
                            class="btn btn-xs btn-success btn-raised">
                            <i class="material-icons">account_circle</i>
                            <div class="ripple-container"></div>
                        </a>
                    </li>
                </ul>
                <dev-links />
            </div>
        </div>
        </div>
    </nav>
</template>
<script>
    import DevLinks from './elements/DevLinks'
    import Navigation from './elements/Navigation'

    export default {
        name: "mainNavBar",
        components: {
            DevLinks,
            Navigation
        }
    }
</script>