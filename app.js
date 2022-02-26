require("dotenv").config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`Tasks: 189 total,   1 running, 188 sleeping,   0 stopped,   0 zombie
  %Cpu(s):  3.7 us,  6.1 sy,  0.0 ni, 89.9 id,  0.0 wa,  0.3 hi,  0.0 si,  0.0 st
  MiB Mem :   4738.3 total,    532.1 free,   3155.7 used,   1050.5 buff/cache
  MiB Swap:   4095.9 total,   4079.9 free,     16.0 used.    864.2 avail Mem
  
      PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
    17450 opc       20   0 6382400   2.4g  28992 S   2.3  51.8 154:20.60 java
  1348232 root      20   0       0      0      0 I   0.7   0.0   0:00.38 kworker/0:2-events
     1538 root      20   0   89344  50112  40320 S   0.3   1.0   0:59.77 sssd_nss
     2082 root      20   0   17472   4928   3648 S   0.3   0.1   1:39.51 OSWatcher
  1348479 opc       20   0   24256   7936   4480 R   0.3   0.2   0:00.03 top
        1 root      20   0  113600  19264   9472 S   0.0   0.4   0:24.94 systemd
        2 root      20   0       0      0      0 S   0.0   0.0   0:00.22 kthreadd
        3 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_gp
        4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_par_gp
        6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/0:0H-kblockd
        8 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 mm_percpu_wq
        9 root      20   0       0      0      0 S   0.0   0.0   0:36.34 ksoftirqd/0
       10 root      20   0       0      0      0 I   0.0   0.0   0:03.76 rcu_sched
       11 root      rt   0       0      0      0 S   0.0   0.0   0:00.09 migration/0
       13 root      20   0       0      0      0 S   0.0   0.0   0:00.00 cpuhp/0
       14 root      20   0       0      0      0 S   0.0   0.0   0:00.00 kdevtmpfs
       15 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 netns
       16 root      20   0       0      0      0 S   0.0   0.0   0:00.24 kauditd
       17 root      20   0       0      0      0 S   0.0   0.0   0:00.00 oom_reaper
       18 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 writeback
       19 root      20   0       0      0      0 S   0.0   0.0   0:00.00 kcompactd0
       20 root      25   5       0      0      0 S   0.0   0.0   0:00.00 ksmd
       21 root      39  19       0      0      0 S   0.0   0.0   0:02.50 khugepaged
       76 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kintegrityd
       77 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kblockd
       78 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 blkcg_punt_bio
       79 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 ata_sff
       80 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 md
       81 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 edac-poller
       82 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 devfreq_wq
       83 root      rt   0       0      0      0 S   0.0   0.0   0:00.00 watchdogd
       84 root      20   0       0      0      0 S   0.0   0.0   0:00.32 kswapd0:0
       86 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kthrotld
       87 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/43-aerdrv
       88 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/43-pciehp
       89 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/44-aerdrv
       90 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/44-pciehp
       91 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/45-aerdrv
       92 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/45-pciehp
       93 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/46-aerdrv
       94 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/46-pciehp
       95 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/47-aerdrv
       96 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/47-pciehp
       97 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/48-aerdrv
       98 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/48-pciehp
       99 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/49-aerdrv
      100 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/49-pciehp
      101 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/50-aerdrv
      102 root     -51   0       0      0      0 S   0.0   0.0   0:00.00 irq/50-pciehp`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
