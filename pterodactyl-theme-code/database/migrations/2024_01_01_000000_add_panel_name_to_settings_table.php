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
            ['key' => 'theme:panel_name', 'value' => 'SKA HOST'],
            ['key' => 'theme:primary_color', 'value' => '#3b82f6'],
            ['key' => 'theme:secondary_color', 'value' => '#1e40af'],
            ['key' => 'theme:sidebar_color', 'value' => '#111827'],
            ['key' => 'theme:discord_suspend_channel', 'value' => ''],
            ['key' => 'theme:discord_renewal_channel', 'value' => ''],
            ['key' => 'theme:discord_renewal_days', 'value' => '7'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('settings')->whereIn('key', [
            'theme:panel_name',
            'theme:primary_color',
            'theme:secondary_color',
            'theme:sidebar_color',
            'theme:discord_suspend_channel',
            'theme:discord_renewal_channel',
            'theme:discord_renewal_days'
        ])->delete();
    }
}
