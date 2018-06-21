<?php $__env->startSection('content'); ?>
<meta id="chat-meta" name="chat" content="<?php echo e($chat); ?>">
<div id="show-chat"></div>
<script src="/js/show_chat.js"></script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>