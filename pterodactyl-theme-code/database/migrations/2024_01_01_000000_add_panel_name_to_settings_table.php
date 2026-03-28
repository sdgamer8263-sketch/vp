<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddPanelNameToSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Pterodactyl uses a key-value store for settings.
        // We insert the default panel name here.
        DB::table('settings')->insertOrIgnore([
            'key' => 'theme:panel_name',
            'value' => 'SKA HOST'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('settings')->where('key', 'theme:panel_name')->delete();
    }
}
