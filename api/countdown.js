/**
 * Countdown API Routes for SKAIZ Website
 */

const express = require('express');
const router = express.Router();

// Countdown Configuration
const countdownConfig = {
  // Set your reveal date and time here
  revealDate: new Date('2026-02-14T00:00:00'), // Valentine's Day 2026
  
  // Force reveal for testing (bypasses countdown)
  forceReveal: process.env.FORCE_REVEAL === 'true' || false,
  
  // Client refresh interval (ms)
  clientRefreshInterval: 60000,
  
  // Countdown screen configuration
  screen: {
    title: 'SKAIZ',
    subtitle: 'WORLD',
    message: 'Coming Soon',
    socialLinks: {
      instagram: 'https://www.instagram.com/flyskaiz/',
    },
    backgroundImage: '/skaiz-world.png',
  },
};

/**
 * Get current countdown status
 */
function getCountdownStatus() {
  const now = new Date();
  const timeRemaining = countdownConfig.revealDate - now;
  const isRevealed = countdownConfig.forceReveal || timeRemaining <= 0;
  
  return {
    isRevealed,
    revealDate: countdownConfig.revealDate.toISOString(),
    timeRemaining: isRevealed ? 0 : Math.max(0, timeRemaining),
    serverTime: now.toISOString(),
    config: {
      refreshInterval: countdownConfig.clientRefreshInterval,
      screen: countdownConfig.screen,
    },
  };
}

/**
 * GET /api/countdown
 * Public endpoint - Get countdown status
 */
router.get('/', (req, res) => {
  try {
    const status = getCountdownStatus();
    res.json(status);
  } catch (error) {
    console.error('Error getting countdown status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get countdown status',
    });
  }
});

/**
 * PUT /api/countdown/reveal-date
 * Admin endpoint - Update reveal date
 * Requires API key in header: X-API-Key
 */
router.put('/reveal-date', requireAdminAuth, (req, res) => {
  try {
    const { date } = req.body;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        error: 'Date is required in request body',
      });
    }
    
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format',
      });
    }
    
    countdownConfig.revealDate = newDate;
    
    res.json({
      success: true,
      message: 'Reveal date updated successfully',
      newDate: newDate.toISOString(),
    });
  } catch (error) {
    console.error('Error updating reveal date:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update reveal date',
    });
  }
});

/**
 * PUT /api/countdown/force-reveal
 * Admin endpoint - Toggle force reveal
 */
router.put('/force-reveal', requireAdminAuth, (req, res) => {
  try {
    const { enabled } = req.body;
    
    if (typeof enabled !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'enabled (boolean) is required in request body',
      });
    }
    
    countdownConfig.forceReveal = enabled;
    
    res.json({
      success: true,
      message: `Force reveal ${enabled ? 'enabled' : 'disabled'}`,
      forceReveal: countdownConfig.forceReveal,
    });
  } catch (error) {
    console.error('Error toggling force reveal:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle force reveal',
    });
  }
});

/**
 * Admin authentication middleware
 */
function requireAdminAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  const validKey = process.env.ADMIN_API_KEY || 'dev-api-key-change-in-production';
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'API key required. Include X-API-Key header or apiKey query parameter.',
    });
  }
  
  if (apiKey !== validKey) {
    return res.status(403).json({
      success: false,
      error: 'Invalid API key',
    });
  }
  
  next();
}

module.exports = router;
