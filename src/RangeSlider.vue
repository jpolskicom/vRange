<template>
    <div class="c-searchFields">
        <div class="c-searchFields__row">
            <div class="c-searchFields__mode">
                <strong>Typ samochodu</strong>
                <label v-for="type in getCategories" :key="type.name" v-on:click="setParam({key:'category_id',value:String(type.value)});setParam({key:'brand_id',value:null})">
                    <Checkbox :state="getParams.category_id == type.value"/>
                    {{ type.name }}
                </label>
            </div> 
            <div>
                <strong class="c-searchFields__option" v-on:click="resetParams()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22.571" viewBox="0 0 24 22.571">
                        <g id="reset" transform="translate(0 -25.641)">
                            <path id="Path_2" data-name="Path 2" d="M12.715,45.285a8.363,8.363,0,0,1-8.127-6.4,1.463,1.463,0,1,0-2.845.685,11.29,11.29,0,0,0,21.37,1.745A11.288,11.288,0,0,0,2.926,31.306v-2.35a1.463,1.463,0,0,0-2.926,0V34.5a1.463,1.463,0,0,0,1.463,1.463H6.932a1.463,1.463,0,0,0,0-2.926H5.314a8.36,8.36,0,1,1,7.4,12.25Z" fill="#fff"/>
                        </g>
                    </svg>
                    <span>wyczyść filtry</span>
                </strong>
                <strong class="c-searchFields__option" v-on:click="mode = mode == 1?2:1;setParam({key:'extended',value:mode,nocounter:true})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23.634" height="19.414" viewBox="0 0 23.634 19.414" v-if="mode == 1">
                        <path id="advanced" d="M22.794,30.556l-3.017-2.279a2.79,2.79,0,0,0-.975-.738l-5.323-4.01a2.118,2.118,0,0,0-2.233-.2,2.126,2.126,0,0,0-1.185,1.914v1.823a11.1,11.1,0,0,0-7.219,3.646C-.649,34.73.053,40.427.089,40.664a2.13,2.13,0,0,0,1.887,1.841,1.905,1.905,0,0,0,.228.009A2.151,2.151,0,0,0,4.209,41.12a6.3,6.3,0,0,1,5.852-4.138v2.188a2.114,2.114,0,0,0,1.176,1.9,2.2,2.2,0,0,0,.957.228,2.094,2.094,0,0,0,1.267-.419l9.315-6.909a2.133,2.133,0,0,0,.018-3.418Zm-9.388,6.2V34.885a1.216,1.216,0,0,0-1.039-1.2,10.45,10.45,0,0,0-1.413-.082,11.288,11.288,0,0,0-7.191,2.406A7.957,7.957,0,0,1,5.376,32.9c1.477-1.714,3.783-2.6,6.827-2.634a1.216,1.216,0,0,0,1.2-1.212V27.685L17,30.392a1.244,1.244,0,0,0,.246.137,1.093,1.093,0,0,0,.21.2l2.023,1.522Z" transform="translate(-0.008 -23.1)" fill="#fff"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23.634" height="19.414" viewBox="0 0 23.634 19.414" v-if="mode == 2">
                        <path id="advanced" d="M.856,30.556l3.017-2.279a2.79,2.79,0,0,1,.975-.738l5.323-4.01a2.118,2.118,0,0,1,2.233-.2,2.126,2.126,0,0,1,1.185,1.914v1.823a11.1,11.1,0,0,1,7.219,3.646c3.491,4.02,2.789,9.716,2.753,9.953a2.13,2.13,0,0,1-1.887,1.841,1.905,1.905,0,0,1-.228.009,2.151,2.151,0,0,1-2.005-1.395,6.3,6.3,0,0,0-5.852-4.138v2.188a2.114,2.114,0,0,1-1.176,1.9,2.2,2.2,0,0,1-.957.228,2.094,2.094,0,0,1-1.267-.419L.874,33.974a2.133,2.133,0,0,1-.018-3.418Zm9.388,6.2V34.885a1.216,1.216,0,0,1,1.039-1.2A10.45,10.45,0,0,1,12.7,33.6a11.288,11.288,0,0,1,7.192,2.406A7.957,7.957,0,0,0,18.274,32.9c-1.477-1.714-3.783-2.6-6.827-2.634a1.216,1.216,0,0,1-1.2-1.212V27.685L6.653,30.392a1.244,1.244,0,0,1-.246.137,1.093,1.093,0,0,1-.21.2L4.174,32.251Z" transform="translate(-0.008 -23.1)" fill="#fff"/>
                    </svg>
                    <span>{{ mode==1?'szczegółowe':'podstawowe' }} wyszukiwanie</span>
                </strong>
            </div>
        </div>
        <div class="c-searchFields__row">
            <div class="c-searchFields__col">
                <label>
                    <strong>Marka</strong>
                    <br>
                    <Select :multiple="false" :selectedValue="getSelectedValue(['brand_id',getParams.brand_id])" selectedKey="name">
                        <ul slot="list">
                            <li v-for="item in getBrandsByType(getParams.category_id)" :key="item.value+'bi'" v-on:click="celarParam('brand_id');setParam({key:String('brand_id'),value:String(item.value)});fetchModels({brand_id:item.value})" v-bind:class="{active:checkSelectedValue([item.value,getParams.brand_id])}">{{ item.name }}</li>
                        </ul>
                    </Select>
                </label>
            </div>
            <div class="c-searchFields__col">
                <label>
                    <strong>Model</strong>
                    <br>
                    <Select :multiple="true" :selectedValue="getSelectedValue(['model_ids',getParams.model_ids])" selectedKey="name" :disabled="!getParams.brand_id" disabledPlaceholder="Najpierw wybierz markę">
                        <ul slot="list">
                            <li v-for="(item,key) in getModels" :key="key+'mo'" v-on:click="setParam({key:'model_ids',value:item.value})" v-bind:class="{active:checkSelectedValue([item.value,getParams.model_ids])}">{{ item.name }}</li>
                        </ul>
                    </Select>
                </label>
            </div>
            <div class="c-searchFields__col">
                <label>
                    <strong>Rodzaj nadwozia</strong>
                    <br>
                    <Select :multiple="true" :selectedValue="getSelectedValue(['body_ids',getParams.body_ids])" selectedKey="name">
                        <ul slot="list">
                            <li v-for="item in getBodies" :key="item.value+'b'" v-on:click="setParam({key:'body_ids',value:item.value})" v-bind:class="{active:checkSelectedValue([item.value,getParams.body_ids])}">{{ item.name }}</li>
                        </ul>
                    </Select>
                </label>
            </div>
            <div class="c-searchFields__col">
                <label>
                    <strong>Rodzaj silnika</strong>
                    <br>
                    <Select :multiple="true" :selectedValue="getSelectedValue(['fuel_ids',getParams.fuel_ids])" selectedKey="name">
                        <ul slot="list">
                            <li v-for="item in getFuels" :key="item.value+'f'" v-on:click="setParam({key:'fuel_ids',value:item.value})" v-bind:class="{active:checkSelectedValue([item.value,getParams.fuel_ids])}">{{ item.name }}</li>
                        </ul>
                    </Select>
                </label>
            </div>
            <div class="c-searchFields__col">
                <label>
                    <strong>Skrzynia biegów</strong>
                    <br>
                    <Select :multiple="true" :selectedValue="getSelectedValue(['transmission_ids',getParams.transmission_ids])" selectedKey="name">
                        <ul slot="list">
                            <li v-for="item in getTransmissions" :key="item.value+'t'" v-on:click="setParam({key:'transmission_ids',value:item.value})" v-bind:class="{active:checkSelectedValue([item.value,getParams.transmission_ids])}">{{ item.name }}</li>
                        </ul>
                    </Select>
                </label>
            </div>
        </div>
        <div class="c-searchFields__row">
            <div class="c-searchFields__col">
                <label>
                    <strong>Rok produkcji od</strong>
                    <br>
                    <Select :selectedValue="getSelectedValue(['production_year_from',getParams.production_year_from])" selectedKey="name" selectedPlaceholder="od">
                        <ul slot="list">
                            <li v-for="item in getYears" :key="item.value+'mf'" v-on:click="setParam({key:'production_year_from',value:item.value})" v-bind:class="{active:checkSelectedValue([item.value,getParams.production_year_from])}">{{ item.name }}</li>
                        </ul>
                    </Select>
                </label>
            </div>
            <div class="c-searchFields__col c-searchFields__col--price" v-if="getPrices">
                <div>
                    <label v-on:click="setParam({key:'price_mode',value:0});setRangeSlider();">
                        <Checkbox :state="getParams.price_mode == '0'" mode="radio"/>
                        Cena
                    </label>
                    <label v-on:click="setParam({key:'price_mode',value:1});setRangeSlider();">
                        <Checkbox :state="getParams.price_mode == '1'" mode="radio"/>
                        Rata
                    </label>
                </div>
                <div class="c-searchFields__col c-searchFields__row" v-if="$device.isMobile">
                    <div class="c-searchFields__col">
                        <label>
                            <strong>Od</strong>
                            <br>
                            <Input placeholder="od" type="number" v-on:input="setPrices([$event,priceValues[1]])" :value="priceValues[0]" />
                        </label>
                    </div>
                        <div class="c-searchFields__col">
                        <label>
                            <strong>Do</strong>
                            <br>
                            <Input placeholder="do" type="number" v-on:input="setPrices([priceValues[0],$event])" :value="priceValues[1]"/>
                        </label>
                    </div>
                </div>
                <vRangeSlider v-else-if="priceRange" :label="['od','do']" unit="PLN" :step="priceSteps[getParams.price_mode]" :range="priceRange" :value="priceValues" v-on:change="setPrices($event)" />
            </div>
            <div class="c-searchFields__col">
                <label>
                    <strong>Lokalizacja</strong>
                    <br>
                    <Select multiple="true" :selectedValue="getSelectedValue(['city_names',getParams.city_names])" selectedKey="name">
                        <ul slot="list" :multiple="true">
                            <li v-for="item in getCities" :key="item.value+'b'" v-on:click="setParam({key:'city_names',value:item.value})" v-bind:class="{active:checkSelectedValue([item.value,getParams.city_names])}">{{ item.name }}</li>
                        </ul>
                    </Select>
                </label>
            </div>
        </div>
        <transition name="load">
            <template v-if="mode == 2">
                <div class="c-searchFields__row">
                    <div class="c-searchFields__col">
                        <label>
                            <strong>Przebieg do (km)</strong>
                            <br>
                            <Input placeholder="Wpisz" type="number" v-on:input="setParam({key:'mileage_to',value:$event})" :value="getParams.mileage_to"/>
                        </label>
                    </div>
                    <div class="c-searchFields__col">
                        <label>
                            <strong>Rodzaj napędu</strong>
                            <br>
                            <Select :multiple="true" :selectedValue="getSelectedValue(['drive_ids',getParams.drive_ids])" selectedKey="name" v-if="getDrives">
                                <ul slot="list">
                                    <li v-for="item in getDrives" :key="item.value+'d'" v-on:click="setParam({key:'drive_ids',value:item.value})" v-bind:class="{active:checkSelectedValue([item.value,getParams.drive_ids])}">{{ item.name }}</li>
                                </ul>
                            </Select>
                        </label>
                    </div>
                    <div class="c-searchFields__col c-searchFields__row">
                        <div class="c-searchFields__col">
                            <label>
                                <strong>Pojemność silnika (cm3)</strong>
                                <br>
                                <Input placeholder="od" type="number" v-on:input="setParam({key:'capacity_from',value:$event})" :value="getParams.capacity_from" />
                            </label>
                        </div>
                            <div class="c-searchFields__col">
                            <label>
                                <strong>&nbsp;</strong>
                                <br>
                                <Input placeholder="do" type="number" v-on:input="setParam({key:'capacity_to',value:$event})" :value="getParams.capacity_to"/>
                            </label>
                        </div>
                    </div>
                    <div class="c-searchFields__col c-searchFields__row">
                        <div class="c-searchFields__col">
                            <label>
                                <strong>Moc silnika (KM)</strong>
                                <br>
                                <Input placeholder="od" type="number" v-on:input="setParam({key:'power_from',value:$event})" :value="getParams.power_from" />
                            </label>
                        </div>
                        <div class="c-searchFields__col">
                            <label>
                                <strong>&nbsp;</strong>
                                <br>
                                <Input placeholder="do" type="number" v-on:input="setParam({key:'power_to',value:$event})" :value="getParams.power_to"/>
                            </label>
                        </div>
                    </div>
                    <div class="c-searchFields__col">
                        &nbsp;
                    </div>
                </div>
            </template>
        </transition>
        <transition name="load">
            <template v-if="mode == 2">
                <div class="c-searchFields__row">
                    <div class="c-searchFields__col">
                        <label>
                            <strong>Numer oferty</strong>
                            <br>
                            <Input placeholder="Wpisz" type="number" v-on:input="setParam({key:'ids[]',value:$event})" :value="getParams['ids[]']" :valid="getParams['ids[]'] && getParams['ids[]'].length >= 4"/>
                        </label>
                    </div>
                    <div class="c-searchFields__col">
                        <label>
                            <strong>Numer VIN</strong>
                            <br>
                            <Input placeholder="Wpisz" type="text" v-on:input="setParam({key:'vin_fragment',value:$event})" :value="getParams['vin_fragment']" :valid="getParams['vin_fragment'] && getParams['vin_fragment'].length >= 17"/>
                        </label>
                    </div>
                    <div class="c-searchFields__col">
                        <label>
                            <strong>Faktura</strong>
                            <br>
                            <Select :selectedValue="getSelectedValue(['invoice_vat',getParams.invoice_vat])" selectedKey="name" placeholder="Wybierz">
                                <ul slot="list" :multiple="true">
                                    <li v-for="item in getVatInvoices" :key="item.value+'b'" v-on:click="setParam({key:'invoice_vat',value:item.value})" v-bind:class="{active:checkSelectedValue([item.value,getParams.invoice_vat])}">{{ item.name }}</li>
                                </ul>
                            </Select>
                        </label>
                    </div>
                </div>
            </template>
        </transition>
    </div>
</template>
<script>

import Select from '~/components/elements/Select.vue'
import Input from '~/components/elements/Input.vue' 
import Checkbox from '~/components/elements/Checkbox'

import vRangeSlider from '~/components/elements/RangeSlider'


// import vRangeSlider from 'v-range-component'
// import 'v-range-component/dist/styles.css'

import search from '~/mixins/search.js'
import dictionary from '~/mixins/dictionary.js'
import filters from '~/mixins/filters.js'

export default {
    mixins:[search,dictionary,filters],
    components:{Select,Input,vRangeSlider,Checkbox},
    data(){
        return {
            mode:1,
            priceRange:[0,0],
            priceSteps:[1000,500],
            priceValues:[0,0],
            timer:null
        }
    },
    methods:{
        setPrices(values){
            // this.priceValues = values;
            if(this.getParams.price_mode == '1'){
                this.setParam({key:'price_from',value:this.getParams.price_from,nocounter:true});
                this.setParam({key:'price_to',value:this.getParams.price_to,nocounter:true});
                this.setParam({key:'price_month_from',value:values[0],nocounter:true, noreset:true});
                this.setParam({key:'price_month_to',value:values[1],nocounter:true, noreset:true});
            }else{
                this.setParam({key:'price_month_from',value:this.getParams.price_month_from,nocounter:true});
                this.setParam({key:'price_month_to',value:this.getParams.price_month_to,nocounter:true});
                this.setParam({key:'price_from',value:values[0],nocounter:true, noreset:true});
                this.setParam({key:'price_to',value:values[1],nocounter:true, noreset:true});
            }
            this.$store.dispatch('search/getCounters',this.getParams);
            console.log(this.getParams);
        },
        setRangeSlider() {
            if(this.getParams.price_mode == '1'){
                this.priceRange = [
                    Number(this.getFilters.price_month_from?this.getFilters.price_month_from:0),
                    Number(this.getFilters.price_month_to?this.getFilters.price_month_to:50000)
                ];
                this.priceValues = [
                    Number(this.getParams.price_month_from?this.getParams.price_month_from:this.getFilters.price_month_from),
                    Number(this.getParams.price_month_to?this.getParams.price_month_to:this.getFilters.price_month_to)
                ];
            }else{
                this.priceRange = [
                    Number(this.getFilters.price_from?this.getFilters.price_from:0),
                    Number(this.getFilters.price_to?this.getFilters.price_to:500000)
                ];
                this.priceValues =  [
                    Number(this.getParams.price_from?this.getParams.price_from:this.getFilters.price_from),
                    Number(this.getParams.price_to?this.getParams.price_to:this.getFilters.price_to)
                ];
            }
        }
    },
    mounted(){
        this.mode = this.getParams.extended?this.getParams.extended:1;
        this.setRangeSlider();
    },
    watch:{
        'getParams.price_mode'() {
            this.setRangeSlider();
        }
    }

}
</script>
<style lang="scss">
    .c-searchFields{
        $t:&;
            width: 95%;
        @media(min-width:780px){
            padding-right: 2rem;
        }
        label{
            width: 100%;
            white-space: nowrap;
            position: relative;
            strong{
                position: absolute;
            }
        }
        &__row{
            @media(min-width:780px){
                display: flex;
                justify-content: space-between;
                margin-left: -.5rem;
            }
        }
        &__col{
            width: 100%;
            margin:.75rem .5rem .25rem .5rem;
            align-items: center;
            &--price{
                display: flex;
                font-size: .8rem;
                span{
                    margin-top: 1.5rem;
                    padding: 0 .1rem;
                }
                @media(min-width: 780px){
                    width: calc(300% + 1rem);
                }
                .simple-range-slider{
                    margin:0 1rem;
                }
            }
            #{$t}__col{
                margin:0rem .25rem;
            }
        }
        &__mode{
            margin-bottom: .5rem;
            @media(max-width: 780px){
                display: flex;
                flex-wrap: wrap;
                strong{
                    width: 100%;
                    display: block;
                }
                label{
                    display: inline-block;
                    padding: 1rem 0 1rem 0;
                    width: 50%;
                }
            }
        }
        &__option{
            cursor: pointer;
            span{
                padding-bottom:1rem;
                display: inline-block;
                font-size: .9rem;
                @media(max-width: 1700px){
                    font-size: .65rem;
                }
            }
            svg{
                margin-bottom: -0.3rem;
                width: 16px;
                margin-left: 0.5rem;
            }
        }
    }
</style>