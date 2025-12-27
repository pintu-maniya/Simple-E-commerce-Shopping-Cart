<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendDailySalesReport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'report:daily-sales';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send daily sales report to admin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = Carbon::today();
        $sales = Order::whereDate('created_at', $today)->get();

        Mail::to('admin@example.com')->send(new DailySalesReport($sales));

        $this->info('Daily sales report sent successfully!');
    }
}
